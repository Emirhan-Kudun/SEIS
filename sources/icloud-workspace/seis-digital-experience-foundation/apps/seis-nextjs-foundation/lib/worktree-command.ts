export type WorktreeSignal = {
  id: string;
  lane: "branch" | "worktree" | "sync" | "review";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type WorktreeTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const worktreeSignals: WorktreeSignal[] = [
  {
    id: "worktree-branch-fanout",
    lane: "branch",
    title: "Branch fanout containment",
    status: "watch",
    detail: "Multiple historical branches exist and increase merge-path complexity.",
    nextAction: "Consolidate feature deltas into premium foundation integration lane."
  },
  {
    id: "worktree-long-lived-drift",
    lane: "worktree",
    title: "Long-lived worktree drift",
    status: "critical",
    detail: "Parallel worktrees can diverge when sync cadence is inconsistent.",
    nextAction: "Run daily divergence report before accepting cross-branch code pulls."
  },
  {
    id: "worktree-pr-review-discipline",
    lane: "review",
    title: "PR-first review discipline",
    status: "healthy",
    detail: "Main protection and branch-first flow is enforced in governance scripts.",
    nextAction: "Keep check scripts in merge preflight and publish review snapshots."
  },
  {
    id: "worktree-rollback-visibility",
    lane: "sync",
    title: "Rollback checkpoint visibility",
    status: "watch",
    detail: "Rollback paths exist but per-feature checkpoint docs are partial.",
    nextAction: "Attach checkpoint IDs to each large capability package commit."
  }
];

const worktreeTasks: WorktreeTask[] = [
  {
    id: "worktree-task-inventory",
    title: "Generate branch and worktree inventory baseline",
    owner: "release-ops",
    status: "active",
    priority: "p1"
  },
  {
    id: "worktree-task-drift-report",
    title: "Automate drift score report for non-main branches",
    owner: "devex",
    status: "planned",
    priority: "p1"
  },
  {
    id: "worktree-task-rollback-doc",
    title: "Publish rollback map per integration wave",
    owner: "governance",
    status: "planned",
    priority: "p2"
  },
  {
    id: "worktree-task-pr-template",
    title: "Enrich PR template with merge-risk checklist",
    owner: "quality",
    status: "planned",
    priority: "p3"
  }
];

export function getWorktreeSignals(): WorktreeSignal[] {
  return worktreeSignals;
}

export function getWorktreeTasks(): WorktreeTask[] {
  return worktreeTasks;
}

export function getWorktreeSummary() {
  return {
    totalSignals: worktreeSignals.length,
    healthySignals: worktreeSignals.filter((item) => item.status === "healthy").length,
    watchSignals: worktreeSignals.filter((item) => item.status === "watch").length,
    criticalSignals: worktreeSignals.filter((item) => item.status === "critical").length,
    tasks: worktreeTasks.length,
    activeTasks: worktreeTasks.filter((item) => item.status === "active").length,
    plannedTasks: worktreeTasks.filter((item) => item.status === "planned").length
  };
}
