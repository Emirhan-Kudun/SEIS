import { NextResponse } from "next/server";

import { getExperienceLabSummary, getExperimentBacklog, getJourneyFrictions } from "@/lib/experience-lab";
import { getFunnelStages, getFunnelSummary } from "@/lib/funnel-strategy";
import { getPipelineSummary } from "@/lib/execution-pipeline";
import { getSeoSummary } from "@/lib/seo-intelligence";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getFunnelSummary(),
    stages: getFunnelStages(),
    frictions: getJourneyFrictions(),
    experiments: getExperimentBacklog(),
    experienceSummary: getExperienceLabSummary(),
    pipelineSummary: getPipelineSummary(),
    seoSummary: getSeoSummary()
  });
}
