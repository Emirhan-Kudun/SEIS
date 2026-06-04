import { NextResponse } from "next/server";

import { locales } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    site: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      description: siteConfig.description,
      url: siteConfig.url,
      email: siteConfig.email,
      locales,
      migration: siteConfig.migration
    }
  });
}
