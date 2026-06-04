export type ContentOpsSignal = {
  id: string;
  area: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
  nextAction: string;
};

export type ContentOpsTask = {
  id: string;
  title: string;
  lane: "seo" | "i18n" | "editorial" | "conversion";
  status: "planned" | "active" | "done";
};

const contentOpsSignals: ContentOpsSignal[] = [
  {
    id: "contentops-i18n-parity",
    area: "TR/EN/FR/IT/DE parity",
    status: "watch",
    detail: "Newest command modules still have EN-weighted microcopy edges.",
    owner: "content-ops",
    nextAction: "Complete locale parity sweep for command and lab labels."
  },
  {
    id: "contentops-case-story-depth",
    area: "Case study narrative depth",
    status: "healthy",
    detail: "Core portfolio narrative remains structured and conversion-aware.",
    owner: "editorial",
    nextAction: "Expand process sections with measurable outcomes and proof artifacts."
  },
  {
    id: "contentops-seo-cluster",
    area: "SEO topic cluster coverage",
    status: "watch",
    detail: "Operational pages grew faster than long-tail content support.",
    owner: "seo-ops",
    nextAction: "Publish route-specific insight articles for discovery support."
  },
  {
    id: "contentops-cta-consistency",
    area: "CTA consistency",
    status: "critical",
    detail: "Cross-lab CTA tone is strong but still inconsistent in user intent framing.",
    owner: "growth-content",
    nextAction: "Standardize CTA hierarchy for exploration vs conversion contexts."
  }
];

const contentOpsTasks: ContentOpsTask[] = [
  {
    id: "contentops-task-locale-audit",
    title: "Run multilingual command surface audit",
    lane: "i18n",
    status: "active"
  },
  {
    id: "contentops-task-seo-briefs",
    title: "Create SEO brief set for new command labs",
    lane: "seo",
    status: "planned"
  },
  {
    id: "contentops-task-case-proof",
    title: "Add measurable proof blocks into case studies",
    lane: "editorial",
    status: "planned"
  },
  {
    id: "contentops-task-cta-map",
    title: "Define intent-aware CTA map across command routes",
    lane: "conversion",
    status: "planned"
  }
];

export function getContentOpsSignals(): ContentOpsSignal[] {
  return contentOpsSignals;
}

export function getContentOpsTasks(): ContentOpsTask[] {
  return contentOpsTasks;
}

export function getContentOpsSummary() {
  return {
    totalSignals: contentOpsSignals.length,
    healthySignals: contentOpsSignals.filter((item) => item.status === "healthy").length,
    watchSignals: contentOpsSignals.filter((item) => item.status === "watch").length,
    criticalSignals: contentOpsSignals.filter((item) => item.status === "critical").length,
    tasks: contentOpsTasks.length,
    activeTasks: contentOpsTasks.filter((item) => item.status === "active").length,
    plannedTasks: contentOpsTasks.filter((item) => item.status === "planned").length
  };
}
