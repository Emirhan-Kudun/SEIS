import { NextResponse } from "next/server";

import { getObservabilitySignals, getObservabilitySummary, getObservabilityTasks } from "@/lib/observability-command";
import { getRuntimeStoreSummary } from "@/lib/runtime-store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getObservabilitySummary(),
    runtimeStore: await getRuntimeStoreSummary(),
    signals: getObservabilitySignals(),
    tasks: getObservabilityTasks()
  });
}
