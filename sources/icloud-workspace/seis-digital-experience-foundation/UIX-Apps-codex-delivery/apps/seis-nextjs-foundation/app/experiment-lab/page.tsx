import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getExperimentSummary, getExperimentTracks, getGrowthLoops } from "@/lib/experiment-command";

export const metadata: Metadata = {
  title: "Experiment Lab",
  description: "Experiment command surface for conversion hypotheses, loop health, and growth governance.",
  alternates: {
    canonical: "/experiment-lab"
  }
};

type ExperimentLabPageProps = {
  searchParams?: { lang?: string };
};

export default function ExperimentLabPage({ searchParams }: ExperimentLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getExperimentSummary();
  const tracks = getExperimentTracks();
  const loops = getGrowthLoops();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Experiment Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Product experimentation for conversion clarity, learning velocity, and safe iteration.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Connects growth hypotheses with measurable operational outcomes and controlled rollout discipline.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Tracks</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalTracks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Running</p>
            <p className="mt-1 font-serif text-3xl">{summary.runningTracks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Risk</p>
            <p className="mt-1 font-serif text-3xl">{summary.riskTracks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Active Loops</p>
            <p className="mt-1 font-serif text-3xl">{summary.activeLoops}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Experiment Tracks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {tracks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - metric: {item.metric}
                  </p>
                  <p className="mt-1 text-seis-text">{item.hypothesis}</p>
                  <p className="mt-1 text-sm text-seis-muted">owner: {item.owner}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Growth Loops</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {loops.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.stage} - {item.status}
                  </p>
                  <p className="mt-1 text-seis-text">{item.title}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/experiment-command" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/experiment-command
          </Link>
          <Link href={`/growth-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth lab
          </Link>
          <Link href={`/research-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open research lab
          </Link>
          <Link href={`/playbooks?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open playbooks
          </Link>
        </div>
      </section>
    </main>
  );
}
