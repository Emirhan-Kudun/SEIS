import { NextResponse } from "next/server";

import {
  getCloudObservabilityPlusSignals,
  getCloudObservabilityPlusSummary,
  getCloudObservabilityPlusTasks
} from "@/lib/cloud-observability-plus-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudObservabilityPlusSummary(),
    signals: getCloudObservabilityPlusSignals(),
    tasks: getCloudObservabilityPlusTasks()
  });
}
