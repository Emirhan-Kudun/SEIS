export const scopeFocusAreas = ["brand", "content", "frontend", "backend", "ai", "observability"] as const;
export const deliveryModels = ["foundation", "launch", "growth"] as const;
export const complexityProfiles = ["lean", "balanced", "advanced"] as const;
export const maintenanceModes = ["light", "standard", "governed"] as const;

export type ScopeFocusArea = (typeof scopeFocusAreas)[number];
export type DeliveryModel = (typeof deliveryModels)[number];
export type ComplexityProfile = (typeof complexityProfiles)[number];
export type MaintenanceMode = (typeof maintenanceModes)[number];

export type ScopePlanInput = {
  deliveryModel: DeliveryModel;
  complexity: ComplexityProfile;
  maintenance: MaintenanceMode;
  focusAreas: ScopeFocusArea[];
};

export type ScopePlanPhase = {
  name: string;
  detail: string;
};

export type ScopePlanResult = {
  score: number;
  level: "lean" | "balanced" | "governed";
  recommendation: string;
  phases: ScopePlanPhase[];
  operationalNotes: string[];
};

const deliveryScore: Record<DeliveryModel, number> = {
  foundation: 16,
  launch: 25,
  growth: 31
};

const complexityScore: Record<ComplexityProfile, number> = {
  lean: 14,
  balanced: 22,
  advanced: 30
};

const maintenanceScore: Record<MaintenanceMode, number> = {
  light: 10,
  standard: 18,
  governed: 25
};

export function isScopeFocusArea(value: string): value is ScopeFocusArea {
  return scopeFocusAreas.includes(value as ScopeFocusArea);
}

export function isDeliveryModel(value: string): value is DeliveryModel {
  return deliveryModels.includes(value as DeliveryModel);
}

export function isComplexityProfile(value: string): value is ComplexityProfile {
  return complexityProfiles.includes(value as ComplexityProfile);
}

export function isMaintenanceMode(value: string): value is MaintenanceMode {
  return maintenanceModes.includes(value as MaintenanceMode);
}

export function normalizeFocusAreas(value: unknown): ScopeFocusArea[] {
  if (!Array.isArray(value)) return [];

  return Array.from(new Set(value.map((item) => String(item)).filter(isScopeFocusArea))).slice(0, 6);
}

export function calculateScopePlan(input: ScopePlanInput): ScopePlanResult {
  const focusScore = Math.min(24, input.focusAreas.length * 4);
  const score = Math.min(
    100,
    deliveryScore[input.deliveryModel] + complexityScore[input.complexity] + maintenanceScore[input.maintenance] + focusScore
  );
  const hasBackend = input.focusAreas.includes("backend");
  const hasAi = input.focusAreas.includes("ai");
  const hasObservability = input.focusAreas.includes("observability");

  const phases: ScopePlanPhase[] = [
    {
      name: "Scope lock",
      detail: "Freeze first-release goals, content ownership, and the primary conversion path."
    },
    {
      name: "Runtime contract",
      detail: hasBackend
        ? "Define API routes, validation, local persistence, and admin review boundaries."
        : "Keep backend surface minimal and confirm static or content-driven delivery boundaries."
    },
    {
      name: "Interface pass",
      detail: "Build the calm editorial UI with responsive spacing, keyboard flow, and reduced-motion behavior."
    }
  ];

  if (hasAi || hasObservability) {
    phases.push({
      name: "Operational intelligence",
      detail: "Add explainable monitoring, lightweight logs, and human-readable review surfaces."
    });
  }

  phases.push({
    name: "Launch gate",
    detail: "Run build, accessibility, mobile, API smoke, and rollback checks before release."
  });

  if (score >= 76) {
    return {
      score,
      level: "governed",
      recommendation: "Use a governed release flow with explicit QA gates, admin review, and rollback notes.",
      phases,
      operationalNotes: ["Keep API routes small", "Avoid heavy client analytics", "Document rollback before launch"]
    };
  }

  if (score >= 52) {
    return {
      score,
      level: "balanced",
      recommendation: "Use a balanced build path: ship the core experience first, then expand integrations.",
      phases,
      operationalNotes: ["Limit v1 dependencies", "Keep forms server-validated", "Review bundle size after UI changes"]
    };
  }

  return {
    score,
    level: "lean",
    recommendation: "Use a lean foundation pass before adding advanced motion, AI, or operational layers.",
    phases: phases.slice(0, 4),
    operationalNotes: ["Start with one primary workflow", "Use JSONL runtime storage", "Defer optional integrations"]
  };
}

export function getScopePlanSchema() {
  return {
    scopeFocusAreas,
    deliveryModels,
    complexityProfiles,
    maintenanceModes,
    requiredFields: ["projectName", "email", "primaryGoal", "deliveryModel", "complexity", "maintenance", "focusAreas"],
    storage: "local-jsonl",
    adminEndpoint: "/api/admin/scope-plans"
  };
}
