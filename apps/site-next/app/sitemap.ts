import type { MetadataRoute } from "next";

import { caseStudies, siteMeta, works } from "@seis/content";

const staticRoutes = [
  "",
  "/portfolio",
  "/drawings",
  "/case-studies",
  "/contact"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteMeta.domain.replace(/\/$/, "");
  const routes = [
    ...staticRoutes,
    ...works.map((work) => `/portfolio/${work.id}`),
    ...caseStudies.map((study) => `/case-studies/${study.slug}`)
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.72
  }));
}
