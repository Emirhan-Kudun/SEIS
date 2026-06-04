"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Locale } from "@/lib/content";

type ReleasePayload = {
  ok: boolean;
  score: number;
  riskLevel: "low" | "medium" | "high";
  summary: {
    totalGates: number;
    passing: number;
    warnings: number;
    failures: number;
  };
};

type QualityPayload = {
  ok: boolean;
  aggregate: number;
  band: "critical" | "needs-attention" | "healthy";
  cards: Array<{
    id: string;
    label: string;
    score: number;
    band: "critical" | "needs-attention" | "healthy";
  }>;
};

type FlagPayload = {
  ok: boolean;
  summary: {
    total: number;
    byStatus: {
      enabled: number;
      beta: number;
      planned: number;
      paused: number;
    };
  };
};

type GovernancePayload = {
  ok: boolean;
  summary: {
    total: number;
    highSeverity: number;
    mediumSeverity: number;
    lowSeverity: number;
  };
};

type OperationsConsoleProps = {
  locale: Locale;
};

function signalClass(signal: "critical" | "needs-attention" | "healthy") {
  if (signal === "healthy") return "border-emerald-600/40 bg-emerald-500/10 text-emerald-200";
  if (signal === "needs-attention") return "border-amber-600/40 bg-amber-500/10 text-amber-200";
  return "border-red-600/40 bg-red-500/10 text-red-200";
}

export function OperationsConsole({ locale }: OperationsConsoleProps) {
  const [release, setRelease] = useState<ReleasePayload | null>(null);
  const [quality, setQuality] = useState<QualityPayload | null>(null);
  const [flags, setFlags] = useState<FlagPayload | null>(null);
  const [governance, setGovernance] = useState<GovernancePayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    setError(null);

    try {
      const [releaseRes, qualityRes, flagRes, governanceRes] = await Promise.all([
        fetch("/api/release-readiness"),
        fetch("/api/quality-scorecard"),
        fetch("/api/feature-flags"),
        fetch("/api/governance-matrix")
      ]);

      if (!releaseRes.ok || !qualityRes.ok || !flagRes.ok || !governanceRes.ok) {
        throw new Error("One or more operations signals failed.");
      }

      setRelease((await releaseRes.json()) as ReleasePayload);
      setQuality((await qualityRes.json()) as QualityPayload);
      setFlags((await flagRes.json()) as FlagPayload);
      setGovernance((await governanceRes.json()) as GovernancePayload);
    } catch (refreshError) {
      const message = refreshError instanceof Error ? refreshError.message : "Operations signal refresh failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const aggregatedStatus = useMemo(() => {
    if (!release || !quality) return "needs-attention";
    if (release.riskLevel === "high" || quality.band === "critical") return "critical";
    if (release.riskLevel === "medium" || quality.band === "needs-attention") return "needs-attention";
    return "healthy";
  }, [quality, release]);

  return (
    <section className="mt-6 rounded-2xl border border-seis-line bg-seis-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl">Operations Console</h2>
        <div className="inline-flex items-center gap-2">
          <span className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${signalClass(aggregatedStatus)}`}>
            {aggregatedStatus}
          </span>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="rounded-full border border-seis-line px-3 py-1 text-xs uppercase tracking-[0.1em] text-seis-muted hover:border-seis-accent disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Release Score</p>
          <p className="mt-1 font-serif text-3xl">{release?.score ?? "-"}</p>
          <p className="mt-1 text-xs text-seis-muted">risk: {release?.riskLevel ?? "loading"}</p>
        </article>
        <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Quality Aggregate</p>
          <p className="mt-1 font-serif text-3xl">{quality?.aggregate ?? "-"}</p>
          <p className="mt-1 text-xs text-seis-muted">band: {quality?.band ?? "loading"}</p>
        </article>
        <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Feature Flags</p>
          <p className="mt-1 font-serif text-3xl">{flags?.summary.total ?? "-"}</p>
          <p className="mt-1 text-xs text-seis-muted">enabled: {flags?.summary.byStatus.enabled ?? "-"}</p>
        </article>
        <article className="rounded-lg border border-seis-line bg-[#1a1510] p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Governance Rules</p>
          <p className="mt-1 font-serif text-3xl">{governance?.summary.total ?? "-"}</p>
          <p className="mt-1 text-xs text-seis-muted">high: {governance?.summary.highSeverity ?? "-"}</p>
        </article>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <h3 className="font-serif text-2xl">Quality Score Breakdown</h3>
          <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
            {(quality?.cards ?? []).map((card) => (
              <li key={card.id} className="flex items-center justify-between rounded border border-seis-line bg-[#120f0c] px-3 py-2">
                <span>{card.label}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] ${signalClass(card.band)}`}>
                  {card.score}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
          <h3 className="font-serif text-2xl">Immediate Actions</h3>
          <ol className="mt-3 grid gap-2 text-sm text-seis-muted">
            <li className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
              1. Review `/api/release-readiness` blockers before merge.
            </li>
            <li className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
              2. Validate `/api/quality-scorecard` and confirm no critical band.
            </li>
            <li className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
              3. Check governance high-severity rules and align patch scope.
            </li>
            <li className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
              4. Freeze deploys until risk level is medium or low.
            </li>
          </ol>
        </article>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/api/quality-scorecard" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/quality-scorecard
        </Link>
        <Link href="/api/governance-matrix" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/governance-matrix
        </Link>
        <Link href="/api/feature-flags" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/feature-flags
        </Link>
        <Link href={`/control?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /control
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/strategy?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /strategy
        </Link>
        <Link href={`/release-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /release-lab
        </Link>
        <Link href={`/risk?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /risk
        </Link>
        <Link href="/api/risk-register" className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /api/risk-register
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/provider-hub?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /provider-hub
        </Link>
        <Link href={`/growth-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /growth-lab
        </Link>
        <Link href={`/experience-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /experience-lab
        </Link>
        <Link href={`/orchestration?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /orchestration
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/incident-center?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /incident-center
        </Link>
        <Link href={`/dependency-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /dependency-lab
        </Link>
        <Link href={`/execution-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /execution-lab
        </Link>
        <Link href={`/seo-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-[#1a1510] px-3 py-3 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          /seo-lab
        </Link>
      </div>
    </section>
  );
}
