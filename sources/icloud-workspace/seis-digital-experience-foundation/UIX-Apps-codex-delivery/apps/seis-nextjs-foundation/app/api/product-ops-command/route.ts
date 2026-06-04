import { NextResponse } from "next/server";

import { getProductOpsSignals, getProductOpsSummary, getProductOpsTasks } from "@/lib/product-ops-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getProductOpsSummary(),
    signals: getProductOpsSignals(),
    tasks: getProductOpsTasks()
  });
}
