import { NextResponse } from "next/server";

import { locales, resolveLocale } from "@/lib/content";
import { getInteractionLabContent } from "@/lib/interaction-lab-content";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = resolveLocale(url.searchParams.get("lang") ?? undefined);
  const content = getInteractionLabContent(locale);

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    locale,
    locales,
    summary: {
      hoverPatterns: content.hoverPatterns.length,
      motionPatterns: content.motionPatterns.length,
      principles: content.principles.length
    },
    content
  });
}
