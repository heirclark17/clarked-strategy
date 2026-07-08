"""Database models."""

from datetime import datetime, timezone
from typing import Any

from sqlalchemy import JSON, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    company: Mapped[str | None] = mapped_column(String(200), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    # Whether the notification email was successfully dispatched.
    emailed: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)


class DiscoverySession(Base):
    """A completed Client Discovery Session intake.

    The most useful/queryable answers are stored as columns; the full set of
    structured answers is kept in the ``details`` JSON column so the schema can
    evolve without a migration for every added question.
    """

    __tablename__ = "discovery_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    # Contact
    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    company_name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    # Key filters
    stage: Mapped[str | None] = mapped_column(String(80), nullable=True)
    top_priority: Mapped[str | None] = mapped_column(String(80), nullable=True)
    monetization: Mapped[str | None] = mapped_column(String(80), nullable=True)
    budget_range: Mapped[str | None] = mapped_column(String(80), nullable=True)
    primary_competitor: Mapped[str | None] = mapped_column(String(200), nullable=True)
    # Full structured answer set
    details: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False, default=dict)
    # Whether the notification email was successfully dispatched.
    emailed: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
