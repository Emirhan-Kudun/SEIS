import { NextResponse } from "next/server";

import { getObservabilitySignals, getObservabilitySummary, getObservabilityTasks } from "@/lib/observability-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getObservabilitySummary(),
    signals: getObservabilitySignals(),
    tasks: getObservabilityTasks()
  });
}
