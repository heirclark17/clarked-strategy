import type { NextConfig } from "next";
import path from "node:path";

// Pin the workspace root to this app so Next doesn't pick up an unrelated
// parent lockfile (silences the "inferred workspace root" warning locally).
// On Vercel, rootDirectory=frontend already makes this app the root, and
// setting outputFileTracingRoot there breaks the file-trace step
// (ENOENT .next/package.json → failed deploy) — so apply it only off-Vercel.
const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: path.resolve(__dirname) }),
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
