export type StudioCrmLane = {
  id: "inquiry" | "discovery" | "production" | "launch";
  title: string;
  signal: string;
  nextAction: string;
};

export type StudioCrmSignal = {
  id: "fit" | "scope" | "proof" | "handoff";
  label: string;
  description: string;
};

export const studioCrmLanes: StudioCrmLane[] = [
  {
    id: "inquiry",
    title: "Inquiry intake",
    signal: "New briefs enter with service, scope, priority and message context before any reply is drafted.",
    nextAction: "Confirm fit and ask for missing essentials."
  },
  {
    id: "discovery",
    title: "Discovery framing",
    signal: "Potential work is shaped into audience, deliverables, timeline, budget signal and visual proof needs.",
    nextAction: "Prepare a calm scope note with one recommended path."
  },
  {
    id: "production",
    title: "Production rhythm",
    signal: "Approved projects move through design direction, portfolio evidence, motion constraints and accessibility checks.",
    nextAction: "Track proof, feedback and launch blockers."
  },
  {
    id: "launch",
    title: "Launch and aftercare",
    signal: "Delivered work closes with release evidence, archive export, contact follow-up and future iteration cue.",
    nextAction: "Capture outcome, testimonial signal and next opportunity."
  }
];

export const studioCrmSignals: StudioCrmSignal[] = [
  {
    id: "fit",
    label: "Fit",
    description: "Does the request match Emirhan's premium visual, editorial, UI/UX or cinematic technology strengths?"
  },
  {
    id: "scope",
    label: "Scope",
    description: "Is the work small, structured and reversible enough to estimate without exhausting the client or studio?"
  },
  {
    id: "proof",
    label: "Proof",
    description: "Which Behance, drawing, interface or motion artifacts prove the intended direction?"
  },
  {
    id: "handoff",
    label: "Handoff",
    description: "What final evidence, archive, documentation and follow-up keep the relationship clear after delivery?"
  }
];
