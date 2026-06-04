import { NextResponse } from "next/server";

import { getMonetizationSignals, getMonetizationSummary, getMonetizationTasks } from "@/lib/monetization-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getMonetizationSummary(),
    signals: getMonetizationSignals(),
    tasks: getMonetizationTasks()
  });
}
