import { NextResponse } from "next/server";

import { getKnowledgeSignals, getKnowledgeSummary, getKnowledgeTasks } from "@/lib/knowledge-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getKnowledgeSummary(),
    signals: getKnowledgeSignals(),
    tasks: getKnowledgeTasks()
  });
}
