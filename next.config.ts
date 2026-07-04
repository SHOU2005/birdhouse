import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for VPS deploys (CloudPanel).
  // Produces .next/standalone with server.js + minimal node_modules.
  output: "standalone",
  images: {
    // Listing photos uploaded via the admin live on Vercel Blob.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
