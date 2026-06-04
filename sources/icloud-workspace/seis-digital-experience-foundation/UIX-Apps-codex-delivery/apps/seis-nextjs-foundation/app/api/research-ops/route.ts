import { NextResponse } from "next/server";

import { getResearchBacklog, getResearchSignals, getResearchSummary } from "@/lib/research-ops";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getResearchSummary(),
    signals: getResearchSignals(),
    backlog: getResearchBacklog()
  });
}
