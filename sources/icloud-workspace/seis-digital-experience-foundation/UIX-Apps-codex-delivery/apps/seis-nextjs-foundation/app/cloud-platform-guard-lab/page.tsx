import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getCloudPlatformGuardSignals,
  getCloudPlatformGuardSummary,
  getCloudPlatformGuardTasks
} from "@/lib/cloud-platform-guard-command";

export const metadata: Metadata = {
  title: "Cloud Platform Guard Lab",
  description: "Cloud platform guard command surface for policy sync, drift control, permissions baseline, and compliance evidence tagging.",
  alternates: { canonical: "/cloud-platform-guard-lab" }
};

type CloudPlatformGuardLabPageProps = {
  searchParams?: { lang?: string };
};

export default function CloudPlatformGuardLabPage({ searchParams }: CloudPlatformGuardLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getCloudPlatformGuardSummary();
  const signals = getCloudPlatformGuardSignals();
  const tasks = getCloudPlatformGuardTasks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Cloud Platform Guard Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Policy, drift, permissions, and compliance controls aligned for safer cloud platform governance.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Reduces platform ambiguity by making guardrail ownership and drift controls explicit.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Signals</p><p className="mt-1 font-serif text-3xl">{summary.totalSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p><p className="mt-1 font-serif text-3xl">{summary.healthySignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p><p className="mt-1 font-serif text-3xl">{summary.watchSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p><p className="mt-1 font-serif text-3xl">{summary.criticalSignals}</p></article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Platform Guard Signals</h2>
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
            <h2 className="font-serif text-3xl">Platform Guard Tasks</h2>
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
          <Link href="/api/cloud-platform-guard-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">API: /api/cloud-platform-guard-command</Link>
          <Link href={`/compliance-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open compliance lab</Link>
          <Link href={`/security-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open security lab</Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open orchestration board</Link>
        </div>
      </section>
    </main>
  );
}
