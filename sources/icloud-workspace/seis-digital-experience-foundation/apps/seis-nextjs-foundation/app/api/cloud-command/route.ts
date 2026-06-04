import { NextResponse } from "next/server";

import { getCloudSignals, getCloudSummary, getCloudTasks } from "@/lib/cloud-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudSummary(),
    signals: getCloudSignals(),
    tasks: getCloudTasks()
  });
}
