export type AgentSignal = {
  id: string;
  area: "orchestration" | "delegation" | "safety" | "throughput";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  owner: string;
};

export type AgentTask = {
  id: string;
  title: string;
  status: "planned" | "active" | "done";
  owner: string;
  priority: "p1" | "p2" | "p3";
};

const agentSignals: AgentSignal[] = [
  {
    id: "agent-orchestration-clarity",
    area: "orchestration",
    title: "Agent orchestration clarity",
    status: "watch",
    detail: "Multi-agent boundaries are defined but can be tighter for write scopes.",
    owner: "ai-ops"
  },
  {
    id: "agent-delegation-quality",
    area: "delegation",
    title: "Delegation quality consistency",
    status: "healthy",
    detail: "Scoped delegation improves speed for bounded tasks.",
    owner: "ai-ops"
  },
  {
    id: "agent-safety-rails",
    area: "safety",
    title: "Safety rail coverage",
    status: "critical",
    detail: "Agent autonomy increases need for stricter guardrails on high-risk edits.",
    owner: "security"
  },
  {
    id: "agent-throughput-balance",
    area: "throughput",
    title: "Throughput and review balance",
    status: "watch",
    detail: "Parallel execution can outpace review capacity on mega waves.",
    owner: "release-ops"
  }
];

const agentTasks: AgentTask[] = [
  {
    id: "agent-task-boundary-matrix",
    title: "Define agent boundary matrix by repo area",
    status: "active",
    owner: "ai-ops",
    priority: "p1"
  },
  {
    id: "agent-task-safety-gates",
    title: "Add safety gate checklist for high-risk delegated tasks",
    status: "planned",
    owner: "security",
    priority: "p1"
  },
  {
    id: "agent-task-review-queues",
    title: "Introduce review queue balancing for parallel outputs",
    status: "planned",
    owner: "release-ops",
    priority: "p2"
  },
  {
    id: "agent-task-observability",
    title: "Capture agent execution telemetry for auditability",
    status: "planned",
    owner: "observability",
    priority: "p3"
  }
];

export function getAgentSignals(): AgentSignal[] {
  return agentSignals;
}

export function getAgentTasks(): AgentTask[] {
  return agentTasks;
}

export function getAgentSummary() {
  return {
    totalSignals: agentSignals.length,
    healthySignals: agentSignals.filter((item) => item.status === "healthy").length,
    watchSignals: agentSignals.filter((item) => item.status === "watch").length,
    criticalSignals: agentSignals.filter((item) => item.status === "critical").length,
    tasks: agentTasks.length,
    activeTasks: agentTasks.filter((item) => item.status === "active").length,
    plannedTasks: agentTasks.filter((item) => item.status === "planned").length
  };
}
