import { NextResponse } from "next/server";

import {
  getAccessibilityChecks,
  getAccessibilityRemediations,
  getAccessibilitySummary
} from "@/lib/accessibility-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getAccessibilitySummary(),
    checks: getAccessibilityChecks(),
    remediations: getAccessibilityRemediations()
  });
}
