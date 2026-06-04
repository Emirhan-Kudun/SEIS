"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { trackEvent } from "@/lib/analytics";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getWorkItems, WorkCategory } from "@/lib/creative-content";

type SelectedWorksSectionProps = {
  locale: Locale;
};

type FilterItem = {
  value: "all" | WorkCategory;
  label: string;
};

export function SelectedWorksSection({ locale }: SelectedWorksSectionProps) {
  const dict = getCreativeDictionary(locale);
  const works = useMemo(() => getWorkItems(locale), [locale]);
  const [filter, setFilter] = useState<"all" | WorkCategory>("all");

  const filters = useMemo<FilterItem[]>(
    () => [
      { value: "all", label: dict.allCategories },
      { value: "product", label: "Product" },
      { value: "ui", label: "UI" },
      { value: "brand", label: "Brand" },
      { value: "motion", label: "Motion" },
      { value: "ai", label: "AI" }
    ],
    [dict.allCategories]
  );

  const filtered = useMemo(
    () => (filter === "all" ? works : works.filter((item) => item.category === filter)),
    [filter, works]
  );

  return (
    <section id="works" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.06}>
        <SectionHeading eyebrow={dict.worksEyebrow} title={dict.worksTitle} />
        <p className="mt-3 max-w-3xl text-sm text-seis-muted sm:text-base">{dict.worksLead}</p>

        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Work category filters">
          {filters.map((item) => {
            const active = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(item.value);
                  void trackEvent({
                    name: "work_filter_changed",
                    scope: "selected-works",
                    label: item.value,
                    locale
                  });
                }}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? "border-seis-accent bg-seis-accent text-[#16110c]"
                    : "border-seis-line text-seis-muted hover:border-seis-accent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {filtered.map((work) => (
            <article key={work.slug} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">
                {work.year} · {work.client}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text">{work.title}</h3>
              <p className="mt-2 text-sm text-seis-muted">{work.summary}</p>
              <ul className="mt-3 grid gap-1 text-xs text-seis-muted">
                {work.metrics.slice(0, 2).map((metric) => (
                  <li key={metric} className="rounded border border-seis-line bg-[#1a1510] px-2 py-1">
                    {metric}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                <Link
                  href={`/works/${work.slug}?lang=${locale}`}
                  className="text-xs uppercase tracking-[0.1em] text-seis-accent"
                  onClick={() => {
                    void trackEvent({
                      name: "work_item_opened",
                      scope: "selected-works",
                      label: work.slug,
                      locale
                    });
                  }}
                >
                  {dict.viewProject}
                </Link>
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6">
          <Link href={`/works?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Open works index
          </Link>
        </p>
      </FadeIn>
    </section>
  );
}
