import { NextResponse } from "next/server";

import { getCostOptimizations, getFinopsBudgets, getFinopsSummary } from "@/lib/finops-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getFinopsSummary(),
    budgets: getFinopsBudgets(),
    optimizations: getCostOptimizations()
  });
}
