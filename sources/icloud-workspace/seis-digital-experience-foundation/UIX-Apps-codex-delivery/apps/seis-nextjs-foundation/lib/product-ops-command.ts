export type ProductOpsSignal = {
  id: string;
  lane: "roadmap" | "feedback" | "activation" | "retention";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type ProductOpsTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const productOpsSignals: ProductOpsSignal[] = [
  {
    id: "product-roadmap-scope",
    lane: "roadmap",
    title: "Roadmap scope discipline",
    status: "watch",
    detail: "Feature velocity is high and prioritization windows need tighter guardrails.",
    nextAction: "Tag every new command feature with user value and maintenance cost."
  },
  {
    id: "product-feedback-loop",
    lane: "feedback",
    title: "User feedback ingestion loop",
    status: "critical",
    detail: "Signal capture exists but standardized triage loop is incomplete.",
    nextAction: "Define weekly triage ritual with severity, effort, and rollout mapping."
  },
  {
    id: "product-activation-flow",
    lane: "activation",
    title: "Activation flow clarity",
    status: "healthy",
    detail: "Control and orchestration routes provide clear next-step guidance.",
    nextAction: "Add lightweight guided tours for first-time operations users."
  },
  {
    id: "product-retention-signal",
    lane: "retention",
    title: "Retention signal visibility",
    status: "watch",
    detail: "Growth analytics is present but retention segmentation needs deeper tagging.",
    nextAction: "Publish retention cohort events and tie into command summaries."
  }
];

const productOpsTasks: ProductOpsTask[] = [
  {
    id: "product-task-prioritization",
    title: "Create impact-effort prioritization board",
    status: "active",
    owner: "product"
  },
  {
    id: "product-task-feedback-triage",
    title: "Establish weekly feedback triage pipeline",
    status: "planned",
    owner: "product-ops"
  },
  {
    id: "product-task-activation-tour",
    title: "Design first-session activation helper",
    status: "planned",
    owner: "ux"
  },
  {
    id: "product-task-retention-events",
    title: "Define retention event taxonomy",
    status: "planned",
    owner: "analytics"
  }
];

export function getProductOpsSignals(): ProductOpsSignal[] {
  return productOpsSignals;
}

export function getProductOpsTasks(): ProductOpsTask[] {
  return productOpsTasks;
}

export function getProductOpsSummary() {
  return {
    totalSignals: productOpsSignals.length,
    healthySignals: productOpsSignals.filter((item) => item.status === "healthy").length,
    watchSignals: productOpsSignals.filter((item) => item.status === "watch").length,
    criticalSignals: productOpsSignals.filter((item) => item.status === "critical").length,
    tasks: productOpsTasks.length,
    activeTasks: productOpsTasks.filter((item) => item.status === "active").length,
    plannedTasks: productOpsTasks.filter((item) => item.status === "planned").length
  };
}
