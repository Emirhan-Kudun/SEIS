import { NextResponse } from "next/server";

import {
  getCloudReleaseTrainSignals,
  getCloudReleaseTrainSummary,
  getCloudReleaseTrainTasks
} from "@/lib/cloud-release-train-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudReleaseTrainSummary(),
    signals: getCloudReleaseTrainSignals(),
    tasks: getCloudReleaseTrainTasks()
  });
}
