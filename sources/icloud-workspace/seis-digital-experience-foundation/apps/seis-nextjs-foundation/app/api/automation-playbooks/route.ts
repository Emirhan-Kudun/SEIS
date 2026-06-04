import { NextResponse } from "next/server";

import { automationPlaybooks } from "@/lib/automation-content";

export async function GET() {
  return NextResponse.json({
    ok: true,
    total: automationPlaybooks.length,
    playbooks: automationPlaybooks
  });
}
