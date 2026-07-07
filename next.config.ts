import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for VPS deploys (CloudPanel).
  // Produces .next/standalone with server.js + minimal node_modules.
  output: "standalone",
  images: {
    // Listing photos uploaded via the admin live in Supabase Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // 301s from the previous site's URL structure so existing ranking / indexed
  // keywords carry over to the new pages instead of 404-ing.
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/university-collaboration", destination: "/broker-partnership", permanent: true },
      { source: "/how-to-select-a-perfect-home-in-gurgaon", destination: "/blogs/moving-to-gurgaon-renting-guide", permanent: true },
      { source: "/new-delhi", destination: "/cities/new-delhi", permanent: true },
      { source: "/gurugram", destination: "/cities/gurgaon", permanent: true },
      { source: "/student-housing", destination: "/properties/student-housing", permanent: true },
      { source: "/for-girls", destination: "/properties/girls-hostel", permanent: true },
      { source: "/girls-pg", destination: "/properties/girls-hostel", permanent: true },
      { source: "/for-boys", destination: "/properties/boys-hostel", permanent: true },
      { source: "/coliving-pg", destination: "/properties/co-living", permanent: true },
      { source: "/1rk", destination: "/properties/1rk", permanent: true },
      { source: "/1bhk", destination: "/properties/1bhk", permanent: true },
      { source: "/2bhk", destination: "/properties/2bhk", permanent: true },
      { source: "/3bhk", destination: "/properties/3bhk", permanent: true },
      // Individual legacy PG pages → matching locality landing pages.
      { source: "/white-dove-girls-pg-vijay-nagar", destination: "/pg/girls-pg-in-vijay-nagar-delhi", permanent: true },
      { source: "/c-block-vijay-nagar-girls-pg", destination: "/pg/girls-pg-in-vijay-nagar-delhi", permanent: true },
      { source: "/girls-pg-c-block-vijay-nagar-delhi", destination: "/pg/girls-pg-in-vijay-nagar-delhi", permanent: true },
      { source: "/girls-pg-vijay-nagar-delhi", destination: "/pg/girls-pg-in-vijay-nagar-delhi", permanent: true },
      { source: "/girls-pg-gtb-nagar", destination: "/pg/girls-pg-in-gtb-nagar-delhi", permanent: true },
      { source: "/birdhouse-c-block-girls-pg-vijay-nagar-single-story", destination: "/pg/girls-pg-in-vijay-nagar-delhi", permanent: true },
      { source: "/birdhouse-girls-pg-a-block-vijay-nagar-delhi", destination: "/pg/girls-pg-in-vijay-nagar-delhi", permanent: true },
      { source: "/boys-pg-c-block-vijay-nagar-single-story", destination: "/pg/boys-pg-in-vijay-nagar-delhi", permanent: true },
    ];
  },
};

export default nextConfig;
