"use client";

import { useEffect, useMemo, useState } from "react";

type Scenario = {
  id: string;
  name: string;
  profile: "safe" | "balanced" | "aggressive";
  description: string;
  preconditions: string[];
  blockers: string[];
  rolloutSteps: string[];
  rollbackSteps: string[];
  recommendedWhen: string;
};

type ReleaseScenarioPayload = {
  ok: boolean;
  scenarios: Scenario[];
};

type ReleaseLabProps = {
  localeQuery: string;
};

function profileClass(profile: Scenario["profile"]) {
  if (profile === "safe") return "border-emerald-600/40 bg-emerald-500/10 text-emerald-200";
  if (profile === "balanced") return "border-amber-600/40 bg-amber-500/10 text-amber-200";
  return "border-red-600/40 bg-red-500/10 text-red-200";
}

export function ReleaseLab({ localeQuery }: ReleaseLabProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [constraintStrictness, setConstraintStrictness] = useState(75);
  const [integrationCoverage, setIntegrationCoverage] = useState(45);

  useEffect(() => {
    async function loadScenarios() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/release-scenarios");
        if (!response.ok) throw new Error("Failed to load release scenarios.");
        const payload = (await response.json()) as ReleaseScenarioPayload;
        setScenarios(payload.scenarios);
        setSelectedId(payload.scenarios[0]?.id ?? "");
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : "Failed to load release scenarios.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadScenarios();
  }, []);

  const selected = useMemo(() => scenarios.find((item) => item.id === selectedId) ?? null, [scenarios, selectedId]);

  const recommendation = useMemo(() => {
    if (!selected) return "Select a scenario.";

    const score = Math.round((constraintStrictness * 0.6 + integrationCoverage * 0.4));
    if (selected.profile === "aggressive" && score < 65) {
      return "Risk too high for aggressive rollout. Prefer balanced or safe profile.";
    }
    if (selected.profile === "safe" && score >= 80) {
      return "Safe profile is aligned with current constraints and coverage.";
    }
    if (selected.profile === "balanced" && score >= 65) {
      return "Balanced profile is acceptable with controlled rollout phases.";
    }
    return "Use additional validation gates before final release decision.";
  }, [constraintStrictness, integrationCoverage, selected]);

  return (
    <section className="mt-6 rounded-2xl border border-seis-line bg-seis-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-3xl">Release Scenario Lab</h2>
        <a href={`/api/release-scenarios${localeQuery}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
          API: /api/release-scenarios
        </a>
      </div>

      {loading ? <p className="mt-3 text-sm text-seis-muted">Loading scenarios...</p> : null}
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

      {scenarios.length > 0 ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-xl border border-seis-line bg-[#1a1510] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Profiles</p>
            <ul className="mt-2 grid gap-2">
              {scenarios.map((scenario) => {
                const active = scenario.id === selectedId;
                return (
                  <li key={scenario.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(scenario.id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left ${
                        active ? "border-seis-accent bg-[#241d16]" : "border-seis-line bg-[#120f0c]"
                      }`}
                    >
                      <p className="text-sm text-seis-text">{scenario.name}</p>
                      <p className="mt-1 text-xs text-seis-muted">{scenario.profile}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <article className="rounded-xl border border-seis-line bg-[#1a1510] p-4">
            {selected ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${profileClass(selected.profile)}`}>
                    {selected.profile}
                  </span>
                  <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">{selected.recommendedWhen}</p>
                </div>
                <h3 className="mt-2 font-serif text-3xl">{selected.name}</h3>
                <p className="mt-2 text-sm text-seis-muted">{selected.description}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    Constraint strictness ({constraintStrictness})
                    <input type="range" min={0} max={100} value={constraintStrictness} onChange={(e) => setConstraintStrictness(Number(e.target.value))} />
                  </label>
                  <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    Integration coverage ({integrationCoverage})
                    <input type="range" min={0} max={100} value={integrationCoverage} onChange={(e) => setIntegrationCoverage(Number(e.target.value))} />
                  </label>
                </div>

                <p className="mt-3 rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-muted">{recommendation}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Rollout Steps</p>
                    <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                      {selected.rolloutSteps.map((step) => (
                        <li key={step} className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Rollback Steps</p>
                    <ul className="mt-2 grid gap-2 text-sm text-seis-muted">
                      {selected.rollbackSteps.map((step) => (
                        <li key={step} className="rounded border border-seis-line bg-[#120f0c] px-3 py-2">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-seis-muted">Select a scenario to inspect release and rollback strategy.</p>
            )}
          </article>
        </div>
      ) : null}
    </section>
  );
}
