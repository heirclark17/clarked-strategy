"""FastAPI application entrypoint for the Clarked Strategy backend."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.requests import Request
from starlette.responses import JSONResponse

from .config import settings
from .database import init_db
from .ratelimit import limiter
from .routers import ai, auth, contact, discovery, payments

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Backend for clarkedstrategygroup.com — contact and Discovery Session intake.",
    lifespan=lifespan,
)

# --- Rate limiting -----------------------------------------------------------
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# --- Reject oversized request bodies ----------------------------------------
@app.middleware("http")
async def limit_body_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length is not None:
        try:
            if int(content_length) > settings.max_body_bytes:
                return JSONResponse(
                    status_code=413, content={"detail": "Request body too large."}
                )
        except ValueError:
            return JSONResponse(status_code=400, content={"detail": "Invalid Content-Length."})
    return await call_next(request)


# --- Never leak internals on an unhandled error -----------------------------
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Full detail is logged server-side; the client gets a generic message.
    logger.exception("Unhandled error on %s %s", request.method, request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    # Also allow any Vercel deployment (previews + production) out of the box.
    # Auth uses Bearer tokens in headers (no cookies), so credentials are off.
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Public site endpoints.
app.include_router(contact.router)
app.include_router(discovery.router)

# Unused scaffolding — mounted only when explicitly enabled (default: off).
if settings.enable_auth:
    app.include_router(auth.router)
if settings.enable_payments:
    app.include_router(payments.router)
# AI endpoint stays available (JWT-gated); harmless when auth is disabled.
app.include_router(ai.router)


@app.get("/", tags=["meta"])
def root() -> dict:
    return {"service": settings.app_name, "status": "ok"}


@app.get("/health", tags=["meta"])
def health() -> dict:
    """Liveness probe + a quick view of which integrations are configured."""
    return {
        "status": "ok",
        "environment": settings.environment,
        "features": {
            "email": settings.email_enabled,
            "payments": settings.payments_enabled,
            "ai": settings.ai_enabled,
            "auth_enabled": settings.enable_auth,
            "payments_enabled": settings.enable_payments,
        },
    }
