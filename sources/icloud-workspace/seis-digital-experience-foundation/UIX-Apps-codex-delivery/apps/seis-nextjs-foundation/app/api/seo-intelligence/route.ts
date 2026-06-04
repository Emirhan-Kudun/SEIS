import { NextResponse } from "next/server";

import { getMetadataProfiles, getSeoChecks, getSeoSummary } from "@/lib/seo-intelligence";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getSeoSummary(),
    checks: getSeoChecks(),
    profiles: getMetadataProfiles()
  });
}
