import { NextResponse } from "next/server";

import {
  getCloudSecuritySignals,
  getCloudSecuritySummary,
  getCloudSecurityTasks
} from "@/lib/cloud-security-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudSecuritySummary(),
    signals: getCloudSecuritySignals(),
    tasks: getCloudSecurityTasks()
  });
}
