import { NextResponse } from "next/server";

import {
  getBranchCheckpoints,
  getCollaborationFlows,
  getCollaborationSummary
} from "@/lib/collaboration-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getCollaborationSummary(),
    flows: getCollaborationFlows(),
    checkpoints: getBranchCheckpoints()
  });
}
