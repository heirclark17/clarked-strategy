"""AI endpoint powered by Claude (Anthropic).

Dormant until ANTHROPIC_API_KEY is set. Use it for strategy-tool features,
draft generation, or an on-site assistant. Requires an authenticated user so
the endpoint can't be abused anonymously.
"""

import logging

from anthropic import AsyncAnthropic
from fastapi import APIRouter, Depends, HTTPException, status

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
            detail="AI is not configured (missing ANTHROPIC_API_KEY).",
        )

    client = AsyncAnthropic(api_key=settings.anthropic_api_key)
    try:
        # Stream so long generations don't hit HTTP timeouts, then collect the
        # final message. Adaptive thinking lets Claude decide how hard to think.
        async with client.messages.stream(
            model=settings.anthropic_model,
            max_tokens=4096,
            thinking={"type": "adaptive"},
            system=payload.system or DEFAULT_SYSTEM,
            messages=[{"role": "user", "content": payload.prompt}],
        ) as stream:
            message = await stream.get_final_message()
    except Exception as exc:  # anthropic raises typed errors; surface a clean 502
        logger.error("Anthropic request failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI request failed.",
        )

    text = "".join(block.text for block in message.content if block.type == "text")
    return AIResponse(text=text, model=message.model)
