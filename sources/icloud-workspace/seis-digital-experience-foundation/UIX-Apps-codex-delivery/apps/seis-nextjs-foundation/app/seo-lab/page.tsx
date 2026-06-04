import type { Metadata } from "next";
import Link from "next/link";

import { resolveLocale } from "@/lib/content";
import { getMetadataProfiles, getSeoChecks, getSeoSummary } from "@/lib/seo-intelligence";

export const metadata: Metadata = {
  title: "SEO Lab",
  description: "SEO intelligence lab for metadata quality, discoverability, and route-level search readiness.",
  alternates: {
    canonical: "/seo-lab"
  }
};

type SeoLabPageProps = {
  searchParams?: { lang?: string };
};

export default function SeoLabPage({ searchParams }: SeoLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const summary = getSeoSummary();
  const checks = getSeoChecks();
  const profiles = getMetadataProfiles();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS SEO Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Route-level SEO intelligence with metadata quality and discoverability control.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Preserves search performance while the product surface scales with new premium modules.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Checks</p>
            <p className="mt-1 font-serif text-3xl">{summary.totalChecks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Pass</p>
            <p className="mt-1 font-serif text-3xl">{summary.passChecks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Watch</p>
            <p className="mt-1 font-serif text-3xl">{summary.watchChecks}</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Strong Profiles</p>
            <p className="mt-1 font-serif text-3xl">{summary.strongProfiles}</p>
          </article>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">SEO Checks</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {checks.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">
                    {item.status} - owner: {item.owner}
                  </p>
                  <p className="mt-1 text-seis-text">{item.label}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-seis-line bg-seis-surface p-4">
            <h2 className="font-serif text-3xl">Metadata Profiles</h2>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {profiles.map((item) => (
                <li key={item.id} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.status}</p>
                  <p className="mt-1 text-seis-text">{item.surface}</p>
                  <p className="mt-1 text-sm text-seis-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/api/seo-intelligence" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/seo-intelligence
          </Link>
          <Link href={`/quality-lab?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open quality lab
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
          <Link href={`/orchestration?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
