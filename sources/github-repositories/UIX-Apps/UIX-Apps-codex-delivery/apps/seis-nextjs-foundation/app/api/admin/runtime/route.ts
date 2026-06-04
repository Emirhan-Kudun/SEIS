import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/runtime-auth";
import { getFullStackRuntimeSummary, runtimeCapabilities, runtimeModes } from "@/lib/fullstack-runtime";
import {
  getRuntimeStoreSummary,
  readContactSubmissions,
  readProjectBriefs,
  readReadinessAssessments,
  readScopePlans,
  readRuntimeEvents
} from "@/lib/runtime-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, message: auth.message, reason: auth.reason }, { status: auth.status });
  }

  const [runtimeStore, contacts, briefs, readiness, scopePlans, events] = await Promise.all([
    getRuntimeStoreSummary(),
    readContactSubmissions(20),
    readProjectBriefs(20),
    readReadinessAssessments(20),
    readScopePlans(20),
    readRuntimeEvents(20)
  ]);

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: {
      ...getFullStackRuntimeSummary(),
      recentContacts: contacts.length,
      recentBriefs: briefs.length,
      recentReadiness: readiness.length,
      recentScopePlans: scopePlans.length,
      recentEvents: events.length
    },
    runtimeStore,
    capabilities: runtimeCapabilities,
    modes: runtimeModes
  });
}
