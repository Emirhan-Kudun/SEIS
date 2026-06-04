export type MergeSignal = {
  id: string;
  lane: "conflict" | "sequence" | "review" | "history";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type MergeTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
  priority: "p1" | "p2" | "p3";
};

const mergeSignals: MergeSignal[] = [
  {
    id: "merge-conflict-hotspots",
    lane: "conflict",
    title: "Conflict hotspot concentration",
    status: "watch",
    detail: "Command hub files receive frequent updates and need tighter ownership slices.",
    nextAction: "Split ownership by lab domain to reduce overlapping edits."
  },
  {
    id: "merge-sequence-discipline",
    lane: "sequence",
    title: "Merge sequence discipline",
    status: "healthy",
    detail: "PR-first integration flow is preserved for the primary branch.",
    nextAction: "Keep ordered merge checklist before branch consolidation."
  },
  {
    id: "merge-review-bandwidth",
    lane: "review",
    title: "Review bandwidth saturation",
    status: "critical",
    detail: "Large feature waves can outpace deep review depth and increase hidden regressions.",
    nextAction: "Enforce staggered review windows for high-change commits."
  },
  {
    id: "merge-history-clarity",
    lane: "history",
    title: "History readability",
    status: "watch",
    detail: "Commit history is clean but feature volumes are expanding rapidly.",
    nextAction: "Maintain one-purpose commits and explicit wave docs."
  }
];

const mergeTasks: MergeTask[] = [
  {
    id: "merge-task-hotspot-map",
    title: "Generate weekly conflict hotspot map",
    status: "active",
    owner: "release-ops",
    priority: "p1"
  },
  {
    id: "merge-task-sequence-template",
    title: "Template merge sequence for mega feature waves",
    status: "planned",
    owner: "governance",
    priority: "p2"
  },
  {
    id: "merge-task-review-budget",
    title: "Add review depth budget to PR governance",
    status: "planned",
    owner: "quality",
    priority: "p1"
  },
  {
    id: "merge-task-history-tagging",
    title: "Tag merge groups by capability wave",
    status: "planned",
    owner: "devex",
    priority: "p3"
  }
];

export function getMergeSignals(): MergeSignal[] {
  return mergeSignals;
}

export function getMergeTasks(): MergeTask[] {
  return mergeTasks;
}

export function getMergeSummary() {
  return {
    totalSignals: mergeSignals.length,
    healthySignals: mergeSignals.filter((item) => item.status === "healthy").length,
    watchSignals: mergeSignals.filter((item) => item.status === "watch").length,
    criticalSignals: mergeSignals.filter((item) => item.status === "critical").length,
    tasks: mergeTasks.length,
    activeTasks: mergeTasks.filter((item) => item.status === "active").length,
    plannedTasks: mergeTasks.filter((item) => item.status === "planned").length
  };
}
