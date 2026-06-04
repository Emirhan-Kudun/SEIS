export type CloudReleaseTrainSignal = {
  id: string;
  area: "cadence" | "gating" | "handoff" | "readiness";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudReleaseTrainTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudReleaseTrainSignals: CloudReleaseTrainSignal[] = [
  {
    id: "cloud-release-train-cadence-stability",
    area: "cadence",
    title: "Release cadence stability",
    status: "watch",
    detail: "Cadence exists but cloud-critical batches sometimes exceed agreed release windows.",
    nextAction: "Split oversized batches and enforce max batch threshold per wave."
  },
  {
    id: "cloud-release-train-gate-strictness",
    area: "gating",
    title: "Gate strictness for critical waves",
    status: "critical",
    detail: "Critical cloud waves occasionally pass with unresolved warning dependencies.",
    nextAction: "Require zero critical warnings before promotion approval."
  },
  {
    id: "cloud-release-train-handoff-bundle",
    area: "handoff",
    title: "Handoff bundle completeness",
    status: "watch",
    detail: "Handoff notes improve, but rollback linkage is not always attached.",
    nextAction: "Make rollback linkage mandatory in handoff package template."
  },
  {
    id: "cloud-release-train-readiness-score",
    area: "readiness",
    title: "Readiness score continuity",
    status: "healthy",
    detail: "Readiness scorecards are consistently produced for major release candidates.",
    nextAction: "Keep scorecard evidence archived with release notes."
  }
];

const cloudReleaseTrainTasks: CloudReleaseTrainTask[] = [
  {
    id: "cloud-release-train-task-batch-limit",
    title: "Set max batch size for cloud release waves",
    owner: "release-ops",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-release-train-task-zero-critical",
    title: "Block promotion on unresolved critical warnings",
    owner: "platform",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-release-train-task-handoff-template",
    title: "Extend handoff template with rollback linkage",
    owner: "governance",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-release-train-task-scorecard-archive",
    title: "Archive scorecards with release notes",
    owner: "quality",
    status: "planned",
    priority: "p3"
  }
];

export function getCloudReleaseTrainSignals(): CloudReleaseTrainSignal[] {
  return cloudReleaseTrainSignals;
}

export function getCloudReleaseTrainTasks(): CloudReleaseTrainTask[] {
  return cloudReleaseTrainTasks;
}

export function getCloudReleaseTrainSummary() {
  return {
    totalSignals: cloudReleaseTrainSignals.length,
    healthySignals: cloudReleaseTrainSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudReleaseTrainSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudReleaseTrainSignals.filter((item) => item.status === "critical").length,
    tasks: cloudReleaseTrainTasks.length,
    activeTasks: cloudReleaseTrainTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudReleaseTrainTasks.filter((item) => item.status === "planned").length
  };
}
