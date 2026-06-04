export type DesignSignal = {
  id: string;
  area: "tokens" | "components" | "spacing" | "interaction";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type DesignTask = {
  id: string;
  title: string;
  lane: "token" | "component" | "docs" | "qa";
  status: "planned" | "active" | "done";
};

const designSignals: DesignSignal[] = [
  {
    id: "design-token-drift",
    area: "tokens",
    title: "Token drift between core surfaces",
    status: "watch",
    detail: "Command labs expanded quickly and some spacing accents vary by page.",
    nextAction: "Enforce shared spacing and radius token usage in all new lab sections."
  },
  {
    id: "design-component-parity",
    area: "components",
    title: "Component parity and reuse",
    status: "healthy",
    detail: "Card patterns and link tiles are mostly shared across orchestration surfaces.",
    nextAction: "Abstract repeated signal cards into one reusable command panel primitive."
  },
  {
    id: "design-whitespace-rhythm",
    area: "spacing",
    title: "Whitespace rhythm consistency",
    status: "watch",
    detail: "High-density dashboards increase cognitive load on small devices.",
    nextAction: "Introduce compact and comfortable spacing modes for command dashboards."
  },
  {
    id: "design-motion-restraint",
    area: "interaction",
    title: "Motion restraint and clarity",
    status: "critical",
    detail: "Feature growth outpaced motion governance guidelines on micro-interactions.",
    nextAction: "Add reduced-motion-safe interaction inventory for all premium transitions."
  }
];

const designTasks: DesignTask[] = [
  {
    id: "design-task-token-audit",
    title: "Run token audit for premium lab routes",
    lane: "token",
    status: "active"
  },
  {
    id: "design-task-component-catalog",
    title: "Build shared command component catalog",
    lane: "component",
    status: "planned"
  },
  {
    id: "design-task-guidelines",
    title: "Document cinematic spacing and typography rules",
    lane: "docs",
    status: "planned"
  },
  {
    id: "design-task-motion-qa",
    title: "Create motion QA checklist with reduced-motion parity",
    lane: "qa",
    status: "planned"
  }
];

export function getDesignSignals(): DesignSignal[] {
  return designSignals;
}

export function getDesignTasks(): DesignTask[] {
  return designTasks;
}

export function getDesignSystemSummary() {
  return {
    totalSignals: designSignals.length,
    healthySignals: designSignals.filter((item) => item.status === "healthy").length,
    watchSignals: designSignals.filter((item) => item.status === "watch").length,
    criticalSignals: designSignals.filter((item) => item.status === "critical").length,
    tasks: designTasks.length,
    activeTasks: designTasks.filter((item) => item.status === "active").length,
    plannedTasks: designTasks.filter((item) => item.status === "planned").length
  };
}
