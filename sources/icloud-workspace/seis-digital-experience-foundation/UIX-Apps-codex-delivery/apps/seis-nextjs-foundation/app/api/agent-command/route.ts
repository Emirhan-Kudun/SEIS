import { NextResponse } from "next/server";

import { getAgentSignals, getAgentSummary, getAgentTasks } from "@/lib/agent-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getAgentSummary(),
    signals: getAgentSignals(),
    tasks: getAgentTasks()
  });
}
