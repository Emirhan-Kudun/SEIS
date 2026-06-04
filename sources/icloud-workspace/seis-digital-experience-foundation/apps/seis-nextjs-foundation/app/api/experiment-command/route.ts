import { NextResponse } from "next/server";

import { getExperimentSummary, getExperimentTracks, getGrowthLoops } from "@/lib/experiment-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getExperimentSummary(),
    tracks: getExperimentTracks(),
    loops: getGrowthLoops()
  });
}
