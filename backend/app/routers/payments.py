"""Stripe Checkout: create a hosted checkout session and receive webhooks.

Dormant until STRIPE_SECRET_KEY is set — every route returns 503 otherwise so
the API still boots and documents itself without Stripe configured.
"""

import logging

import stripe
from fastapi import APIRouter, HTTPException, Request, status

from ..config import settings
from ..schemas import CheckoutRequest, CheckoutResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/payments", tags=["payments"])

if settings.payments_enabled:
    stripe.api_key = settings.stripe_secret_key


def _require_stripe() -> None:
    if not settings.payments_enabled:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payments are not configured (missing STRIPE_SECRET_KEY).",
        )


@router.post("/checkout", response_model=CheckoutResponse)
def create_checkout(payload: CheckoutRequest) -> CheckoutResponse:
    _require_stripe()

    if payload.price_id:
        line_items = [{"price": payload.price_id, "quantity": payload.quantity}]
    elif payload.amount_cents:
        line_items = [
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": payload.product_name},
                    "unit_amount": payload.amount_cents,
                },
                "quantity": payload.quantity,
            }
        ]
    else:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Provide either price_id or amount_cents.",
        )

    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=line_items,
            success_url=settings.checkout_success_url,
            cancel_url=settings.checkout_cancel_url,
            customer_email=str(payload.customer_email) if payload.customer_email else None,
        )
    except stripe.StripeError as exc:  # type: ignore[attr-defined]
        logger.error("Stripe checkout failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not create checkout session.",
        )

    return CheckoutResponse(checkout_url=session.url, session_id=session.id)


@router.post("/webhook")
async def stripe_webhook(request: Request) -> dict:
    _require_stripe()
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    if settings.stripe_webhook_secret:
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.stripe_webhook_secret
            )
        except (ValueError, stripe.SignatureVerificationError) as exc:  # type: ignore[attr-defined]
            logger.warning("Invalid Stripe webhook: %s", exc)
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid webhook.")
    else:
        # No signing secret configured — accept but log. Set STRIPE_WEBHOOK_SECRET
        # in production to verify authenticity.
        event = stripe.Event.construct_from(await request.json(), stripe.api_key)

    if event["type"] == "checkout.session.completed":
        logger.info("Checkout completed: %s", event["data"]["object"]["id"])
        # TODO: fulfill the order (grant access, send receipt, etc.)

    return {"received": True}
