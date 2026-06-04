import { NextResponse } from "next/server";

import { getRiskRegister, getRiskSummary } from "@/lib/risk-register";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getRiskSummary(),
    risks: getRiskRegister()
  });
}
