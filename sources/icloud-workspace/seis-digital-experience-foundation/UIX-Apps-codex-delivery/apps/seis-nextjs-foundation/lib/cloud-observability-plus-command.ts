export type CloudObservabilityPlusSignal = {
  id: string;
  lane: "traces" | "logs" | "alerts" | "slo" | "incident";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  action: string;
};

export type CloudObservabilityPlusTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudObservabilityPlusSignals: CloudObservabilityPlusSignal[] = [
  {
    id: "cloud-observability-trace-link",
    lane: "traces",
    title: "Trace-to-release linkage",
    status: "watch",
    detail: "Core traces exist, but release IDs are not consistently propagated across all async processing paths.",
    action: "Enforce release and trace correlation IDs in every async edge."
  },
  {
    id: "cloud-observability-log-fidelity",
    lane: "logs",
    title: "Structured log fidelity",
    status: "healthy",
    detail: "Structured logs are standardized in primary services with predictable severity and ownership fields.",
    action: "Expand structured logging conventions to secondary utilities."
  },
  {
    id: "cloud-observability-alert-noise",
    lane: "alerts",
    title: "Alert noise pressure",
    status: "critical",
    detail: "Alert channels contain repeated low-signal notifications that reduce on-call focus during incidents.",
    action: "Apply alert dedupe and severity threshold policies for non-critical noise."
  },
  {
    id: "cloud-observability-slo-window",
    lane: "slo",
    title: "SLO burn-rate visibility",
    status: "watch",
    detail: "SLOs are defined, but burn-rate timeline visibility is incomplete in command dashboards.",
    action: "Expose burn-rate and breach prediction widgets in observability workflows."
  },
  {
    id: "cloud-observability-incident-timeline",
    lane: "incident",
    title: "Incident timeline coherence",
    status: "watch",
    detail: "Incident timelines are captured, but postmortem links and mitigation checkpoints are not always attached.",
    action: "Require timeline-to-postmortem linkage before incident closure."
  }
];

const cloudObservabilityPlusTasks: CloudObservabilityPlusTask[] = [
  {
    id: "cloud-observability-task-correlation",
    title: "Propagate release and trace correlation IDs across async paths",
    owner: "observability",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-observability-task-alert-dedupe",
    title: "Implement alert dedupe and severity thresholds",
    owner: "incident-ops",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-observability-task-slo-burn",
    title: "Add SLO burn-rate visualization to command dashboards",
    owner: "sre",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-observability-task-postmortem-link",
    title: "Require postmortem linkage for incident closure",
    owner: "reliability",
    status: "planned",
    priority: "p2"
  }
];

export function getCloudObservabilityPlusSignals(): CloudObservabilityPlusSignal[] {
  return cloudObservabilityPlusSignals;
}

export function getCloudObservabilityPlusTasks(): CloudObservabilityPlusTask[] {
  return cloudObservabilityPlusTasks;
}

export function getCloudObservabilityPlusSummary() {
  return {
    totalSignals: cloudObservabilityPlusSignals.length,
    healthySignals: cloudObservabilityPlusSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudObservabilityPlusSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudObservabilityPlusSignals.filter((item) => item.status === "critical").length,
    tasks: cloudObservabilityPlusTasks.length,
    activeTasks: cloudObservabilityPlusTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudObservabilityPlusTasks.filter((item) => item.status === "planned").length
  };
}
