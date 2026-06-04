import { NextResponse } from "next/server";

import {
  getLocaleCoverage,
  getLocalizationSummary,
  getLocalizationTasks
} from "@/lib/localization-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getLocalizationSummary(),
    coverage: getLocaleCoverage(),
    tasks: getLocalizationTasks()
  });
}
