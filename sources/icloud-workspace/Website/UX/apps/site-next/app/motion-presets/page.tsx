import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, motionRuntimeBudgets, motionSceneModes } from "@seis/content";
import { getCinematicScenePresetSummary, getCinematicScenePresets } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.motionPresetsTitle,
    description: dict.motionPresetsLead,
    path: "/motion-presets",
    locale
  });
}

export default async function MotionPresetsPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const presets = getCinematicScenePresets();
  const summary = getCinematicScenePresetSummary(presets);
  const metrics = [
    { label: dict.motionPresetsMetricPresets, value: summary.total },
    { label: dict.motionPresetsMetricModes, value: motionSceneModes.length },
    { label: dict.motionPresetsMetricBudgets, value: motionRuntimeBudgets.length },
    { label: dict.motionPresetsMetricMobileSafe, value: summary.mobileSafe },
    { label: dict.motionPresetsMetricReduced, value: summary.reducedMotion }
  ];

  return (
    <main className="page-shell motion-presets-shell" id="page-main-content">
      <a href="#motion-presets-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/motion")}>{dict.navMotion}</Link>
          <Link href={withLocalePath(locale, "/motion-presets")} aria-current="page">{dict.navMotionPresets}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero motion-presets-hero" id="motion-presets-content">
        <p className="eyebrow">{dict.motionPresetsEyebrow}</p>
        <h1>{dict.motionPresetsTitle}</h1>
        <p className="page-lead">{dict.motionPresetsLead}</p>
        <div className="readiness-metrics" aria-label={dict.motionPresetsTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section motion-presets-section" aria-labelledby="motion-presets-list-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.motionPresetsRegistryEyebrow}</p>
            <h2 id="motion-presets-list-title">{dict.motionPresetsRegistryTitle}</h2>
          </div>
          <p>{dict.motionPresetsRegistryLead}</p>
        </div>
        <div className="motion-preset-grid">
          {presets.map((preset) => (
            <article className="motion-preset-card" data-performance={preset.performance} key={preset.id}>
              <div>
                <p className="kicker">{preset.surface} / {preset.motion}</p>
                <h3>{preset.name}</h3>
                <p>{preset.notes}</p>
              </div>
              <small>{preset.performance}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section motion-presets-section" aria-labelledby="motion-presets-governance-title">
        <div className="motion-preset-governance">
          <div>
            <p className="eyebrow">{dict.motionPresetsGovernanceEyebrow}</p>
            <h2 id="motion-presets-governance-title">{dict.motionPresetsGovernanceTitle}</h2>
          </div>
          <p>{dict.motionPresetsGovernanceLead}</p>
          <Link className="primary-link" href={withLocalePath(locale, "/motion")}>{dict.motionPresetsMotionCta}</Link>
          <Link className="secondary-link" href="/api/scene-presets">{dict.motionPresetsApiCta}</Link>
        </div>
      </section>
    </main>
  );
}
