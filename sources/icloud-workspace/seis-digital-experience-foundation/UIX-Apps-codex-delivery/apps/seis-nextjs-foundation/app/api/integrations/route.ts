import { NextResponse } from "next/server";
import { integrationEntries, resolveIntegrationStatus } from "@/lib/integrations";

export async function GET() {
  return NextResponse.json({
    ok: true,
    updatedAt: new Date().toISOString(),
    integrations: integrationEntries.map((entry) => ({
      ...entry,
      status: resolveIntegrationStatus(entry)
    }))
  });
}
