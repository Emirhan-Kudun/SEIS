import { NextResponse } from "next/server";

import {
  getCloudRuntimeBudgetSignals,
  getCloudRuntimeBudgetSummary,
  getCloudRuntimeBudgetTasks
} from "@/lib/cloud-runtime-budget-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudRuntimeBudgetSummary(),
    signals: getCloudRuntimeBudgetSignals(),
    tasks: getCloudRuntimeBudgetTasks()
  });
}
