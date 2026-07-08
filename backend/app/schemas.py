"""Pydantic request/response schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from pydantic.alias_generators import to_camel


# --- Contact ---------------------------------------------------------------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    company: str | None = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    company: str | None
    emailed: bool
    created_at: datetime


# --- Discovery Session -----------------------------------------------------
# Field names mirror the frontend Zod schema (src/lib/discovery-schema.ts).
# The request arrives as camelCase JSON; the alias generator maps it onto these
# snake_case fields. This is the server-side re-validation of the intake form.
class DiscoveryCreate(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        str_strip_whitespace=True,
    )

    # Step 0 — details
    full_name: str = Field(min_length=1, max_length=200)
    company_name: str = Field(min_length=1, max_length=200)
    work_email: EmailStr
    phone: str | None = Field(default=None, max_length=40)

    # Step 1 — product
    problem_solved: str = Field(min_length=1, max_length=300)
    stage: str = Field(min_length=1, max_length=80)
    launch_date: str | None = Field(default=None, max_length=80)
    features_not_ready: str | None = Field(default=None, max_length=1500)

    # Step 2 — audience
    ideal_customer: str = Field(min_length=1, max_length=1000)
    customer_feeling: str = Field(min_length=1, max_length=600)
    early_feedback: str | None = Field(default=None, max_length=1500)
    audience_platforms: list[str] = Field(min_length=1)
    objections: str | None = Field(default=None, max_length=1500)

    # Step 3 — goals
    success30: str = Field(min_length=1, max_length=1000)
    success60: str | None = Field(default=None, max_length=1000)
    success90: str | None = Field(default=None, max_length=1000)
    top_priority: str = Field(min_length=1, max_length=80)
    monetization: str = Field(min_length=1, max_length=80)
    stakeholders: str | None = Field(default=None, max_length=600)

    # Step 4 — competitive landscape
    competitor1: str = Field(min_length=1, max_length=200)
    competitor2: str | None = Field(default=None, max_length=200)
    competitor3: str | None = Field(default=None, max_length=200)
    differentiation: str = Field(min_length=1, max_length=1000)
    competitor_notes: str | None = Field(default=None, max_length=1500)
    unfair_advantage: str = Field(min_length=1, max_length=1000)

    # Step 5 — logistics & assets
    brand_assets: list[str] = Field(default_factory=list)
    brand_assets_notes: str | None = Field(default=None, max_length=1000)
    approval_contact_name: str = Field(min_length=1, max_length=200)
    approval_contact_email: EmailStr
    review_process: str | None = Field(default=None, max_length=1000)
    revision_rounds: str | None = Field(default=None, max_length=40)
    turnaround: str | None = Field(default=None, max_length=200)
    budget_range: str = Field(min_length=1, max_length=80)
    budget_flexible: bool = False

    # Final + consent + anti-spam
    additional_notes: str | None = Field(default=None, max_length=2000)
    consent: bool
    honeypot: str | None = None

    @field_validator("consent")
    @classmethod
    def _must_consent(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("Consent is required to submit a Discovery Session.")
        return v


class DiscoveryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    company_name: str
    email: EmailStr
    emailed: bool
    created_at: datetime


# --- Auth ------------------------------------------------------------------
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str | None = Field(default=None, max_length=200)


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str | None
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


# --- Payments --------------------------------------------------------------
class CheckoutRequest(BaseModel):
    # Either pass a Stripe Price ID directly, or an ad-hoc amount in cents.
    price_id: str | None = None
    amount_cents: int | None = Field(default=None, ge=100)
    product_name: str = Field(default="Clarked Strategy Consulting", max_length=200)
    quantity: int = Field(default=1, ge=1, le=100)
    customer_email: EmailStr | None = None


class CheckoutResponse(BaseModel):
    checkout_url: str
    session_id: str


# --- AI --------------------------------------------------------------------
class AIRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)
    # Optional extra instruction to steer tone/format.
    system: str | None = Field(default=None, max_length=4000)


class AIResponse(BaseModel):
    text: str
    model: str
