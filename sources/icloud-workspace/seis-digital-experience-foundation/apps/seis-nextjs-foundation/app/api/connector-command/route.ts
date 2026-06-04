import { NextResponse } from "next/server";

import { getConnectorSignals, getConnectorSummary, getConnectorTasks } from "@/lib/connector-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getConnectorSummary(),
    signals: getConnectorSignals(),
    tasks: getConnectorTasks()
  });
}
