import { NextResponse } from "next/server";

import { getAiWorkflowPacks, getAiWorkflowStats } from "@/lib/ai-workflows";

export async function GET() {
  const workflows = getAiWorkflowPacks();
  const stats = getAiWorkflowStats();

  return NextResponse.json({
    ok: true,
    stats,
    workflows
  });
}
