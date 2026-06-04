import { NextResponse } from "next/server";

import {
  getCloudResilienceSignals,
  getCloudResilienceSummary,
  getCloudResilienceTasks
} from "@/lib/cloud-resilience-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudResilienceSummary(),
    signals: getCloudResilienceSignals(),
    tasks: getCloudResilienceTasks()
  });
}
