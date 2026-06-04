import { NextResponse } from "next/server";

import { getBenchCapabilityGroups, getBenchCapabilitySummary } from "@/lib/bench-capabilities";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getBenchCapabilitySummary(),
    capabilities: getBenchCapabilityGroups()
  });
}
