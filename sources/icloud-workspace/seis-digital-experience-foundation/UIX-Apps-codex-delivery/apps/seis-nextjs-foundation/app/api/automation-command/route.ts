import { NextResponse } from "next/server";

import {
  getAutomationPipelines,
  getAutomationQueues,
  getAutomationSummary
} from "@/lib/automation-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getAutomationSummary(),
    pipelines: getAutomationPipelines(),
    queues: getAutomationQueues()
  });
}
