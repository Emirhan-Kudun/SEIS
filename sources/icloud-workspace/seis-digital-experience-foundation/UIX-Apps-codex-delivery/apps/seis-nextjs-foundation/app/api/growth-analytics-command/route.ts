import { NextResponse } from "next/server";

import {
  getFunnelHealth,
  getGrowthAnalyticsSummary,
  getSegmentInsights
} from "@/lib/growth-analytics-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getGrowthAnalyticsSummary(),
    funnel: getFunnelHealth(),
    segments: getSegmentInsights()
  });
}
