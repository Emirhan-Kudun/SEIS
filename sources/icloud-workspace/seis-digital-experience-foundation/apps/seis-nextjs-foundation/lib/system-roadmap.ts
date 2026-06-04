export type RoadmapPhase = {
  id: string;
  name: string;
  timeframe: string;
  objective: string;
  status: "ready" | "in-progress" | "planned";
  workstreams: string[];
  gates: string[];
  rollbackGuard: string;
};

export type ExecutionTrack = {
  id: string;
  label: string;
  area: "frontend" | "backend" | "product" | "ops" | "ai";
  status: "green" | "watch" | "risk";
  nextAction: string;
};

const roadmapPhases: RoadmapPhase[] = [
  {
    id: "phase-foundation-hardening",
    name: "Foundation Hardening",
    timeframe: "Week 1-2",
    objective: "Stabilize core architecture, quality gates, and release-safe baseline for accelerated iteration.",
    status: "in-progress",
    workstreams: [
      "quality-lab and risk register alignment",
      "metadata and sitemap consistency",
      "branch governance and merge safety checks"
    ],
    gates: [
      "release-readiness score >= 80",
      "quality aggregate >= 75",
      "no high-severity governance regressions"
    ],
    rollbackGuard: "Revert to previous stable integration commit and disable risky feature flags."
  },
  {
    id: "phase-growth-and-conversion",
    name: "Growth and Conversion Intelligence",
    timeframe: "Week 3-4",
    objective: "Connect funnel signals with UX and content improvements for better conversion predictability.",
    status: "planned",
    workstreams: [
      "growth-lab and experience-lab feedback loop",
      "intent-to-contact friction reduction",
      "cross-linking between works, insights, and service surfaces"
    ],
    gates: [
      "funnel experiment coverage >= 8",
      "critical friction count <= 1",
      "contact response SLA defined"
    ],
    rollbackGuard: "Disable conversion experiments and return to baseline information architecture."
  },
  {
    id: "phase-provider-and-automation",
    name: "Provider and Automation Expansion",
    timeframe: "Week 5-6",
    objective: "Scale AI/provider orchestration with strict governance and connector boundaries.",
    status: "planned",
    workstreams: [
      "provider-hub rollout",
      "on-demand connector playbook registry",
      "workflow portability and fallback hardening"
    ],
    gates: [
      "provider fallback tests green",
      "connector registry classified by risk",
      "no secret-management policy violations"
    ],
    rollbackGuard: "Switch to single-provider safe mode and freeze connector expansion until audited."
  },
  {
    id: "phase-launch-readiness",
    name: "Launch Readiness Sprint",
    timeframe: "Week 7",
    objective: "Finalize deployment posture, QA evidence, and explicit rollback pathways.",
    status: "ready",
    workstreams: [
      "release-lab final scenario run",
      "launch checklist completion",
      "preview deploy validation and incident drill"
    ],
    gates: [
      "launch checklist done >= 90%",
      "release-lab preferred scenario selected",
      "incident response playbook approved"
    ],
    rollbackGuard: "Pause release, revert to previous deployment artifact, and reopen launch checklist blockers."
  }
];

const executionTracks: ExecutionTrack[] = [
  {
    id: "track-frontend-premium",
    label: "Premium Frontend Surface",
    area: "frontend",
    status: "green",
    nextAction: "Expand quality-lab visual telemetry with route-level score slices."
  },
  {
    id: "track-product-funnel",
    label: "Product Funnel Intelligence",
    area: "product",
    status: "watch",
    nextAction: "Run growth experiment backlog and prioritize highest-friction stage."
  },
  {
    id: "track-ops-governance",
    label: "Ops + Governance Layer",
    area: "ops",
    status: "green",
    nextAction: "Keep release-readiness and governance matrix synchronized pre-merge."
  },
  {
    id: "track-backend-predictability",
    label: "Backend Predictability",
    area: "backend",
    status: "watch",
    nextAction: "Add API schema guardrails for new orchestration endpoints."
  },
  {
    id: "track-ai-provider-portability",
    label: "AI Provider Portability",
    area: "ai",
    status: "risk",
    nextAction: "Define provider-neutral payload contract and fallback sequencing tests."
  }
];

export function getSystemRoadmapPhases(): RoadmapPhase[] {
  return roadmapPhases;
}

export function getExecutionTracks(): ExecutionTrack[] {
  return executionTracks;
}

export function getRoadmapSummary() {
  return {
    totalPhases: roadmapPhases.length,
    readyPhases: roadmapPhases.filter((item) => item.status === "ready").length,
    inProgressPhases: roadmapPhases.filter((item) => item.status === "in-progress").length,
    plannedPhases: roadmapPhases.filter((item) => item.status === "planned").length,
    tracks: executionTracks.length,
    greenTracks: executionTracks.filter((item) => item.status === "green").length,
    watchTracks: executionTracks.filter((item) => item.status === "watch").length,
    riskTracks: executionTracks.filter((item) => item.status === "risk").length
  };
}
