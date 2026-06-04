import type { MetadataRoute } from "next";

import { siteMeta } from "@seis/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.title,
    short_name: "SEIS",
    description: siteMeta.description,
    start_url: "/tr",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#080807",
    theme_color: "#d6b16f",
    categories: ["portfolio", "design", "productivity"],
    lang: "tr",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Portfolio",
        short_name: "Works",
        description: "Open selected portfolio work.",
        url: "/tr/portfolio",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Platformlar",
        short_name: "Platforms",
        description: "Open the platform compatibility matrix.",
        url: "/tr/compatibility",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Iletisim",
        short_name: "Brief",
        description: "Start a project brief.",
        url: "/tr/contact",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
