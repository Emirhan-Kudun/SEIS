import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getErrorBudgets, getSloMetrics, getSreRunbooks, getSreSummary } from "@/lib/sre-command";

export const metadata: Metadata = {
  title: "SRE Lab",
  description: "SRE intelligence for SLO tracking, error budget control, and runbook readiness.",
  alternates: {
    canonical: "/sre-lab"
  }
};

type SreLabPageProps = {
  searchParams?: { lang?: string };
};

export default function SreLabPage({ searchParams }: SreLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getSreSummary();
  const slos = getSloMetrics();
  const budgets = getErrorBudgets();
  const runbooks = getSreRunbooks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS SRE Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Reliability operations for SLO health, error budgets, and incident-ready runbooks.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps system reliability visible while feature scope grows across operational modules.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">SLOs</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalSlos}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p>
            <p className="mt-1 font-serif text-3xl">{summary.healthySlos}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Warning Budgets</p>
            <p className="mt-1 font-serif text-3xl">{summary.warningBudgets}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Ready Runbooks</p>
            <p className="mt-1 font-serif text-3xl">{summary.readyRunbooks}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4 lg:col-span-2">
            <h2 className="font-serif text-3xl">SLO Board</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {slos.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - {item.service}
                  </p>
                  <p className="mt-1 text-seis-text">objective: {item.objective}</p>
                  <p className="mt-1 text-sm text-seis-muted">current: {item.current}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Budgets + Runbooks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {budgets.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                  <p className="text-seis-text">{item.window} burn: {item.burnRate}</p>
                  <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">{item.status}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.action}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {runbooks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
                  <p className="text-seis-text">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">{item.status} - owner: {item.owner}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/sre-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/sre-command
          </Link>
          <Link href={`/incident-center?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open incident center
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
        </div>
      </section>
    </main>
  );
}
