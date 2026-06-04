import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getInsightBySlug, getRelatedInsights, getStaticInsightSlugs } from "@/lib/insights-content";
import { absoluteUrl } from "@/lib/site-config";

type InsightDetailPageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export function generateStaticParams() {
  return getStaticInsightSlugs();
}

export function generateMetadata({ params }: InsightDetailPageProps): Metadata {
  const insight = getInsightBySlug("en", params.slug);
  if (!insight) {
    return { title: "Insight Not Found" };
  }

  return {
    title: `${insight.title} | Insights`,
    description: insight.summary,
    alternates: {
      canonical: `/insights/${params.slug}`
    },
    openGraph: {
      title: `${insight.title} | Insights`,
      description: insight.summary,
      type: "article",
      url: absoluteUrl(`/insights/${params.slug}`),
      images: [absoluteUrl("/opengraph-image")]
    }
  };
}

export default function InsightDetailPage({ params, searchParams }: InsightDetailPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const dict = getCreativeDictionary(locale);
  const insight = getInsightBySlug(locale, params.slug);
  if (!insight) notFound();

  const related = getRelatedInsights(locale, insight.slug, 2);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(980px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">
          {insight.publishedAt} - {insight.readTime}
        </p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{insight.title}</h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">{insight.summary}</p>

        <article className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Key Notes</h2>
          <ol className="mt-3 grid gap-2 text-sm text-seis-muted sm:text-base">
            {insight.sections.map((item) => (
              <li key={item} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                {item}
              </li>
            ))}
          </ol>
        </article>

        <div className="mt-8">
          <h2 className="font-serif text-3xl">Related Insights</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <article key={item.slug} className="rounded-lg border border-seis-line bg-seis-surface p-4">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
                <p className="mt-3">
                  <Link href={`/insights/${item.slug}?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {dict.viewInsight}
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8">
          <Link href={`/insights?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {dict.openInsightsIndex}
          </Link>
        </p>
      </section>
    </main>
  );
}
