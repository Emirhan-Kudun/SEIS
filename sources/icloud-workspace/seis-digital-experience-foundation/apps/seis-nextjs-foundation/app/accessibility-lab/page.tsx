import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getAccessibilityChecks,
  getAccessibilityRemediations,
  getAccessibilitySummary
} from "@/lib/accessibility-command";

export const metadata: Metadata = {
  title: "Accessibility Lab",
  description: "Accessibility command board for WCAG-aligned checks, remediation flow, and mobile touch safety.",
  alternates: {
    canonical: "/accessibility-lab"
  }
};

type AccessibilityLabPageProps = {
  searchParams?: { lang?: string };
};

export default function AccessibilityLabPage({ searchParams }: AccessibilityLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getAccessibilitySummary();
  const checks = getAccessibilityChecks();
  const remediations = getAccessibilityRemediations();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Accessibility Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Accessibility quality system for keyboard, motion, contrast, and mobile tap safety.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps premium visuals aligned with real usability and inclusive interaction quality.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Checks</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalChecks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Pass</p>
            <p className="mt-1 font-serif text-3xl">{summary.passChecks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchChecks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Fail</p>
            <p className="mt-1 font-serif text-3xl">{summary.failChecks}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">A11y Checks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {checks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - {item.surface}
                  </p>
                  <p className="mt-1 text-seis-text">{item.check}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Remediation Backlog</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {remediations.map((item) => (
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
          <Link href="/api/accessibility-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/accessibility-command
          </Link>
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open quality lab
          </Link>
          <Link href={`/experience-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open experience lab
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
        </div>
      </section>
    </main>
  );
}
