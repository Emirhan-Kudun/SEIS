export type CloudSignal = {
  id: string;
  lane: "runtime" | "security" | "delivery" | "resilience" | "observability";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudSignals: CloudSignal[] = [
  {
    id: "cloud-runtime-parity",
    lane: "runtime",
    title: "Runtime parity across preview and production",
    status: "watch",
    detail: "Runtime versions are stable but not all feature labs are validated in preview snapshots.",
    nextAction: "Attach runtime parity checklist to each major capability wave."
  },
  {
    id: "cloud-secret-governance",
    lane: "security",
    title: "Cloud secret governance",
    status: "critical",
    detail: "Secret rotation policy exists but monthly rotation evidence is incomplete.",
    nextAction: "Enforce rotating credentials and recording evidence in ops ledger."
  },
  {
    id: "cloud-delivery-gating",
    lane: "delivery",
    title: "Cloud delivery gate strictness",
    status: "watch",
    detail: "Release gates exist but high-risk waves need stricter automated blocking.",
    nextAction: "Block cloud promotion when critical command signals are open."
  },
  {
    id: "cloud-resilience-drills",
    lane: "resilience",
    title: "Resilience drill cadence",
    status: "watch",
    detail: "Rollback strategy is documented but multi-region failover drills are infrequent.",
    nextAction: "Run scheduled failover + rollback drills for every sprint milestone."
  },
  {
    id: "cloud-observability-lineage",
    lane: "observability",
    title: "Telemetry lineage continuity",
    status: "healthy",
    detail: "Core telemetry and incident surfaces are connected to orchestration health.",
    nextAction: "Keep trace IDs and release IDs linked in deployment notes."
  }
];

const cloudTasks: CloudTask[] = [
  {
    id: "cloud-task-baseline-map",
    title: "Publish cloud environment baseline map",
    owner: "cloud-ops",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-task-secret-rotation",
    title: "Automate secret rotation evidence checks",
    owner: "security",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-task-release-guard",
    title: "Enforce release guardrails for critical command states",
    owner: "release-ops",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-task-failover-drill",
    title: "Schedule recurring failover simulation drills",
    owner: "incident-ops",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-task-trace-linkage",
    title: "Standardize trace and release ID linkage",
    owner: "observability",
    status: "planned",
    priority: "p3"
  }
];

export function getCloudSignals(): CloudSignal[] {
  return cloudSignals;
}

export function getCloudTasks(): CloudTask[] {
  return cloudTasks;
}

export function getCloudSummary() {
  return {
    totalSignals: cloudSignals.length,
    healthySignals: cloudSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudSignals.filter((item) => item.status === "critical").length,
    tasks: cloudTasks.length,
    activeTasks: cloudTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudTasks.filter((item) => item.status === "planned").length
  };
}
