import { NextResponse } from "next/server";

import {
  getCloudChaosSignals,
  getCloudChaosSummary,
  getCloudChaosTasks
} from "@/lib/cloud-chaos-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudChaosSummary(),
    signals: getCloudChaosSignals(),
    tasks: getCloudChaosTasks()
  });
}
