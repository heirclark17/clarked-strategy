/**
 * Thin client for the Clarked Strategy backend (FastAPI on Railway).
 *
 * Set NEXT_PUBLIC_API_URL in the environment (Vercel project settings) to your
 * Railway backend URL, e.g. https://clarked-strategy-api.up.railway.app
 * Falls back to localhost for development.
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

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
