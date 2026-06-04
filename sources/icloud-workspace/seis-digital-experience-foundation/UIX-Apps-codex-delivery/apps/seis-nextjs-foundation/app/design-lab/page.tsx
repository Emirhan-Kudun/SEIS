import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getDesignSignals, getDesignSystemSummary, getDesignTasks } from "@/lib/design-system-command";

export const metadata: Metadata = {
  title: "Design Lab",
  description: "Design system command surface for token parity, component reuse, and premium interaction discipline.",
  alternates: {
    canonical: "/design-lab"
  }
};

type DesignLabPageProps = {
  searchParams?: { lang?: string };
};

export default function DesignLabPage({ searchParams }: DesignLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getDesignSystemSummary();
  const signals = getDesignSignals();
  const tasks = getDesignTasks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Design Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Premium visual system governance with cinematic restraint and reusable UI architecture.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps token consistency, composition rhythm, and interaction quality aligned across the command stack.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Signals</p><p className="mt-1 font-serif text-3xl">{summary.totalSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p><p className="mt-1 font-serif text-3xl">{summary.healthySignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p><p className="mt-1 font-serif text-3xl">{summary.watchSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p><p className="mt-1 font-serif text-3xl">{summary.criticalSignals}</p></article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Design Signals</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {signals.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.area} - {item.status}</p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.detail}</p>
                  <p className="mt-1 text-sm text-seis-muted">next: {item.nextAction}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Design Tasks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {tasks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.lane} - {item.status}</p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/design-system-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">API: /api/design-system-command</Link>
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open quality lab</Link>
          <Link href={`/performance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open performance lab</Link>
          <Link href={`/studio?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open studio board</Link>
        </div>
      </section>
    </main>
  );
}
