export type ExperienceSignal = {
  id: string;
  area: string;
  score: number;
  band: "strong" | "watch" | "weak";
  note: string;
};

export type JourneyFriction = {
  id: string;
  stage: "awareness" | "consideration" | "intent" | "conversion";
  severity: "low" | "medium" | "high";
  symptom: string;
  action: string;
};

export type ExperimentBacklogItem = {
  id: string;
  title: string;
  stage: "awareness" | "consideration" | "intent" | "conversion";
  expectedImpact: "low" | "medium" | "high";
  effort: "small" | "medium" | "large";
  status: "planned" | "active" | "completed";
};

const experienceSignals: ExperienceSignal[] = [
  {
    id: "signal-hero-clarity",
    area: "Hero clarity and value communication",
    score: 84,
    band: "strong",
    note: "Headline hierarchy is clear and premium; CTA context is easy to parse."
  },
  {
    id: "signal-work-proof-density",
    area: "Proof density in works and cases",
    score: 76,
    band: "watch",
    note: "Cross-linking is strong, but measurable outcome blocks can be increased."
  },
  {
    id: "signal-contact-friction",
    area: "Contact flow friction",
    score: 69,
    band: "watch",
    note: "Form is functional; intent qualification hints can still be simplified."
  },
  {
    id: "signal-mobile-readability",
    area: "Mobile readability and scanability",
    score: 82,
    band: "strong",
    note: "Section rhythm remains readable with controlled text density."
  },
  {
    id: "signal-trust-surface",
    area: "Trust and reliability surface",
    score: 72,
    band: "watch",
    note: "Ops/governance visibility is strong; add clearer business outcome narrative."
  },
  {
    id: "signal-motion-restraint",
    area: "Motion restraint versus clarity",
    score: 88,
    band: "strong",
    note: "Animation usage stays supportive without overwhelming content flow."
  }
];

const journeyFrictions: JourneyFriction[] = [
  {
    id: "friction-awareness-narrative",
    stage: "awareness",
    severity: "medium",
    symptom: "Some visitors may not immediately map SEIS capability depth to their own product stage.",
    action: "Add one concise positioning block mapping startup, scale-up, and agency needs."
  },
  {
    id: "friction-consideration-evidence",
    stage: "consideration",
    severity: "medium",
    symptom: "Case detail depth is strong but quantitative impact is uneven between entries.",
    action: "Normalize case-study outcome blocks with before/after metrics."
  },
  {
    id: "friction-intent-form-depth",
    stage: "intent",
    severity: "high",
    symptom: "Request form can feel long for cold traffic with low trust readiness.",
    action: "Introduce staged progressive disclosure for advanced fields."
  },
  {
    id: "friction-conversion-handoff",
    stage: "conversion",
    severity: "medium",
    symptom: "Post-submit response expectations are implicit.",
    action: "Show response SLA and next-step timeline after contact submission."
  }
];

const experimentBacklog: ExperimentBacklogItem[] = [
  {
    id: "exp-proof-grid-variant-a",
    title: "Proof Grid Variant A",
    stage: "consideration",
    expectedImpact: "high",
    effort: "medium",
    status: "planned"
  },
  {
    id: "exp-hero-subtitle-short",
    title: "Hero Subtitle Compression",
    stage: "awareness",
    expectedImpact: "medium",
    effort: "small",
    status: "active"
  },
  {
    id: "exp-contact-stepper",
    title: "Contact Form Stepper",
    stage: "intent",
    expectedImpact: "high",
    effort: "large",
    status: "planned"
  },
  {
    id: "exp-case-metric-cards",
    title: "Case Metric Cards",
    stage: "consideration",
    expectedImpact: "medium",
    effort: "small",
    status: "active"
  },
  {
    id: "exp-post-submit-roadmap",
    title: "Post-submit Next-step Roadmap",
    stage: "conversion",
    expectedImpact: "medium",
    effort: "small",
    status: "planned"
  },
  {
    id: "exp-command-palette-cta",
    title: "Command Palette CTA Boost",
    stage: "intent",
    expectedImpact: "low",
    effort: "small",
    status: "completed"
  }
];

export function getExperienceSignals(): ExperienceSignal[] {
  return experienceSignals;
}

export function getJourneyFrictions(): JourneyFriction[] {
  return journeyFrictions;
}

export function getExperimentBacklog(): ExperimentBacklogItem[] {
  return experimentBacklog;
}

export function getExperienceLabSummary() {
  return {
    signals: experienceSignals.length,
    strongSignals: experienceSignals.filter((item) => item.band === "strong").length,
    watchSignals: experienceSignals.filter((item) => item.band === "watch").length,
    weakSignals: experienceSignals.filter((item) => item.band === "weak").length,
    frictions: journeyFrictions.length,
    highFrictions: journeyFrictions.filter((item) => item.severity === "high").length,
    experiments: experimentBacklog.length,
    activeExperiments: experimentBacklog.filter((item) => item.status === "active").length,
    plannedExperiments: experimentBacklog.filter((item) => item.status === "planned").length,
    completedExperiments: experimentBacklog.filter((item) => item.status === "completed").length
  };
}
