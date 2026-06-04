export type PipelinePhase = {
  id: string;
  name: string;
  status: "stable" | "watch" | "blocked";
  objective: string;
  checkpoints: string[];
  owner: string;
};

export type DeliveryCadence = {
  id: string;
  label: string;
  interval: string;
  status: "active" | "planned";
  note: string;
};

const pipelinePhases: PipelinePhase[] = [
  {
    id: "pipeline-design-intake",
    name: "Design and Product Intake",
    status: "stable",
    objective: "Convert creative goals into scoped, testable implementation units.",
    checkpoints: [
      "user journey intent defined",
      "UI hierarchy and accessibility notes approved",
      "feature scope mapped to route/module boundaries"
    ],
    owner: "product-design"
  },
  {
    id: "pipeline-implementation",
    name: "Implementation and Integration",
    status: "stable",
    objective: "Deliver incremental diffs aligned with architecture and branch safety.",
    checkpoints: [
      "small reversible commits",
      "API and UI contract alignment",
      "navigation and discovery updates synced"
    ],
    owner: "engineering"
  },
  {
    id: "pipeline-quality-assurance",
    name: "Quality and Readiness",
    status: "watch",
    objective: "Protect release quality through consolidated gates and telemetry.",
    checkpoints: [
      "quality-scorecard reviewed",
      "release-readiness gates reconciled",
      "critical risk items reviewed"
    ],
    owner: "qa-ops"
  },
  {
    id: "pipeline-release-governance",
    name: "Release Governance",
    status: "watch",
    objective: "Prepare merge and deployment decisions with explicit rollback narratives.",
    checkpoints: [
      "pre-merge governance checks pass",
      "incident drill readiness confirmed",
      "branch strategy and launch checklist aligned"
    ],
    owner: "release-ops"
  },
  {
    id: "pipeline-feedback-loop",
    name: "Feedback and Iteration Loop",
    status: "stable",
    objective: "Close the loop with growth and experience intelligence for next sprint.",
    checkpoints: [
      "funnel friction updates logged",
      "experiment outcomes recorded",
      "roadmap priorities adjusted"
    ],
    owner: "product-ops"
  }
];

const deliveryCadence: DeliveryCadence[] = [
  {
    id: "cadence-daily-ops-sync",
    label: "Daily Ops Sync",
    interval: "daily",
    status: "active",
    note: "Short gate and blocker review before major changes."
  },
  {
    id: "cadence-weekly-release-lab",
    label: "Weekly Release Lab",
    interval: "weekly",
    status: "active",
    note: "Scenario simulation and rollback readiness checkpoint."
  },
  {
    id: "cadence-biweekly-growth-review",
    label: "Bi-weekly Growth Review",
    interval: "bi-weekly",
    status: "planned",
    note: "Consolidate funnel and experience experiment outcomes."
  },
  {
    id: "cadence-monthly-architecture",
    label: "Monthly Architecture Review",
    interval: "monthly",
    status: "planned",
    note: "Check complexity growth and technical debt trajectory."
  }
];

export function getPipelinePhases(): PipelinePhase[] {
  return pipelinePhases;
}

export function getDeliveryCadence(): DeliveryCadence[] {
  return deliveryCadence;
}

export function getPipelineSummary() {
  return {
    totalPhases: pipelinePhases.length,
    stablePhases: pipelinePhases.filter((item) => item.status === "stable").length,
    watchPhases: pipelinePhases.filter((item) => item.status === "watch").length,
    blockedPhases: pipelinePhases.filter((item) => item.status === "blocked").length,
    totalCadenceItems: deliveryCadence.length,
    activeCadenceItems: deliveryCadence.filter((item) => item.status === "active").length,
    plannedCadenceItems: deliveryCadence.filter((item) => item.status === "planned").length
  };
}
