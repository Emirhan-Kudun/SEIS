import { NextResponse } from "next/server";

import { getCaseStudies, resolveLocale } from "@/lib/content";
import { getWorkItems } from "@/lib/creative-content";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = resolveLocale(url.searchParams.get("lang") ?? undefined);

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    locale,
    projects: getWorkItems(locale).map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      category: item.category,
      year: item.year,
      client: item.client,
      stack: item.stack,
      metrics: item.metrics
    })),
    cases: getCaseStudies(locale).map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      year: item.year,
      role: item.role
    }))
  });
}
