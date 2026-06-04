import { NextResponse } from "next/server";

import { getReleaseScenarios, getReleaseScenarioSummary } from "@/lib/release-scenarios";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getReleaseScenarioSummary(),
    scenarios: getReleaseScenarios()
  });
}
