export type ObservabilitySignal = {
  id: string;
  surface: "logs" | "metrics" | "traces" | "alerts";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
};

export type ObservabilityTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const observabilitySignals: ObservabilitySignal[] = [
  {
    id: "obs-structured-logs",
    surface: "logs",
    title: "Structured log consistency",
    status: "watch",
    detail: "Signal APIs expose rich data but log schema harmonization is partial.",
    owner: "platform-observability"
  },
  {
    id: "obs-dashboard-latency",
    surface: "metrics",
    title: "Dashboard metric latency",
    status: "critical",
    detail: "Cross-endpoint fetch fanout can delay real-time operational confidence.",
    owner: "backend-ops"
  },
  {
    id: "obs-trace-coverage",
    surface: "traces",
    title: "Trace coverage across command APIs",
    status: "watch",
    detail: "Trace IDs are not yet uniformly attached to all orchestration responses.",
    owner: "sre"
  },
  {
    id: "obs-alert-discipline",
    surface: "alerts",
    title: "Alert severity discipline",
    status: "healthy",
    detail: "Critical vs watch semantics are consistent across most command modules.",
    owner: "incident-ops"
  }
];

const observabilityTasks: ObservabilityTask[] = [
  {
    id: "obs-task-schema",
    title: "Define shared observability schema for command APIs",
    status: "active",
    owner: "platform-observability"
  },
  {
    id: "obs-task-cache",
    title: "Add response caching strategy for heavy aggregate endpoints",
    status: "planned",
    owner: "backend-ops"
  },
  {
    id: "obs-task-trace",
    title: "Attach trace correlation IDs in readiness responses",
    status: "planned",
    owner: "sre"
  },
  {
    id: "obs-task-alert-map",
    title: "Publish alert routing and escalation map",
    status: "planned",
    owner: "incident-ops"
  }
];

export function getObservabilitySignals(): ObservabilitySignal[] {
  return observabilitySignals;
}

export function getObservabilityTasks(): ObservabilityTask[] {
  return observabilityTasks;
}

export function getObservabilitySummary() {
  return {
    totalSignals: observabilitySignals.length,
    healthySignals: observabilitySignals.filter((item) => item.status === "healthy").length,
    watchSignals: observabilitySignals.filter((item) => item.status === "watch").length,
    criticalSignals: observabilitySignals.filter((item) => item.status === "critical").length,
    tasks: observabilityTasks.length,
    activeTasks: observabilityTasks.filter((item) => item.status === "active").length,
    plannedTasks: observabilityTasks.filter((item) => item.status === "planned").length
  };
}
