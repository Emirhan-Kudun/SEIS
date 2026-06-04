import type { Metadata } from "next";
import Link from "next/link";

import { InsightsBrowser } from "@/components/pages/insights-browser";
import { resolveLocale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getInsightTagList, getInsights } from "@/lib/insights-content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Cinematic frontend, design system, and AI-ready product engineering insights.",
  alternates: {
    canonical: "/insights"
  }
};

type InsightsPageProps = {
  searchParams?: { lang?: string };
};

export default function InsightsPage({ searchParams }: InsightsPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const dict = getCreativeDictionary(locale);
  const insights = getInsights(locale);
  const tags = getInsightTagList(locale);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{dict.insightsEyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{dict.insightsTitle}</h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">{dict.insightsLead}</p>

        <InsightsBrowser locale={locale} insights={insights} tags={tags} />

        <p className="mt-8">
          <Link href={`/?lang=${locale}#insights`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {dict.navInsights}
          </Link>
        </p>
      </section>
    </main>
  );
}
