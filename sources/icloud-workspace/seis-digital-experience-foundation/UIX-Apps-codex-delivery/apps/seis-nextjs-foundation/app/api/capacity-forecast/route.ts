import { NextResponse } from "next/server";

import { getCapacityModels, getCapacitySummary, getScalingSteps } from "@/lib/capacity-forecast";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCapacitySummary(),
    models: getCapacityModels(),
    scalingSteps: getScalingSteps()
  });
}
