export type ResearchSignal = {
  id: string;
  area: string;
  confidence: "high" | "medium" | "low";
  status: "validated" | "exploring" | "blocked";
  insight: string;
  nextAction: string;
};

export type ResearchBacklogItem = {
  id: string;
  title: string;
  owner: string;
  impact: "high" | "medium" | "low";
  status: "planned" | "active" | "done";
};

const researchSignals: ResearchSignal[] = [
  {
    id: "research-signal-pricing-clarity",
    area: "Service pricing clarity",
    confidence: "medium",
    status: "exploring",
    insight: "High-intent users navigate to services but pause before contact submission.",
    nextAction: "Test concise package comparison with stronger outcome framing."
  },
  {
    id: "research-signal-route-depth",
    area: "Deep-route engagement",
    confidence: "high",
    status: "validated",
    insight: "Control/ops users continue toward strategy and release-lab routes.",
    nextAction: "Add guided progression cues for first-time visitors."
  },
  {
    id: "research-signal-mobile-ops",
    area: "Mobile ops readability",
    confidence: "medium",
    status: "exploring",
    insight: "Dense operational cards are usable but cognitively heavy on small screens.",
    nextAction: "Prioritize collapsible sections for mobile-first ops pages."
  },
  {
    id: "research-signal-trust-surface",
    area: "Trust and governance surface",
    confidence: "high",
    status: "validated",
    insight: "Visible risk/governance systems increase perceived reliability for technical buyers.",
    nextAction: "Show concise trust summary on primary conversion paths."
  },
  {
    id: "research-signal-i18n-depth",
    area: "Localization depth",
    confidence: "low",
    status: "blocked",
    insight: "Operational microcopy parity across locales is incomplete in newest modules.",
    nextAction: "Run localized content pass for v5 additions before launch."
  }
];

const researchBacklog: ResearchBacklogItem[] = [
  {
    id: "research-backlog-funnel-interview",
    title: "Interview 5 high-intent visitors on conversion blockers",
    owner: "product-research",
    impact: "high",
    status: "planned"
  },
  {
    id: "research-backlog-mobile-ops-usability",
    title: "Mobile usability pass for operations surfaces",
    owner: "ux-research",
    impact: "high",
    status: "active"
  },
  {
    id: "research-backlog-pricing-microcopy",
    title: "Service pricing microcopy A/B experiment",
    owner: "growth",
    impact: "medium",
    status: "planned"
  },
  {
    id: "research-backlog-i18n-sweep",
    title: "Localization sweep for operational routes",
    owner: "content-ops",
    impact: "high",
    status: "active"
  },
  {
    id: "research-backlog-trust-snapshot",
    title: "Trust snapshot module for homepage systems block",
    owner: "product",
    impact: "medium",
    status: "planned"
  }
];

export function getResearchSignals(): ResearchSignal[] {
  return researchSignals;
}

export function getResearchBacklog(): ResearchBacklogItem[] {
  return researchBacklog;
}

export function getResearchSummary() {
  return {
    totalSignals: researchSignals.length,
    validatedSignals: researchSignals.filter((item) => item.status === "validated").length,
    exploringSignals: researchSignals.filter((item) => item.status === "exploring").length,
    blockedSignals: researchSignals.filter((item) => item.status === "blocked").length,
    backlogItems: researchBacklog.length,
    activeBacklogItems: researchBacklog.filter((item) => item.status === "active").length,
    plannedBacklogItems: researchBacklog.filter((item) => item.status === "planned").length,
    doneBacklogItems: researchBacklog.filter((item) => item.status === "done").length
  };
}
