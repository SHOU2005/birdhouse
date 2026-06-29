import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for VPS deploys (CloudPanel).
  // Produces .next/standalone with server.js + minimal node_modules.
  output: "standalone",
};

export default nextConfig;
