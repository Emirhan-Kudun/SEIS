export type ExperimentTrack = {
  id: string;
  hypothesis: string;
  metric: string;
  status: "running" | "planned" | "done" | "risk";
  owner: string;
  note: string;
};

export type GrowthLoop = {
  id: string;
  title: string;
  stage: "acquisition" | "activation" | "retention" | "referral";
  status: "active" | "watch" | "planned";
};

const experimentTracks: ExperimentTrack[] = [
  {
    id: "exp-hero-trust-snapshot",
    hypothesis: "Trust snapshot in hero increases high-intent navigation depth.",
    metric: "hero -> strategy click-through",
    status: "running",
    owner: "growth",
    note: "Early signal is positive on technical visitor segment."
  },
  {
    id: "exp-service-packaging",
    hypothesis: "Outcome-oriented service cards improve contact conversion.",
    metric: "services -> contact submit",
    status: "planned",
    owner: "product",
    note: "Awaiting localized copy finalization for parity launch."
  },
  {
    id: "exp-mobile-ops-collapsible",
    hypothesis: "Collapsible ops cards reduce mobile cognitive load.",
    metric: "mobile ops dwell + bounce",
    status: "running",
    owner: "ux-research",
    note: "Prototype ready for controlled rollout."
  },
  {
    id: "exp-command-density",
    hypothesis: "Too many command routes reduce first-session clarity.",
    metric: "command palette search abandon rate",
    status: "risk",
    owner: "product-ops",
    note: "Route expansion requires guided grouping and staged reveal logic."
  }
];

const growthLoops: GrowthLoop[] = [
  {
    id: "loop-insight-to-case",
    title: "Insights to case-study credibility loop",
    stage: "activation",
    status: "active"
  },
  {
    id: "loop-service-to-contact",
    title: "Service intent to contact conversion loop",
    stage: "activation",
    status: "watch"
  },
  {
    id: "loop-case-to-referral",
    title: "Case study trust to referral loop",
    stage: "referral",
    status: "planned"
  },
  {
    id: "loop-retention-newsletter",
    title: "Newsletter retention and return loop",
    stage: "retention",
    status: "active"
  }
];

export function getExperimentTracks(): ExperimentTrack[] {
  return experimentTracks;
}

export function getGrowthLoops(): GrowthLoop[] {
  return growthLoops;
}

export function getExperimentSummary() {
  return {
    totalTracks: experimentTracks.length,
    runningTracks: experimentTracks.filter((item) => item.status === "running").length,
    plannedTracks: experimentTracks.filter((item) => item.status === "planned").length,
    doneTracks: experimentTracks.filter((item) => item.status === "done").length,
    riskTracks: experimentTracks.filter((item) => item.status === "risk").length,
    growthLoops: growthLoops.length,
    activeLoops: growthLoops.filter((item) => item.status === "active").length,
    watchLoops: growthLoops.filter((item) => item.status === "watch").length
  };
}
