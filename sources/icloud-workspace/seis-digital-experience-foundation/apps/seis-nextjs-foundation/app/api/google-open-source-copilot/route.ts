import { NextRequest, NextResponse } from "next/server";

import {
  getGoogleCopilotActivationPlan,
  getGoogleCopilotLanes,
  getGoogleCopilotSignals,
  getGoogleCopilotSummary
} from "@/lib/google-open-source-copilot";

export async function GET(request: NextRequest) {
  const lane = request.nextUrl.searchParams.get("lane") ?? undefined;

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getGoogleCopilotSummary(),
    lanes: getGoogleCopilotLanes(),
    signals: getGoogleCopilotSignals(),
    activationPlan: getGoogleCopilotActivationPlan(lane)
  });
}
