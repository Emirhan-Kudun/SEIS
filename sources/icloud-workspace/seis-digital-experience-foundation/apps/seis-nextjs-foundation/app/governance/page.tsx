import type { Metadata } from "next";
import Link from "next/link";

import { getGovernanceRules, getGovernanceSummary } from "@/lib/governance-content";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Governance",
  description: "SEIS governance matrix for branch safety, quality control, and rollback discipline.",
  alternates: {
    canonical: "/governance"
  }
};

type GovernancePageProps = {
  searchParams?: { lang?: string };
};

export default function GovernancePage({ searchParams }: GovernancePageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const rules = getGovernanceRules();
  const summary = getGovernanceSummary();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Governance</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Operational ruleset for stable, reversible, and production-safe evolution.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Every rule pairs validation with rollback guidance so architecture quality scales without hidden operational risk.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Total Rules</p>
            <p className="mt-1 font-serif text-3xl">{summary.total}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">High</p>
            <p className="mt-1 font-serif text-3xl">{summary.highSeverity}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Medium</p>
            <p className="mt-1 font-serif text-3xl">{summary.mediumSeverity}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Low</p>
            <p className="mt-1 font-serif text-3xl">{summary.lowSeverity}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3">
          {rules.map((rule) => (
            <article key={rule.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-seis-line bg-[#1a1510] px-2 py-1 text-[11px] uppercase tracking-[0.1em] text-seis-accent">
                  {rule.domain}
                </span>
                <span
                  className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${
                    rule.severity === "high"
                      ? "border-red-600/40 bg-red-500/10 text-red-200"
                      : rule.severity === "medium"
                        ? "border-amber-600/40 bg-amber-500/10 text-amber-200"
                        : "border-emerald-600/40 bg-emerald-500/10 text-emerald-200"
                  }`}
                >
                  {rule.severity}
                </span>
              </div>
              <h2 className="mt-2 font-serif text-3xl">{rule.title}</h2>
              <p className="mt-2 text-sm text-seis-muted">{rule.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Validation</p>
              <p className="mt-1 text-sm text-seis-muted">{rule.validation}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Rollback</p>
              <p className="mt-1 text-sm text-seis-muted">{rule.rollback}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/api/governance-matrix" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/governance-matrix
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open operations console
          </Link>
        </div>

        <p className="mt-8">
          <Link href={`/?lang=${locale}#systems`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Back to systems section
          </Link>
        </p>
      </section>
    </main>
  );
}
