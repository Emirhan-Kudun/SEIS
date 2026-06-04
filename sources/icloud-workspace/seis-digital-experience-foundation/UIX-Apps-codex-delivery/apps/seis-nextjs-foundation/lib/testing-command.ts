export type TestingSignal = {
  id: string;
  area: "unit" | "integration" | "ui" | "regression";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
};

export type TestingTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const testingSignals: TestingSignal[] = [
  {
    id: "testing-unit-coverage",
    area: "unit",
    title: "Unit coverage across command utilities",
    status: "watch",
    detail: "Utility-level logic is growing faster than formal test coverage.",
    owner: "qa"
  },
  {
    id: "testing-integration-cases",
    area: "integration",
    title: "Integration case breadth",
    status: "watch",
    detail: "Cross-API score aggregation requires stronger scenario tests.",
    owner: "qa"
  },
  {
    id: "testing-ui-flows",
    area: "ui",
    title: "UI flow reliability",
    status: "healthy",
    detail: "Route-level consistency is strong across major lab surfaces.",
    owner: "frontend-qa"
  },
  {
    id: "testing-regression-depth",
    area: "regression",
    title: "Regression depth for mega updates",
    status: "critical",
    detail: "Large capability waves require broader deterministic regression packs.",
    owner: "release-qa"
  }
];

const testingTasks: TestingTask[] = [
  {
    id: "testing-task-unit-plan",
    title: "Define unit test map for new command modules",
    status: "active",
    owner: "qa"
  },
  {
    id: "testing-task-integration-plan",
    title: "Add integration checks for readiness and scorecard outputs",
    status: "planned",
    owner: "qa"
  },
  {
    id: "testing-task-ui-smoke",
    title: "Expand route-level smoke checks for new labs",
    status: "planned",
    owner: "frontend-qa"
  },
  {
    id: "testing-task-regression-pack",
    title: "Publish regression pack for mega feature waves",
    status: "planned",
    owner: "release-qa"
  }
];

export function getTestingSignals(): TestingSignal[] {
  return testingSignals;
}

export function getTestingTasks(): TestingTask[] {
  return testingTasks;
}

export function getTestingSummary() {
  return {
    totalSignals: testingSignals.length,
    healthySignals: testingSignals.filter((item) => item.status === "healthy").length,
    watchSignals: testingSignals.filter((item) => item.status === "watch").length,
    criticalSignals: testingSignals.filter((item) => item.status === "critical").length,
    tasks: testingTasks.length,
    activeTasks: testingTasks.filter((item) => item.status === "active").length,
    plannedTasks: testingTasks.filter((item) => item.status === "planned").length
  };
}
