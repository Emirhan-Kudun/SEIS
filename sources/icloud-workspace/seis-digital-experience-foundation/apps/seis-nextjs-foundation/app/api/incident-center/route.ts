import { NextResponse } from "next/server";

import { getIncidentDrills, getIncidentScenarios, getIncidentSummary } from "@/lib/incident-center";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getIncidentSummary(),
    scenarios: getIncidentScenarios(),
    drills: getIncidentDrills()
  });
}
