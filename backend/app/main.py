"""FastAPI application entrypoint for the Clarked Strategy backend."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .routers import ai, auth, contact, payments

logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Backend for clarkedstrategy.com — contact, accounts, payments, and AI.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(auth.router)
app.include_router(payments.router)
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
        },
    }
