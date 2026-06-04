import { NextResponse } from "next/server";

import { getDoctrineDocuments } from "@/lib/doctrine-content";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    documents: getDoctrineDocuments()
  });
}
