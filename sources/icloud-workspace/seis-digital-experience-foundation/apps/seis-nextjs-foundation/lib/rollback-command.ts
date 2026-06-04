export type RollbackSignal = {
  id: string;
  surface: "code" | "config" | "content" | "release";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
};

export type RollbackTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const rollbackSignals: RollbackSignal[] = [
  {
    id: "rollback-code-checkpoints",
    surface: "code",
    title: "Code checkpoint granularity",
    status: "watch",
    detail: "Large feature bundles are reversible but checkpoint density should increase.",
    owner: "release-ops"
  },
  {
    id: "rollback-config-diff",
    surface: "config",
    title: "Config rollback traceability",
    status: "healthy",
    detail: "No high-risk config drift detected in current command expansion.",
    owner: "platform"
  },
  {
    id: "rollback-content-sync",
    surface: "content",
    title: "Content rollback parity",
    status: "watch",
    detail: "Docs and route capability notes can lag behind feature additions.",
    owner: "content-ops"
  },
  {
    id: "rollback-release-gates",
    surface: "release",
    title: "Release rollback drill cadence",
    status: "critical",
    detail: "Rollback drills are defined but should run more frequently for mega waves.",
    owner: "incident-ops"
  }
];

const rollbackTasks: RollbackTask[] = [
  {
    id: "rollback-task-checkpoints",
    title: "Attach checkpoint IDs to every mega feature commit",
    status: "active",
    owner: "release-ops"
  },
  {
    id: "rollback-task-sim",
    title: "Run monthly rollback simulation in staging",
    status: "planned",
    owner: "incident-ops"
  },
  {
    id: "rollback-task-doc-sync",
    title: "Sync docs with rollback map per route family",
    status: "planned",
    owner: "content-ops"
  },
  {
    id: "rollback-task-gate",
    title: "Block release when rollback plan coverage is incomplete",
    status: "planned",
    owner: "quality"
  }
];

export function getRollbackSignals(): RollbackSignal[] {
  return rollbackSignals;
}

export function getRollbackTasks(): RollbackTask[] {
  return rollbackTasks;
}

export function getRollbackSummary() {
  return {
    totalSignals: rollbackSignals.length,
    healthySignals: rollbackSignals.filter((item) => item.status === "healthy").length,
    watchSignals: rollbackSignals.filter((item) => item.status === "watch").length,
    criticalSignals: rollbackSignals.filter((item) => item.status === "critical").length,
    tasks: rollbackTasks.length,
    activeTasks: rollbackTasks.filter((item) => item.status === "active").length,
    plannedTasks: rollbackTasks.filter((item) => item.status === "planned").length
  };
}
