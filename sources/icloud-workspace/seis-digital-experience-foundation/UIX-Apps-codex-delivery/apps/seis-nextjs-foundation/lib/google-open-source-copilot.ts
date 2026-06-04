export type GoogleCopilotLaneStatus = "ready" | "planned" | "registry-only" | "migration-watch";

export type GoogleCopilotLane = {
  id: string;
  title: string;
  status: GoogleCopilotLaneStatus;
  ownerAgent: "google-open-source-copilot";
  branchMode: "logical-child-lane";
  parentBranch: "codex/premium-local-foundation";
  purpose: string;
  allowedActions: string[];
  blockedActions: string[];
};

export type GoogleCopilotSignal = {
  id: string;
  area: "branching" | "connector" | "dependency" | "ai-tooling";
  title: string;
  status: "healthy" | "watch" | "critical";
  detail: string;
  nextAction: string;
};

export type GoogleCopilotActivationPlan = {
  selectedLane: GoogleCopilotLane;
  preflight: string[];
  safeCommands: string[];
  approvalsRequired: string[];
  rollbackPath: string;
};

const parentBranch = "codex/premium-local-foundation" as const;
const ownerAgent = "google-open-source-copilot" as const;

const googleCopilotLanes: GoogleCopilotLane[] = [
  {
    id: "google-official-docs",
    title: "Official Docs Lane",
    status: "ready",
    ownerAgent,
    branchMode: "logical-child-lane",
    parentBranch,
    purpose: "Ground implementation choices in official Google or project-owned documentation before coding.",
    allowedActions: ["read official docs", "record skipped_with_reason", "summarize adoption evidence"],
    blockedActions: ["external write", "secret access"]
  },
  {
    id: "chrome-web-quality",
    title: "Chrome Web Quality Lane",
    status: "ready",
    ownerAgent,
    branchMode: "logical-child-lane",
    parentBranch,
    purpose: "Use Chrome-aligned checks for accessibility, performance, SEO, and Core Web Vitals.",
    allowedActions: ["local validation", "dry-run reporting", "performance recommendation"],
    blockedActions: ["dependency addition without approval"]
  },
  {
    id: "firebase-cloud-run",
    title: "Firebase and Cloud Run Lane",
    status: "planned",
    ownerAgent,
    branchMode: "logical-child-lane",
    parentBranch,
    purpose: "Plan Firebase, Firestore, Cloud Run, storage, and hosting without provisioning side effects.",
    allowedActions: ["architecture plan", "config checklist", "rollback plan"],
    blockedActions: ["cloud deploy", "cloud provisioning", "database mutation", "secret access"]
  },
  {
    id: "material-design-system",
    title: "Material Design System Lane",
    status: "registry-only",
    ownerAgent,
    branchMode: "logical-child-lane",
    parentBranch,
    purpose: "Review Material icons and design-system references without replacing the SEIS visual language.",
    allowedActions: ["icon shortlist", "accessibility review", "design-token comparison"],
    blockedActions: ["visual redesign without task scope"]
  },
  {
    id: "google-ai-agent-systems",
    title: "Google AI Agent Systems Lane",
    status: "migration-watch",
    ownerAgent,
    branchMode: "logical-child-lane",
    parentBranch,
    purpose: "Evaluate ADK, Gemini, Antigravity, and Google AI agent tooling as registry-first candidates.",
    allowedActions: ["official source review", "agent boundary proposal", "migration watch note"],
    blockedActions: ["external model call", "agent write action", "shell automation"]
  }
];

const googleCopilotSignals: GoogleCopilotSignal[] = [
  {
    id: "google-copilot-single-branch",
    area: "branching",
    title: "Single branch parent contract",
    status: "healthy",
    detail: "Google Open Source Copilot lanes stay subordinate to codex/premium-local-foundation.",
    nextAction: "Keep new Google work as logical lanes unless a temporary branch is explicitly approved."
  },
  {
    id: "google-copilot-connector-scope",
    area: "connector",
    title: "Connector activation boundary",
    status: "watch",
    detail: "Chrome validation is local-first; Firebase, Cloud Run, Firestore, and Gemini remain approval-gated.",
    nextAction: "Run the google-open-source-foundation dry-run before activating external connectors."
  },
  {
    id: "google-copilot-dependency-bloat",
    area: "dependency",
    title: "Dependency pressure guard",
    status: "watch",
    detail: "Google-origin SDKs stay registry-first until a concrete feature needs them.",
    nextAction: "Require bundle, render, accessibility, and rollback review before adding packages."
  },
  {
    id: "google-copilot-ai-migration",
    area: "ai-tooling",
    title: "Google AI terminal tooling watch",
    status: "watch",
    detail: "Gemini CLI and adjacent AI terminal tooling are not core SEIS dependencies.",
    nextAction: "Verify the current official Google AI tooling path only when a task requires it."
  }
];

export function getGoogleCopilotLanes(): GoogleCopilotLane[] {
  return googleCopilotLanes;
}

export function getGoogleCopilotSignals(): GoogleCopilotSignal[] {
  return googleCopilotSignals;
}

export function getGoogleCopilotLaneById(laneId?: string): GoogleCopilotLane {
  return googleCopilotLanes.find((lane) => lane.id === laneId) ?? googleCopilotLanes[0];
}

export function getGoogleCopilotActivationPlan(laneId?: string): GoogleCopilotActivationPlan {
  const selectedLane = getGoogleCopilotLaneById(laneId);

  return {
    selectedLane,
    preflight: [
      "Confirm work remains on codex/premium-local-foundation.",
      `Select logical lane ${selectedLane.id}.`,
      "Check official or project-owned sources before implementation.",
      "Confirm rollback path and blocked actions."
    ],
    safeCommands: [
      "node scripts/google-open-source-foundation-check.cjs",
      "node seis/connector-orchestration/runner.cjs --dry-run --group google-open-source-foundation --format markdown",
      "node scripts/branch-governance-check.js",
      "node scripts/local-quality-gate.js"
    ],
    approvalsRequired: selectedLane.blockedActions,
    rollbackPath: "Revert the lane-specific commit on codex/premium-local-foundation; no long-lived Google branch should remain open."
  };
}

export function getGoogleCopilotSummary() {
  return {
    parentBranch,
    subAgent: ownerAgent,
    totalLanes: googleCopilotLanes.length,
    readyLanes: googleCopilotLanes.filter((lane) => lane.status === "ready").length,
    plannedLanes: googleCopilotLanes.filter((lane) => lane.status === "planned").length,
    registryOnlyLanes: googleCopilotLanes.filter((lane) => lane.status === "registry-only").length,
    migrationWatchLanes: googleCopilotLanes.filter((lane) => lane.status === "migration-watch").length,
    healthySignals: googleCopilotSignals.filter((signal) => signal.status === "healthy").length,
    watchSignals: googleCopilotSignals.filter((signal) => signal.status === "watch").length,
    criticalSignals: googleCopilotSignals.filter((signal) => signal.status === "critical").length,
    longLivedGitBranches: googleCopilotLanes.filter((lane) => lane.branchMode !== "logical-child-lane").length
  };
}
