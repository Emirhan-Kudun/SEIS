import { NextResponse } from "next/server";

import {
  getConnectorStrategies,
  getProviderChannels,
  getProviderOrchestrationSummary
} from "@/lib/provider-orchestration";
import { getDependencySummary } from "@/lib/dependency-governance";
import { getIncidentSummary } from "@/lib/incident-center";
import { getExecutionTracks, getRoadmapSummary } from "@/lib/system-roadmap";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getProviderOrchestrationSummary(),
    providers: getProviderChannels(),
    connectors: getConnectorStrategies(),
    roadmapSummary: getRoadmapSummary(),
    executionTracks: getExecutionTracks().filter((item) => item.area === "ai" || item.area === "ops"),
    dependencySummary: getDependencySummary(),
    incidentSummary: getIncidentSummary()
  });
}
