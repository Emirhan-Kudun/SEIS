import { NextResponse } from "next/server";

import {
  getDeliveryCadence,
  getPipelinePhases,
  getPipelineSummary
} from "@/lib/execution-pipeline";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getPipelineSummary(),
    phases: getPipelinePhases(),
    cadence: getDeliveryCadence()
  });
}
