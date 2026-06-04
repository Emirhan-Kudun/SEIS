import { NextResponse } from "next/server";

import { getContentSnapshot } from "@/lib/content-snapshot";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") ?? undefined;

  return NextResponse.json({
    ok: true,
    snapshot: getContentSnapshot(lang)
  });
}
