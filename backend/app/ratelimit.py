"""Shared request rate limiter (slowapi).

Keyed by the real client IP. Behind Railway's proxy the socket peer is the
proxy, so we read the client IP from the X-Forwarded-For header (leftmost entry)
when present, falling back to the direct peer address.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address
from starlette.requests import Request


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address(request)


limiter = Limiter(key_func=client_ip)
