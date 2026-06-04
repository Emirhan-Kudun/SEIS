export type CloudDeployPipelineSignal = {
  id: string;
  stage: "plan" | "build" | "release" | "rollback" | "verification";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type CloudDeployPipelineTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const cloudDeployPipelineSignals: CloudDeployPipelineSignal[] = [
  {
    id: "cloud-deploy-plan-provenance",
    stage: "plan",
    title: "Release plan provenance",
    status: "watch",
    detail: "Promotion plans are documented, but change-source lineage is not uniformly linked to every deployment candidate.",
    nextAction: "Require source commit + test artifact linkage before release scheduling."
  },
  {
    id: "cloud-deploy-build-reproducibility",
    stage: "build",
    title: "Build reproducibility",
    status: "healthy",
    detail: "Primary pipeline builds are reproducible with stable lockfiles and deterministic environment baselines.",
    nextAction: "Add periodic reproducibility sampling for non-primary build paths."
  },
  {
    id: "cloud-deploy-release-gating",
    stage: "release",
    title: "Release gate strictness",
    status: "critical",
    detail: "High-risk deployments occasionally proceed with open warning signals that should trigger additional review.",
    nextAction: "Introduce hard block when critical command coverage exceeds threshold."
  },
  {
    id: "cloud-deploy-rollback-sla",
    stage: "rollback",
    title: "Rollback SLA confidence",
    status: "watch",
    detail: "Rollback paths are defined but verified execution timings are missing for all environments.",
    nextAction: "Run timed rollback drills and publish recovery SLA evidence."
  },
  {
    id: "cloud-deploy-verification-depth",
    stage: "verification",
    title: "Post-deploy verification depth",
    status: "watch",
    detail: "Smoke coverage is good, but cross-lab integration checks are not always included in promotion verification.",
    nextAction: "Expand post-deploy verification to include orchestration-readiness snapshot."
  }
];

const cloudDeployPipelineTasks: CloudDeployPipelineTask[] = [
  {
    id: "cloud-deploy-task-lineage",
    title: "Link deployment candidates to source provenance",
    owner: "release-engineering",
    status: "active",
    priority: "p1"
  },
  {
    id: "cloud-deploy-task-hard-block",
    title: "Add hard block for critical release warnings",
    owner: "platform",
    status: "planned",
    priority: "p1"
  },
  {
    id: "cloud-deploy-task-rollback-sla",
    title: "Publish timed rollback drill SLA report",
    owner: "sre",
    status: "planned",
    priority: "p2"
  },
  {
    id: "cloud-deploy-task-verify-depth",
    title: "Include orchestration snapshot in post-deploy checks",
    owner: "qa-ops",
    status: "planned",
    priority: "p2"
  }
];

export function getCloudDeployPipelineSignals(): CloudDeployPipelineSignal[] {
  return cloudDeployPipelineSignals;
}

export function getCloudDeployPipelineTasks(): CloudDeployPipelineTask[] {
  return cloudDeployPipelineTasks;
}

export function getCloudDeployPipelineSummary() {
  return {
    totalSignals: cloudDeployPipelineSignals.length,
    healthySignals: cloudDeployPipelineSignals.filter((item) => item.status === "healthy").length,
    watchSignals: cloudDeployPipelineSignals.filter((item) => item.status === "watch").length,
    criticalSignals: cloudDeployPipelineSignals.filter((item) => item.status === "critical").length,
    tasks: cloudDeployPipelineTasks.length,
    activeTasks: cloudDeployPipelineTasks.filter((item) => item.status === "active").length,
    plannedTasks: cloudDeployPipelineTasks.filter((item) => item.status === "planned").length
  };
}
