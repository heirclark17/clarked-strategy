# Clarked Strategy — marketing studio website

The public site for **Clarked Strategy** (`clarkedstrategygroup.com`), a marketing
strategy studio. Its job: convince a prospect this studio is more capable than any
competitor, then convert them into a completed **Client Discovery Session** — the
multi-step intake form at `/discovery`.

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first tokens) + a small custom design system
- **Motion:** Framer Motion (scroll reveals, kinetic hero, animated counters) — all
  wrapped in a `prefers-reduced-motion` guard
- **Form:** React Hook Form + Zod (one schema drives client + server validation)
- **Icons:** Lucide · **Fonts:** Bricolage Grotesque (display) + Inter (body) via `next/font`

> ⚠️ This is **Next.js 16.2.10**, which has breaking changes vs. older versions.
> See `AGENTS.md` — consult `node_modules/next/dist/docs/` before changing framework APIs.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (next core-web-vitals + typescript)
```

`npm ci` is kept in sync with `package.json` (used by Vercel).

---

## Where things live

```
src/
├── app/
│   ├── layout.tsx          # fonts (next/font) + site metadata
│   ├── globals.css         # ← ALL design tokens (colors, type scale, motion)
│   ├── page.tsx            # home page — composes the sections below
│   ├── discovery/page.tsx  # the intake form (focused, distraction-reduced)
│   └── thank-you/page.tsx  # post-submit confirmation
├── content/site.ts         # ← ALL marketing copy (single source of truth)
├── lib/
│   ├── discovery-schema.ts # ← the Zod schema + form field/option config
│   └── api.ts              # backend client (submitDiscovery / submitContact)
├── components/
│   ├── ui/                 # Button, Card, Container, SectionHeading, Reveal, Stat, AnimatedCounter
│   ├── sections/           # Hero, TrustBar, Stats, Services, Work, Process, About, Testimonials, FinalCta
│   ├── form/fields.tsx     # accessible field primitives (TextField, SelectField, ChipMultiSelect, …)
│   ├── discovery/DiscoveryForm.tsx  # the 6-step wizard
│   └── Header.tsx, Footer.tsx
```

---

## Editing content

**All copy is in `src/content/site.ts`.** Headlines, services, case studies,
process, testimonials, footer, contact email — edit there, nothing else.

Placeholders that need real data are marked with `TODO:` in `site.ts`:

- `work.caseStudies` — replace the three sample case studies (client, metrics, copy)
  and swap the gradient panels in `components/sections/Work.tsx` for real images.
- `testimonials.quotes` — replace with real quotes + attribution.
- `trust.signals` — replace with real client/partner logos when available.
- `about` — the right-hand panel in `components/sections/About.tsx` is a typographic
  placeholder for a founder/studio photo.

---

## Rebranding: colors & fonts

**Signature color and full palette** live in `src/app/globals.css` under `@theme`.
The brand "memory color" is `--color-primary` (electric indigo `#4F2FF0`). Change the
hex values there and the whole site follows — every `bg-primary` / `text-accent` /
gradient references these tokens. (Contrast note: coral `--color-accent` is for large
display / accents only, never small body text.)

**Fonts** are swapped in one place — `src/app/layout.tsx`. Replace the `next/font`
loaders (e.g. `Bricolage_Grotesque` → your display face, `Inter` → your body face).
The CSS variable names (`--font-display`, `--font-body`, `--font-mono`) stay the same,
so nothing else needs to change.

---

## The Discovery Session form

- **One schema, two checkpoints:** `src/lib/discovery-schema.ts` is the single Zod
  source of truth. It is mirrored by the backend Pydantic model (`DiscoveryCreate`)
  for server-side re-validation. Field names match across both.
- **UX:** 6 steps, validate-on-blur, errors clear on change, per-step gate before
  advancing, focus moves to the first invalid field, top-of-step error summary with
  jump-links, progressive "Looks good" affirmations, a honeypot + consent checkbox.
  Input is preserved across Back/forward (in memory — no localStorage).
- **Submission** posts to the backend `POST /discovery` via `submitDiscovery()` in
  `src/lib/api.ts`. On success it routes to `/thank-you`.

### Connecting the backend / email / CRM

`src/lib/api.ts` targets `NEXT_PUBLIC_API_URL` (falling back to the live Railway
backend). Set it in Vercel project settings, or in `.env.local` for local dev
(e.g. `NEXT_PUBLIC_API_URL=http://localhost:8000`).

The backend (`../backend`) already persists every submission to a
`discovery_sessions` table (structured columns + a `details` JSON blob). To also
**email** each lead:

1. On Railway, set `RESEND_API_KEY` (and verify a sender for `CONTACT_FROM_EMAIL`).
2. Point `CONTACT_TO_EMAIL` at the studio inbox (currently defaults to the owner's
   personal address). Notifications go there.

Submissions are stored even when email is off. To forward to a CRM instead, extend
`backend/app/routers/discovery.py` (persist-then-notify pattern).

---

## Accessibility & performance

- WCAG-minded: real `<label>`s, `aria-invalid`/`aria-describedby`, an `aria-live`
  step announcer, a role="alert" error summary, visible focus rings, ≥44px targets,
  a skip link, and `prefers-reduced-motion` support (all non-essential motion off).
- Fast: `next/font` (no layout shift), mostly server components, motion isolated to
  small client components, all routes prerender static.

---

## Deploy (Vercel)

Import the repo with **Root Directory = `frontend`**. Optionally set
`NEXT_PUBLIC_API_URL`; the code falls back to the live Railway backend if it's unset.
Connect the domain `clarkedstrategygroup.com` in Vercel once DNS is ready.
