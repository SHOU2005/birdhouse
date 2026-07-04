import type { Metadata } from "next";

// Keep the entire admin area out of search engines.
export const metadata: Metadata = {
  title: "Admin — Birdhouse",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
