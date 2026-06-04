import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getAuditCheckpoints,
  getComplianceControls,
  getComplianceSummary
} from "@/lib/compliance-matrix";

export const metadata: Metadata = {
  title: "Compliance Lab",
  description: "Compliance matrix for security, privacy, accessibility, and governance continuity.",
  alternates: {
    canonical: "/compliance-lab"
  }
};

type ComplianceLabPageProps = {
  searchParams?: { lang?: string };
};

export default function ComplianceLabPage({ searchParams }: ComplianceLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getComplianceSummary();
  const controls = getComplianceControls();
  const checkpoints = getAuditCheckpoints();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Compliance Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Policy compliance visibility for security, accessibility, privacy, and governance.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Maintains production trust while expanding operational feature surfaces.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Controls</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalControls}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Compliant</p>
            <p className="mt-1 font-serif text-3xl">{summary.compliantControls}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchControls}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Active Audits</p>
            <p className="mt-1 font-serif text-3xl">{summary.activeCheckpoints}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Compliance Controls</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {controls.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.domain} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.evidence}</p>
                  <p className="mt-1 text-sm text-seis-muted">next: {item.nextAction}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Audit Checkpoints</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {checkpoints.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.cadence} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.name}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.scope}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/compliance-matrix" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/compliance-matrix
          </Link>
          <Link href={`/dependency-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open dependency lab
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
