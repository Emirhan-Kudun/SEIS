import type { Metadata } from "next";
import Link from "next/link";

import { ReleaseLab } from "@/components/pages/release-lab";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Release Lab",
  description: "Scenario-driven release planning surface with risk-aware rollout and rollback strategy.",
  alternates: {
    canonical: "/release-lab"
  }
};

type ReleaseLabPageProps = {
  searchParams?: { lang?: string };
};

export default function ReleaseLabPage({ searchParams }: ReleaseLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const localeQuery = `?lang=${locale}`;

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">SEIS Release Lab</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Scenario simulation for controlled rollout, safer merges, and explicit rollback planning.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Test safe, balanced, and aggressive profiles under different constraint and integration conditions before final release calls.
        </p>

        <ReleaseLab localeQuery={localeQuery} />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link href={`/ops${localeQuery}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open ops console
          </Link>
          <Link href={`/risk${localeQuery}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open risk register
          </Link>
          <Link href="/api/launch-checklist" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/launch-checklist
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={`/provider-hub${localeQuery}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open provider hub
          </Link>
          <Link href={`/growth-lab${localeQuery}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open growth lab
          </Link>
          <Link href={`/experience-lab${localeQuery}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open experience lab
          </Link>
          <Link href={`/orchestration${localeQuery}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open orchestration board
          </Link>
        </div>
      </section>
    </main>
  );
}
