import { NextResponse } from "next/server";

import {
  getCloudPlatformGuardSignals,
  getCloudPlatformGuardSummary,
  getCloudPlatformGuardTasks
} from "@/lib/cloud-platform-guard-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudPlatformGuardSummary(),
    signals: getCloudPlatformGuardSignals(),
    tasks: getCloudPlatformGuardTasks()
  });
}
