export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RiskItem = {
  id: string;
  title: string;
  level: RiskLevel;
  domain: "frontend" | "backend" | "ops" | "security" | "i18n" | "ai";
  owner: string;
  impact: string;
  likelihood: string;
  triggers: string[];
  mitigations: string[];
  rollbackPlan: string;
};

const riskRegister: RiskItem[] = [
  {
    id: "risk-mobile-regression",
    title: "Mobile Navigation Regression",
    level: "high",
    domain: "frontend",
    owner: "frontend",
    impact: "Navigation break on small devices can block core journey and conversion flow.",
    likelihood: "medium",
    triggers: [
      "Overflow or clipping in menu overlay",
      "Focusable elements hidden behind modal layer",
      "Tap targets below accessibility threshold"
    ],
    mitigations: [
      "Keep nav changes incremental and component-scoped",
      "Verify keyboard and touch interactions together",
      "Preserve existing overlay body-scroll lock behavior"
    ],
    rollbackPlan: "Revert nav delta and restore last stable menu variant."
  },
  {
    id: "risk-release-signal-drift",
    title: "Release Signal Drift",
    level: "critical",
    domain: "ops",
    owner: "operations",
    impact: "Merges may proceed with hidden blockers when readiness signals diverge.",
    likelihood: "medium",
    triggers: [
      "Release score improves while quality scorecard degrades",
      "Gate count changes without corresponding docs update",
      "Failing checks classified as warning by mistake"
    ],
    mitigations: [
      "Review release and quality endpoints together",
      "Track gate weighting changes in commit-level notes",
      "Freeze merges when blocker detection is uncertain"
    ],
    rollbackPlan: "Fallback to explicit manual checklist and pause integration merges."
  },
  {
    id: "risk-api-contract-fragmentation",
    title: "API Contract Fragmentation",
    level: "high",
    domain: "backend",
    owner: "backend",
    impact: "Client panels may break if response shapes diverge across operational endpoints.",
    likelihood: "medium",
    triggers: [
      "Missing fields in metrics or readiness payload",
      "Inconsistent status enums between endpoints",
      "Search result type expansion without UI handling"
    ],
    mitigations: [
      "Keep payloads explicit and typed per route",
      "Add deterministic defaults for optional sections",
      "Mirror new API types in affected UI state models"
    ],
    rollbackPlan: "Restore previous route contract and disable new fields until UI catches up."
  },
  {
    id: "risk-secret-exposure",
    title: "Secret Exposure Through Config Drift",
    level: "critical",
    domain: "security",
    owner: "security",
    impact: "Hardcoded tokens or leaked keys can compromise providers and user data.",
    likelihood: "low",
    triggers: [
      "Credentials in committed files",
      "Provider key values logged in error payloads",
      "Unsafe debug dumps stored in repository"
    ],
    mitigations: [
      "Restrict credentials to environment variables",
      "Keep error responses generic and non-sensitive",
      "Review staged diffs for secret patterns"
    ],
    rollbackPlan: "Rotate affected secrets and revert exposure commit immediately."
  },
  {
    id: "risk-locale-parity-break",
    title: "Locale Parity Break",
    level: "medium",
    domain: "i18n",
    owner: "content",
    impact: "Missing translation keys reduce trust and break multilingual user flows.",
    likelihood: "medium",
    triggers: [
      "TR/EN/FR/IT/DE key mismatch",
      "Route links missing locale query",
      "Fallback language visible in localized sections"
    ],
    mitigations: [
      "Use dictionary-driven rendering only",
      "Verify locale links for new routes",
      "Keep query param sync in all nav surfaces"
    ],
    rollbackPlan: "Fallback to stable locale set and remove newly missing keys."
  },
  {
    id: "risk-ai-workflow-coupling",
    title: "AI Workflow Provider Coupling",
    level: "medium",
    domain: "ai",
    owner: "ai-workflows",
    impact: "Single-provider coupling can block future tooling shifts.",
    likelihood: "medium",
    triggers: [
      "Provider-specific assumptions in UI components",
      "Workflow schema tied to one vendor output style",
      "No fallback mode in orchestration flows"
    ],
    mitigations: [
      "Keep provider-neutral workflow envelopes",
      "Separate execution layer from presentation layer",
      "Maintain hybrid fallback playbooks"
    ],
    rollbackPlan: "Switch to provider-agnostic workflow pack and disable coupled variant."
  }
];

export function getRiskRegister(): RiskItem[] {
  return riskRegister;
}

export function getRiskSummary() {
  const byLevel = riskRegister.reduce<Record<RiskLevel, number>>(
    (acc, item) => {
      acc[item.level] += 1;
      return acc;
    },
    {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    }
  );

  return {
    total: riskRegister.length,
    byLevel
  };
}
