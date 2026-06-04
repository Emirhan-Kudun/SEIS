export type AutomationPipeline = {
  id: string;
  name: string;
  trigger: string;
  owner: string;
  status: "healthy" | "watch" | "blocked";
  throughput: string;
  note: string;
};

export type AutomationQueue = {
  id: string;
  queue: string;
  backlog: string;
  sla: string;
  status: "stable" | "warning" | "critical";
  action: string;
};

const automationPipelines: AutomationPipeline[] = [
  {
    id: "pipeline-content-sync",
    name: "Content Snapshot Sync",
    trigger: "content change",
    owner: "content-ops",
    status: "healthy",
    throughput: "~42 syncs/day",
    note: "Snapshot generation remains stable under multi-route updates."
  },
  {
    id: "pipeline-release-readiness",
    name: "Release Readiness Assembly",
    trigger: "ops update",
    owner: "release-ops",
    status: "watch",
    throughput: "~18 score runs/day",
    note: "Gate count growth increased aggregation pressure."
  },
  {
    id: "pipeline-signal-fanout",
    name: "Live Signal Fanout",
    trigger: "telemetry poll",
    owner: "platform-ops",
    status: "watch",
    throughput: "~120 fanout events/hour",
    note: "Parallel dashboards can spike fanout overlap on heavy sessions."
  },
  {
    id: "pipeline-i18n-regression",
    name: "Localization Regression Sweep",
    trigger: "weekly schedule",
    owner: "localization-ops",
    status: "blocked",
    throughput: "paused",
    note: "Full TR/EN/FR/IT/DE parity audit automation is not fully wired yet."
  }
];

const automationQueues: AutomationQueue[] = [
  {
    id: "queue-playbook-ops",
    queue: "Playbook execution queue",
    backlog: "11 item",
    sla: "24h",
    status: "stable",
    action: "Keep current batch cadence."
  },
  {
    id: "queue-governance-checks",
    queue: "Governance check queue",
    backlog: "7 item",
    sla: "8h",
    status: "warning",
    action: "Split large checks into smaller reversible bundles."
  },
  {
    id: "queue-connector-health",
    queue: "Connector health queue",
    backlog: "4 item",
    sla: "12h",
    status: "stable",
    action: "Continue weekly environment validation."
  }
];

export function getAutomationPipelines(): AutomationPipeline[] {
  return automationPipelines;
}

export function getAutomationQueues(): AutomationQueue[] {
  return automationQueues;
}

export function getAutomationSummary() {
  return {
    totalPipelines: automationPipelines.length,
    healthyPipelines: automationPipelines.filter((item) => item.status === "healthy").length,
    watchPipelines: automationPipelines.filter((item) => item.status === "watch").length,
    blockedPipelines: automationPipelines.filter((item) => item.status === "blocked").length,
    queues: automationQueues.length,
    warningQueues: automationQueues.filter((item) => item.status === "warning").length,
    criticalQueues: automationQueues.filter((item) => item.status === "critical").length
  };
}
