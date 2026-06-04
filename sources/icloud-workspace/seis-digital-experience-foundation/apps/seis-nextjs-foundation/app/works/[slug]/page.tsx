import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { resolveLocale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getStaticWorkSlugs, getWorkBySlug, getWorkItems } from "@/lib/creative-content";
import { absoluteUrl } from "@/lib/site-config";

type WorkPageProps = {
  params: { slug: string };
  searchParams?: { lang?: string };
};

export function generateStaticParams() {
  return getStaticWorkSlugs();
}

export function generateMetadata({ params }: WorkPageProps): Metadata {
  const work = getWorkBySlug("en", params.slug);
  if (!work) {
    return { title: "Work Not Found" };
  }

  return {
    title: `${work.title} | Works`,
    description: work.summary,
    alternates: {
      canonical: `/works/${params.slug}`
    },
    openGraph: {
      title: `${work.title} | Works`,
      description: work.summary,
      type: "article",
      url: absoluteUrl(`/works/${params.slug}`),
      images: [absoluteUrl("/opengraph-image")]
    }
  };
}

export default function WorkPage({ params, searchParams }: WorkPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const dict = getCreativeDictionary(locale);
  const work = getWorkBySlug(locale, params.slug);
  if (!work) notFound();

  const related = getWorkItems(locale).filter((item) => item.slug !== work.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(980px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">
          {work.year} · {work.client} · {work.category}
        </p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{work.title}</h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">{work.summary}</p>

        <article className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Challenge</h2>
          <p className="mt-2 text-sm text-seis-muted sm:text-base">{work.challenge}</p>
        </article>

        <article className="mt-4 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Execution</h2>
          <ul className="mt-3 grid gap-2 text-sm text-seis-muted sm:text-base">
            {work.execution.map((step) => (
              <li key={step} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                {step}
              </li>
            ))}
          </ul>
        </article>

        <article className="mt-4 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Outcome</h2>
          <p className="mt-2 text-sm text-seis-muted sm:text-base">{work.outcome}</p>
        </article>

        <article className="mt-4 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Metrics</h2>
          <ul className="mt-3 grid gap-2 text-sm text-seis-muted sm:grid-cols-2 sm:text-base">
            {work.metrics.map((metric) => (
              <li key={metric} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                {metric}
              </li>
            ))}
          </ul>
        </article>

        <article className="mt-4 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-seis-muted">
            {work.stack.map((item) => (
              <li key={item} className="rounded-full border border-seis-line bg-[#1a1510] px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <div className="mt-8">
          <h2 className="font-serif text-3xl">Related Works</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <article key={item.slug} className="rounded-lg border border-seis-line bg-seis-surface p-4">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
                <p className="mt-3">
                  <Link href={`/works/${item.slug}?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {dict.viewProject}
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8">
          <Link href={`/?lang=${locale}#works`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {dict.navWorks}
          </Link>
        </p>
      </section>
    </main>
  );
}
