window.UX_APPS_DATA = [
  {
    id: "journey-map",
    title: "Journey Map Builder",
    stage: "Research",
    summary: "Map user goals, friction points, and decision moments across a product flow.",
    primaryAction: "Collect steps, emotions, blockers, and next opportunities.",
    metric: "Number of unresolved friction points per journey stage.",
    risk: "Too much detail can hide the few moments that actually need action.",
    tags: ["journey", "research", "flow", "friction"]
  },
  {
    id: "flow-audit",
    title: "Flow Audit Console",
    stage: "Validate",
    summary: "Review navigation, form steps, empty states, and completion paths before release.",
    primaryAction: "Score each step for clarity, reversibility, and recovery.",
    metric: "Task completion confidence before handoff.",
    risk: "Audits can become subjective unless each finding has evidence.",
    tags: ["audit", "navigation", "forms", "release"]
  },
  {
    id: "accessibility-pass",
    title: "Accessibility Pass",
    stage: "Validate",
    summary: "Check keyboard flow, focus order, contrast, labels, and reduced-motion behavior.",
    primaryAction: "Mark blockers separately from polish improvements.",
    metric: "Critical accessibility blockers remaining.",
    risk: "Visual polish can distract from assistive technology failures.",
    tags: ["a11y", "keyboard", "contrast", "motion"]
  },
  {
    id: "content-tone",
    title: "Content Tone Lab",
    stage: "Design",
    summary: "Align interface copy with user stress level, product context, and brand voice.",
    primaryAction: "Rewrite labels, helper text, and errors for calm comprehension.",
    metric: "Ambiguous interface messages removed.",
    risk: "Friendly copy can become vague if it avoids specific guidance.",
    tags: ["copy", "tone", "errors", "microcopy"]
  },
  {
    id: "decision-dashboard",
    title: "Decision Dashboard",
    stage: "Ship",
    summary: "Summarize UX trade-offs, release risks, owner decisions, and follow-up checks.",
    primaryAction: "Convert review notes into release-ready decisions.",
    metric: "Open UX decisions before launch.",
    risk: "Dashboards can overload teams if every detail becomes a metric.",
    tags: ["decision", "release", "risk", "ownership"]
  },
  {
    id: "prototype-brief",
    title: "Prototype Brief Generator",
    stage: "Research",
    summary: "Turn product questions into prototype scope, test prompts, and success criteria.",
    primaryAction: "Define what the prototype must prove before design production.",
    metric: "Validated assumptions per prototype cycle.",
    risk: "A prototype can accidentally become production scope.",
    tags: ["prototype", "brief", "testing", "scope"]
  }
];
