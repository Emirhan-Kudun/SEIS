export type CloudDrSignal = {
  id: string;
  area: "rto" | "rpo" | "backup" | "runbook";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudDrTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudDrSignals: CloudDrSignal[] = [
  {
    id: "cloud-dr-rto-proof",
    area: "rto",
    title: "RTO proof freshness",
    status: "watch",
    detail: "RTO targets are declared, but latest timed drills are not available for each environment.",
    nextAction: "Run quarterly timed recovery drills and attach results to DR board."
  },
  {
    id: "cloud-dr-rpo-confidence",
    area: "rpo",
    title: "RPO confidence",
    status: "critical",
    detail: "RPO assumptions exist but replication lag evidence is missing from the latest review cycle.",
    nextAction: "Add replication lag export to DR readiness checks."
  },
  {
    id: "cloud-dr-backup-integrity",
    area: "backup",
    title: "Backup integrity verification",
    status: "healthy",
    detail: "Backup verification jobs run with retention and restore validation controls.",
    nextAction: "Maintain restore-test evidence in monthly audit notes."
  },
  {
    id: "cloud-dr-runbook-parity",
    area: "runbook",
    title: "Runbook parity across teams",
    status: "watch",
    detail: "Runbooks are complete for core services, but edge service ownership tags are inconsistent.",
    nextAction: "Add owner and escalation tags to all DR runbook entries."
  }
];

const cloudDrTasks: CloudDrTask[] = [
  {
    id: "cloud-dr-task-rto-drill",
    title: "Execute timed RTO drills",
    owner: "reliability",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-dr-task-rpo-evidence",
    title: "Add replication lag evidence to DR checks",
    owner: "data-ops",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-dr-task-restore-audit",
    title: "Keep restore verification evidence current",
    owner: "sre",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-dr-task-runbook-owner-tags",
    title: "Add owner tags to edge DR runbooks",
    owner: "ops",
    status: "planned",
    priority: "p3"
  }
];

export function getCloudDrSignals(): CloudDrSignal[] {
  return cloudDrSignals;
}

export function getCloudDrTasks(): CloudDrTask[] {
  return cloudDrTasks;
}

export function getCloudDrSummary() {
  return {
    totalSignals: cloudDrSignals.length,
    healthySignals: cloudDrSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudDrSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudDrSignals.filter((item) => item.status === "critical").length,
    tasks: cloudDrTasks.length,
    activeTasks: cloudDrTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudDrTasks.filter((item) => item.status === "planned").length
  };
}
