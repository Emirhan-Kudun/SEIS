import { NextResponse } from "next/server";

import {
  getAuditCheckpoints,
  getComplianceControls,
  getComplianceSummary
} from "@/lib/compliance-matrix";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getComplianceSummary(),
    controls: getComplianceControls(),
    checkpoints: getAuditCheckpoints()
  });
}
