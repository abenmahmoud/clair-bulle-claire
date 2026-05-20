import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clair-bulle-claire.vercel.app"),
  title: {
    default: "Clair — Clarification sociale",
    template: "%s",
  },
  description:
    "Traduis l'implicite social en langage clair, prudent et utilisable. Pour personnes neuroatypiques, parents, AESH.",
  applicationName: "Clair",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Clair",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://clair-bulle-claire.vercel.app",
    siteName: "Clair",
    title: "Clair — Clarification sociale et cognitive",
    description: "Traduis l'implicite social en langage clair, prudent et utilisable.",
    images: [
      {
        url: "/og/cover.png",
        width: 1200,
        height: 630,
        alt: "Clair — Clarification sociale et cognitive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clair — Clarification sociale",
    description: "Traduis l'implicite social en langage clair, prudent et utilisable.",
    images: ["/og/cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3563E9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#F8F6F0] font-sans">
        {children}
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
