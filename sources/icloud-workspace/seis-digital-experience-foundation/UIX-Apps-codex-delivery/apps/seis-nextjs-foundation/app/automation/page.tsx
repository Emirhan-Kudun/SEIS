import type { Metadata } from "next";
import Link from "next/link";

import { automationPlaybooks } from "@/lib/automation-content";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Automation",
  description: "Operational playbooks for content quality, release readiness, and anomaly triage.",
  alternates: {
    canonical: "/automation"
  }
};

type AutomationPageProps = {
  searchParams?: { lang?: string };
};

export default function AutomationPage({ searchParams }: AutomationPageProps) {
  const locale = resolveLocale(searchParams?.lang);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">Automation Layer</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
          Playbooks for AI-native quality control and release operations.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">
          Structured procedures for consistency scans, release checks, and telemetry anomaly triage.
        </p>

        <div className="mt-6 grid gap-3">
          {automationPlaybooks.map((playbook) => (
            <article key={playbook.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{playbook.riskLevel} risk</p>
              <h2 className="mt-2 font-serif text-3xl">{playbook.name}</h2>
              <p className="mt-2 text-sm text-seis-muted">{playbook.goal}</p>
              <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                {playbook.steps.map((step) => (
                  <li key={step} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">Tools: {playbook.tools.join(", ")}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/api/automation-playbooks" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/automation-playbooks
          </Link>
          <Link href="/api/ai-workflows" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/ai-workflows
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href={`/playbooks?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open playbooks registry
          </Link>
          <Link href={`/control?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open control center
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href={`/ops?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open operations console
          </Link>
          <Link href={`/governance?lang=${locale}`} className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            Open governance matrix
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link href="/api/quality-scorecard" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/quality-scorecard
          </Link>
          <Link href="/api/feature-flags" className="rounded-xl border border-seis-line bg-seis-surface p-4 text-sm text-seis-muted hover:border-seis-accent">
            API: /api/feature-flags
          </Link>
        </div>
      </section>
    </main>
  );
}
