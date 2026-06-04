export type KnowledgeSignal = {
  id: string;
  area: "runbooks" | "docs" | "onboarding" | "governance";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
};

export type KnowledgeTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const knowledgeSignals: KnowledgeSignal[] = [
  {
    id: "knowledge-runbook-depth",
    area: "runbooks",
    title: "Runbook depth for expanded command stack",
    status: "watch",
    detail: "Command surfaces grew and not all have failure-mode runbook depth yet.",
    owner: "ops-docs"
  },
  {
    id: "knowledge-doc-freshness",
    area: "docs",
    title: "Documentation freshness",
    status: "critical",
    detail: "README and release notes can lag behind rapid capability expansion.",
    owner: "platform-docs"
  },
  {
    id: "knowledge-onboarding-flow",
    area: "onboarding",
    title: "Onboarding path clarity",
    status: "healthy",
    detail: "Control, studio, and playbooks provide coherent entry points.",
    owner: "developer-experience"
  },
  {
    id: "knowledge-governance-trace",
    area: "governance",
    title: "Governance traceability",
    status: "watch",
    detail: "Policy intent is clear but route-level trace docs need tighter mapping.",
    owner: "governance"
  }
];

const knowledgeTasks: KnowledgeTask[] = [
  {
    id: "knowledge-task-runbook-index",
    title: "Build unified runbook index for all labs",
    status: "active",
    owner: "ops-docs"
  },
  {
    id: "knowledge-task-readme-sync",
    title: "Create checklist-driven README sync policy",
    status: "planned",
    owner: "platform-docs"
  },
  {
    id: "knowledge-task-onboarding-map",
    title: "Publish first-30-minute onboarding map",
    status: "planned",
    owner: "developer-experience"
  },
  {
    id: "knowledge-task-governance-links",
    title: "Map governance rules to concrete route/API surfaces",
    status: "planned",
    owner: "governance"
  }
];

export function getKnowledgeSignals(): KnowledgeSignal[] {
  return knowledgeSignals;
}

export function getKnowledgeTasks(): KnowledgeTask[] {
  return knowledgeTasks;
}

export function getKnowledgeSummary() {
  return {
    totalSignals: knowledgeSignals.length,
    healthySignals: knowledgeSignals.filter((item) => item.status === "healthy").length,
    watchSignals: knowledgeSignals.filter((item) => item.status === "watch").length,
    criticalSignals: knowledgeSignals.filter((item) => item.status === "critical").length,
    tasks: knowledgeTasks.length,
    activeTasks: knowledgeTasks.filter((item) => item.status === "active").length,
    plannedTasks: knowledgeTasks.filter((item) => item.status === "planned").length
  };
}
