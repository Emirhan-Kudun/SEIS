import { NextResponse } from "next/server";

import {
  getDependencyGuardrails,
  getDependencyPolicies,
  getDependencySummary
} from "@/lib/dependency-governance";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getDependencySummary(),
    policies: getDependencyPolicies(),
    guardrails: getDependencyGuardrails()
  });
}
