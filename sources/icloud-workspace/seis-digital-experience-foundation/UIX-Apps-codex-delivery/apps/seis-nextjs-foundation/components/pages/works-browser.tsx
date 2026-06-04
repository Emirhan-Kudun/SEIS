"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { WorkItem } from "@/lib/creative-content";

type WorksBrowserProps = {
  locale: Locale;
  works: WorkItem[];
};

export function WorksBrowser({ locale, works }: WorksBrowserProps) {
  const dict = getCreativeDictionary(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const unique = new Set<string>();
    works.forEach((item) => unique.add(item.category));
    return ["all", ...unique];
  }, [works]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return works.filter((item) => {
      const categoryPass = category === "all" ? true : item.category === category;
      if (!categoryPass) return false;

      if (!normalized) return true;

      return (
        item.title.toLowerCase().includes(normalized) ||
        item.summary.toLowerCase().includes(normalized) ||
        item.client.toLowerCase().includes(normalized)
      );
    });
  }, [category, query, works]);

  return (
    <>
      <div className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Search Works
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search project, client, category"
            className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.1em] ${
                  active
                    ? "border-seis-accent bg-seis-accent text-[#16110c]"
                    : "border-seis-line text-seis-muted hover:border-seis-accent"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">{filtered.length} result(s)</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {filtered.map((work) => (
          <article key={work.slug} className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">
              {work.year} - {work.client} - {work.category}
            </p>
            <h2 className="mt-2 font-serif text-2xl">{work.title}</h2>
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
                    name: "work_opened",
                    scope: "works-browser",
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

      <section className="mt-8 rounded-xl border border-seis-line bg-seis-surface p-4">
        <h2 className="font-serif text-3xl">Comparison Matrix</h2>
        <div className="mt-3 overflow-auto">
          <table className="min-w-full border-collapse text-sm text-seis-muted">
            <thead>
              <tr>
                <th className="border border-seis-line px-3 py-2 text-left text-xs uppercase tracking-[0.08em] text-seis-accent">Project</th>
                <th className="border border-seis-line px-3 py-2 text-left text-xs uppercase tracking-[0.08em] text-seis-accent">Category</th>
                <th className="border border-seis-line px-3 py-2 text-left text-xs uppercase tracking-[0.08em] text-seis-accent">Year</th>
                <th className="border border-seis-line px-3 py-2 text-left text-xs uppercase tracking-[0.08em] text-seis-accent">Primary Stack</th>
              </tr>
            </thead>
            <tbody>
              {works.map((work) => (
                <tr key={work.slug}>
                  <td className="border border-seis-line px-3 py-2 text-seis-text">{work.title}</td>
                  <td className="border border-seis-line px-3 py-2">{work.category}</td>
                  <td className="border border-seis-line px-3 py-2">{work.year}</td>
                  <td className="border border-seis-line px-3 py-2">{work.stack[0] ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
