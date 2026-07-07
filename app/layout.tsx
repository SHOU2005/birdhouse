import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getSite } from "@/lib/store/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://birdhouse.co.in"),
  title: {
    default: "Birdhouse — PG, Co-Living & Rentals in Gurgaon & Delhi",
    template: "%s | Birdhouse",
  },
  description:
    "Birdhouse offers premium PGs, hostels, co-living and rental flats (1RK, 1BHK, 2BHK, 3BHK) and co-working spaces across Gurgaon, Delhi, Punjab & Jaipur. No brokerage, modern amenities, community living.",
  icons: {
    icon: "/birdhouse-favicon.png",
    shortcut: "/birdhouse-favicon.png",
    apple: "/birdhouse-favicon.png",
  },
  keywords: [
    "PG in Gurgaon",
    "best pg in north campus Delhi",
    "girls pg in north campus",
    "boys pg in north campus",
    "1bhk flat in gurgaon for rent",
    "co-living gurgaon",
    "student housing delhi",
  ],
  openGraph: {
    title: "Birdhouse — PG, Co-Living & Rentals in Gurgaon & Delhi",
    description:
      "Comfortable, affordable accommodation for students and working professionals. PGs, co-living, rentals & co-working across India.",
    type: "website",
    url: "https://birdhouse.co.in",
    siteName: "Birdhouse",
    locale: "en_IN",
    images: [
      {
        url: "/birdhouse-logo.webp",
        width: 1200,
        height: 630,
        alt: "Birdhouse — PG, Co-Living & Rentals in Gurgaon & Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birdhouse — PG, Co-Living & Rentals in Gurgaon & Delhi",
    description:
      "PGs, hostels, co-living and rental flats across Gurgaon & Delhi. No brokerage, fully furnished, move-in ready.",
    images: ["/birdhouse-logo.webp"],
  },
  alternates: { canonical: "/" },
  // Google Search Console verification. Override with GOOGLE_SITE_VERIFICATION
  // in the environment; falls back to the current verified token.
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ??
      "R91XFRQbjZvNNLwXYSBrvBMw6NTlsVE0NkiayqHq0jM",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Header phone={site.phonePrimary} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions whatsapp={site.whatsapp} />
      </body>
    </html>
  );
}
