import { NextResponse } from "next/server";

import { getExecutionTracks, getRoadmapSummary, getSystemRoadmapPhases } from "@/lib/system-roadmap";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getRoadmapSummary(),
    phases: getSystemRoadmapPhases(),
    tracks: getExecutionTracks()
  });
}
