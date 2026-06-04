import { NextResponse } from "next/server";

import { getServiceItems, getToolGroups } from "@/lib/creative-content";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    services: getServiceItems(),
    toolGroups: getToolGroups(),
    operatingPrinciples: [
      "cinematic calm before spectacle",
      "small reversible diffs",
      "reduced-motion parity",
      "typed API contracts",
      "runtime storage without heavy local services"
    ]
  });
}
