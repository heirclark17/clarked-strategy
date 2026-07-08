import type { NextConfig } from "next";
import path from "node:path";

// Pin the workspace root to this app so Next doesn't pick up an unrelated
// parent lockfile (silences the "inferred workspace root" warning locally;
// on Vercel the app is already the root).
const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
