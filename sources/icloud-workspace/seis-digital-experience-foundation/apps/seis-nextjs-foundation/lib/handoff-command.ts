export type HandoffSignal = {
  id: string;
  area: "branch" | "worktree" | "review" | "rollback";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type HandoffTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const handoffSignals: HandoffSignal[] = [
  {
    id: "handoff-branch-discipline",
    area: "branch",
    title: "Branch discipline before handoff",
    status: "watch",
    detail: "Main protection is solid, but mixed-purpose commits increase review complexity.",
    nextAction: "Keep handoff commits single-purpose with clear rollback anchors."
  },
  {
    id: "handoff-worktree-readiness",
    area: "worktree",
    title: "Worktree handoff readiness",
    status: "healthy",
    detail: "Worktree strategy exists for parallel execution and isolated validation.",
    nextAction: "Create dedicated handoff worktree per sprint close."
  },
  {
    id: "handoff-review-packaging",
    area: "review",
    title: "Review package completeness",
    status: "watch",
    detail: "Release notes are improving but conflict-risk notes are not always attached.",
    nextAction: "Bundle risk notes and merge order in handoff package docs."
  },
  {
    id: "handoff-rollback-proof",
    area: "rollback",
    title: "Rollback proof coverage",
    status: "critical",
    detail: "Rollback checkpoints exist but not all major packages carry explicit checkpoint IDs.",
    nextAction: "Attach rollback checkpoints to every major feature package."
  }
];

const handoffTasks: HandoffTask[] = [
  {
    id: "handoff-task-snapshot",
    title: "Generate branch+worktree handoff snapshot",
    owner: "release-ops",
    status: "active",
    priority: "p1"
  },
  {
    id: "handoff-task-risk-log",
    title: "Attach conflict risk log to each handoff set",
    owner: "governance",
    status: "planned",
    priority: "p1"
  },
  {
    id: "handoff-task-checkpoint",
    title: "Standardize rollback checkpoint IDs in commit notes",
    owner: "quality",
    status: "planned",
    priority: "p2"
  },
  {
    id: "handoff-task-pr-template",
    title: "Expand PR template with handoff verification matrix",
    owner: "devex",
    status: "planned",
    priority: "p3"
  }
];

export function getHandoffSignals(): HandoffSignal[] {
  return handoffSignals;
}

export function getHandoffTasks(): HandoffTask[] {
  return handoffTasks;
}

export function getHandoffSummary() {
  return {
    totalSignals: handoffSignals.length,
    healthySignals: handoffSignals.filter((item) => item.status === "healthy").length,
    watchSignals: handoffSignals.filter((item) => item.status === "watch").length,
    criticalSignals: handoffSignals.filter((item) => item.status === "critical").length,
    tasks: handoffTasks.length,
    activeTasks: handoffTasks.filter((item) => item.status === "active").length,
    plannedTasks: handoffTasks.filter((item) => item.status === "planned").length
  };
}
