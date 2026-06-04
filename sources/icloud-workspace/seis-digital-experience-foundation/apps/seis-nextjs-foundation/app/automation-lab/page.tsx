import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getAutomationPipelines,
  getAutomationQueues,
  getAutomationSummary
} from "@/lib/automation-command";

export const metadata: Metadata = {
  title: "Automation Lab",
  description: "Automation command center for pipeline health, queue status, and orchestration continuity.",
  alternates: {
    canonical: "/automation-lab"
  }
};

type AutomationLabPageProps = {
  searchParams?: { lang?: string };
};

export default function AutomationLabPage({ searchParams }: AutomationLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getAutomationSummary();
  const pipelines = getAutomationPipelines();
  const queues = getAutomationQueues();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Automation Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Automation reliability for command pipelines, queue pressure, and orchestration continuity.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps AI-native execution flows observable, recoverable, and release-safe under expansion.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Pipelines</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalPipelines}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p>
            <p className="mt-1 font-serif text-3xl">{summary.healthyPipelines}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchPipelines}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Blocked</p>
            <p className="mt-1 font-serif text-3xl">{summary.blockedPipelines}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Pipeline Health</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {pipelines.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - {item.trigger}
                  </p>
                  <p className="mt-1 text-seis-text">{item.name}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                  <p className="mt-1 text-sm text-seis-muted">throughput: {item.throughput}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Queue Pressure</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {queues.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - sla {item.sla}
                  </p>
                  <p className="mt-1 text-seis-text">{item.queue}</p>
                  <p className="mt-1 text-sm text-seis-muted">backlog: {item.backlog}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.action}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/automation-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/automation-command
          </Link>
          <Link href={`/playbooks?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open playbooks
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
