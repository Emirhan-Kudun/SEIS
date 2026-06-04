export type GovernanceDomain =
  | "git"
  | "frontend"
  | "backend"
  | "security"
  | "performance"
  | "i18n"
  | "operations"
  | "ai-workflows";

export type GovernanceRule = {
  id: string;
  title: string;
  domain: GovernanceDomain;
  severity: "low" | "medium" | "high";
  description: string;
  validation: string;
  rollback: string;
};

const governanceRules: GovernanceRule[] = [
  {
    id: "git-main-protection",
    title: "Main Branch Protection",
    domain: "git",
    severity: "high",
    description: "No direct development, push, or deploy actions are allowed on main/master.",
    validation: "Run branch governance checks and confirm active branch is non-protected.",
    rollback: "Revert via isolated feature commit or safe branch rollback."
  },
  {
    id: "diff-based-delivery",
    title: "Incremental Diff Discipline",
    domain: "operations",
    severity: "high",
    description: "Changes must stay incremental and reversible; avoid broad rewrites without approval.",
    validation: "Compare staged scope against task intent and ensure isolated commit purpose.",
    rollback: "Revert single-purpose commit or discard isolated branch segment."
  },
  {
    id: "responsive-integrity",
    title: "Responsive Integrity",
    domain: "frontend",
    severity: "high",
    description: "Desktop and mobile experiences are both first-class and must remain stable.",
    validation: "Check responsive layout behavior at small, medium, and wide breakpoints.",
    rollback: "Restore prior layout primitives and spacing tokens from last known stable commit."
  },
  {
    id: "a11y-motion-balance",
    title: "Accessibility + Motion Balance",
    domain: "frontend",
    severity: "high",
    description: "Motion systems must preserve readability, focus order, and reduced-motion fallback.",
    validation: "Verify focus states, keyboard paths, and reduced-motion alternatives.",
    rollback: "Disable decorative motion layers and keep semantic interaction flow."
  },
  {
    id: "api-contract-safety",
    title: "API Contract Safety",
    domain: "backend",
    severity: "medium",
    description: "API payloads should remain explicit, typed, and backward-compatible for clients.",
    validation: "Confirm endpoint schemas and status responses remain deterministic.",
    rollback: "Roll back endpoint contract to previous schema and isolate breaking fields."
  },
  {
    id: "secret-hygiene",
    title: "Secret Hygiene",
    domain: "security",
    severity: "high",
    description: "No tokens, credentials, or provider secrets can enter repository files or prompts.",
    validation: "Use environment variables and inspect code for hardcoded secret patterns.",
    rollback: "Rotate leaked credentials and purge accidental exposure from history if needed."
  },
  {
    id: "render-budget-control",
    title: "Render Budget Control",
    domain: "performance",
    severity: "medium",
    description: "Premium visuals must remain lightweight with GPU-safe animation patterns.",
    validation: "Prefer transform/opacity transitions and avoid paint-heavy effects by default.",
    rollback: "Remove heavy effects and restore baseline tokenized visual styles."
  },
  {
    id: "multilingual-stability",
    title: "Multilingual Stability",
    domain: "i18n",
    severity: "medium",
    description: "TR/EN/FR/IT/DE layers should stay structurally aligned and query-safe.",
    validation: "Verify localized routes and dictionary keys remain synchronized.",
    rollback: "Fallback to stable locale dictionary and restore missing translation keys."
  },
  {
    id: "ai-provider-portability",
    title: "AI Provider Portability",
    domain: "ai-workflows",
    severity: "medium",
    description: "OpenAI/Gemini/Claude integrations should remain swappable through clear contracts.",
    validation: "Use shared envelopes and avoid direct UI lock-in to one provider.",
    rollback: "Route through neutral adapter layer and disable provider-specific coupling."
  },
  {
    id: "release-gate-signal",
    title: "Release Gate Signal",
    domain: "operations",
    severity: "high",
    description: "Readiness scoring and gate status must be visible before merge decisions.",
    validation: "Review release readiness and quality score endpoints in control board.",
    rollback: "Pause merge, document blockers, and isolate risk patches."
  }
];

export function getGovernanceRules(): GovernanceRule[] {
  return governanceRules;
}

export function getGovernanceSummary() {
  const byDomain = governanceRules.reduce<Record<GovernanceDomain, number>>(
    (acc, item) => {
      acc[item.domain] += 1;
      return acc;
    },
    {
      git: 0,
      frontend: 0,
      backend: 0,
      security: 0,
      performance: 0,
      i18n: 0,
      operations: 0,
      "ai-workflows": 0
    }
  );

  return {
    total: governanceRules.length,
    highSeverity: governanceRules.filter((rule) => rule.severity === "high").length,
    mediumSeverity: governanceRules.filter((rule) => rule.severity === "medium").length,
    lowSeverity: governanceRules.filter((rule) => rule.severity === "low").length,
    byDomain
  };
}
