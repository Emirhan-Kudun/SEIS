export type SkillsSignal = {
  id: string;
  lane: "mcp" | "connector" | "skill" | "governance";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  action: string;
};

export type SkillsTask = {
  id: string;
  title: string;
  owner: string;
  status: "planned" | "active" | "done";
  priority: "p1" | "p2" | "p3";
};

const skillsSignals: SkillsSignal[] = [
  {
    id: "skills-core-surface",
    lane: "skill",
    title: "Always-on core skill surface",
    status: "healthy",
    detail: "Core skill usage is standardized for repository-safe execution patterns.",
    action: "Keep core skill matrix minimal and stable by default."
  },
  {
    id: "skills-connector-drift",
    lane: "connector",
    title: "Connector drift across workflows",
    status: "watch",
    detail: "Connector usage grows quickly and can drift from governance boundaries.",
    action: "Track connector usage intent and owner in quarterly registry review."
  },
  {
    id: "skills-mcp-hardening",
    lane: "mcp",
    title: "MCP hardening and availability",
    status: "watch",
    detail: "MCP coverage is broad but some paths require stronger fallback handling.",
    action: "Define skipped-with-reason policy for blocked or auth-limited tools."
  },
  {
    id: "skills-governance-guard",
    lane: "governance",
    title: "Skill governance guardrails",
    status: "critical",
    detail: "Skill additions are fast; review ownership and deprecation policy is not strict enough.",
    action: "Require owner, risk class, and rollback note for every new skill path."
  }
];

const skillsTasks: SkillsTask[] = [
  {
    id: "skills-task-registry",
    title: "Publish always-on core and on-demand registry map",
    owner: "ai-ops",
    status: "active",
    priority: "p1"
  },
  {
    id: "skills-task-owner-map",
    title: "Add owner metadata for each connector and MCP path",
    owner: "governance",
    status: "planned",
    priority: "p2"
  },
  {
    id: "skills-task-fallback",
    title: "Define fallback playbook for unavailable connectors",
    owner: "operations",
    status: "planned",
    priority: "p2"
  },
  {
    id: "skills-task-deprecation",
    title: "Create deprecation cycle for low-value integrations",
    owner: "platform",
    status: "planned",
    priority: "p3"
  }
];

export function getSkillsSignals(): SkillsSignal[] {
  return skillsSignals;
}

export function getSkillsTasks(): SkillsTask[] {
  return skillsTasks;
}

export function getSkillsSummary() {
  return {
    totalSignals: skillsSignals.length,
    healthySignals: skillsSignals.filter((item) => item.status === "healthy").length,
    watchSignals: skillsSignals.filter((item) => item.status === "watch").length,
    criticalSignals: skillsSignals.filter((item) => item.status === "critical").length,
    tasks: skillsTasks.length,
    activeTasks: skillsTasks.filter((item) => item.status === "active").length,
    plannedTasks: skillsTasks.filter((item) => item.status === "planned").length
  };
}
