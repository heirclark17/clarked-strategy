/**
 * Thin client for the Clarked Strategy backend (FastAPI on Railway).
 *
 * Set NEXT_PUBLIC_API_URL in the environment (Vercel project settings) to your
 * Railway backend URL, e.g. https://clarked-strategy-api.up.railway.app
 * Falls back to localhost for development.
 */

// Production default points at the live Railway backend, so a Vercel deploy
// works even before NEXT_PUBLIC_API_URL is set. Local dev overrides this to
// http://localhost:8000 via .env.local.
const FALLBACK_API_URL = "https://clarked-strategy-production.up.railway.app";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || FALLBACK_API_URL;

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = "Something went wrong. Please try again.";
    try {
      const data = await res.json();
      if (typeof data?.detail === "string") detail = data.detail;
    } catch {
      /* non-JSON error body — keep the default message */
    }
    throw new Error(detail);
  }
}
