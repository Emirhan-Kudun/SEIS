import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import {
  getBranchCheckpoints,
  getCollaborationFlows,
  getCollaborationSummary
} from "@/lib/collaboration-command";

export const metadata: Metadata = {
  title: "Collaboration Lab",
  description: "Collaboration command board for branch discipline, workflow alignment, and connector governance flow.",
  alternates: {
    canonical: "/collaboration-lab"
  }
};

type CollaborationLabPageProps = {
  searchParams?: { lang?: string };
};

export default function CollaborationLabPage({ searchParams }: CollaborationLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getCollaborationSummary();
  const flows = getCollaborationFlows();
  const checkpoints = getBranchCheckpoints();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Collaboration Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Workflow alignment for branch governance, delivery flow, and ecosystem collaboration.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Keeps multi-tool and multi-team execution coherent while preserving rollback-safe delivery.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Flows</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalFlows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Aligned</p>
            <p className="mt-1 font-serif text-3xl">{summary.alignedFlows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchFlows}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Blocked</p>
            <p className="mt-1 font-serif text-3xl">{summary.blockedFlows}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Collaboration Flows</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {flows.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.system} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.workflow}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                  <p className="mt-1 text-sm text-seis-muted">next: {item.nextStep}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Branch Checkpoints</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {checkpoints.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.status}</p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/collaboration-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/collaboration-command
          </Link>
          <Link href={`/strategy?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open strategy board
          </Link>
          <Link href={`/studio?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open studio board
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
