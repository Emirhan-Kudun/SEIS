import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/runtime-auth";
import { getRuntimeStoreSummary, readScopePlans } from "@/lib/runtime-store";

export const runtime = "nodejs";

function readLimit(request: Request): number {
  const url = new URL(request.url);
  const parsed = Number(url.searchParams.get("limit") || 50);

  if (!Number.isFinite(parsed)) return 50;
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

export async function GET(request: Request) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, message: auth.message, reason: auth.reason }, { status: auth.status });
  }

  const limit = readLimit(request);
  const [scopePlans, runtimeStore] = await Promise.all([readScopePlans(limit), getRuntimeStoreSummary()]);

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    limit,
    count: scopePlans.length,
    runtimeStore,
    scopePlans
  });
}
