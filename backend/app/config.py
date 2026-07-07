"""Application configuration, loaded from environment variables.

Every integration is optional and driven by env vars, so unconfigured features
(email, payments, AI) stay dormant until you add the matching keys on Railway.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    # --- Core ---------------------------------------------------------------
    app_name: str = "Clarked Strategy API"
    environment: str = "development"  # development | production
    # Comma-separated list of allowed browser origins for CORS.
    cors_origins: str = "http://localhost:3000,https://clarkedstrategy.com,https://www.clarkedstrategy.com"

    # --- Database -----------------------------------------------------------
    # Railway provides this automatically when you attach a Postgres plugin.
    # Falls back to a local SQLite file so the API runs with zero setup.
    database_url: str = "sqlite:///./clarked.db"

    # --- Auth ---------------------------------------------------------------
    # MUST be overridden in production. Generate: python -c "import secrets;print(secrets.token_urlsafe(48))"
    jwt_secret: str = "dev-insecure-change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days

    # --- Email (Resend) -----------------------------------------------------
    resend_api_key: str = ""
    # Where contact-form submissions are delivered.
    contact_to_email: str = "derrick88clark@yahoo.com"
    # Verified sender on your Resend domain. Until the domain is verified,
    # Resend allows onboarding@resend.dev for testing.
    contact_from_email: str = "onboarding@resend.dev"

    # --- Payments (Stripe) --------------------------------------------------
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""
    # Where Stripe redirects the customer after checkout.
    checkout_success_url: str = "https://clarkedstrategy.com/success"
    checkout_cancel_url: str = "https://clarkedstrategy.com/pricing"

    # --- AI (Anthropic) -----------------------------------------------------
    anthropic_api_key: str = ""
    anthropic_model: str = "claude-opus-4-8"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def email_enabled(self) -> bool:
        return bool(self.resend_api_key)

    @property
    def payments_enabled(self) -> bool:
        return bool(self.stripe_secret_key)

    @property
    def ai_enabled(self) -> bool:
        return bool(self.anthropic_api_key)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
