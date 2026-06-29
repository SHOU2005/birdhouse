import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/FloatingActions";

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
