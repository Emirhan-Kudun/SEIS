import { NextResponse } from "next/server";

import {
  getAccessibilityAudits,
  getContentGovernanceChecks,
  getPerformanceBudgets,
  getQualityAuditSummary
} from "@/lib/quality-audits";
import { getExperienceLabSummary } from "@/lib/experience-lab";
import { getSeoSummary } from "@/lib/seo-intelligence";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getQualityAuditSummary(),
    performanceBudgets: getPerformanceBudgets(),
    accessibilityAudits: getAccessibilityAudits(),
    contentGovernanceChecks: getContentGovernanceChecks(),
    experienceSummary: getExperienceLabSummary(),
    seoSummary: getSeoSummary()
  });
}
