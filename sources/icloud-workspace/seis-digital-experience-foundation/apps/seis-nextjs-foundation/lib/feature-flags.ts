export type FeatureFlagStatus = "enabled" | "beta" | "planned" | "paused";

export type FeatureFlag = {
  id: string;
  name: string;
  status: FeatureFlagStatus;
  owner: string;
  description: string;
  rollbackAction: string;
};

const featureFlags: FeatureFlag[] = [
  {
    id: "flag-control-center",
    name: "Control Center Surface",
    status: "enabled",
    owner: "frontend",
    description: "Unified release/search operating surface for fast production decisions.",
    rollbackAction: "Route users back to /studio while keeping API layer active."
  },
  {
    id: "flag-playbooks-registry",
    name: "Playbooks Registry",
    status: "enabled",
    owner: "operations",
    description: "Operational runbooks for automation and multi-model workflows.",
    rollbackAction: "Hide /playbooks from nav and keep APIs internal-only."
  },
  {
    id: "flag-release-readiness",
    name: "Release Readiness API",
    status: "enabled",
    owner: "backend",
    description: "Weighted gate scoring for production safety decisions.",
    rollbackAction: "Fallback to static checklist until endpoint issues are resolved."
  },
  {
    id: "flag-quality-scorecard",
    name: "Quality Scorecard API",
    status: "beta",
    owner: "operations",
    description: "Composite score blending content, integration, and governance coverage.",
    rollbackAction: "Disable scorecard calls in ops UI; keep telemetry and health checks."
  },
  {
    id: "flag-bench-capability-index",
    name: "Bench Capability Index",
    status: "enabled",
    owner: "product",
    description: "Structured capability catalog across design, frontend, backend, AI, and DevOps.",
    rollbackAction: "Serve static markdown capability docs until API restores."
  },
  {
    id: "flag-governance-matrix",
    name: "Governance Matrix",
    status: "enabled",
    owner: "governance",
    description: "Rule matrix with validation and rollback guidance per domain.",
    rollbackAction: "Fallback to AGENTS.md + docs governance references."
  },
  {
    id: "flag-ops-activity-pulse",
    name: "Ops Activity Pulse",
    status: "planned",
    owner: "operations",
    description: "Live activity stream from search, forms, and release endpoints.",
    rollbackAction: "Keep static signal cards only."
  },
  {
    id: "flag-ai-workflow-simulation",
    name: "AI Workflow Simulation",
    status: "beta",
    owner: "ai-workflows",
    description: "Dry-run simulation mode for AI workflow packs without provider calls.",
    rollbackAction: "Disable simulation toggle and use documentation-driven review."
  }
];

export function getFeatureFlags(): FeatureFlag[] {
  return featureFlags;
}

export function getFeatureFlagSummary() {
  const byStatus = featureFlags.reduce<Record<FeatureFlagStatus, number>>(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    {
      enabled: 0,
      beta: 0,
      planned: 0,
      paused: 0
    }
  );

  return {
    total: featureFlags.length,
    byStatus
  };
}
