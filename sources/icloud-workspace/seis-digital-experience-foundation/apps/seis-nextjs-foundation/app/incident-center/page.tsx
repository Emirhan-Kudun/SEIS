import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getIncidentDrills, getIncidentScenarios, getIncidentSummary } from "@/lib/incident-center";

export const metadata: Metadata = {
  title: "Incident Center",
  description: "Operational incident center with response playbooks, SLA windows, and rollback pathways.",
  alternates: {
    canonical: "/incident-center"
  }
};

type IncidentCenterPageProps = {
  searchParams?: { lang?: string };
};

export default function IncidentCenterPage({ searchParams }: IncidentCenterPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getIncidentSummary();
  const scenarios = getIncidentScenarios();
  const drills = getIncidentDrills();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Incident Center</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Incident readiness, response drills, and rollback pathways for resilient delivery.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps operations calm under stress by making first-response and recovery actions explicit.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Scenarios</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalScenarios}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p>
            <p className="mt-1 font-serif text-3xl">{summary.criticalScenarios}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">High</p>
            <p className="mt-1 font-serif text-3xl">{summary.highScenarios}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Avg SLA (min)</p>
            <p className="mt-1 font-serif text-3xl">{summary.averageSlaMinutes}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Incident Scenarios</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {scenarios.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.domain} - {item.severity} - SLA {item.slaMinutes}m
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Detection</p>
                  <p className="mt-1">{item.detectionSignals.join(" · ")}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">First Response</p>
                  <p className="mt-1">{item.firstResponse.join(" · ")}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.08em] text-seis-muted">Rollback</p>
                  <p className="mt-1">{item.rollbackPath}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Drill Cadence</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {drills.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.frequency} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.name}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.objective}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/incident-center" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/incident-center
          </Link>
          <Link href={`/execution-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open execution lab
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
