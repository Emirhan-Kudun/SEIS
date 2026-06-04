import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getMonetizationSignals,
  getMonetizationSummary,
  getMonetizationTasks
} from "@/lib/monetization-command";

export const metadata: Metadata = {
  title: "Monetization Lab",
  description: "Monetization command surface for pricing, conversion, billing readiness, and expansion strategy.",
  alternates: {
    canonical: "/monetization-lab"
  }
};

type MonetizationLabPageProps = {
  searchParams?: { lang?: string };
};

export default function MonetizationLabPage({ searchParams }: MonetizationLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getMonetizationSummary();
  const signals = getMonetizationSignals();
  const tasks = getMonetizationTasks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Monetization Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Revenue command lane unifying pricing clarity, conversion quality, and billing readiness.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps growth and value capture aligned with premium user trust and long-term maintainability.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Signals</p><p className="mt-1 font-serif text-3xl">{summary.totalSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p><p className="mt-1 font-serif text-3xl">{summary.healthySignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p><p className="mt-1 font-serif text-3xl">{summary.watchSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p><p className="mt-1 font-serif text-3xl">{summary.criticalSignals}</p></article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Monetization Signals</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {signals.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.stream} - {item.status}</p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.detail}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Monetization Tasks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {tasks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.priority} - {item.status}</p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/monetization-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">API: /api/monetization-command</Link>
          <Link href={`/services?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open services</Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open control center</Link>
          <Link href={`/strategy?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open strategy board</Link>
        </div>
      </section>
    </main>
  );
}
