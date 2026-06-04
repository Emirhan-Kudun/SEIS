import { NextResponse } from "next/server";

import { integrationEntries, resolveIntegrationStatus } from "@/lib/integrations";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const integrationStatus = integrationEntries.map((entry) => ({
    id: entry.id,
    label: entry.label,
    readiness: entry.readiness,
    status: resolveIntegrationStatus(entry)
  }));

  return NextResponse.json({
    ok: true,
    service: siteConfig.shortName,
    timestamp: new Date().toISOString(),
    checks: {
      siteUrlConfigured: Boolean(siteConfig.url),
      contactEmailConfigured: Boolean(siteConfig.email),
      integrations: integrationStatus
    }
  });
}
