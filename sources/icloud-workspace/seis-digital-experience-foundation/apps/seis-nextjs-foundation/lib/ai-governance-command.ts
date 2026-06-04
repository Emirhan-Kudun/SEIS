export type AiGovernanceRule = {
  id: string;
  policy: string;
  domain: "routing" | "safety" | "cost" | "quality" | "observability";
  status: "enforced" | "watch" | "missing";
  note: string;
};

export type AiProviderHealth = {
  id: string;
  provider: string;
  reliability: string;
  latency: string;
  status: "strong" | "watch" | "degraded";
};

const aiGovernanceRules: AiGovernanceRule[] = [
  {
    id: "aigov-routing-tier",
    policy: "Tiered model routing",
    domain: "routing",
    status: "enforced",
    note: "High-risk decisions are routed with stricter review gates."
  },
  {
    id: "aigov-output-safety",
    policy: "Safety and secret hygiene",
    domain: "safety",
    status: "enforced",
    note: "No secret material is allowed in tracked artifacts."
  },
  {
    id: "aigov-cost-window",
    policy: "Cost-aware execution windows",
    domain: "cost",
    status: "watch",
    note: "Off-peak routing is defined but not fully automated for all flows."
  },
  {
    id: "aigov-quality-audit",
    policy: "Prompt/output quality audits",
    domain: "quality",
    status: "watch",
    note: "Quality sampling cadence should be expanded for newest command modules."
  },
  {
    id: "aigov-observability-ledger",
    policy: "End-to-end AI observability ledger",
    domain: "observability",
    status: "missing",
    note: "Unified ledger schema is still incomplete across all providers."
  }
];

const aiProviderHealth: AiProviderHealth[] = [
  {
    id: "provider-openai",
    provider: "openai",
    reliability: "high",
    latency: "stable",
    status: "strong"
  },
  {
    id: "provider-claude",
    provider: "claude",
    reliability: "high",
    latency: "moderate",
    status: "watch"
  },
  {
    id: "provider-gemini",
    provider: "gemini",
    reliability: "moderate",
    latency: "moderate",
    status: "watch"
  },
  {
    id: "provider-local-fallback",
    provider: "local-fallback",
    reliability: "variable",
    latency: "fast",
    status: "degraded"
  }
];

export function getAiGovernanceRules(): AiGovernanceRule[] {
  return aiGovernanceRules;
}

export function getAiProviderHealth(): AiProviderHealth[] {
  return aiProviderHealth;
}

export function getAiGovernanceSummary() {
  return {
    totalRules: aiGovernanceRules.length,
    enforcedRules: aiGovernanceRules.filter((item) => item.status === "enforced").length,
    watchRules: aiGovernanceRules.filter((item) => item.status === "watch").length,
    missingRules: aiGovernanceRules.filter((item) => item.status === "missing").length,
    providers: aiProviderHealth.length,
    strongProviders: aiProviderHealth.filter((item) => item.status === "strong").length,
    degradedProviders: aiProviderHealth.filter((item) => item.status === "degraded").length
  };
}
