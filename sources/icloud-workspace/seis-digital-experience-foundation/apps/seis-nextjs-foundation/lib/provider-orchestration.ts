export type ProviderChannel = {
  id: string;
  provider: "openai" | "gemini" | "claude" | "hybrid";
  role: string;
  status: "ready" | "planned" | "experimental";
  strengths: string[];
  guardrails: string[];
  fallback: string;
};

export type ConnectorStrategy = {
  id: string;
  name: string;
  scope: string;
  status: "active" | "on-demand" | "planned";
  risk: "low" | "medium" | "high";
};

const providerChannels: ProviderChannel[] = [
  {
    id: "provider-openai-execution",
    provider: "openai",
    role: "Execution-oriented coding and implementation orchestration.",
    status: "ready",
    strengths: ["fast implementation loops", "structured API integration support", "strong refactor discipline"],
    guardrails: ["keep branch-safe flow", "avoid direct protected branch operations", "no secret exposure"],
    fallback: "Use hybrid workflow pack for context-heavy planning."
  },
  {
    id: "provider-gemini-context",
    provider: "gemini",
    role: "Long-context analysis and synthesis support.",
    status: "planned",
    strengths: ["large-context digestion", "cross-document synthesis", "multimodal context tolerance"],
    guardrails: ["no architecture rewrite without approval", "preserve repository boundaries"],
    fallback: "Split analysis into smaller content snapshots and process in control center."
  },
  {
    id: "provider-claude-architecture",
    provider: "claude",
    role: "Architecture critique and reasoning-heavy review.",
    status: "planned",
    strengths: ["design/system critique", "detailed reasoning", "risk-oriented architectural review"],
    guardrails: ["no direct merge authority", "keep recommendations diff-based"],
    fallback: "Run governance matrix + release-lab scenario review."
  },
  {
    id: "provider-hybrid-orchestrator",
    provider: "hybrid",
    role: "Provider-neutral orchestration for resiliency and fallback continuity.",
    status: "ready",
    strengths: ["vendor resilience", "failover strategy", "portable workflow contracts"],
    guardrails: ["shared payload schema only", "no provider-locked UI assumptions"],
    fallback: "Switch to single-provider safe mode with strict gate checks."
  }
];

const connectorStrategies: ConnectorStrategy[] = [
  {
    id: "connector-core-docs",
    name: "Core Documentation Connectors",
    scope: "OpenAI docs, official framework docs, internal markdown governance files.",
    status: "active",
    risk: "low"
  },
  {
    id: "connector-productivity-suite",
    name: "Productivity Connectors",
    scope: "Notion, Linear, GitHub issue/PR intelligence, and workflow sync.",
    status: "on-demand",
    risk: "medium"
  },
  {
    id: "connector-marketing-insight",
    name: "SEO and visibility connectors",
    scope: "Semrush/Conductor style metrics for landing and conversion strategy.",
    status: "on-demand",
    risk: "medium"
  },
  {
    id: "connector-enterprise-expansion",
    name: "Enterprise data connectors",
    scope: "CRM + analytics expansion when project reaches scaled operation phase.",
    status: "planned",
    risk: "high"
  }
];

export function getProviderChannels(): ProviderChannel[] {
  return providerChannels;
}

export function getConnectorStrategies(): ConnectorStrategy[] {
  return connectorStrategies;
}

export function getProviderOrchestrationSummary() {
  return {
    providers: providerChannels.length,
    readyProviders: providerChannels.filter((item) => item.status === "ready").length,
    plannedProviders: providerChannels.filter((item) => item.status === "planned").length,
    connectorStrategies: connectorStrategies.length,
    activeConnectors: connectorStrategies.filter((item) => item.status === "active").length
  };
}
