export type FunnelStage = {
  id: string;
  name: string;
  objective: string;
  keyEvents: string[];
  risks: string[];
  optimizations: string[];
};

const funnelStages: FunnelStage[] = [
  {
    id: "funnel-awareness",
    name: "Awareness",
    objective: "Create immediate clarity on premium positioning and service value.",
    keyEvents: ["hero_cta_viewed", "section_scroll_depth_50", "insight_preview_opened"],
    risks: ["Unclear value proposition", "Visual overload above the fold"],
    optimizations: ["Refine headline clarity", "Tighten hero content hierarchy", "Keep visual breathing space"]
  },
  {
    id: "funnel-consideration",
    name: "Consideration",
    objective: "Guide visitors through trust signals and capability proof.",
    keyEvents: ["work_opened", "case_opened", "insight_opened", "command_item_selected"],
    risks: ["Fragmented route journey", "Insufficient proof density"],
    optimizations: ["Improve cross-linking between works/cases/insights", "Highlight measurable outcomes"]
  },
  {
    id: "funnel-intent",
    name: "Intent",
    objective: "Convert high-intent traffic to concrete project planning actions.",
    keyEvents: ["service_estimate_generated", "newsletter_submitted", "control_search_executed"],
    risks: ["Form friction", "Insufficient proposal clarity"],
    optimizations: ["Reduce form friction", "Improve estimate explanation", "Expose strategy/release confidence signals"]
  },
  {
    id: "funnel-conversion",
    name: "Conversion",
    objective: "Turn qualified intent into tracked build requests and next-step commitments.",
    keyEvents: ["contact_submitted", "service_package_selected", "ops_signal_reviewed"],
    risks: ["Delayed response handoff", "No follow-up workflow mapping"],
    optimizations: ["Define response SLA", "Prepare standardized follow-up sequence", "Keep risk+rollback narrative transparent"]
  }
];

export function getFunnelStages(): FunnelStage[] {
  return funnelStages;
}

export function getFunnelSummary() {
  return {
    stages: funnelStages.length,
    totalEvents: funnelStages.reduce((sum, stage) => sum + stage.keyEvents.length, 0),
    totalOptimizations: funnelStages.reduce((sum, stage) => sum + stage.optimizations.length, 0)
  };
}
