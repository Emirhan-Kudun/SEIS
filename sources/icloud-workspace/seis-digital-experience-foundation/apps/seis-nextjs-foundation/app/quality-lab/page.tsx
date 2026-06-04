import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getAccessibilityAudits,
  getContentGovernanceChecks,
  getPerformanceBudgets,
  getQualityAuditSummary
} from "@/lib/quality-audits";

export const metadata: Metadata = {
  title: "Quality Lab",
  description: "Performance, accessibility, and content governance quality lab for production-safe iteration.",
  alternates: {
    canonical: "/quality-lab"
  }
};

type QualityLabPageProps = {
  searchParams?: { lang?: string };
};

export default function QualityLabPage({ searchParams }: QualityLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getQualityAuditSummary();
  const budgets = getPerformanceBudgets();
  const a11y = getAccessibilityAudits();
  const content = getContentGovernanceChecks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Quality Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Performance, accessibility, and content governance checks in one production-quality surface.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Use this lab to track quality drift and keep feature expansion aligned with maintainability constraints.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Performance</p>
            <p className="mt-1 font-serif text-3xl">
              {summary.performance.healthy}/{summary.performance.total}
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Accessibility</p>
            <p className="mt-1 font-serif text-3xl">
              {summary.accessibility.pass}/{summary.accessibility.total}
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Content Governance</p>
            <p className="mt-1 font-serif text-3xl">
              {summary.contentGovernance.aligned}/{summary.contentGovernance.total}
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Performance Budgets</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {budgets.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                  <p className="text-seis-text">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    target: {item.target} - current: {item.current}
                  </p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Accessibility Audits</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {a11y.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                  <p className="text-seis-text">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">{item.status}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Content Governance</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {content.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                  <p className="text-seis-text">{item.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    {item.status} - owner: {item.owner}
                  </p>
                  <p className="mt-1 text-sm text-seis-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link href="/api/quality-audits" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/quality-audits
          </Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link href={`/experience-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open experience lab
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
          <Link href="/api/orchestration-readiness" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/orchestration-readiness
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/seo-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open SEO lab
          </Link>
          <Link href={`/dependency-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open dependency lab
          </Link>
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open execution lab
          </Link>
          <Link href={`/incident-center?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open incident center
          </Link>
        </div>
      </section>
    </main>
  );
}
