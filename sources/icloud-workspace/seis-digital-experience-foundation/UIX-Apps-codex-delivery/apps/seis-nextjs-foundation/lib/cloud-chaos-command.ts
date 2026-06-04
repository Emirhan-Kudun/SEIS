export type CloudChaosSignal = {
  id: string;
  area: "experiment" | "blast-radius" | "hypothesis" | "postmortem";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudChaosTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudChaosSignals: CloudChaosSignal[] = [
  {
    id: "cloud-chaos-experiment-cadence",
    area: "experiment",
    title: "Chaos experiment cadence",
    status: "watch",
    detail: "Chaos exercises happen, but cadence is not yet locked for every release cycle.",
    nextAction: "Pin chaos experiment cadence to sprint close checklist."
  },
  {
    id: "cloud-chaos-blast-radius-control",
    area: "blast-radius",
    title: "Blast-radius control",
    status: "critical",
    detail: "Some chaos plans still lack strict blast-radius boundaries for shared services.",
    nextAction: "Require blast-radius boundary declarations before experiment approval."
  },
  {
    id: "cloud-chaos-hypothesis-quality",
    area: "hypothesis",
    title: "Hypothesis quality",
    status: "healthy",
    detail: "Most experiments include measurable hypotheses with expected resilience outcomes.",
    nextAction: "Standardize hypothesis template across all teams."
  },
  {
    id: "cloud-chaos-postmortem-linkage",
    area: "postmortem",
    title: "Postmortem linkage",
    status: "watch",
    detail: "Postmortem completion improved but mitigation linkage is sometimes delayed.",
    nextAction: "Attach mitigation links before closing chaos records."
  }
];

const cloudChaosTasks: CloudChaosTask[] = [
  {
    id: "cloud-chaos-task-cadence",
    title: "Bind chaos cadence to sprint closure",
    owner: "reliability",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-chaos-task-boundary",
    title: "Enforce blast-radius declaration gate",
    owner: "sre",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-chaos-task-hypothesis-template",
    title: "Publish shared hypothesis template",
    owner: "platform",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-chaos-task-postmortem-links",
    title: "Require mitigation links in chaos postmortems",
    owner: "incident-ops",
    status: "planned",
    priority: "p2"
  }
];

export function getCloudChaosSignals(): CloudChaosSignal[] {
  return cloudChaosSignals;
}

export function getCloudChaosTasks(): CloudChaosTask[] {
  return cloudChaosTasks;
}

export function getCloudChaosSummary() {
  return {
    totalSignals: cloudChaosSignals.length,
    healthySignals: cloudChaosSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudChaosSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudChaosSignals.filter((item) => item.status === "critical").length,
    tasks: cloudChaosTasks.length,
    activeTasks: cloudChaosTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudChaosTasks.filter((item) => item.status === "planned").length
  };
}
