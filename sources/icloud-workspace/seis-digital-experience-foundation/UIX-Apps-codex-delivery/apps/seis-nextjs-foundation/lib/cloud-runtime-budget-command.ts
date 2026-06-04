export type CloudRuntimeBudgetSignal = {
  id: string;
  area: "latency" | "compute" | "egress" | "efficiency";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudRuntimeBudgetTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudRuntimeBudgetSignals: CloudRuntimeBudgetSignal[] = [
  {
    id: "cloud-runtime-budget-latency-window",
    area: "latency",
    title: "Latency budget window",
    status: "watch",
    detail: "Latency budgets are tracked, but regression attribution can be delayed for mixed traffic windows.",
    nextAction: "Add release-based latency attribution in runtime budget reports."
  },
  {
    id: "cloud-runtime-budget-compute-spike",
    area: "compute",
    title: "Compute spike control",
    status: "critical",
    detail: "Compute spikes are visible but spike containment actions are not uniformly automated.",
    nextAction: "Introduce automated containment policy for non-critical compute spikes."
  },
  {
    id: "cloud-runtime-budget-egress-governance",
    area: "egress",
    title: "Egress budget governance",
    status: "watch",
    detail: "Egress budgets exist, but service-level accountability is incomplete in some teams.",
    nextAction: "Assign per-service egress budget owners and monthly review cadence."
  },
  {
    id: "cloud-runtime-budget-efficiency-score",
    area: "efficiency",
    title: "Runtime efficiency score",
    status: "healthy",
    detail: "Optimization work improved runtime efficiency baseline in primary paths.",
    nextAction: "Keep efficiency scorecards in pre-merge optimization checklist."
  }
];

const cloudRuntimeBudgetTasks: CloudRuntimeBudgetTask[] = [
  {
    id: "cloud-runtime-budget-task-latency-attribution",
    title: "Add release-based latency attribution",
    owner: "performance",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-runtime-budget-task-spike-containment",
    title: "Automate non-critical spike containment",
    owner: "platform",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-runtime-budget-task-egress-owners",
    title: "Assign egress owners per service",
    owner: "finops",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-runtime-budget-task-efficiency-scorecards",
    title: "Preserve runtime efficiency scorecards",
    owner: "ops",
    status: "planned",
    priority: "p3"
  }
];

export function getCloudRuntimeBudgetSignals(): CloudRuntimeBudgetSignal[] {
  return cloudRuntimeBudgetSignals;
}

export function getCloudRuntimeBudgetTasks(): CloudRuntimeBudgetTask[] {
  return cloudRuntimeBudgetTasks;
}

export function getCloudRuntimeBudgetSummary() {
  return {
    totalSignals: cloudRuntimeBudgetSignals.length,
    healthySignals: cloudRuntimeBudgetSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudRuntimeBudgetSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudRuntimeBudgetSignals.filter((item) => item.status === "critical").length,
    tasks: cloudRuntimeBudgetTasks.length,
    activeTasks: cloudRuntimeBudgetTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudRuntimeBudgetTasks.filter((item) => item.status === "planned").length
  };
}
