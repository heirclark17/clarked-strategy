/**
 * Thin client for the Clarked Strategy backend (FastAPI on Railway).
 *
 * Set NEXT_PUBLIC_API_URL in the environment (Vercel project settings) to your
 * Railway backend URL, e.g. https://clarked-strategy-api.up.railway.app
 * Falls back to the live Railway backend so a deploy works before the env var
 * is set. For local dev against a local backend, set NEXT_PUBLIC_API_URL in
 * .env.local (e.g. http://localhost:8000).
 */

import type { DiscoveryFormValues } from "@/lib/discovery-schema";

const FALLBACK_API_URL = "https://clarked-strategy-production.up.railway.app";

export const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || FALLBACK_API_URL;

/** POST JSON and throw a human-readable Error on a non-2xx response. */
async function postJson(path: string, payload: unknown): Promise<Response> {
  const res = await fetch(`${API_URL}${path}`, {
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
  return res;
}

/* ---- Contact (generic inquiry) ---------------------------------------- */
export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  await postJson("/contact", payload);
}

/* ---- Discovery Session intake ----------------------------------------- */
// The payload is the validated form values. Field names match the backend
// DiscoveryCreate (Pydantic) schema exactly.
export type DiscoveryPayload = DiscoveryFormValues;

export async function submitDiscovery(payload: DiscoveryPayload): Promise<void> {
  await postJson("/discovery", payload);
}
