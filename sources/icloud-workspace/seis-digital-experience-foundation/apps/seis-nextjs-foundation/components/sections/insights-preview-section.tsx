import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getInsights } from "@/lib/insights-content";

type InsightsPreviewSectionProps = {
  locale: Locale;
};

export function InsightsPreviewSection({ locale }: InsightsPreviewSectionProps) {
  const dict = getCreativeDictionary(locale);
  const insights = getInsights(locale).slice(0, 3);

  return (
    <section id="insights" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.085}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow={dict.insightsEyebrow} title={dict.insightsTitle} />
          <Link href={`/insights?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            {dict.openInsightsIndex}
          </Link>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-seis-muted sm:text-base">{dict.insightsLead}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {insights.map((item) => (
            <article key={item.slug} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">
                {item.publishedAt} - {item.readTime}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text">{item.title}</h3>
              <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
              <p className="mt-3">
                <Link href={`/insights/${item.slug}?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                  {dict.viewInsight}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
