import { NextResponse } from "next/server";

import {
  getContentModels,
  getLocaleReadiness,
  getMultilingualPlanningSummary,
  getPlanningTracks,
  getSpatialReadinessPolicy
} from "@/lib/multilingual-planning";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getMultilingualPlanningSummary(),
    locales: getLocaleReadiness(),
    tracks: getPlanningTracks(),
    contentModels: getContentModels(),
    spatialPolicy: getSpatialReadinessPolicy()
  });
}
