export type SloMetric = {
  id: string;
  service: string;
  objective: string;
  current: string;
  status: "healthy" | "watch" | "critical";
  note: string;
};

export type ErrorBudgetItem = {
  id: string;
  window: string;
  burnRate: string;
  status: "safe" | "warning" | "exhausted";
  action: string;
};

export type SreRunbook = {
  id: string;
  title: string;
  trigger: string;
  owner: string;
  status: "ready" | "planned";
};

const sloMetrics: SloMetric[] = [
  {
    id: "slo-control-api-latency",
    service: "Control + Search APIs",
    objective: "p95 < 320ms",
    current: "p95 278ms",
    status: "healthy",
    note: "Query expansion remains within expected response profile."
  },
  {
    id: "slo-ops-signal-freshness",
    service: "Ops signal freshness",
    objective: "< 60s stale window",
    current: "~45s",
    status: "healthy",
    note: "Dashboard signal pull cadence stays in target range."
  },
  {
    id: "slo-release-gate-consistency",
    service: "Release gate consistency",
    objective: "0 critical drift",
    current: "1 watch incident in last cycle",
    status: "watch",
    note: "Gate expansion increased reconciliation overhead; monitor closely."
  },
  {
    id: "slo-provider-fallback",
    service: "Provider fallback routing",
    objective: "fallback success > 99%",
    current: "98.6%",
    status: "watch",
    note: "Needs additional drill coverage for long-chain workflows."
  },
  {
    id: "slo-security-header-stability",
    service: "Security header stability",
    objective: "100% route coverage",
    current: "100%",
    status: "healthy",
    note: "Current route inventory passes header profile checks."
  }
];

const errorBudgets: ErrorBudgetItem[] = [
  {
    id: "budget-weekly-api",
    window: "weekly",
    burnRate: "24%",
    status: "safe",
    action: "Continue normal rollout cadence."
  },
  {
    id: "budget-release-sync",
    window: "weekly",
    burnRate: "58%",
    status: "warning",
    action: "Prioritize gate drift fixes before new expansion modules."
  },
  {
    id: "budget-provider-fallback",
    window: "monthly",
    burnRate: "67%",
    status: "warning",
    action: "Increase fallback drill frequency in incident center."
  }
];

const sreRunbooks: SreRunbook[] = [
  {
    id: "runbook-release-desync",
    title: "Release Gate Desynchronization",
    trigger: "Mismatch between readiness and quality score",
    owner: "release-ops",
    status: "ready"
  },
  {
    id: "runbook-provider-fallback",
    title: "Provider Fallback Degradation",
    trigger: "Fallback success below threshold",
    owner: "ai-ops",
    status: "ready"
  },
  {
    id: "runbook-search-regression",
    title: "Control Search Regression",
    trigger: "Search endpoint response anomalies",
    owner: "backend-ops",
    status: "planned"
  },
  {
    id: "runbook-security-headers",
    title: "Security Header Drift",
    trigger: "Header policy scan failures",
    owner: "security-ops",
    status: "ready"
  }
];

export function getSloMetrics(): SloMetric[] {
  return sloMetrics;
}

export function getErrorBudgets(): ErrorBudgetItem[] {
  return errorBudgets;
}

export function getSreRunbooks(): SreRunbook[] {
  return sreRunbooks;
}

export function getSreSummary() {
  return {
    totalSlos: sloMetrics.length,
    healthySlos: sloMetrics.filter((item) => item.status === "healthy").length,
    watchSlos: sloMetrics.filter((item) => item.status === "watch").length,
    criticalSlos: sloMetrics.filter((item) => item.status === "critical").length,
    totalErrorBudgets: errorBudgets.length,
    warningBudgets: errorBudgets.filter((item) => item.status === "warning").length,
    exhaustedBudgets: errorBudgets.filter((item) => item.status === "exhausted").length,
    runbooks: sreRunbooks.length,
    readyRunbooks: sreRunbooks.filter((item) => item.status === "ready").length
  };
}
