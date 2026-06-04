import { NextResponse } from "next/server";

import { getTestingSignals, getTestingSummary, getTestingTasks } from "@/lib/testing-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getTestingSummary(),
    signals: getTestingSignals(),
    tasks: getTestingTasks()
  });
}
