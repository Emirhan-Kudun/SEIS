import type { Metadata } from "next";
import Link from "next/link";

import { getCaseStudies, resolveLocale } from "@/lib/content";
import { getUiDictionary } from "@/lib/site-i18n";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "SEIS case study index covering challenge, process, solution, and outcome layers.",
  alternates: {
    canonical: "/case-studies"
  }
};

type CaseStudiesPageProps = {
  searchParams?: { lang?: string };
};

export default function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const ui = getUiDictionary(locale);
  const studies = getCaseStudies(locale);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{ui.caseIndexEyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{ui.caseIndexTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm text-seis-muted sm:text-base">{ui.caseIndexLead}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <article key={study.slug} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{study.year}</p>
              <h2 className="mt-2 font-serif text-2xl">{study.title}</h2>
              <p className="mt-2 text-sm text-seis-muted">{study.summary}</p>
              <p className="mt-4 flex items-center gap-3">
                <Link
                  href={`/case-studies/${study.slug}?lang=${locale}`}
                  className="text-xs uppercase tracking-[0.1em] text-seis-accent"
                >
                  {ui.openStudy}
                </Link>
                <Link href={`/?lang=${locale}#case-studies`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
                  {ui.back}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
