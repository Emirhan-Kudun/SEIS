import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getContentOpsSignals,
  getContentOpsSummary,
  getContentOpsTasks
} from "@/lib/content-ops-command";

export const metadata: Metadata = {
  title: "Content Ops Lab",
  description: "Content operations command board for multilingual parity, SEO alignment, and conversion narrative quality.",
  alternates: {
    canonical: "/content-ops-lab"
  }
};

type ContentOpsLabPageProps = {
  searchParams?: { lang?: string };
};

export default function ContentOpsLabPage({ searchParams }: ContentOpsLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getContentOpsSummary();
  const signals = getContentOpsSignals();
  const tasks = getContentOpsTasks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Content Ops Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Content operations for multilingual consistency, SEO depth, and conversion clarity.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps narrative quality aligned with product evolution and route-level growth goals.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Signals</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalSignals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p>
            <p className="mt-1 font-serif text-3xl">{summary.healthySignals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchSignals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p>
            <p className="mt-1 font-serif text-3xl">{summary.criticalSignals}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Content Signals</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {signals.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - {item.area}
                  </p>
                  <p className="mt-1 text-seis-text">{item.detail}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                  <p className="mt-1 text-sm text-seis-muted">next: {item.nextAction}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Content Tasks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {tasks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.lane} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/content-ops-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/content-ops-command
          </Link>
          <Link href={`/insights?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open insights
          </Link>
          <Link href={`/services?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open services
          </Link>
          <Link href={`/strategy?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open strategy
          </Link>
        </div>
      </section>
    </main>
  );
}
