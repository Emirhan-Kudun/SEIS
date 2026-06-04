import { NextResponse } from "next/server";

import {
  getContentOpsSignals,
  getContentOpsSummary,
  getContentOpsTasks
} from "@/lib/content-ops-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getContentOpsSummary(),
    signals: getContentOpsSignals(),
    tasks: getContentOpsTasks()
  });
}
