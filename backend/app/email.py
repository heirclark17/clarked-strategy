"""Transactional email via Resend's HTTP API.

Kept dependency-light: a single httpx POST. No-ops (returns False) when
RESEND_API_KEY is unset so local/dev runs never fail on email.
"""

import logging

import httpx

from .config import settings

logger = logging.getLogger(__name__)

RESEND_ENDPOINT = "https://api.resend.com/emails"


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> bool:
    if not settings.email_enabled:
        logger.info("Email disabled (no RESEND_API_KEY) — skipping send to %s", to)
        return False

    payload: dict = {
        "from": settings.contact_from_email,
        "to": [to],
        "subject": subject,
        "html": html,
    }
    if reply_to:
        payload["reply_to"] = reply_to

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(
                RESEND_ENDPOINT,
                headers={"Authorization": f"Bearer {settings.resend_api_key}"},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except httpx.HTTPError as exc:
        logger.error("Resend send failed: %s", exc)
        return False
