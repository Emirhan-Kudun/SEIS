import { NextResponse } from "next/server";

import {
  getAiGovernanceRules,
  getAiGovernanceSummary,
  getAiProviderHealth
} from "@/lib/ai-governance-command";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: getAiGovernanceSummary(),
    rules: getAiGovernanceRules(),
    providers: getAiProviderHealth()
  });
}
