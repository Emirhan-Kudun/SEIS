import type { MetadataRoute } from "next";

import { getStaticCaseSlugs, locales } from "@/lib/content";
import { getStaticWorkSlugs } from "@/lib/creative-content";
import { getStaticInsightSlugs } from "@/lib/insights-content";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const caseEntries = getStaticCaseSlugs().map((item) => ({
    url: absoluteUrl(`/case-studies/${item.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const workEntries = getStaticWorkSlugs().map((item) => ({
    url: absoluteUrl(`/works/${item.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.82
  }));

  const insightEntries = getStaticInsightSlugs().map((item) => ({
    url: absoluteUrl(`/insights/${item.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.79
  }));

  const localizedHomeEntries = locales.map((lang) => ({
    url: absoluteUrl(`/?lang=${lang}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/case-studies"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: absoluteUrl("/studio"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/automation"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.78
    },
    {
      url: absoluteUrl("/playbooks"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.77
    },
    {
      url: absoluteUrl("/control"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.79
    },
    {
      url: absoluteUrl("/ops"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.78
    },
    {
      url: absoluteUrl("/governance"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.76
    },
    {
      url: absoluteUrl("/bench"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.76
    },
    {
      url: absoluteUrl("/strategy"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: absoluteUrl("/release-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75
    },
    {
      url: absoluteUrl("/risk"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.74
    },
    {
      url: absoluteUrl("/quality-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.74
    },
    {
      url: absoluteUrl("/provider-hub"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.73
    },
    {
      url: absoluteUrl("/growth-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.73
    },
    {
      url: absoluteUrl("/experience-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.73
    },
    {
      url: absoluteUrl("/orchestration"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.74
    },
    {
      url: absoluteUrl("/incident-center"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.73
    },
    {
      url: absoluteUrl("/dependency-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72
    },
    {
      url: absoluteUrl("/execution-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.73
    },
    {
      url: absoluteUrl("/seo-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72
    },
    {
      url: absoluteUrl("/sre-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72
    },
    {
      url: absoluteUrl("/compliance-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.71
    },
    {
      url: absoluteUrl("/capacity-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.71
    },
    {
      url: absoluteUrl("/research-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.71
    },
    {
      url: absoluteUrl("/automation-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.71
    },
    {
      url: absoluteUrl("/finops-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/localization-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/security-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/accessibility-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/experiment-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/collaboration-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/performance-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/content-ops-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/ai-governance-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/growth-analytics-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/worktree-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/design-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/observability-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/product-ops-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/monetization-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/knowledge-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/merge-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/rollback-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/connector-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/agent-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/deployment-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/testing-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/cloud-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/cloud-cost-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/handoff-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/skills-lab"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/works"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.86
    },
    {
      url: absoluteUrl("/insights"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.84
    },
    {
      url: absoluteUrl("/insights/rss.xml"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.55
    },
    {
      url: absoluteUrl("/insights/feed.json"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.55
    },
    ...localizedHomeEntries,
    ...caseEntries,
    ...workEntries,
    ...insightEntries
  ];
}
