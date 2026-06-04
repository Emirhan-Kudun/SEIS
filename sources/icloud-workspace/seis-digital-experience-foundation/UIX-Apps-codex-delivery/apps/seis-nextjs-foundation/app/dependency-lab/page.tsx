import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getDependencyGuardrails,
  getDependencyPolicies,
  getDependencySummary
} from "@/lib/dependency-governance";

export const metadata: Metadata = {
  title: "Dependency Lab",
  description: "Dependency governance lab for package risk control and rollback-safe upgrade strategy.",
  alternates: {
    canonical: "/dependency-lab"
  }
};

type DependencyLabPageProps = {
  searchParams?: { lang?: string };
};

export default function DependencyLabPage({ searchParams }: DependencyLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getDependencySummary();
  const policies = getDependencyPolicies();
  const guardrails = getDependencyGuardrails();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Dependency Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Dependency policy, guardrail enforcement, and rollback-safe upgrade posture.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Protects performance and maintainability by preventing unnecessary dependency sprawl.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Policies</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalPolicies}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Approved</p>
            <p className="mt-1 font-serif text-3xl">{summary.approvedPolicies}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchPolicies}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Restricted</p>
            <p className="mt-1 font-serif text-3xl">{summary.restrictedPolicies}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Dependency Policies</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {policies.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.category} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.packageName}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.rationale}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Cadence</p>
                  <p className="mt-1">{item.upgradeCadence}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Rollback</p>
                  <p className="mt-1">{item.rollbackPlan}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Guardrails</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {guardrails.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.level}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/dependency-governance" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/dependency-governance
          </Link>
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open execution lab
          </Link>
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open quality lab
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
        </div>
      </section>
    </main>
  );
}
