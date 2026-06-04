import { NextResponse } from "next/server";

import { getWorktreeSignals, getWorktreeSummary, getWorktreeTasks } from "@/lib/worktree-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getWorktreeSummary(),
    signals: getWorktreeSignals(),
    tasks: getWorktreeTasks()
  });
}
