import { NextResponse } from "next/server";

import { getDeploymentSignals, getDeploymentSummary, getDeploymentTasks } from "@/lib/deployment-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getDeploymentSummary(),
    signals: getDeploymentSignals(),
    tasks: getDeploymentTasks()
  });
}
