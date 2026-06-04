import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getAiGovernanceRules,
  getAiGovernanceSummary,
  getAiProviderHealth
} from "@/lib/ai-governance-command";

export const metadata: Metadata = {
  title: "AI Governance Lab",
  description: "AI governance command board for policy enforcement, provider health, and observability maturity.",
  alternates: {
    canonical: "/ai-governance-lab"
  }
};

type AiGovernanceLabPageProps = {
  searchParams?: { lang?: string };
};

export default function AiGovernanceLabPage({ searchParams }: AiGovernanceLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getAiGovernanceSummary();
  const rules = getAiGovernanceRules();
  const providers = getAiProviderHealth();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS AI Governance Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          AI governance for routing policy, safety continuity, and provider reliability control.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps AI-native execution disciplined, auditable, and resilient under multi-provider orchestration.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Rules</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalRules}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Enforced</p>
            <p className="mt-1 font-serif text-3xl">{summary.enforcedRules}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchRules}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Missing</p>
            <p className="mt-1 font-serif text-3xl">{summary.missingRules}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Governance Rules</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {rules.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.domain} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.policy}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Provider Health</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {providers.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.provider} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">reliability: {item.reliability}</p>
                  <p className="mt-1 text-sm text-seis-muted">latency: {item.latency}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/ai-governance-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/ai-governance-command
          </Link>
          <Link href={`/provider-hub?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open provider hub
          </Link>
          <Link href={`/playbooks?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open playbooks
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration
          </Link>
        </div>
      </section>
    </main>
  );
}
