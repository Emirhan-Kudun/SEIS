import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getGoogleCopilotActivationPlan,
  getGoogleCopilotLanes,
  getGoogleCopilotSignals,
  getGoogleCopilotSummary
} from "@/lib/google-open-source-copilot";

export const metadata: Metadata = {
  title: "Google Open Source Lab",
  description: "Google Open Source Copilot command surface for branch lanes, connector safety, and adoption gates.",
  alternates: { canonical: "/google-open-source-lab" }
};

type GoogleOpenSourceLabPageProps = { searchParams?: { lang?: string; lane?: string } };

export default function GoogleOpenSourceLabPage({ searchParams }: GoogleOpenSourceLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getGoogleCopilotSummary();
  const lanes = getGoogleCopilotLanes();
  const signals = getGoogleCopilotSignals();
  const plan = getGoogleCopilotActivationPlan(searchParams?.lane);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Google Open Source Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Google Open Source Copilot as a subordinate lane system under premium local foundation.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps one parent branch while making Google-origin documentation, Chrome quality, Firebase, Cloud Run, Material, and AI-agent candidates reviewable.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Parent Branch</p>
            <p className="mt-1 text-sm text-seis-text">{summary.parentBranch}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Sub-Agent</p>
            <p className="mt-1 text-sm text-seis-text">{summary.subAgent}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Logical Lanes</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalLanes}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Ready</p>
            <p className="mt-1 font-serif text-3xl">{summary.readyLanes}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Git Branch Drift</p>
            <p className="mt-1 font-serif text-3xl">{summary.longLivedGitBranches}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Logical Branch Lanes</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {lanes.map((lane) => (
                <li key={lane.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {lane.status} - {lane.branchMode}
                  </p>
                  <p className="mt-1 text-seis-text">{lane.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{lane.purpose}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {lane.ownerAgent}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Copilot Signals</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {signals.map((signal) => (
                <li key={signal.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {signal.area} - {signal.status}
                  </p>
                  <p className="mt-1 text-seis-text">{signal.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{signal.detail}</p>
                  <p className="mt-1 text-sm text-seis-muted">next: {signal.nextAction}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className="mt-6 rounded-xl border border-seis-line bg-seis-surface p-4">
          <h2 className="font-serif text-3xl">Activation Plan</h2>
          <p className="mt-2 text-sm text-seis-muted">
            Selected lane: <span className="text-seis-text">{plan.selectedLane.title}</span>
          </p>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded border border-seis-line bg-[#1a1510] p-3">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Preflight</p>
              <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                {plan.preflight.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded border border-seis-line bg-[#1a1510] p-3">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Safe Commands</p>
              <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                {plan.safeCommands.map((item) => (
                  <li key={item} className="font-mono text-xs">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded border border-seis-line bg-[#1a1510] p-3">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Rollback</p>
              <p className="mt-2 text-sm text-seis-muted">{plan.rollbackPath}</p>
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/google-open-source-copilot" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/google-open-source-copilot
          </Link>
          <Link href={`/agent-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open agent lab
          </Link>
          <Link href={`/connector-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open connector lab
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
