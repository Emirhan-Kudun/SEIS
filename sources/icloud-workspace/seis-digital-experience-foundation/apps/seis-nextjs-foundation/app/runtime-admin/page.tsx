import type { Metadata } from "next";
import Link from "next/link";

import { RuntimeAdminDashboard } from "@/components/admin/runtime-admin-dashboard";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Runtime Admin",
  description: "Token-protected SEIS runtime review for briefs, readiness, scope plans, contact fallback records, and events.",
  alternates: {
    canonical: "/runtime-admin"
  }
};

type RuntimeAdminPageProps = {
  searchParams?: { lang?: string };
};

export default function RuntimeAdminPage({ searchParams }: RuntimeAdminPageProps) {
  const locale = resolveLocale(searchParams?.lang);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs font-medium uppercase text-seis-accent">SEIS Runtime Admin</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Token-protected review for lightweight runtime records.
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-seis-muted sm:text-base">
          Inspect project briefs, readiness assessments, scope plans, contact fallback records, and event traces without adding a
          database service or starting a heavy local workflow.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <Link href={`/studio?lang=${locale}`} className="rounded-lg border border-seis-line px-3 py-2 text-seis-muted hover:border-seis-accent">
            Studio
          </Link>
          <Link href={`/branch-hardening?lang=${locale}`} className="rounded-lg border border-seis-line px-3 py-2 text-seis-muted hover:border-seis-accent">
            Branch hardening
          </Link>
          <Link href="/api/admin/runtime" className="rounded-lg border border-seis-line px-3 py-2 text-seis-muted hover:border-seis-accent">
            Runtime API
          </Link>
        </div>

        <div className="mt-8">
          <RuntimeAdminDashboard />
        </div>
      </section>
    </main>
  );
}
