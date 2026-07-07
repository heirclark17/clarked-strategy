"""Contact form: persist the message and email a notification."""

import html

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..email import send_email
from ..models import ContactMessage
from ..schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])


def _render_email(payload: ContactCreate) -> str:
    esc = html.escape
    company = esc(payload.company) if payload.company else "—"
    body = esc(payload.message).replace("\n", "<br>")
    return f"""
    <div style="font-family:system-ui,Arial,sans-serif;max-width:560px">
      <h2 style="color:#0F2A4A;margin-bottom:4px">New inquiry — Clarked Strategy</h2>
      <p style="color:#556">Someone reached out through clarkedstrategygroup.com.</p>
      <table style="border-collapse:collapse;width:100%;margin-top:12px">
        <tr><td style="padding:6px 0;color:#889">Name</td><td>{esc(payload.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#889">Email</td><td>{esc(payload.email)}</td></tr>
        <tr><td style="padding:6px 0;color:#889">Company</td><td>{company}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
      <p style="white-space:pre-wrap;line-height:1.5">{body}</p>
    </div>
    """


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(payload: ContactCreate, db: Session = Depends(get_db)) -> ContactMessage:
    record = ContactMessage(
        name=payload.name,
        email=payload.email,
        company=payload.company,
        message=payload.message,
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    sent = await send_email(
        to=settings.contact_to_email,
        subject=f"New inquiry from {payload.name}",
        html=_render_email(payload),
        reply_to=str(payload.email),
    )
    if sent and not record.emailed:
        record.emailed = True
        db.commit()
        db.refresh(record)

    return record
