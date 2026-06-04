export type CloudSecuritySignal = {
  id: string;
  area: "identity" | "secrets" | "network" | "supplychain";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  action: string;
};

export type CloudSecurityTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudSecuritySignals: CloudSecuritySignal[] = [
  {
    id: "cloud-security-identity-boundary",
    area: "identity",
    title: "IAM boundary hardening",
    status: "watch",
    detail: "Service identities are mostly scoped, but temporary role exceptions still occur during peak delivery windows.",
    action: "Require expiring elevated roles and add weekly IAM exception audit."
  },
  {
    id: "cloud-security-secrets-evidence",
    area: "secrets",
    title: "Secret rotation evidence continuity",
    status: "critical",
    detail: "Rotation policy is defined, yet evidence snapshots are not consistently attached to sprint close packages.",
    action: "Block promotion when secret rotation evidence is missing in release notes."
  },
  {
    id: "cloud-security-network-policy",
    area: "network",
    title: "Network policy drift",
    status: "watch",
    detail: "Ingress policies are stable for core services, but staging exceptions are not regularly reconciled.",
    action: "Add monthly reconciliation for staging-to-production policy parity."
  },
  {
    id: "cloud-security-supplychain-integrity",
    area: "supplychain",
    title: "Supply-chain integrity coverage",
    status: "healthy",
    detail: "Artifact signing and dependency provenance checks are active in the primary delivery stream.",
    action: "Extend provenance checks to every optional build variant."
  }
];

const cloudSecurityTasks: CloudSecurityTask[] = [
  {
    id: "cloud-security-task-iam-expiry",
    title: "Enforce expiring elevated IAM roles",
    owner: "security-ops",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-security-task-evidence-gate",
    title: "Add release gate for secret rotation evidence",
    owner: "release-ops",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-security-task-network-reconcile",
    title: "Schedule monthly network policy reconciliation",
    owner: "platform",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-security-task-provenance",
    title: "Expand provenance checks to optional build tracks",
    owner: "sre",
    status: "planned",
    priority: "p3"
  }
];

export function getCloudSecuritySignals(): CloudSecuritySignal[] {
  return cloudSecuritySignals;
}

export function getCloudSecurityTasks(): CloudSecurityTask[] {
  return cloudSecurityTasks;
}

export function getCloudSecuritySummary() {
  return {
    totalSignals: cloudSecuritySignals.length,
    healthySignals: cloudSecuritySignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudSecuritySignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudSecuritySignals.filter((item) => item.status === "critical").length,
    tasks: cloudSecurityTasks.length,
    activeTasks: cloudSecurityTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudSecurityTasks.filter((item) => item.status === "planned").length
  };
}
