"use client";

import { FormEvent, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { Locale } from "@/lib/content";

type ProjectEstimatorProps = {
  locale: Locale;
};

type EstimatorState = {
  serviceType: string;
  pages: number;
  motionLevel: string;
  locales: number;
  cmsNeeded: boolean;
};

type EstimatorResponse = {
  ok: boolean;
  estimate: number;
  currency: string;
  durationWeeks: number;
};

export function ProjectEstimator({ locale }: ProjectEstimatorProps) {
  const [form, setForm] = useState<EstimatorState>({
    serviceType: "cinematic-portfolio-os",
    pages: 6,
    motionLevel: "medium",
    locales: 2,
    cmsNeeded: false
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimatorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Estimator failed.");
      }

      const payload = (await response.json()) as EstimatorResponse;
      setResult(payload);

      void trackEvent({
        name: "service_estimate_generated",
        scope: "project-estimator",
        label: form.serviceType,
        locale,
        metadata: {
          pages: form.pages,
          locales: form.locales,
          cmsNeeded: form.cmsNeeded,
          motion: form.motionLevel
        }
      });
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Estimator failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 rounded-xl border border-seis-line bg-seis-surface p-4">
      <h2 className="font-serif text-3xl">Project Estimator</h2>
      <p className="mt-2 text-sm text-seis-muted">
        Generate a rough cost and timeline estimate based on scope, motion depth, and multilingual requirements.
      </p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Service type
          <select
            value={form.serviceType}
            onChange={(event) => setForm((prev) => ({ ...prev, serviceType: event.target.value }))}
            className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          >
            <option value="cinematic-portfolio-os">Cinematic Portfolio OS</option>
            <option value="saas-product-experience">SaaS Product Experience</option>
            <option value="ai-integration-readiness">AI Integration Readiness</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Motion level
          <select
            value={form.motionLevel}
            onChange={(event) => setForm((prev) => ({ ...prev, motionLevel: event.target.value }))}
            className="rounded-lg border border-seis-line bg-[#120f0c] px-3 py-2 text-sm text-seis-text outline-none focus:border-seis-accent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Pages ({form.pages})
          <input
            type="range"
            min={1}
            max={50}
            value={form.pages}
            onChange={(event) => setForm((prev) => ({ ...prev, pages: Number(event.target.value) }))}
          />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.08em] text-seis-muted">
          Locales ({form.locales})
          <input
            type="range"
            min={1}
            max={10}
            value={form.locales}
            onChange={(event) => setForm((prev) => ({ ...prev, locales: Number(event.target.value) }))}
          />
        </label>

        <label className="sm:col-span-2 inline-flex items-center gap-2 text-sm text-seis-muted">
          <input
            type="checkbox"
            checked={form.cmsNeeded}
            onChange={(event) => setForm((prev) => ({ ...prev, cmsNeeded: event.target.checked }))}
          />
          CMS integration required
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full border border-seis-accent bg-seis-accent px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#16110c] disabled:opacity-60"
          >
            {loading ? "Calculating..." : "Generate estimate"}
          </button>
        </div>
      </form>

      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

      {result ? (
        <div className="mt-4 rounded-lg border border-seis-line bg-[#1a1510] p-4">
          <p className="text-xs uppercase tracking-[0.08em] text-seis-muted">Estimated budget</p>
          <p className="mt-1 font-serif text-4xl">
            {result.currency} {result.estimate.toLocaleString("en-US")}
          </p>
          <p className="mt-2 text-sm text-seis-muted">Estimated timeline: {result.durationWeeks} week(s)</p>
        </div>
      ) : null}
    </section>
  );
}
