export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentScenario = {
  id: string;
  title: string;
  domain: "frontend" | "backend" | "ops" | "security" | "integration";
  severity: IncidentSeverity;
  detectionSignals: string[];
  firstResponse: string[];
  rollbackPath: string;
  owner: string;
  slaMinutes: number;
};

export type IncidentDrill = {
  id: string;
  name: string;
  frequency: string;
  status: "ready" | "planned" | "running";
  objective: string;
};

const incidentScenarios: IncidentScenario[] = [
  {
    id: "incident-mobile-nav-lock",
    title: "Mobile navigation lock on critical routes",
    domain: "frontend",
    severity: "high",
    detectionSignals: [
      "drop in mobile CTA click-through",
      "increased bounce from nav-heavy pages",
      "support reports for blocked menu interaction"
    ],
    firstResponse: [
      "disable latest nav variant",
      "restore prior nav component snapshot",
      "verify keyboard and touch path under 390px"
    ],
    rollbackPath: "Revert navigation patch to last stable commit and clear cached bundles.",
    owner: "frontend-ops",
    slaMinutes: 20
  },
  {
    id: "incident-api-shape-drift",
    title: "Operational API response shape drift",
    domain: "backend",
    severity: "critical",
    detectionSignals: [
      "control center cards showing undefined",
      "release-readiness gate mismatch",
      "runtime errors on studio telemetry panel"
    ],
    firstResponse: [
      "switch affected API to compatibility payload",
      "apply schema fallback defaults",
      "pause non-essential route releases"
    ],
    rollbackPath: "Restore prior route contract and disable newly added fields behind feature flag.",
    owner: "backend-ops",
    slaMinutes: 15
  },
  {
    id: "incident-provider-fallback-fail",
    title: "Provider fallback flow failure",
    domain: "integration",
    severity: "high",
    detectionSignals: [
      "orchestration readiness status drops to critical",
      "provider channel reports stale",
      "automation runbook fallback steps skipped"
    ],
    firstResponse: [
      "force provider-safe mode",
      "disable non-core connector calls",
      "validate fallback sequence manually"
    ],
    rollbackPath: "Route all AI calls to baseline provider contract while fallback matrix is repaired.",
    owner: "ai-ops",
    slaMinutes: 25
  },
  {
    id: "incident-release-gate-desync",
    title: "Release and quality gate desynchronization",
    domain: "ops",
    severity: "critical",
    detectionSignals: [
      "release score improves while quality band degrades",
      "gates count diverges between APIs",
      "merge recommendation not matching blockers"
    ],
    firstResponse: [
      "freeze merge actions",
      "run unified readiness snapshot",
      "reconcile gate weights"
    ],
    rollbackPath: "Use manual merge checklist and revert scoring changes introduced in latest patch.",
    owner: "release-ops",
    slaMinutes: 10
  },
  {
    id: "incident-security-header-regression",
    title: "Security header regression on dynamic routes",
    domain: "security",
    severity: "high",
    detectionSignals: [
      "header check alerts",
      "preview deploy security scan failures",
      "browser console CSP anomalies"
    ],
    firstResponse: [
      "restore known-good security headers",
      "disable risky middleware experiment",
      "rerun route-level header verification"
    ],
    rollbackPath: "Rollback middleware/security config changes and redeploy previous build artifact.",
    owner: "security-ops",
    slaMinutes: 30
  }
];

const incidentDrills: IncidentDrill[] = [
  {
    id: "drill-gateway-fallback",
    name: "Provider Gateway Fallback Drill",
    frequency: "weekly",
    status: "ready",
    objective: "Verify fallback path from provider-neutral contract to single-provider safe mode."
  },
  {
    id: "drill-release-gate-recovery",
    name: "Release Gate Recovery Drill",
    frequency: "weekly",
    status: "ready",
    objective: "Validate fast recovery when release-readiness and quality-scorecard diverge."
  },
  {
    id: "drill-mobile-hotfix",
    name: "Mobile Hotfix Drill",
    frequency: "bi-weekly",
    status: "planned",
    objective: "Practice rapid rollback for mobile UX blocking defects."
  },
  {
    id: "drill-security-config-restore",
    name: "Security Config Restore Drill",
    frequency: "monthly",
    status: "planned",
    objective: "Test restoration of secure defaults after accidental configuration drift."
  }
];

export function getIncidentScenarios(): IncidentScenario[] {
  return incidentScenarios;
}

export function getIncidentDrills(): IncidentDrill[] {
  return incidentDrills;
}

export function getIncidentSummary() {
  return {
    totalScenarios: incidentScenarios.length,
    criticalScenarios: incidentScenarios.filter((item) => item.severity === "critical").length,
    highScenarios: incidentScenarios.filter((item) => item.severity === "high").length,
    averageSlaMinutes: Math.round(
      incidentScenarios.reduce((sum, item) => sum + item.slaMinutes, 0) / incidentScenarios.length
    ),
    totalDrills: incidentDrills.length,
    readyDrills: incidentDrills.filter((item) => item.status === "ready").length,
    plannedDrills: incidentDrills.filter((item) => item.status === "planned").length
  };
}
