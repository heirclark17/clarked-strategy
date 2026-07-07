"""AI endpoint powered by OpenAI.

Dormant until OPENAI_API_KEY is set. Use it for strategy-tool features,
draft generation, or an on-site assistant. Requires an authenticated user so
the endpoint can't be abused anonymously.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from openai import AsyncOpenAI

from ..config import settings
from ..deps import get_current_user
from ..models import User
from ..schemas import AIRequest, AIResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/ai", tags=["ai"])

DEFAULT_SYSTEM = (
    "You are Clarked Strategy's assistant — a sharp cybersecurity and program "
    "strategy advisor. Be concise, concrete, and executive-ready."
)


@router.post("", response_model=AIResponse)
async def generate(
    payload: AIRequest,
    current_user: User = Depends(get_current_user),
) -> AIResponse:
    if not settings.ai_enabled:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI is not configured (missing OPENAI_API_KEY).",
        )

    client = AsyncOpenAI(api_key=settings.openai_api_key)
    try:
        completion = await client.chat.completions.create(
            model=settings.openai_model,
            max_tokens=1024,
            messages=[
                {"role": "system", "content": payload.system or DEFAULT_SYSTEM},
                {"role": "user", "content": payload.prompt},
            ],
        )
    except Exception as exc:  # openai raises typed errors; surface a clean 502
        logger.error("OpenAI request failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI request failed.",
        )

    text = completion.choices[0].message.content or ""
    return AIResponse(text=text, model=completion.model)
