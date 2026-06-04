import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  calculateReadiness,
  getReadinessSchema,
  isLaunchWindow,
  isProjectStage,
  isReadinessLevel
} from "@/lib/readiness-schema";
import { queueReadinessAssessment } from "@/lib/runtime-store";

export const runtime = "nodejs";

type ReadinessPayload = {
  projectName?: unknown;
  email?: unknown;
  projectStage?: unknown;
  contentReadiness?: unknown;
  designReadiness?: unknown;
  integrationReadiness?: unknown;
  launchWindow?: unknown;
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
    schema: getReadinessSchema()
  });
}

export async function POST(request: Request) {
  let payload: ReadinessPayload;

  try {
    payload = (await request.json()) as ReadinessPayload;
  } catch {
    return error("Invalid JSON payload.", "invalid_json");
  }

  if (asText(payload.website, 120)) {
    return NextResponse.json({
      ok: true,
      requestId: `readiness-${randomUUID().slice(0, 12)}`,
      message: "Request accepted."
    });
  }

  const projectName = asText(payload.projectName, 140);
  const email = asText(payload.email, 180);
  const projectStage = asText(payload.projectStage, 80);
  const contentReadiness = asText(payload.contentReadiness, 80);
  const designReadiness = asText(payload.designReadiness, 80);
  const integrationReadiness = asText(payload.integrationReadiness, 80);
  const launchWindow = asText(payload.launchWindow, 80);
  const locale = asText(payload.locale, 10) || "tr";

  if (projectName.length < 2) return error("Project name is required.", "invalid_project_name");
  if (!isEmail(email)) return error("Valid email is required.", "invalid_email");
  if (!isProjectStage(projectStage)) return error("Invalid project stage.", "invalid_project_stage");
  if (!isReadinessLevel(contentReadiness)) return error("Invalid content readiness.", "invalid_content_readiness");
  if (!isReadinessLevel(designReadiness)) return error("Invalid design readiness.", "invalid_design_readiness");
  if (!isReadinessLevel(integrationReadiness)) return error("Invalid integration readiness.", "invalid_integration_readiness");
  if (!isLaunchWindow(launchWindow)) return error("Invalid launch window.", "invalid_launch_window");

  const result = calculateReadiness({
    projectStage,
    contentReadiness,
    designReadiness,
    integrationReadiness,
    launchWindow
  });
  const id = `readiness-${randomUUID().slice(0, 12)}`;
  const stored = await queueReadinessAssessment({
    id,
    assessedAt: new Date().toISOString(),
    projectName,
    email,
    projectStage,
    contentReadiness,
    designReadiness,
    integrationReadiness,
    launchWindow,
    score: result.score,
    level: result.level,
    recommendation: result.recommendation,
    locale
  });

  if (!stored.stored) {
    return error("Readiness assessment could not be stored.", "readiness_store_failed", 503);
  }

  return NextResponse.json({
    ok: true,
    requestId: id,
    result
  });
}
