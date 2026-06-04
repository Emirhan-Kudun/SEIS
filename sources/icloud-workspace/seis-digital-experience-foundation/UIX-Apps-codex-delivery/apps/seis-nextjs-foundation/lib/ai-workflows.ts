export type AiWorkflowProvider = "openai" | "gemini" | "claude" | "hybrid";

export type AiWorkflowPack = {
  id: string;
  name: string;
  provider: AiWorkflowProvider;
  goal: string;
  inputs: string[];
  outputs: string[];
  checkpoints: string[];
  riskLevel: "low" | "medium" | "high";
};

const aiWorkflowPacks: AiWorkflowPack[] = [
  {
    id: "workflow-content-intelligence",
    name: "Content Intelligence Pipeline",
    provider: "hybrid",
    goal: "Generate and score multilingual landing-page copy with governance-safe review prompts.",
    inputs: ["content snapshot", "brand voice rules", "locale constraints"],
    outputs: ["candidate copy blocks", "quality scores", "review checklist"],
    checkpoints: [
      "Preserve TR/EN/FR/IT/DE structural parity.",
      "Reject low-contrast or ambiguous CTA copy.",
      "Export only reviewable diffs."
    ],
    riskLevel: "medium"
  },
  {
    id: "workflow-design-critique",
    name: "Design Critique Assistant",
    provider: "claude",
    goal: "Evaluate hierarchy, spacing rhythm, and visual clutter risks before shipping major UI updates.",
    inputs: ["screen captures", "component map", "design tokens"],
    outputs: ["critique summary", "severity labels", "targeted fix recommendations"],
    checkpoints: [
      "Focus on hierarchy and readability first.",
      "Flag motion overload and visual noise.",
      "Attach actionable, component-level recommendations."
    ],
    riskLevel: "low"
  },
  {
    id: "workflow-release-gate",
    name: "Release Gate Narrator",
    provider: "openai",
    goal: "Turn telemetry and quality signals into a concise release readiness narrative.",
    inputs: ["health endpoint", "metrics endpoint", "integration status"],
    outputs: ["release decision brief", "risk summary", "rollback notes"],
    checkpoints: [
      "Do not hide failing checks.",
      "Map each risk to a rollback path.",
      "Keep recommendations branch-safe."
    ],
    riskLevel: "medium"
  },
  {
    id: "workflow-search-curation",
    name: "Search Result Curator",
    provider: "gemini",
    goal: "Classify portfolio, case, and insight search results by intent and relevance.",
    inputs: ["query", "domain", "search results"],
    outputs: ["intent label", "ranking hints", "follow-up route suggestions"],
    checkpoints: [
      "Preserve deterministic fallback ordering.",
      "Avoid biased ranking toward one content type.",
      "Keep response payload lightweight."
    ],
    riskLevel: "low"
  },
  {
    id: "workflow-incident-triage",
    name: "Incident Triage Chain",
    provider: "hybrid",
    goal: "Convert repeated form/API anomalies into structured incident timelines and remediation plans.",
    inputs: ["event logs", "error payloads", "health snapshots"],
    outputs: ["incident report", "containment steps", "verification checklist"],
    checkpoints: [
      "Separate user-input errors from platform failures.",
      "Require explicit owner for each remediation item.",
      "Track unresolved high-risk anomalies."
    ],
    riskLevel: "high"
  }
];

export function getAiWorkflowPacks(): AiWorkflowPack[] {
  return aiWorkflowPacks;
}

export function getAiWorkflowStats() {
  const providerCounts = aiWorkflowPacks.reduce<Record<AiWorkflowProvider, number>>(
    (acc, item) => {
      acc[item.provider] += 1;
      return acc;
    },
    {
      openai: 0,
      gemini: 0,
      claude: 0,
      hybrid: 0
    }
  );

  return {
    total: aiWorkflowPacks.length,
    providerCounts,
    highRiskCount: aiWorkflowPacks.filter((item) => item.riskLevel === "high").length
  };
}
