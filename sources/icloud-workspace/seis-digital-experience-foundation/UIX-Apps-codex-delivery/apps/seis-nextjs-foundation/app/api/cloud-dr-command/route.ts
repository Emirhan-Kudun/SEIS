import { NextResponse } from "next/server";

import { getCloudDrSignals, getCloudDrSummary, getCloudDrTasks } from "@/lib/cloud-dr-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudDrSummary(),
    signals: getCloudDrSignals(),
    tasks: getCloudDrTasks()
  });
}
