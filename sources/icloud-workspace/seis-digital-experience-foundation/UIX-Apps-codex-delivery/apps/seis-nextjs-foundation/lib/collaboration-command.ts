export type CollaborationFlow = {
  id: string;
  system: string;
  workflow: string;
  status: "aligned" | "watch" | "blocked";
  owner: string;
  nextStep: string;
};

export type BranchCheckpoint = {
  id: string;
  title: string;
  status: "pass" | "watch" | "fail";
  note: string;
};

const collaborationFlows: CollaborationFlow[] = [
  {
    id: "collab-github-linear-sync",
    system: "GitHub + Linear",
    workflow: "Issue-to-branch handoff",
    status: "aligned",
    owner: "delivery-ops",
    nextStep: "Keep one-purpose branch naming and PR checklist discipline."
  },
  {
    id: "collab-figma-implementation",
    system: "Figma + Next.js",
    workflow: "Design-to-implementation alignment",
    status: "watch",
    owner: "design-engineering",
    nextStep: "Publish component mapping matrix for new lab surfaces."
  },
  {
    id: "collab-sentry-release-loop",
    system: "Sentry + Release flow",
    workflow: "Error feedback to hotfix loop",
    status: "aligned",
    owner: "ops",
    nextStep: "Preserve severity-based escalation and rollback notes."
  },
  {
    id: "collab-connector-governance",
    system: "Connector registry",
    workflow: "Connector lifecycle governance",
    status: "blocked",
    owner: "platform-governance",
    nextStep: "Finalize owner/cadence mapping for every enabled connector."
  }
];

const branchCheckpoints: BranchCheckpoint[] = [
  {
    id: "branch-main-protection",
    title: "Main branch protection",
    status: "pass",
    note: "Direct development remains isolated from main."
  },
  {
    id: "branch-single-purpose-commit",
    title: "Single-purpose commit discipline",
    status: "watch",
    note: "Feature packs are large; consider splitting future packs into smaller commits."
  },
  {
    id: "branch-rollback-path",
    title: "Rollback path clarity",
    status: "pass",
    note: "Feature additions remain reversible through isolated branch commits."
  }
];

export function getCollaborationFlows(): CollaborationFlow[] {
  return collaborationFlows;
}

export function getBranchCheckpoints(): BranchCheckpoint[] {
  return branchCheckpoints;
}

export function getCollaborationSummary() {
  return {
    totalFlows: collaborationFlows.length,
    alignedFlows: collaborationFlows.filter((item) => item.status === "aligned").length,
    watchFlows: collaborationFlows.filter((item) => item.status === "watch").length,
    blockedFlows: collaborationFlows.filter((item) => item.status === "blocked").length,
    checkpoints: branchCheckpoints.length,
    passCheckpoints: branchCheckpoints.filter((item) => item.status === "pass").length,
    watchCheckpoints: branchCheckpoints.filter((item) => item.status === "watch").length,
    failCheckpoints: branchCheckpoints.filter((item) => item.status === "fail").length
  };
}
