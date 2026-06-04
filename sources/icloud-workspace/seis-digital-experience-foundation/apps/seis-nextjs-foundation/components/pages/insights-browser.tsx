"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { InsightItem } from "@/lib/insights-content";

type InsightsBrowserProps = {
  locale: Locale;
  insights: InsightItem[];
  tags: string[];
};

export function InsightsBrowser({ locale, insights, tags }: InsightsBrowserProps) {
  const dict = getCreativeDictionary(locale);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return insights.filter((item) => {
      const tagPass = selectedTag === "all" ? true : item.tags.includes(selectedTag);
      if (!tagPass) return false;

      if (!normalizedQuery) return true;
      return (
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [insights, query, selectedTag]);

  return (
    <>
      <div className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Search Insights
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, summary, or tags"
            className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedTag("all")}
            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.1em] ${
              selectedTag === "all"
                ? "border-seis-accent bg-seis-accent text-[#16110c]"
                : "border-seis-line text-seis-muted hover:border-seis-accent"
            }`}
          >
            All tags
          </button>
          {tags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.1em] ${
                  active
                    ? "border-seis-accent bg-seis-accent text-[#16110c]"
                    : "border-seis-line text-seis-muted hover:border-seis-accent"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">{filtered.length} result(s)</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.slug} className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">
              {item.publishedAt} - {item.readTime}
            </p>
            <h2 className="mt-2 font-serif text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs text-seis-muted">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-seis-line bg-[#1a1510] px-2 py-1">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <Link
                href={`/insights/${item.slug}?lang=${locale}`}
                className="text-xs uppercase tracking-[0.1em] text-seis-accent"
                onClick={() => {
                  void trackEvent({
                    name: "insight_opened",
                    scope: "insights-browser",
                    label: item.slug,
                    locale
                  });
                }}
              >
                {dict.viewInsight}
              </Link>
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
