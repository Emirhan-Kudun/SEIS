export type CloudCostSignal = {
  id: string;
  area: "spend" | "efficiency" | "forecast" | "finops";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  action: string;
};

export type CloudCostTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudCostSignals: CloudCostSignal[] = [
  {
    id: "cloud-cost-burst",
    area: "spend",
    title: "Traffic burst cost behavior",
    status: "watch",
    detail: "Burst traffic scenarios are modeled but spend limits are not hard-capped in every path.",
    action: "Apply budget ceilings for non-critical workloads in cloud environments."
  },
  {
    id: "cloud-cost-efficiency",
    area: "efficiency",
    title: "Compute efficiency ratio",
    status: "healthy",
    detail: "Payload and runtime optimization work reduced avoidable compute waste.",
    action: "Maintain bundle and runtime budgets in pre-merge checks."
  },
  {
    id: "cloud-cost-forecast",
    area: "forecast",
    title: "Quarterly forecast confidence",
    status: "watch",
    detail: "Forecast coverage exists but growth scenario ranges need tighter confidence bands.",
    action: "Publish scenario ranges with owner-level variance controls."
  },
  {
    id: "cloud-cost-guardrails",
    area: "finops",
    title: "FinOps guardrail enforcement",
    status: "critical",
    detail: "Some high-cost paths lack immediate circuit breaker policy for runaway usage.",
    action: "Define auto-throttle behavior for cost-critical workloads."
  }
];

const cloudCostTasks: CloudCostTask[] = [
  {
    id: "cloud-cost-task-ceiling",
    title: "Define cloud cost ceiling policy per environment",
    owner: "finops",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-cost-task-variance",
    title: "Add forecast variance report to weekly ops review",
    owner: "cloud-ops",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-cost-task-throttle",
    title: "Implement auto-throttle rules for non-critical services",
    owner: "platform",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-cost-task-budget-audit",
    title: "Create monthly budget overrun postmortem template",
    owner: "finance",
    status: "planned",
    priority: "p3"
  }
];

export function getCloudCostSignals(): CloudCostSignal[] {
  return cloudCostSignals;
}

export function getCloudCostTasks(): CloudCostTask[] {
  return cloudCostTasks;
}

export function getCloudCostSummary() {
  return {
    totalSignals: cloudCostSignals.length,
    healthySignals: cloudCostSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudCostSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudCostSignals.filter((item) => item.status === "critical").length,
    tasks: cloudCostTasks.length,
    activeTasks: cloudCostTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudCostTasks.filter((item) => item.status === "planned").length
  };
}
