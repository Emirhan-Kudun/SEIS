export type FinopsBudget = {
  id: string;
  scope: string;
  monthlyBudget: string;
  currentSpend: string;
  status: "healthy" | "watch" | "over";
  owner: string;
  action: string;
};

export type CostOptimization = {
  id: string;
  title: string;
  impact: "high" | "medium" | "low";
  status: "planned" | "active" | "done";
  area: string;
};

const finopsBudgets: FinopsBudget[] = [
  {
    id: "finops-hosting-core",
    scope: "Core hosting + runtime",
    monthlyBudget: "$480",
    currentSpend: "$392",
    status: "healthy",
    owner: "infra-ops",
    action: "Maintain current cache strategy and preview retention rules."
  },
  {
    id: "finops-observability",
    scope: "Observability and monitoring",
    monthlyBudget: "$220",
    currentSpend: "$206",
    status: "watch",
    owner: "ops",
    action: "Trim noisy signal events and keep high-value alert subsets only."
  },
  {
    id: "finops-media-delivery",
    scope: "Media and asset delivery",
    monthlyBudget: "$140",
    currentSpend: "$149",
    status: "over",
    owner: "frontend-ops",
    action: "Increase responsive image compression and stale asset pruning."
  },
  {
    id: "finops-ai-connectors",
    scope: "AI connector usage",
    monthlyBudget: "$260",
    currentSpend: "$232",
    status: "watch",
    owner: "ai-ops",
    action: "Route low-priority tasks to cheaper models during off-peak windows."
  }
];

const costOptimizations: CostOptimization[] = [
  {
    id: "cost-opt-cache-tiers",
    title: "Introduce tiered response caching for low-volatility APIs",
    impact: "high",
    status: "active",
    area: "api"
  },
  {
    id: "cost-opt-image-audit",
    title: "Run media optimization and duplicate asset elimination sweep",
    impact: "medium",
    status: "planned",
    area: "assets"
  },
  {
    id: "cost-opt-telemetry-throttle",
    title: "Throttle non-critical telemetry frequency",
    impact: "medium",
    status: "planned",
    area: "observability"
  },
  {
    id: "cost-opt-preview-prune",
    title: "Auto-prune stale preview environments",
    impact: "low",
    status: "done",
    area: "deployment"
  }
];

export function getFinopsBudgets(): FinopsBudget[] {
  return finopsBudgets;
}

export function getCostOptimizations(): CostOptimization[] {
  return costOptimizations;
}

export function getFinopsSummary() {
  return {
    totalBudgets: finopsBudgets.length,
    healthyBudgets: finopsBudgets.filter((item) => item.status === "healthy").length,
    watchBudgets: finopsBudgets.filter((item) => item.status === "watch").length,
    overBudgets: finopsBudgets.filter((item) => item.status === "over").length,
    optimizations: costOptimizations.length,
    activeOptimizations: costOptimizations.filter((item) => item.status === "active").length,
    plannedOptimizations: costOptimizations.filter((item) => item.status === "planned").length
  };
}
