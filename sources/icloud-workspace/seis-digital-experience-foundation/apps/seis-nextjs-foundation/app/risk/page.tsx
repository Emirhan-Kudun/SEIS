import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getRiskRegister, getRiskSummary } from "@/lib/risk-register";

export const metadata: Metadata = {
  title: "Risk Register",
  description: "Structured risk register with mitigations, triggers, and rollback plans.",
  alternates: {
    canonical: "/risk"
  }
};

type RiskPageProps = {
  searchParams?: { lang?: string };
};

export default function RiskPage({ searchParams }: RiskPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getRiskSummary();
  const risks = getRiskRegister();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Risk Hub</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Live risk register for frontend, backend, governance, AI workflows, and release operations.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Every risk includes trigger patterns, mitigation steps, and an explicit rollback plan.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Total</p>
            <p className="mt-1 font-serif text-3xl">{summary.total}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p>
            <p className="mt-1 font-serif text-3xl">{summary.byLevel.critical}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">High</p>
            <p className="mt-1 font-serif text-3xl">{summary.byLevel.high}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Medium</p>
            <p className="mt-1 font-serif text-3xl">{summary.byLevel.medium}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3">
          {risks.map((risk) => (
            <article key={risk.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-seis-line bg-[#1a1510] px-2 py-1 text-[11px] uppercase tracking-[0.1em] text-seis-accent">
                  {risk.domain}
                </span>
                <span
                  className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${
                    risk.level === "critical"
                      ? "border-red-600/40 bg-red-500/10 text-red-200"
                      : risk.level === "high"
                        ? "border-amber-600/40 bg-amber-500/10 text-amber-200"
                        : risk.level === "medium"
                          ? "border-yellow-700/40 bg-yellow-500/10 text-yellow-200"
                          : "border-emerald-600/40 bg-emerald-500/10 text-emerald-200"
                  }`}
                >
                  {risk.level}
                </span>
                <span className="text-xs uppercase tracking-[0.08em] text-seis-muted">owner: {risk.owner}</span>
              </div>
              <h2 className="mt-2 font-serif text-3xl">{risk.title}</h2>
              <p className="mt-2 text-sm text-seis-muted">{risk.impact}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Likelihood: {risk.likelihood}</p>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Triggers</p>
                  <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                    {risk.triggers.map((item) => (
                      <li key={item} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Mitigations</p>
                  <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                    {risk.mitigations.map((item) => (
                      <li key={item} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Rollback Plan</p>
              <p className="mt-1 rounded border border-seis-line bg-[#1a1510] px-3 py-2 text-sm text-seis-muted">{risk.rollbackPlan}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link href="/api/risk-register" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/risk-register
          </Link>
          <Link href={`/release-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open release lab
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open quality lab
          </Link>
          <Link href={`/provider-hub?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open provider hub
          </Link>
          <Link href={`/experience-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open experience lab
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
