export type DeploymentSignal = {
  id: string;
  stage: "preview" | "staging" | "production" | "rollback";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type DeploymentTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const deploymentSignals: DeploymentSignal[] = [
  {
    id: "deploy-preview-confidence",
    stage: "preview",
    title: "Preview environment confidence",
    status: "healthy",
    detail: "Preview-first strategy is aligned with safe QA flow.",
    nextAction: "Maintain preview checks for all major route additions."
  },
  {
    id: "deploy-staging-fidelity",
    stage: "staging",
    title: "Staging fidelity",
    status: "watch",
    detail: "Staging checks are strong but not all feature waves run full regression slices.",
    nextAction: "Attach staged regression checklist to every release package."
  },
  {
    id: "deploy-production-gating",
    stage: "production",
    title: "Production gate strictness",
    status: "critical",
    detail: "Capability growth requires stricter gate enforcement before production approvals.",
    nextAction: "Block production promotion when critical command signals are open."
  },
  {
    id: "deploy-rollback-readiness",
    stage: "rollback",
    title: "Rollback readiness",
    status: "watch",
    detail: "Rollback paths exist but drill cadence should increase.",
    nextAction: "Schedule frequent rollback drills for high-change windows."
  }
];

const deploymentTasks: DeploymentTask[] = [
  {
    id: "deploy-task-gate-template",
    title: "Create release gate template for mega packages",
    status: "active",
    owner: "release-ops"
  },
  {
    id: "deploy-task-staging-regression",
    title: "Automate staging regression summary output",
    status: "planned",
    owner: "qa"
  },
  {
    id: "deploy-task-promo-policy",
    title: "Define production promotion policy by risk score",
    status: "planned",
    owner: "governance"
  },
  {
    id: "deploy-task-rollback-drill",
    title: "Run periodic rollback deployment drills",
    status: "planned",
    owner: "incident-ops"
  }
];

export function getDeploymentSignals(): DeploymentSignal[] {
  return deploymentSignals;
}

export function getDeploymentTasks(): DeploymentTask[] {
  return deploymentTasks;
}

export function getDeploymentSummary() {
  return {
    totalSignals: deploymentSignals.length,
    healthySignals: deploymentSignals.filter((item) => item.status === "healthy").length,
    watchSignals: deploymentSignals.filter((item) => item.status === "watch").length,
    criticalSignals: deploymentSignals.filter((item) => item.status === "critical").length,
    tasks: deploymentTasks.length,
    activeTasks: deploymentTasks.filter((item) => item.status === "active").length,
    plannedTasks: deploymentTasks.filter((item) => item.status === "planned").length
  };
}
