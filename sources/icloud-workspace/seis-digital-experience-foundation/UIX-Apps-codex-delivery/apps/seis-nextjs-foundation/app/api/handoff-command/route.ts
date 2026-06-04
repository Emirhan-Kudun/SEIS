import { NextResponse } from "next/server";

import { getHandoffSignals, getHandoffSummary, getHandoffTasks } from "@/lib/handoff-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getHandoffSummary(),
    signals: getHandoffSignals(),
    tasks: getHandoffTasks()
  });
}
