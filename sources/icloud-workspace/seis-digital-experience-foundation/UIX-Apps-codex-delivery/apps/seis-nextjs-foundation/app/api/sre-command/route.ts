import { NextResponse } from "next/server";

import { getErrorBudgets, getSloMetrics, getSreRunbooks, getSreSummary } from "@/lib/sre-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getSreSummary(),
    slos: getSloMetrics(),
    errorBudgets: getErrorBudgets(),
    runbooks: getSreRunbooks()
  });
}
