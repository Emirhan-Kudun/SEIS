import { NextResponse } from "next/server";

import { getLaunchChecklist, getLaunchChecklistSummary } from "@/lib/launch-checklist";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getLaunchChecklistSummary(),
    checklist: getLaunchChecklist()
  });
}
