export type MonetizationSignal = {
  id: string;
  stream: "pricing" | "conversion" | "billing" | "expansion";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
};

export type MonetizationTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
  priority: "p1" | "p2" | "p3";
};

const monetizationSignals: MonetizationSignal[] = [
  {
    id: "money-pricing-tier-clarity",
    stream: "pricing",
    title: "Pricing tier clarity",
    status: "watch",
    detail: "Service architecture is strong but enterprise differentiation can improve.",
    owner: "growth"
  },
  {
    id: "money-conversion-friction",
    stream: "conversion",
    title: "Conversion friction near contact handoff",
    status: "critical",
    detail: "Service-to-contact intent conversion still has high drop-off risk.",
    owner: "product-growth"
  },
  {
    id: "money-billing-readiness",
    stream: "billing",
    title: "Billing integration readiness",
    status: "watch",
    detail: "Stripe/SaaS billing route is planned but command tracking is not full.",
    owner: "backend"
  },
  {
    id: "money-expansion-potential",
    stream: "expansion",
    title: "Expansion and upsell intelligence",
    status: "healthy",
    detail: "Roadmap includes high-value ops and governance modules for upsell lanes.",
    owner: "revenue-ops"
  }
];

const monetizationTasks: MonetizationTask[] = [
  {
    id: "money-task-pricing-proof",
    title: "Map pricing tiers to explicit ROI proof artifacts",
    status: "active",
    owner: "growth",
    priority: "p1"
  },
  {
    id: "money-task-conversion-test",
    title: "Run service CTA conversion friction tests",
    status: "planned",
    owner: "product-growth",
    priority: "p1"
  },
  {
    id: "money-task-billing-events",
    title: "Define billing lifecycle analytics events",
    status: "planned",
    owner: "backend",
    priority: "p2"
  },
  {
    id: "money-task-expansion-journey",
    title: "Design premium expansion journey for returning leads",
    status: "planned",
    owner: "revenue-ops",
    priority: "p3"
  }
];

export function getMonetizationSignals(): MonetizationSignal[] {
  return monetizationSignals;
}

export function getMonetizationTasks(): MonetizationTask[] {
  return monetizationTasks;
}

export function getMonetizationSummary() {
  return {
    totalSignals: monetizationSignals.length,
    healthySignals: monetizationSignals.filter((item) => item.status === "healthy").length,
    watchSignals: monetizationSignals.filter((item) => item.status === "watch").length,
    criticalSignals: monetizationSignals.filter((item) => item.status === "critical").length,
    tasks: monetizationTasks.length,
    activeTasks: monetizationTasks.filter((item) => item.status === "active").length,
    plannedTasks: monetizationTasks.filter((item) => item.status === "planned").length
  };
}
