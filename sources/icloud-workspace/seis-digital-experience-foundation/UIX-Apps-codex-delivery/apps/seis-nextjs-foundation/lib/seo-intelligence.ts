export type SeoCheck = {
  id: string;
  label: string;
  status: "pass" | "watch" | "fail";
  detail: string;
  owner: string;
};

export type MetadataProfile = {
  id: string;
  surface: string;
  status: "strong" | "watch";
  note: string;
};

const seoChecks: SeoCheck[] = [
  {
    id: "seo-meta-coverage",
    label: "Metadata coverage on operational routes",
    status: "pass",
    detail: "Core intelligence routes define metadata with canonical targets.",
    owner: "seo"
  },
  {
    id: "seo-sitemap-sync",
    label: "Sitemap and route sync",
    status: "pass",
    detail: "New route modules are mapped in sitemap for crawler discoverability.",
    owner: "seo"
  },
  {
    id: "seo-internal-linking",
    label: "Internal linking depth",
    status: "watch",
    detail: "Strong interlinking exists; homepage surfacing can still be increased.",
    owner: "product"
  },
  {
    id: "seo-structured-data",
    label: "Structured data extension",
    status: "watch",
    detail: "Base website JSON-LD is active; route-specific schema can be expanded.",
    owner: "seo"
  },
  {
    id: "seo-performance-signal",
    label: "Performance-aligned SEO signal",
    status: "pass",
    detail: "Quality lab and budget checks help prevent SEO regressions from payload growth.",
    owner: "performance"
  }
];

const metadataProfiles: MetadataProfile[] = [
  {
    id: "meta-core-home",
    surface: "Homepage + portfolio core",
    status: "strong",
    note: "Strong narrative and canonical structure."
  },
  {
    id: "meta-intelligence-routes",
    surface: "Control/Ops/Strategy intelligence routes",
    status: "strong",
    note: "Metadata consistency improved with modular route expansion."
  },
  {
    id: "meta-growth-experience",
    surface: "Growth/Experience/Orchestration routes",
    status: "watch",
    note: "Add richer social preview snippets for these specialized pages."
  }
];

export function getSeoChecks(): SeoCheck[] {
  return seoChecks;
}

export function getMetadataProfiles(): MetadataProfile[] {
  return metadataProfiles;
}

export function getSeoSummary() {
  return {
    totalChecks: seoChecks.length,
    passChecks: seoChecks.filter((item) => item.status === "pass").length,
    watchChecks: seoChecks.filter((item) => item.status === "watch").length,
    failChecks: seoChecks.filter((item) => item.status === "fail").length,
    strongProfiles: metadataProfiles.filter((item) => item.status === "strong").length,
    watchProfiles: metadataProfiles.filter((item) => item.status === "watch").length
  };
}
