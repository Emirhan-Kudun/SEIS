export type ConnectorSignal = {
  id: string;
  area: "auth" | "trust" | "coverage" | "maintenance";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type ConnectorTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
};

const connectorSignals: ConnectorSignal[] = [
  {
    id: "connector-auth-readiness",
    area: "auth",
    title: "Connector auth readiness",
    status: "watch",
    detail: "Selected integrations are scoped, but auth lifecycle docs are not fully standardized.",
    nextAction: "Add onboarding and renewal checklists for every active connector."
  },
  {
    id: "connector-trust-policy",
    area: "trust",
    title: "Trusted connector policy",
    status: "healthy",
    detail: "Governance intent enforces official and actively maintained surfaces.",
    nextAction: "Keep trust policy mapping in quarterly audits."
  },
  {
    id: "connector-coverage-balance",
    area: "coverage",
    title: "Always-on vs on-demand balance",
    status: "watch",
    detail: "Capability growth can pressure always-on stack boundaries.",
    nextAction: "Review connector tiers monthly to avoid unnecessary default load."
  },
  {
    id: "connector-maintenance-risk",
    area: "maintenance",
    title: "Maintenance burden risk",
    status: "critical",
    detail: "Connector count can grow faster than operational ownership capacity.",
    nextAction: "Assign per-connector owner and explicit review cadence."
  }
];

const connectorTasks: ConnectorTask[] = [
  {
    id: "connector-task-owner-map",
    title: "Create connector ownership matrix",
    status: "active",
    owner: "integration-ops"
  },
  {
    id: "connector-task-trust-ledger",
    title: "Publish trusted connector ledger with evidence links",
    status: "planned",
    owner: "governance"
  },
  {
    id: "connector-task-tier-review",
    title: "Run always-on vs on-demand tier review",
    status: "planned",
    owner: "platform"
  },
  {
    id: "connector-task-health-report",
    title: "Add monthly connector health report endpoint",
    status: "planned",
    owner: "observability"
  }
];

export function getConnectorSignals(): ConnectorSignal[] {
  return connectorSignals;
}

export function getConnectorTasks(): ConnectorTask[] {
  return connectorTasks;
}

export function getConnectorSummary() {
  return {
    totalSignals: connectorSignals.length,
    healthySignals: connectorSignals.filter((item) => item.status === "healthy").length,
    watchSignals: connectorSignals.filter((item) => item.status === "watch").length,
    criticalSignals: connectorSignals.filter((item) => item.status === "critical").length,
    tasks: connectorTasks.length,
    activeTasks: connectorTasks.filter((item) => item.status === "active").length,
    plannedTasks: connectorTasks.filter((item) => item.status === "planned").length
  };
}
