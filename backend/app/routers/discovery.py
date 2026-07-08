"""Client Discovery Session intake: persist the submission and email a notification.

Mirrors routers/contact.py — persist first (so a lead is never lost), then send a
best-effort notification email. Email is dormant until RESEND_API_KEY is set; the
submission is stored regardless.
"""

import html

from fastapi import APIRouter, Depends, Request, Response, status
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..email import send_email
from ..models import DiscoverySession
from ..ratelimit import limiter
from ..schemas import DiscoveryCreate, DiscoveryResponse

router = APIRouter(prefix="/discovery", tags=["discovery"])


def _row(label: str, value: str | None) -> str:
    esc = html.escape
    display = esc(value).replace("\n", "<br>") if value else "—"
    return (
        f'<tr><td style="padding:6px 12px 6px 0;color:#889;vertical-align:top;'
        f'white-space:nowrap">{esc(label)}</td><td style="padding:6px 0">{display}</td></tr>'
    )


def _render_email(payload: DiscoveryCreate) -> str:
    platforms = ", ".join(payload.audience_platforms) if payload.audience_platforms else "—"
    assets = ", ".join(payload.brand_assets) if payload.brand_assets else "—"
    rows = "".join(
        [
            _row("Name", payload.full_name),
            _row("Company", payload.company_name),
            _row("Email", str(payload.work_email)),
            _row("Phone", payload.phone),
            _row("Stage", payload.stage),
            _row("Problem solved", payload.problem_solved),
            _row("Ideal customer", payload.ideal_customer),
            _row("What they feel", payload.customer_feeling),
            _row("Audience is on", platforms),
            _row("30-day success", payload.success30),
            _row("60-day success", payload.success60),
            _row("90-day success", payload.success90),
            _row("#1 priority", payload.top_priority),
            _row("Monetization", payload.monetization),
            _row("Top competitor", payload.competitor1),
            _row("Differentiation", payload.differentiation),
            _row("Unfair advantage", payload.unfair_advantage),
            _row("Brand assets", assets),
            _row("Approver", f"{payload.approval_contact_name} ({payload.approval_contact_email})"),
            _row("Budget", f"{payload.budget_range}{' · flexible' if payload.budget_flexible else ''}"),
            _row("Notes", payload.additional_notes),
        ]
    )
    return f"""
    <div style="font-family:system-ui,Arial,sans-serif;max-width:640px">
      <h2 style="color:#4F2FF0;margin-bottom:4px">New Discovery Session — Clarked Strategy</h2>
      <p style="color:#556">A prospect completed the intake at clarkedstrategygroup.com.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:12px;font-size:14px">{rows}</table>
    </div>
    """


@router.post("", response_model=DiscoveryResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.discovery_rate_limit)
async def create_discovery(
    request: Request, payload: DiscoveryCreate, db: Session = Depends(get_db)
):
    # Anti-spam: a filled honeypot means a bot — accept quietly, persist nothing.
    if payload.honeypot and payload.honeypot.strip():
        return Response(status_code=status.HTTP_201_CREATED)

    record = DiscoverySession(
        full_name=payload.full_name,
        company_name=payload.company_name,
        email=str(payload.work_email),
        phone=payload.phone,
        stage=payload.stage,
        top_priority=payload.top_priority,
        monetization=payload.monetization,
        budget_range=payload.budget_range,
        primary_competitor=payload.competitor1,
        details=payload.model_dump(mode="json", exclude={"honeypot"}),
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    sent = await send_email(
        to=settings.contact_to_email,
        subject=f"New Discovery Session from {payload.company_name}",
        html=_render_email(payload),
        reply_to=str(payload.work_email),
    )
    if sent and not record.emailed:
        record.emailed = True
        db.commit()
        db.refresh(record)

    return record
