import { NextResponse } from "next/server";

import { getFeatureFlags, getFeatureFlagSummary } from "@/lib/feature-flags";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getFeatureFlagSummary(),
    flags: getFeatureFlags()
  });
}
