import { NextResponse } from "next/server";

import {
  branchHardeningProfile,
  getBranchHardeningChecks,
  getBranchPublishGuards,
  getBranchHardeningSignals,
  getBranchHardeningSummary,
  getLowPowerControls
} from "@/lib/branch-hardening";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    profile: branchHardeningProfile,
    summary: getBranchHardeningSummary(),
    signals: getBranchHardeningSignals(),
    checks: getBranchHardeningChecks(),
    publishGuards: getBranchPublishGuards(),
    lowPowerControls: getLowPowerControls()
  });
}
