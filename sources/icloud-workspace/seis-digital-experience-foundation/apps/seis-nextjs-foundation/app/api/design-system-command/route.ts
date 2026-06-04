import { NextResponse } from "next/server";

import { getDesignSignals, getDesignSystemSummary, getDesignTasks } from "@/lib/design-system-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getDesignSystemSummary(),
    signals: getDesignSignals(),
    tasks: getDesignTasks()
  });
}
