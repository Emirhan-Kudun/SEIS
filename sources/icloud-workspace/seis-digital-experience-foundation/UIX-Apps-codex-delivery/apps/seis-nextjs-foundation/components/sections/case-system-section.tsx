import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { getCaseStudies, HomeDictionary, Locale } from "@/lib/content";
import { getUiDictionary } from "@/lib/site-i18n";

type CaseSystemSectionProps = {
  dict: HomeDictionary;
  locale: Locale;
};

export function CaseSystemSection({ dict, locale }: CaseSystemSectionProps) {
  const ui = getUiDictionary(locale);
  const studies = getCaseStudies(locale);

  return (
    <section id="case-studies" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.08}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow={dict.sectionCase} title="A repeatable case-study structure ready for scale." />
          <Link href={`/case-studies?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Open case index
          </Link>
        </div>
        <ol className="mt-4 grid gap-3 text-sm text-seis-muted sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <li key={study.slug} className="rounded-lg border border-seis-line bg-seis-surface p-3">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{study.year}</p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text">{study.title}</h3>
              <p className="mt-2">{study.summary}</p>
              <p className="mt-3">
                <Link href={`/case-studies/${study.slug}?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                  {ui.openStudy}
                </Link>
              </p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
