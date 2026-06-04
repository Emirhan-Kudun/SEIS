import { NextResponse } from "next/server";

import { getRollbackSignals, getRollbackSummary, getRollbackTasks } from "@/lib/rollback-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getRollbackSummary(),
    signals: getRollbackSignals(),
    tasks: getRollbackTasks()
  });
}
