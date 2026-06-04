import { NextResponse } from "next/server";

import {
  getPerformanceCommandSummary,
  getPerformanceSignals,
  getPerformanceTasks
} from "@/lib/performance-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getPerformanceCommandSummary(),
    signals: getPerformanceSignals(),
    tasks: getPerformanceTasks()
  });
}
