import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { getBriefSchema, isBudgetRange, isProjectType, isTimelineOption } from "@/lib/brief-schema";
import { queueProjectBrief } from "@/lib/runtime-store";

export const runtime = "nodejs";

type BriefPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  budgetRange?: unknown;
  timeline?: unknown;
  goals?: unknown;
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
    schema: getBriefSchema()
  });
}

export async function POST(request: Request) {
  let payload: BriefPayload;

  try {
    payload = (await request.json()) as BriefPayload;
  } catch {
    return error("Invalid JSON payload.", "invalid_json");
  }

  if (asText(payload.website, 120)) {
    return NextResponse.json({
      ok: true,
      requestId: `brief-${randomUUID().slice(0, 12)}`,
      message: "Request accepted."
    });
  }

  const name = asText(payload.name, 120);
  const email = asText(payload.email, 180);
  const projectType = asText(payload.projectType, 80);
  const budgetRange = asText(payload.budgetRange, 80);
  const timeline = asText(payload.timeline, 80);
  const goals = asText(payload.goals, 2400);
  const locale = asText(payload.locale, 10) || "tr";

  if (name.length < 2) return error("Name is required.", "invalid_name");
  if (!isEmail(email)) return error("Valid email is required.", "invalid_email");
  if (!isProjectType(projectType)) return error("Invalid project type.", "invalid_project_type");
  if (!isBudgetRange(budgetRange)) return error("Invalid budget range.", "invalid_budget_range");
  if (!isTimelineOption(timeline)) return error("Invalid timeline.", "invalid_timeline");
  if (goals.length < 24) return error("Goals must be at least 24 characters.", "invalid_goals");

  const id = `brief-${randomUUID().slice(0, 12)}`;
  const stored = await queueProjectBrief({
    id,
    receivedAt: new Date().toISOString(),
    name,
    email,
    projectType,
    budgetRange,
    timeline,
    goals,
    locale,
    status: "new"
  });

  if (!stored.stored) {
    return error("Brief could not be stored.", "brief_store_failed", 503);
  }

  return NextResponse.json({
    ok: true,
    requestId: id,
    message: "Brief received."
  });
}
