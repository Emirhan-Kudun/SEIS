export type CloudPlatformGuardSignal = {
  id: string;
  area: "policy" | "drift" | "permissions" | "compliance";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudPlatformGuardTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudPlatformGuardSignals: CloudPlatformGuardSignal[] = [
  {
    id: "cloud-platform-guard-policy-sync",
    area: "policy",
    title: "Policy sync integrity",
    status: "watch",
    detail: "Platform policy definitions are centralized, but environment parity checks are not fully automated.",
    nextAction: "Add weekly policy parity checks across all active environments."
  },
  {
    id: "cloud-platform-guard-config-drift",
    area: "drift",
    title: "Configuration drift pressure",
    status: "critical",
    detail: "Drift detection exists, yet unresolved drift tickets accumulate in shared service layers.",
    nextAction: "Set drift SLA and escalate unresolved platform drift automatically."
  },
  {
    id: "cloud-platform-guard-permission-baseline",
    area: "permissions",
    title: "Permission baseline quality",
    status: "healthy",
    detail: "Baseline permissions are defined with least-privilege defaults in core environments.",
    nextAction: "Apply baseline checks to all new service onboarding workflows."
  },
  {
    id: "cloud-platform-guard-compliance-tagging",
    area: "compliance",
    title: "Compliance evidence tagging",
    status: "watch",
    detail: "Compliance evidence exists but tagging standards are not consistent in cross-team artifacts.",
    nextAction: "Standardize compliance tag schema for platform evidence packs."
  }
];

const cloudPlatformGuardTasks: CloudPlatformGuardTask[] = [
  {
    id: "cloud-platform-guard-task-policy-parity",
    title: "Automate policy parity checks",
    owner: "platform",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-platform-guard-task-drift-sla",
    title: "Enforce SLA for unresolved configuration drift",
    owner: "ops",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-platform-guard-task-baseline-onboarding",
    title: "Attach permission baseline checks to onboarding",
    owner: "security",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-platform-guard-task-compliance-tags",
    title: "Standardize compliance evidence tags",
    owner: "governance",
    status: "planned",
    priority: "p2"
  }
];

export function getCloudPlatformGuardSignals(): CloudPlatformGuardSignal[] {
  return cloudPlatformGuardSignals;
}

export function getCloudPlatformGuardTasks(): CloudPlatformGuardTask[] {
  return cloudPlatformGuardTasks;
}

export function getCloudPlatformGuardSummary() {
  return {
    totalSignals: cloudPlatformGuardSignals.length,
    healthySignals: cloudPlatformGuardSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudPlatformGuardSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudPlatformGuardSignals.filter((item) => item.status === "critical").length,
    tasks: cloudPlatformGuardTasks.length,
    activeTasks: cloudPlatformGuardTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudPlatformGuardTasks.filter((item) => item.status === "planned").length
  };
}
