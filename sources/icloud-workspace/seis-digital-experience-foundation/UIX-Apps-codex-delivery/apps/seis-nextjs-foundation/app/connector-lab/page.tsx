import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getConnectorSignals, getConnectorSummary, getConnectorTasks } from "@/lib/connector-command";

export const metadata: Metadata = {
  title: "Connector Lab",
  description: "Connector governance command surface for trust policy, ownership, and maintenance balance.",
  alternates: { canonical: "/connector-lab" }
};

type ConnectorLabPageProps = { searchParams?: { lang?: string } };

export default function ConnectorLabPage({ searchParams }: ConnectorLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getConnectorSummary();
  const signals = getConnectorSignals();
  const tasks = getConnectorTasks();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Connector Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Trusted connector governance with ownership and lifecycle discipline.</h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">Keeps MCP and connector expansion maintainable, auditable, and security-aware.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Signals</p><p className="mt-1 font-serif text-3xl">{summary.totalSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Healthy</p><p className="mt-1 font-serif text-3xl">{summary.healthySignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p><p className="mt-1 font-serif text-3xl">{summary.watchSignals}</p></article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3"><p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Critical</p><p className="mt-1 font-serif text-3xl">{summary.criticalSignals}</p></article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Connector Signals</h2>
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
            <h2 className="font-serif text-3xl">Connector Tasks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {tasks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.status}</p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Link href="/api/connector-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">API: /api/connector-command</Link>
          <Link href="/api/google-open-source-copilot" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">API: /api/google-open-source-copilot</Link>
          <Link href={`/google-open-source-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open google open source lab</Link>
          <Link href={`/provider-hub?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open provider hub</Link>
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open ops console</Link>
          <Link href={`/governance?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">Open governance matrix</Link>
        </div>
      </section>
    </main>
  );
}
