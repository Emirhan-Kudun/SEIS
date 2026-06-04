import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Mono, DM_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { siteMeta } from "@seis/content";

import { StructuredData } from "../components/structured-data";
import { buildLocaleAlternates, withLocalePath } from "../lib/locale-paths";
import { resolveRequestLocale } from "../lib/request-locale";

import "./globals.css";

const defaultSocialImage = new URL("/drawings/renk-11.jpg", siteMeta.domain).toString();

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"]
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"]
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.domain),
  title: {
    default: siteMeta.title,
    template: "%s | Emirhan Kudun"
  },
  description: siteMeta.description,
  authors: [{ name: siteMeta.author }],
  creator: siteMeta.author,
  publisher: siteMeta.author,
  manifest: "/manifest.webmanifest",
  applicationName: "SEIS Portfolio",
  appleWebApp: {
    capable: true,
    title: "SEIS Portfolio",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false
  },
  keywords: [
    "Emirhan Kudun",
    "UI UX",
    "Behance portfolio",
    "AI-native UI/UX lab",
    "SaaS landing page design",
    "mobile app UI design",
    "dashboard UI design",
    "drawing portfolio",
    "cinematic web",
    "brand design",
    "creative technology"
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    type: "website",
    url: siteMeta.domain,
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: "Emirhan Kudun Portfolio",
    images: [
      {
        url: defaultSocialImage,
        alt: "Emirhan Kudun portfolio drawing preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [defaultSocialImage]
  },
  alternates: {
    canonical: withLocalePath("tr", "/"),
    languages: buildLocaleAlternates("/")
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#d6b16f",
  colorScheme: "dark"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await resolveRequestLocale();

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
