import type { Metadata } from "next";
import Link from "next/link";

import { getBenchCapabilityGroups, getBenchCapabilitySummary } from "@/lib/bench-capabilities";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bench",
  description: "SEIS bench capability map across design, frontend, fullstack, AI workflows, and DevOps governance.",
  alternates: {
    canonical: "/bench"
  }
};

type BenchPageProps = {
  searchParams?: { lang?: string };
};

export default function BenchPage({ searchParams }: BenchPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const groups = getBenchCapabilityGroups();
  const summary = getBenchCapabilitySummary();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Bench</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Capability architecture for premium design, engineering, AI workflows, and production operations.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          This registry clarifies what the bench can deliver immediately and how those capabilities map to reliable output systems.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Groups</p>
            <p className="mt-1 font-serif text-3xl">{summary.groups}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Capability Areas</p>
            <p className="mt-1 font-serif text-3xl">{summary.areas}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Output Patterns</p>
            <p className="mt-1 font-serif text-3xl">{summary.outputExamples}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {groups.map((group) => (
            <article key={group.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <h2 className="font-serif text-3xl">{group.title}</h2>

              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Areas</p>
              <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                {group.areas.map((area) => (
                  <li key={area} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {area}
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Output Examples</p>
              <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                {group.outputExamples.map((item) => (
                  <li key={item} className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/api/bench-capabilities" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/bench-capabilities
          </Link>
          <Link href={`/playbooks?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open playbooks
          </Link>
        </div>

        <p className="mt-8">
          <Link href={`/?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Back to homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
