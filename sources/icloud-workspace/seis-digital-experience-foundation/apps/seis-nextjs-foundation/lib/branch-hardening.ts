export type BranchHardeningLane = "branch" | "sync" | "quality" | "performance" | "rollback";

export type BranchHardeningStatus = "healthy" | "watch" | "blocked";

export type BranchHardeningSignal = {
  id: string;
  lane: BranchHardeningLane;
  title: string;
  status: BranchHardeningStatus;
  detail: string;
  nextAction: string;
};

export type BranchHardeningCheck = {
  id: string;
  command: string;
  cost: "low" | "medium";
  purpose: string;
};

export type LowPowerControl = {
  id: string;
  rule: string;
  impact: string;
};

export type BranchPublishGuard = {
  id: string;
  gate: "pre-push" | "push" | "post-push";
  title: string;
  command: string;
  passSignal: string;
  failureAction: string;
};

export const branchHardeningProfile = {
  primaryBranch: "codex/premium-local-foundation",
  protectedBranches: ["main", "master"],
  operatingMode: "low-power",
  runtimeShellAccess: false,
  mergePosture: "review-first",
  pushPolicy: "origin confirmation required"
};

const branchHardeningSignals: BranchHardeningSignal[] = [
  {
    id: "primary-branch-isolation",
    lane: "branch",
    title: "Premium foundation branch isolation",
    status: "healthy",
    detail: "Feature growth stays on the SEIS integration branch while protected branches remain untouched.",
    nextAction: "Continue using codex/premium-local-foundation for modular improvements."
  },
  {
    id: "origin-sync-confirmation",
    lane: "sync",
    title: "Origin sync confirmation",
    status: "watch",
    detail: "Local commits should not be treated as shipped until GitHub push succeeds with active credentials.",
    nextAction: "Run git status --short --branch before publish and confirm origin after push."
  },
  {
    id: "quality-gate-before-merge",
    lane: "quality",
    title: "Local quality gate before merge",
    status: "healthy",
    detail: "Branch governance and local quality checks remain the minimum pre-merge safety floor.",
    nextAction: "Keep branch-governance-check and local-quality-gate in the pre-commit rhythm."
  },
  {
    id: "low-power-verification",
    lane: "performance",
    title: "Low-power verification mode",
    status: "healthy",
    detail: "Validation favors static checks and single-pass type checks instead of repeated builds or browser automation.",
    nextAction: "Escalate to build or browser checks only when UI/runtime changes require it."
  },
  {
    id: "rollback-ready-commits",
    lane: "rollback",
    title: "Rollback-ready commits",
    status: "watch",
    detail: "Large branch growth is safer when each commit has one clear purpose and isolated file ownership.",
    nextAction: "Keep commits scoped, reversible, and named with conventional intent."
  }
];

const branchHardeningChecks: BranchHardeningCheck[] = [
  {
    id: "branch-status",
    command: "git status --short --branch",
    cost: "low",
    purpose: "Confirm active branch, local diff, and origin divergence before changing files."
  },
  {
    id: "branch-governance",
    command: "node scripts/branch-governance-check.js",
    cost: "low",
    purpose: "Reject protected branch work and preserve the SEIS branch contract."
  },
  {
    id: "local-quality-gate",
    command: "node scripts/local-quality-gate.js",
    cost: "low",
    purpose: "Run the lightweight repository safety gate before commit or merge."
  },
  {
    id: "diff-whitespace",
    command: "git diff --check",
    cost: "low",
    purpose: "Catch whitespace and patch hygiene issues without starting an app process."
  },
  {
    id: "typescript-no-emit",
    command: "./apps/seis-nextjs-foundation/node_modules/.bin/tsc -p apps/seis-nextjs-foundation/tsconfig.json --noEmit --pretty false --incremental false",
    cost: "medium",
    purpose: "Use once after typed TS/TSX changes when branch confidence needs stronger validation."
  }
];

const lowPowerControls: LowPowerControl[] = [
  {
    id: "no-build-loop",
    rule: "Do not repeat production builds during small branch-hardening patches.",
    impact: "Reduces CPU load and avoids unnecessary thermal pressure."
  },
  {
    id: "no-dev-server-by-default",
    rule: "Do not start a dev server unless a browser-visible UI behavior must be checked.",
    impact: "Keeps local validation quiet and predictable."
  },
  {
    id: "no-dependency-bloat",
    rule: "Avoid new dependencies for governance surfaces that can be expressed as typed static data.",
    impact: "Keeps install size, audit surface, and future maintenance cost controlled."
  },
  {
    id: "single-pass-heavy-checks",
    rule: "Run medium-cost checks at most once per scoped patch unless a failure requires a fix.",
    impact: "Preserves verification rigor without wasting local resources."
  }
];

const branchPublishGuards: BranchPublishGuard[] = [
  {
    id: "publish-clean-tree",
    gate: "pre-push",
    title: "Clean tree confirmation",
    command: "git status --short --branch",
    passSignal: "No modified, staged, or untracked files remain outside the intended commit.",
    failureAction: "Stop publish, inspect file scope, and commit or intentionally leave local-only work."
  },
  {
    id: "publish-remote-head",
    gate: "pre-push",
    title: "Remote head awareness",
    command: "git ls-remote --heads origin codex/premium-local-foundation",
    passSignal: "Origin branch exists and reports a reachable head SHA.",
    failureAction: "Treat the branch as local-only until remote access is restored."
  },
  {
    id: "publish-low-speed-guard",
    gate: "push",
    title: "Bounded push attempt",
    command: "git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=20 push origin codex/premium-local-foundation",
    passSignal: "Push exits successfully without hanging the workstation.",
    failureAction: "Do not retry in a loop; report network/auth blocker and keep local commits intact."
  },
  {
    id: "publish-origin-confirmation",
    gate: "post-push",
    title: "Origin confirmation",
    command: "git status --short --branch",
    passSignal: "Branch no longer reports ahead of origin.",
    failureAction: "Do not call the work shipped until origin divergence clears."
  }
];

export function getBranchHardeningSignals(): BranchHardeningSignal[] {
  return branchHardeningSignals;
}

export function getBranchHardeningChecks(): BranchHardeningCheck[] {
  return branchHardeningChecks;
}

export function getLowPowerControls(): LowPowerControl[] {
  return lowPowerControls;
}

export function getBranchPublishGuards(): BranchPublishGuard[] {
  return branchPublishGuards;
}

export function getBranchHardeningSummary() {
  return {
    primaryBranch: branchHardeningProfile.primaryBranch,
    operatingMode: branchHardeningProfile.operatingMode,
    totalSignals: branchHardeningSignals.length,
    healthySignals: branchHardeningSignals.filter((item) => item.status === "healthy").length,
    watchSignals: branchHardeningSignals.filter((item) => item.status === "watch").length,
    blockedSignals: branchHardeningSignals.filter((item) => item.status === "blocked").length,
    lowPowerControls: lowPowerControls.length,
    publishGuards: branchPublishGuards.length,
    lowCostChecks: branchHardeningChecks.filter((item) => item.cost === "low").length,
    mediumCostChecks: branchHardeningChecks.filter((item) => item.cost === "medium").length
  };
}
