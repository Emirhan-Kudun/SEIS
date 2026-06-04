export type ReleaseScenario = {
  id: string;
  name: string;
  profile: "safe" | "balanced" | "aggressive";
  description: string;
  preconditions: string[];
  blockers: string[];
  rolloutSteps: string[];
  rollbackSteps: string[];
  recommendedWhen: string;
};

const releaseScenarios: ReleaseScenario[] = [
  {
    id: "scenario-safe-gated",
    name: "Safe Gated Release",
    profile: "safe",
    description: "Conservative release flow for high confidence and low operational surprise.",
    preconditions: [
      "No critical quality scorecard cards",
      "Release readiness score >= 80",
      "High-severity governance checks reviewed"
    ],
    blockers: [
      "Any failing gate in release readiness",
      "Missing localization route checks",
      "Unverified mobile navigation changes"
    ],
    rolloutSteps: [
      "Freeze non-essential changes",
      "Run branch governance + local quality gates",
      "Merge only isolated, reviewed commits",
      "Prepare rollback note in PR description"
    ],
    rollbackSteps: [
      "Revert last release commit set",
      "Restore previous route visibility for new modules",
      "Re-open release only after blocker confirmation"
    ],
    recommendedWhen: "Production week or high-visibility launch windows."
  },
  {
    id: "scenario-balanced-incremental",
    name: "Balanced Incremental Rollout",
    profile: "balanced",
    description: "Steady rollout profile for feature growth while preserving rollback simplicity.",
    preconditions: [
      "Release readiness score >= 70",
      "Quality aggregate >= 70",
      "Feature flags define rollback action"
    ],
    blockers: [
      "Critical risk item unresolved",
      "Integration coverage regresses to zero",
      "Search/API contract mismatch detected"
    ],
    rolloutSteps: [
      "Release in two batches (core + extended modules)",
      "Monitor ops console after each batch",
      "Document signal changes in sprint note"
    ],
    rollbackSteps: [
      "Disable new route entries from nav/command palette",
      "Fallback to prior control/ops surfaces",
      "Restore last stable metrics payload shape"
    ],
    recommendedWhen: "Standard weekly iteration with moderate feature volume."
  },
  {
    id: "scenario-aggressive-experiment",
    name: "Aggressive Experiment Window",
    profile: "aggressive",
    description: "High-tempo experiment flow reserved for sandboxed windows, never direct production.",
    preconditions: [
      "Changes isolated from protected release line",
      "Experiment branch with explicit scope",
      "Clear rollback and disable toggles prepared"
    ],
    blockers: [
      "No branch isolation",
      "No feature-flag control",
      "No documented rollback sequence"
    ],
    rolloutSteps: [
      "Enable beta flags only in experimental context",
      "Collect signal variance from quality/release APIs",
      "Promote only proven deltas to stable branch"
    ],
    rollbackSteps: [
      "Disable experiment flags",
      "Close experimental branch merge path",
      "Reconcile findings into docs before retry"
    ],
    recommendedWhen: "Non-production research sprints with strict guardrails."
  }
];

export function getReleaseScenarios(): ReleaseScenario[] {
  return releaseScenarios;
}

export function getReleaseScenarioSummary() {
  return {
    total: releaseScenarios.length,
    safe: releaseScenarios.filter((item) => item.profile === "safe").length,
    balanced: releaseScenarios.filter((item) => item.profile === "balanced").length,
    aggressive: releaseScenarios.filter((item) => item.profile === "aggressive").length
  };
}
