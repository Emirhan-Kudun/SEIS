import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCaseStudyBySlug, getCaseStudies, getStaticCaseSlugs, resolveLocale } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-config";
import { getUiDictionary } from "@/lib/site-i18n";

type CaseStudyPageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export function generateStaticParams() {
  return getStaticCaseSlugs();
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const study = getCaseStudyBySlug("en", params.slug);
  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${study.title} | SEIS Case Study`,
    description: study.summary,
    alternates: {
      canonical: `/case-studies/${params.slug}`
    },
    openGraph: {
      title: `${study.title} | SEIS Case Study`,
      description: study.summary,
      type: "article",
      url: absoluteUrl(`/case-studies/${params.slug}`),
      images: [absoluteUrl("/opengraph-image")]
    }
  };
}

export default function CaseStudyPage({ params, searchParams }: CaseStudyPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const ui = getUiDictionary(locale);
  const study = getCaseStudyBySlug(locale, params.slug);
  if (!study) notFound();

  const nearby = getCaseStudies(locale).filter((item) => item.slug !== study.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(980px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">Case Study</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{study.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-[0.1em] text-seis-muted">
          {study.year} · {study.role}
        </p>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">{study.summary}</p>

        <div className="mt-6 grid gap-4">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">{ui.challenge}</h2>
            <p className="mt-2 text-sm text-seis-muted sm:text-base">{study.challenge}</p>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">{ui.process}</h2>
            <ol className="mt-3 grid gap-2 text-sm text-seis-muted sm:text-base">
              {study.process.map((step) => (
                <li key={step} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                  {step}
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">{ui.solution}</h2>
            <p className="mt-2 text-sm text-seis-muted sm:text-base">{study.solution}</p>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">{ui.outcome}</h2>
            <p className="mt-2 text-sm text-seis-muted sm:text-base">{study.outcome}</p>
          </article>
        </div>

        <div className="mt-8">
          <h2 className="font-serif text-3xl">{ui.relatedStudies}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {nearby.map((item) => (
              <article key={item.slug} className="rounded-lg border border-seis-line bg-seis-surface p-4">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
                <p className="mt-3">
                  <Link href={`/case-studies/${item.slug}?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {ui.openStudy}
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8">
          <Link href={`/?lang=${locale}#case-studies`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {ui.backToHomepage}
          </Link>
        </p>
      </section>
    </main>
  );
}
