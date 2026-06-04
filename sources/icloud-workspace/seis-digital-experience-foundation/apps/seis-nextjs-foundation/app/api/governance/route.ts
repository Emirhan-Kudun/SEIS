import { NextResponse } from "next/server";

import { getGovernanceRules, getGovernanceSummary } from "@/lib/governance-content";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getGovernanceSummary(),
    rules: getGovernanceRules()
  });
}
