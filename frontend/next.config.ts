import type { NextConfig } from "next";
import path from "node:path";

// Backend origin the browser posts the forms to (matches lib/api.ts fallback).
const API_ORIGIN = "https://clarked-strategy-production.up.railway.app";

// Content-Security-Policy. 'unsafe-inline' is required for Next's hydration
// scripts + Framer Motion / Tailwind inline styles; the site renders no
// user-generated HTML, so XSS surface is minimal. Tighten with nonces later.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  `connect-src 'self' ${API_ORIGIN}`,
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

// Pin the workspace root to this app so Next doesn't pick up an unrelated
// parent lockfile (silences the "inferred workspace root" warning locally).
// On Vercel, rootDirectory=frontend already makes this app the root, and
// setting outputFileTracingRoot there breaks the file-trace step
// (ENOENT .next/package.json → failed deploy) — so apply it only off-Vercel.
const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: path.resolve(__dirname) }),
  turbopack: { root: path.resolve(__dirname) },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
