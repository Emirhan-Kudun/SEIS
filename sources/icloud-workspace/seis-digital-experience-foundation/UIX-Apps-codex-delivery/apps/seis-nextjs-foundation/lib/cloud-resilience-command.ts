export type CloudResilienceSignal = {
  id: string;
  area: "failover" | "rollback" | "continuity" | "recovery";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudResilienceTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudResilienceSignals: CloudResilienceSignal[] = [
  {
    id: "cloud-resilience-failover-window",
    area: "failover",
    title: "Failover window confidence",
    status: "watch",
    detail: "Failover runbooks exist but timed failover drills are not yet sprint-bound.",
    nextAction: "Run failover drills on a fixed sprint cadence with evidence logging."
  },
  {
    id: "cloud-resilience-rollback-proof",
    area: "rollback",
    title: "Rollback proof depth",
    status: "critical",
    detail: "Rollback paths are documented, but environment-level proof artifacts are inconsistent.",
    nextAction: "Require rollback proof artifacts before release approval."
  },
  {
    id: "cloud-resilience-continuity-map",
    area: "continuity",
    title: "Service continuity mapping",
    status: "healthy",
    detail: "Critical service continuity dependencies are mapped with owner assignments.",
    nextAction: "Keep continuity dependency map synchronized with release changes."
  },
  {
    id: "cloud-resilience-recovery-rto",
    area: "recovery",
    title: "Recovery RTO predictability",
    status: "watch",
    detail: "Recovery objectives are defined, but recent drill telemetry is incomplete.",
    nextAction: "Attach RTO telemetry snapshots to monthly readiness reports."
  }
];

const cloudResilienceTasks: CloudResilienceTask[] = [
  {
    id: "cloud-resilience-task-failover-drills",
    title: "Schedule sprint failover drills",
    owner: "sre",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-resilience-task-rollback-proof",
    title: "Enforce rollback proof artifact gate",
    owner: "release-ops",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-resilience-task-continuity-sync",
    title: "Sync continuity map with release train",
    owner: "platform",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-resilience-task-rto-telemetry",
    title: "Publish monthly RTO telemetry pack",
    owner: "incident-ops",
    status: "planned",
    priority: "p2"
  }
];

export function getCloudResilienceSignals(): CloudResilienceSignal[] {
  return cloudResilienceSignals;
}

export function getCloudResilienceTasks(): CloudResilienceTask[] {
  return cloudResilienceTasks;
}

export function getCloudResilienceSummary() {
  return {
    totalSignals: cloudResilienceSignals.length,
    healthySignals: cloudResilienceSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudResilienceSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudResilienceSignals.filter((item) => item.status === "critical").length,
    tasks: cloudResilienceTasks.length,
    activeTasks: cloudResilienceTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudResilienceTasks.filter((item) => item.status === "planned").length
  };
}
