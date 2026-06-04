import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  calculateScopePlan,
  getScopePlanSchema,
  isComplexityProfile,
  isDeliveryModel,
  isMaintenanceMode,
  normalizeFocusAreas
} from "@/lib/scope-plan-schema";
import { queueScopePlan } from "@/lib/runtime-store";

export const runtime = "nodejs";

type ScopePlanPayload = {
  projectName?: unknown;
  email?: unknown;
  primaryGoal?: unknown;
  deliveryModel?: unknown;
  complexity?: unknown;
  maintenance?: unknown;
  focusAreas?: unknown;
  locale?: unknown;
  website?: unknown;
};

function asText(value: unknown, maxLength: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function error(message: string, code: string, status = 400) {
  return NextResponse.json({ ok: false, message, code }, { status });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    schema: getScopePlanSchema()
  });
}

export async function POST(request: Request) {
  let payload: ScopePlanPayload;

  try {
    payload = (await request.json()) as ScopePlanPayload;
  } catch {
    return error("Invalid JSON payload.", "invalid_json");
  }

  if (asText(payload.website, 120)) {
    return NextResponse.json({
      ok: true,
      requestId: `scope-${randomUUID().slice(0, 12)}`,
      message: "Request accepted."
    });
  }

  const projectName = asText(payload.projectName, 140);
  const email = asText(payload.email, 180);
  const primaryGoal = asText(payload.primaryGoal, 800);
  const deliveryModel = asText(payload.deliveryModel, 80);
  const complexity = asText(payload.complexity, 80);
  const maintenance = asText(payload.maintenance, 80);
  const focusAreas = normalizeFocusAreas(payload.focusAreas);
  const locale = asText(payload.locale, 10) || "tr";

  if (projectName.length < 2) return error("Project name is required.", "invalid_project_name");
  if (!isEmail(email)) return error("Valid email is required.", "invalid_email");
  if (primaryGoal.length < 24) return error("Primary goal must be at least 24 characters.", "invalid_primary_goal");
  if (!isDeliveryModel(deliveryModel)) return error("Invalid delivery model.", "invalid_delivery_model");
  if (!isComplexityProfile(complexity)) return error("Invalid complexity profile.", "invalid_complexity");
  if (!isMaintenanceMode(maintenance)) return error("Invalid maintenance mode.", "invalid_maintenance");
  if (focusAreas.length === 0) return error("Select at least one focus area.", "invalid_focus_areas");

  const result = calculateScopePlan({
    deliveryModel,
    complexity,
    maintenance,
    focusAreas
  });
  const id = `scope-${randomUUID().slice(0, 12)}`;
  const stored = await queueScopePlan({
    id,
    plannedAt: new Date().toISOString(),
    projectName,
    email,
    primaryGoal,
    deliveryModel,
    complexity,
    maintenance,
    focusAreas,
    score: result.score,
    level: result.level,
    phaseCount: result.phases.length,
    recommendation: result.recommendation,
    locale
  });

  if (!stored.stored) {
    return error("Scope plan could not be stored.", "scope_store_failed", 503);
  }

  return NextResponse.json({
    ok: true,
    requestId: id,
    result
  });
}
