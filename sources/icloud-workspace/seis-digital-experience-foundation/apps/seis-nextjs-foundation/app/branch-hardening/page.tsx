import type { Metadata } from "next";
import Link from "next/link";

import {
  branchHardeningProfile,
  getBranchHardeningChecks,
  getBranchPublishGuards,
  getBranchHardeningSignals,
  getBranchHardeningSummary,
  getLowPowerControls
} from "@/lib/branch-hardening";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Branch Hardening",
  description: "Low-power branch hardening surface for SEIS governance, sync confidence, and rollback-safe commits.",
  alternates: {
    canonical: "/branch-hardening"
  }
};

type BranchHardeningPageProps = {
  searchParams?: { lang?: string };
};

const statusClassName = {
  healthy: "border-emerald-600/40 bg-emerald-500/10 text-emerald-200",
  watch: "border-amber-600/40 bg-amber-500/10 text-amber-200",
  blocked: "border-red-600/40 bg-red-500/10 text-red-200"
};

export default function BranchHardeningPage({ searchParams }: BranchHardeningPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getBranchHardeningSummary();
  const signals = getBranchHardeningSignals();
  const checks = getBranchHardeningChecks();
  const publishGuards = getBranchPublishGuards();
  const lowPowerControls = getLowPowerControls();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs font-medium uppercase text-seis-accent">SEIS Branch Hardening</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Low-power branch confidence surface for durable, reversible repository growth.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Tracks branch isolation, origin confirmation, quality gates, and local-device-safe validation rules without running shell commands at request time.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs font-medium uppercase text-seis-muted">Mode</p>
            <p className="mt-1 font-serif text-3xl">{summary.operatingMode}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs font-medium uppercase text-seis-muted">Signals</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalSignals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs font-medium uppercase text-seis-muted">Healthy</p>
            <p className="mt-1 font-serif text-3xl">{summary.healthySignals}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs font-medium uppercase text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchSignals}</p>
          </article>
        </div>

        <div className="mt-6 border-y border-seis-line py-4">
          <h2 className="font-serif text-3xl">Publish Guards</h2>
          <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
            {publishGuards.map((item) => (
              <li key={item.id} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3">
                <p className="text-xs font-medium uppercase text-seis-accent">{item.gate}</p>
                <p className="mt-1 text-seis-text">{item.title}</p>
                <p className="mt-1 break-all">{item.command}</p>
                <p className="mt-1">pass: {item.passSignal}</p>
                <p className="mt-1">fail: {item.failureAction}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-y border-seis-line py-4">
          <h2 className="font-serif text-3xl">Branch Profile</h2>
          <div className="mt-3 grid gap-3 text-sm text-seis-muted sm:grid-cols-2 lg:grid-cols-4">
            <p className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
              primary: <span className="text-seis-text">{branchHardeningProfile.primaryBranch}</span>
            </p>
            <p className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
              protected: <span className="text-seis-text">{branchHardeningProfile.protectedBranches.join(", ")}</span>
            </p>
            <p className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
              merge: <span className="text-seis-text">{branchHardeningProfile.mergePosture}</span>
            </p>
            <p className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
              push: <span className="text-seis-text">{branchHardeningProfile.pushPolicy}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article>
            <h2 className="font-serif text-3xl">Hardening Signals</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {signals.map((item) => (
                <li key={item.id} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase text-seis-accent">
                    {item.lane}
                    <span className={`rounded-full border px-2 py-1 ${statusClassName[item.status]}`}>{item.status}</span>
                  </p>
                  <p className="mt-2 text-seis-text">{item.title}</p>
                  <p className="mt-1">{item.detail}</p>
                  <p className="mt-1">next: {item.nextAction}</p>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="font-serif text-3xl">Low-Power Controls</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {lowPowerControls.map((item) => (
                <li key={item.id} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-seis-text">{item.rule}</p>
                  <p className="mt-1">{item.impact}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 border-y border-seis-line py-4">
          <h2 className="font-serif text-3xl">Verification Ladder</h2>
          <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
            {checks.map((item) => (
              <li key={item.id} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3">
                <p className="text-xs font-medium uppercase text-seis-accent">{item.cost} cost</p>
                <p className="mt-1 break-all text-seis-text">{item.command}</p>
                <p className="mt-1">{item.purpose}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link href="/api/branch-hardening" className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/branch-hardening
          </Link>
          <Link href={`/worktree-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open worktree lab
          </Link>
          <Link href={`/studio?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Back to studio
          </Link>
        </div>
      </section>
    </main>
  );
}
