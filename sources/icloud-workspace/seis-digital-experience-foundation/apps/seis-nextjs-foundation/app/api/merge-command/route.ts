import { NextResponse } from "next/server";

import { getMergeSignals, getMergeSummary, getMergeTasks } from "@/lib/merge-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getMergeSummary(),
    signals: getMergeSignals(),
    tasks: getMergeTasks()
  });
}
