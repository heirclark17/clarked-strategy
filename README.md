# Clarked Strategy

Marketing website + backend for **clarkedstrategygroup.com**.

- **`frontend/`** — Next.js 16 marketing site (deploys to **Vercel**).
- **`backend/`** — FastAPI service: contact form/email, accounts + auth, Stripe payments, and a Claude-powered AI endpoint (deploys to **Railway**).

All site copy lives in one file: **`frontend/src/content/site.ts`** — edit it to change anything visitors read.

---

## Architecture

```
Browser ──▶ Vercel (Next.js)  ──fetch──▶  Railway (FastAPI) ──▶ Postgres
 clarkedstrategygroup.com                       api.clarkedstrategygroup.com    (Railway plugin)
                                             │
                                             ├─ Resend   (contact emails)
                                             ├─ Stripe   (checkout/payments)
                                             └─ Anthropic (AI endpoint)
```

Every backend integration is **optional and env-driven** — email, payments, and AI stay dormant until you add the matching API keys, so the service boots and works with zero third-party setup.

---

## Local development

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv
# Windows:  .venv\Scripts\activate     macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # optional — sensible defaults work as-is (SQLite)
uvicorn app.main:app --reload --port 8000
```

- API docs: http://localhost:8000/docs
- Health: http://localhost:8000/health
- With no `DATABASE_URL`, it uses a local SQLite file (`clarked.db`) — no Postgres needed.

> Note: local Python 3.14 can't build `psycopg2-binary` (no wheel yet). That's only needed for Postgres/Railway. For local dev on SQLite you can skip it: `pip install -r requirements.txt` on Python 3.12, or install without that one line locally.

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000  (reads .env.local → NEXT_PUBLIC_API_URL)
```

---

## Deployment

### 1. Push to GitHub

From `Clarked-Strategy/`:

```bash
git remote add origin https://github.com/<you>/clarked-strategy.git
git push -u origin main
```

### 2. Backend → Railway

1. **New Project → Deploy from GitHub repo**, pick this repo.
2. Set the service **Root Directory** to `backend`.
3. **Add a Postgres database** (New → Database → PostgreSQL). Railway injects `DATABASE_URL` automatically.
4. Add environment **Variables** (see `backend/.env.example`). At minimum set a strong `JWT_SECRET`:
   ```
   python -c "import secrets; print(secrets.token_urlsafe(48))"
   ```
   Add `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `ANTHROPIC_API_KEY` when you want those features on.
5. Railway builds via Nixpacks and starts `uvicorn app.main:app` (see `backend/railway.json`). Health check: `/health`.
6. Under **Settings → Networking**, generate a domain or add a custom one, e.g. `api.clarkedstrategygroup.com`.

### 3. Frontend → Vercel

1. **Add New → Project**, import this repo.
2. Set **Root Directory** to `frontend`.
3. Add env var **`NEXT_PUBLIC_API_URL`** = your Railway backend URL (e.g. `https://api.clarkedstrategygroup.com`).
4. Deploy. Vercel auto-detects Next.js.

### 4. Domain: clarkedstrategygroup.com

- **Vercel** (frontend): Project → Settings → Domains → add `clarkedstrategygroup.com` and `www.clarkedstrategygroup.com`. Vercel shows the exact DNS records (A / CNAME) to set at your registrar.
- **Railway** (backend, optional subdomain): Service → Settings → Networking → Custom Domain → `api.clarkedstrategygroup.com`, then add the CNAME Railway gives you.
- After DNS propagates, update Vercel's `NEXT_PUBLIC_API_URL` and the backend's `CORS_ORIGINS` to the final domains.

---

## Backend API

| Method | Path                | Auth | Purpose |
|--------|---------------------|------|---------|
| GET    | `/health`           | —    | Liveness + which integrations are configured |
| POST   | `/contact`          | —    | Submit the contact form → stores + emails you |
| POST   | `/auth/register`    | —    | Create an account, returns a JWT |
| POST   | `/auth/login`       | —    | Log in (OAuth2 password form), returns a JWT |
| GET    | `/auth/me`          | JWT  | Current user |
| POST   | `/payments/checkout`| —    | Create a Stripe Checkout session (503 until configured) |
| POST   | `/payments/webhook` | —    | Stripe webhook receiver |
| POST   | `/ai`               | JWT  | Claude-powered generation (503 until configured) |

Interactive docs at `/docs` once running.

---

## Turning on each integration

| Feature   | Set these env vars on Railway | Get keys from |
|-----------|-------------------------------|---------------|
| Email     | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified sender) | https://resend.com |
| Payments  | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | https://dashboard.stripe.com |
| AI        | `ANTHROPIC_API_KEY` | https://console.anthropic.com |

Until set, the contact form still records submissions, and the payments/AI routes return a clear `503` instead of erroring.
