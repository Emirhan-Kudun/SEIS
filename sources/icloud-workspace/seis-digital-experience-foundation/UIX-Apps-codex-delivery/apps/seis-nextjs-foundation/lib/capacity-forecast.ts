export type CapacityModel = {
  id: string;
  surface: string;
  baseline: string;
  forecast: string;
  status: "safe" | "watch" | "risk";
  bottleneck: string;
  mitigation: string;
};

export type ScalingStep = {
  id: string;
  priority: "p1" | "p2" | "p3";
  title: string;
  owner: string;
  status: "planned" | "active" | "completed";
};

const capacityModels: CapacityModel[] = [
  {
    id: "capacity-api-throughput",
    surface: "Operational API throughput",
    baseline: "~38 req/s",
    forecast: "~74 req/s",
    status: "watch",
    bottleneck: "Search + orchestration endpoint fan-out",
    mitigation: "Cache low-volatility summary blocks and batch expensive aggregations."
  },
  {
    id: "capacity-client-payload",
    surface: "Client-side payload density",
    baseline: "~246KB initial JS",
    forecast: "~285KB",
    status: "risk",
    bottleneck: "Route discovery expansion and interactive dashboard surfaces",
    mitigation: "Move non-critical widgets to lazy boundaries and reduce initial hydration scope."
  },
  {
    id: "capacity-content-index",
    surface: "Searchable content index",
    baseline: "~120 indexed entries",
    forecast: "~220 indexed entries",
    status: "safe",
    bottleneck: "N/A",
    mitigation: "Keep typed search domains and limit defaults for heavy queries."
  },
  {
    id: "capacity-ops-monitoring",
    surface: "Ops monitoring query load",
    baseline: "~8 dashboards",
    forecast: "~16 dashboards",
    status: "watch",
    bottleneck: "Repeated fetch loops from concurrent panels",
    mitigation: "Introduce staggered polling windows and shared signal endpoints."
  }
];

const scalingSteps: ScalingStep[] = [
  {
    id: "scale-step-lazy-panels",
    priority: "p1",
    title: "Lazy-load non-blocking operational panels",
    owner: "frontend-performance",
    status: "planned"
  },
  {
    id: "scale-step-snapshot-cache",
    priority: "p1",
    title: "Cache system manifest and snapshot derivations",
    owner: "backend-ops",
    status: "active"
  },
  {
    id: "scale-step-search-index-tiers",
    priority: "p2",
    title: "Tier search index by domain volatility",
    owner: "platform",
    status: "planned"
  },
  {
    id: "scale-step-telemetry-window",
    priority: "p2",
    title: "Introduce telemetry poll window scheduler",
    owner: "ops",
    status: "planned"
  },
  {
    id: "scale-step-budget-alerts",
    priority: "p3",
    title: "Automate budget-alert publishing",
    owner: "release-ops",
    status: "planned"
  }
];

export function getCapacityModels(): CapacityModel[] {
  return capacityModels;
}

export function getScalingSteps(): ScalingStep[] {
  return scalingSteps;
}

export function getCapacitySummary() {
  return {
    totalModels: capacityModels.length,
    safeModels: capacityModels.filter((item) => item.status === "safe").length,
    watchModels: capacityModels.filter((item) => item.status === "watch").length,
    riskModels: capacityModels.filter((item) => item.status === "risk").length,
    scalingSteps: scalingSteps.length,
    activeScalingSteps: scalingSteps.filter((item) => item.status === "active").length,
    plannedScalingSteps: scalingSteps.filter((item) => item.status === "planned").length
  };
}
