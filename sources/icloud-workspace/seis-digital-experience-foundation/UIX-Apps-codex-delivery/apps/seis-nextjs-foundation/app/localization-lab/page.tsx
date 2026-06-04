import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getLocaleCoverage,
  getLocalizationSummary,
  getLocalizationTasks
} from "@/lib/localization-command";

export const metadata: Metadata = {
  title: "Localization Lab",
  description: "Localization command center for TR/EN/FR/IT/DE coverage and content parity governance.",
  alternates: {
    canonical: "/localization-lab"
  }
};

type LocalizationLabPageProps = {
  searchParams?: { lang?: string };
};

export default function LocalizationLabPage({ searchParams }: LocalizationLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getLocalizationSummary();
  const coverage = getLocaleCoverage();
  const tasks = getLocalizationTasks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Localization Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Localization governance for TR/EN/FR/IT/DE parity, clarity, and release safety.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Ensures multilingual consistency across premium surfaces and new command modules.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Coverage Rows</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalCoverageRows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Complete</p>
            <p className="mt-1 font-serif text-3xl">{summary.completeRows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Partial</p>
            <p className="mt-1 font-serif text-3xl">{summary.partialRows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Missing</p>
            <p className="mt-1 font-serif text-3xl">{summary.missingRows}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Locale Coverage</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {coverage.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.locale.toUpperCase()} - {item.status} - {item.coverage}
                  </p>
                  <p className="mt-1 text-seis-text">{item.section}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Localization Tasks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {tasks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.priority} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/multilingual-planning?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open multilingual planning
          </Link>
          <Link href="/api/localization-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/localization-command
          </Link>
          <Link href="/api/multilingual-planning" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/multilingual-planning
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/research-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open research lab
          </Link>
          <Link href={`/studio?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open studio board
          </Link>
        </div>
      </section>
    </main>
  );
}
