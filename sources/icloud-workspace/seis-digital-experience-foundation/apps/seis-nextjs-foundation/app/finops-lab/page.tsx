import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getCostOptimizations, getFinopsBudgets, getFinopsSummary } from "@/lib/finops-command";

export const metadata: Metadata = {
  title: "FinOps Lab",
  description: "FinOps command surface for cost governance, budget health, and optimization planning.",
  alternates: {
    canonical: "/finops-lab"
  }
};

type FinopsLabPageProps = {
  searchParams?: { lang?: string };
};

export default function FinopsLabPage({ searchParams }: FinopsLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getFinopsSummary();
  const budgets = getFinopsBudgets();
  const optimizations = getCostOptimizations();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS FinOps Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Financial operations for stable scaling, cost visibility, and optimization discipline.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Protects growth velocity while maintaining budget predictability and delivery sustainability.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Budgets</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalBudgets}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p>
            <p className="mt-1 font-serif text-3xl">{summary.healthyBudgets}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchBudgets}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Over Budget</p>
            <p className="mt-1 font-serif text-3xl">{summary.overBudgets}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Budget Health</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {budgets.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - {item.scope}
                  </p>
                  <p className="mt-1 text-seis-text">budget: {item.monthlyBudget}</p>
                  <p className="mt-1 text-seis-text">current: {item.currentSpend}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.action}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Optimization Backlog</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {optimizations.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - impact: {item.impact}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">area: {item.area}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/finops-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/finops-command
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
          <Link href={`/capacity-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open capacity lab
          </Link>
          <Link href={`/strategy?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open strategy board
          </Link>
        </div>
      </section>
    </main>
  );
}
