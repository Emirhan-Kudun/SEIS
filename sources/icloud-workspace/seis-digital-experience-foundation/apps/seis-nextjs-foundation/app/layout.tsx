import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  keywords: [
    "Emirhan Kudun",
    "cinematic portfolio",
    "AI-native creative platform",
    "premium UI engineering",
    "SEIS"
  ],
  creator: "Emirhan Kudun",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      tr: "/?lang=tr",
      en: "/?lang=en",
      fr: "/?lang=fr",
      it: "/?lang=it",
      de: "/?lang=de"
    }
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} cinematic preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.social.x,
    images: [absoluteUrl("/twitter-image")]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-theme="dark" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable} bg-seis-bg font-sans antialiased`}>{children}</body>
    </html>
  );
}
