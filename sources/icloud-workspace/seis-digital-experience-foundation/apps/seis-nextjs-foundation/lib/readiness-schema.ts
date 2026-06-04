export const projectStages = ["idea", "active-build", "redesign", "launch-prep"] as const;
export const readinessLevels = ["low", "medium", "high"] as const;
export const launchWindows = ["two-weeks", "one-month", "quarter", "flexible"] as const;

export type ProjectStage = (typeof projectStages)[number];
export type ReadinessLevel = (typeof readinessLevels)[number];
export type LaunchWindow = (typeof launchWindows)[number];

export type ReadinessInput = {
  projectStage: ProjectStage;
  contentReadiness: ReadinessLevel;
  designReadiness: ReadinessLevel;
  integrationReadiness: ReadinessLevel;
  launchWindow: LaunchWindow;
};

export type ReadinessResult = {
  score: number;
  level: "foundation" | "structured" | "launch-ready";
  recommendation: string;
  nextActions: string[];
};

const stageScore: Record<ProjectStage, number> = {
  idea: 8,
  "active-build": 18,
  redesign: 20,
  "launch-prep": 26
};

const readinessScore: Record<ReadinessLevel, number> = {
  low: 8,
  medium: 17,
  high: 24
};

const windowScore: Record<LaunchWindow, number> = {
  "two-weeks": 6,
  "one-month": 12,
  quarter: 16,
  flexible: 18
};

export function isProjectStage(value: string): value is ProjectStage {
  return projectStages.includes(value as ProjectStage);
}

export function isReadinessLevel(value: string): value is ReadinessLevel {
  return readinessLevels.includes(value as ReadinessLevel);
}

export function isLaunchWindow(value: string): value is LaunchWindow {
  return launchWindows.includes(value as LaunchWindow);
}

export function calculateReadiness(input: ReadinessInput): ReadinessResult {
  const score = Math.min(
    100,
    stageScore[input.projectStage] +
      readinessScore[input.contentReadiness] +
      readinessScore[input.designReadiness] +
      readinessScore[input.integrationReadiness] +
      windowScore[input.launchWindow]
  );

  if (score >= 78) {
    return {
      score,
      level: "launch-ready",
      recommendation: "Launch planning can focus on QA, observability, and controlled release sequencing.",
      nextActions: ["Run mobile and reduced-motion QA", "Confirm admin/runtime tokens", "Prepare rollback checklist"]
    };
  }

  if (score >= 52) {
    return {
      score,
      level: "structured",
      recommendation: "The project has enough structure for scoped implementation, with a few readiness gaps to close.",
      nextActions: ["Freeze first-release scope", "Map integration risk", "Confirm content ownership"]
    };
  }

  return {
    score,
    level: "foundation",
    recommendation: "Start with a small foundation pass before expanding interface, backend, or motion systems.",
    nextActions: ["Define the primary user path", "Collect core content", "Choose the first production integration"]
  };
}

export function getReadinessSchema() {
  return {
    projectStages,
    readinessLevels,
    launchWindows,
    requiredFields: [
      "projectName",
      "email",
      "projectStage",
      "contentReadiness",
      "designReadiness",
      "integrationReadiness",
      "launchWindow"
    ],
    storage: "local-jsonl",
    adminEndpoint: "/api/admin/readiness"
  };
}
