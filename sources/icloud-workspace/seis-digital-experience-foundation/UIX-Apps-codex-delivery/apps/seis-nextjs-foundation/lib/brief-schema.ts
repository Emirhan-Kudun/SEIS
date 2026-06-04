export const projectTypes = [
  "cinematic-website",
  "fullstack-platform",
  "portfolio-system",
  "ai-native-experience",
  "design-system",
  "other"
] as const;

export const budgetRanges = [
  "discovery",
  "starter",
  "growth",
  "institutional",
  "not-sure"
] as const;

export const timelineOptions = [
  "this-month",
  "one-to-two-months",
  "quarter",
  "flexible"
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type BudgetRange = (typeof budgetRanges)[number];
export type TimelineOption = (typeof timelineOptions)[number];

export function isProjectType(value: string): value is ProjectType {
  return projectTypes.includes(value as ProjectType);
}

export function isBudgetRange(value: string): value is BudgetRange {
  return budgetRanges.includes(value as BudgetRange);
}

export function isTimelineOption(value: string): value is TimelineOption {
  return timelineOptions.includes(value as TimelineOption);
}

export function getBriefSchema() {
  return {
    projectTypes,
    budgetRanges,
    timelineOptions,
    requiredFields: ["name", "email", "projectType", "budgetRange", "timeline", "goals"],
    storage: "local-jsonl",
    adminEndpoint: "/api/admin/briefs"
  };
}
