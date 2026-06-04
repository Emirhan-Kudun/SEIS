import { NextResponse } from "next/server";

import { getSkillsSignals, getSkillsSummary, getSkillsTasks } from "@/lib/skills-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getSkillsSummary(),
    signals: getSkillsSignals(),
    tasks: getSkillsTasks()
  });
}
