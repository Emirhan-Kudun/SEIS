import { NextResponse } from "next/server";

import {
  getCloudDeployPipelineSignals,
  getCloudDeployPipelineSummary,
  getCloudDeployPipelineTasks
} from "@/lib/cloud-deploy-pipeline-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCloudDeployPipelineSummary(),
    signals: getCloudDeployPipelineSignals(),
    tasks: getCloudDeployPipelineTasks()
  });
}
