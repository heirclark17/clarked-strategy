"""Pydantic request/response schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


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
