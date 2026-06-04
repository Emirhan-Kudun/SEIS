import type { MetadataRoute } from "next";

import { locales, siteMeta, works } from "@seis/content";

import { withLocalePath } from "../lib/locale-paths";

const staticRoutes = [
  "",
  "/portfolio",
  "/portfolio-os",
  "/connector-console",
  "/platform-adapters",
  "/cloud-environment",
  "/server-handoff",
  "/security-posture",
  "/studio-crm",
  "/brief-triage",
  "/publishing-console",
  "/case-study-builder",
  "/drawings",
  "/lab",
  "/motion",
  "/motion-presets",
  "/os",
  "/compatibility",
  "/cv",
  "/readiness",
  "/design-system",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteMeta.domain.replace(/\/$/, "");
  const routes = [
    ...staticRoutes,
    ...works.map((work) => `/portfolio/${work.id}`)
  ];

  return locales.flatMap((locale) => routes.map((route) => ({
    url: `${base}${withLocalePath(locale, route || "/")}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.72
  })));
}
