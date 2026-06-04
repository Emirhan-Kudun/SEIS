import { NextResponse } from "next/server";

import {
  getExperienceLabSummary,
  getExperienceSignals,
  getExperimentBacklog,
  getJourneyFrictions
} from "@/lib/experience-lab";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getExperienceLabSummary(),
    signals: getExperienceSignals(),
    frictions: getJourneyFrictions(),
    experiments: getExperimentBacklog()
  });
}
