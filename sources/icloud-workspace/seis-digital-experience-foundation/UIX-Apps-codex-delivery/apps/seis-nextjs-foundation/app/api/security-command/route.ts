import { NextResponse } from "next/server";

import { getSecurityDrills, getSecurityRisks, getSecuritySummary } from "@/lib/security-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getSecuritySummary(),
    risks: getSecurityRisks(),
    drills: getSecurityDrills()
  });
}
