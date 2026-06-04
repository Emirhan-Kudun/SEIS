export type BriefTriageRule = {
  id: "fit" | "urgency" | "scope" | "proof";
  label: string;
  signal: string;
  weight: number;
};

export type BriefTriageBucket = {
  id: "ready" | "clarify" | "defer";
  label: string;
  threshold: string;
  action: string;
};

export const briefTriageRules: BriefTriageRule[] = [
  {
    id: "fit",
    label: "Creative fit",
    signal: "Service, message and portfolio proof should map to branding, editorial, UI/UX, motion or digital system work.",
    weight: 35
  },
  {
    id: "urgency",
    label: "Launch pressure",
    signal: "Timeline and priority reveal whether the project needs calm planning, near-term launch support or incident repair.",
    weight: 20
  },
  {
    id: "scope",
    label: "Scope clarity",
    signal: "Scope, budget signal and engagement mode should be clear enough to propose one recommended path.",
    weight: 25
  },
  {
    id: "proof",
    label: "Proof path",
    signal: "The brief should imply which Behance, drawing, interface or motion evidence can support the reply.",
    weight: 20
  }
];

export const briefTriageBuckets: BriefTriageBucket[] = [
  {
    id: "ready",
    label: "Ready to shape",
    threshold: "75-100",
    action: "Draft a calm scope note and recommend one next step."
  },
  {
    id: "clarify",
    label: "Needs clarification",
    threshold: "45-74",
    action: "Ask for missing timeline, scope, budget or proof context before estimating."
  },
  {
    id: "defer",
    label: "Defer or redirect",
    threshold: "0-44",
    action: "Politely redirect, simplify scope or wait until the request becomes clearer."
  }
];
