export type AutomationPlaybook = {
  id: string;
  name: string;
  goal: string;
  tools: string[];
  steps: string[];
  riskLevel: "low" | "medium" | "high";
};

export const automationPlaybooks: AutomationPlaybook[] = [
  {
    id: "content-quality-scan",
    name: "Content Quality Scan",
    goal: "Review content consistency across locales and detect high-risk copy gaps.",
    tools: ["content-snapshot", "search", "insights"],
    steps: [
      "Fetch locale snapshot from /api/content-snapshot.",
      "Compare hero, CTA, and contact sections across languages.",
      "Report missing keys and suggest normalized copy patches."
    ],
    riskLevel: "low"
  },
  {
    id: "release-readiness-check",
    name: "Release Readiness Check",
    goal: "Validate site health, integration coverage, and deployment safety before release.",
    tools: ["health", "metrics", "integrations"],
    steps: [
      "Pull health data from /api/health and /api/metrics.",
      "Evaluate integration configuration coverage.",
      "Generate pass/fail summary for release approval."
    ],
    riskLevel: "medium"
  },
  {
    id: "pipeline-anomaly-triage",
    name: "Pipeline Anomaly Triage",
    goal: "Route unusual telemetry or form failures into structured incident steps.",
    tools: ["events", "contact", "newsletter"],
    steps: [
      "Inspect /api/events payload patterns.",
      "Detect repeat failures from contact/newsletter routes.",
      "Create incident notes with rollback recommendations."
    ],
    riskLevel: "high"
  }
];
