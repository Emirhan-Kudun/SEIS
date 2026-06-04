export type BenchCapabilityGroup = {
  id: string;
  title: string;
  areas: string[];
  outputExamples: string[];
};

const benchCapabilityGroups: BenchCapabilityGroup[] = [
  {
    id: "design-direction",
    title: "Designer-Grade Direction",
    areas: [
      "cinematic layout composition",
      "premium spacing rhythm",
      "responsive typography systems",
      "visual hierarchy strategy",
      "motion restraint and readability"
    ],
    outputExamples: ["hero composition specs", "design token layering", "conversion-oriented section narratives"]
  },
  {
    id: "frontend-engineering",
    title: "Production Frontend Systems",
    areas: [
      "Next.js App Router architecture",
      "TypeScript-safe component patterns",
      "Tailwind token usage",
      "performance-aware rendering",
      "accessibility-first interactions"
    ],
    outputExamples: ["modular pages", "search/filter interfaces", "route-level metadata and feeds"]
  },
  {
    id: "fullstack-platform",
    title: "Fullstack API and Platform Layer",
    areas: [
      "deterministic route handlers",
      "safe payload validation",
      "release readiness scoring",
      "integration health visibility",
      "rollback-friendly endpoint contracts"
    ],
    outputExamples: ["health APIs", "quality scorecards", "system manifests"]
  },
  {
    id: "ai-workflow-orchestration",
    title: "AI-Native Workflow Orchestration",
    areas: [
      "provider-portable workflow packs",
      "automation playbook architecture",
      "prompt-governed review loops",
      "triage and incident simulation",
      "content intelligence sequencing"
    ],
    outputExamples: ["AI workflow registry", "playbook control surfaces", "gating narratives"]
  },
  {
    id: "devops-governance",
    title: "Governance + Delivery Discipline",
    areas: [
      "branch protection workflows",
      "quality gate enforcement",
      "rollback safety planning",
      "release risk classification",
      "documentation-driven handoff"
    ],
    outputExamples: ["sprint runbooks", "governance matrix", "pre-merge safety checklist"]
  }
];

export function getBenchCapabilityGroups(): BenchCapabilityGroup[] {
  return benchCapabilityGroups;
}

export function getBenchCapabilitySummary() {
  return {
    groups: benchCapabilityGroups.length,
    areas: benchCapabilityGroups.reduce((sum, item) => sum + item.areas.length, 0),
    outputExamples: benchCapabilityGroups.reduce((sum, item) => sum + item.outputExamples.length, 0)
  };
}
