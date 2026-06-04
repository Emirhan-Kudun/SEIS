import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getDeliveryCadence, getPipelinePhases, getPipelineSummary } from "@/lib/execution-pipeline";

export const metadata: Metadata = {
  title: "Execution Lab",
  description: "Execution pipeline lab for delivery cadence, checkpoints, and release governance continuity.",
  alternates: {
    canonical: "/execution-lab"
  }
};

type ExecutionLabPageProps = {
  searchParams?: { lang?: string };
};

export default function ExecutionLabPage({ searchParams }: ExecutionLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getPipelineSummary();
  const phases = getPipelinePhases();
  const cadence = getDeliveryCadence();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Execution Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          End-to-end delivery pipeline intelligence for stable, predictable release flow.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Connects product intake, implementation, quality, release governance, and iteration loops.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Phases</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalPhases}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Stable</p>
            <p className="mt-1 font-serif text-3xl">{summary.stablePhases}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchPhases}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Active Cadence</p>
            <p className="mt-1 font-serif text-3xl">{summary.activeCadenceItems}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Pipeline Phases</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {phases.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - owner: {item.owner}
                  </p>
                  <p className="mt-1 text-seis-text">{item.name}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.objective}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Checkpoints</p>
                  <p className="mt-1">{item.checkpoints.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Delivery Cadence</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {cadence.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.interval} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.label}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/execution-pipeline" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/execution-pipeline
          </Link>
          <Link href={`/incident-center?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open incident center
          </Link>
          <Link href={`/dependency-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open dependency lab
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
