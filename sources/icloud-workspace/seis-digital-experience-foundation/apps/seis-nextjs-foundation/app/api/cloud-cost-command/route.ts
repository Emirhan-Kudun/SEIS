import { NextResponse } from "next/server";

import { getCloudCostSignals, getCloudCostSummary, getCloudCostTasks } from "@/lib/cloud-cost-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudCostSummary(),
    signals: getCloudCostSignals(),
    tasks: getCloudCostTasks()
  });
}
