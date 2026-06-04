import type { Metadata } from "next";
import Link from "next/link";

import {
  behanceEmbeds,
  behanceVisuals,
  briefTriageBuckets,
  briefTriageRules,
  caseStudyBuilderStages,
  caseStudyBuilderTemplates,
  connectorConsolePanels,
  drawings,
  getDictionary,
  locales,
  motionRuntimeBudgets,
  motionSceneModes,
  platformAdapters,
  portfolioOsPanels,
  publishingConsoleSteps,
  readinessDecision,
  readinessFeatures,
  readinessGates,
  readinessSmokeRoutes,
  securityPostureSignals,
  serverHandoffStages,
  softwareLanguages,
  studioCrmLanes,
  studioCrmSignals,
  supremeOsEngineNodes,
  works
} from "@seis/content";
import { getCinematicScenePresetSummary, getCinematicScenePresets, getCloudEnvironment } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navReadiness,
    description: dict.readinessLead,
    path: "/readiness",
    locale
  });
}

export default async function ReadinessPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const readinessApiPath = `/api/site-readiness?locale=${locale}`;
  const cloudEnvironment = getCloudEnvironment();
  const scenePresets = getCinematicScenePresets();
  const scenePresetSummary = getCinematicScenePresetSummary(scenePresets);
  const counts = [
    { label: dict.languageSelectorLabel, value: locales.length },
    { label: dict.worksTitle, value: works.length },
    { label: dict.drawingsTitle, value: drawings.length },
    { label: dict.behanceEmbedEyebrow, value: behanceEmbeds.length },
    { label: dict.caseStudyBuilderMetricStages, value: caseStudyBuilderStages.length },
    { label: dict.caseStudyBuilderMetricTemplates, value: caseStudyBuilderTemplates.length },
    { label: dict.portfolioOsPanelsTitle, value: portfolioOsPanels.length },
    { label: dict.studioCrmMetricLanes, value: studioCrmLanes.length },
    { label: dict.studioCrmMetricSignals, value: studioCrmSignals.length },
    { label: dict.publishingConsoleMetricSteps, value: publishingConsoleSteps.length },
    { label: dict.cloudEnvironmentMetricItems, value: cloudEnvironment.length },
    { label: dict.serverHandoffMetricStages, value: serverHandoffStages.length },
    { label: dict.navSecurityPosture, value: securityPostureSignals.length },
    { label: dict.briefTriageMetricRules, value: briefTriageRules.length },
    { label: dict.briefTriageMetricBuckets, value: briefTriageBuckets.length },
    { label: dict.connectorConsolePanelsTitle, value: connectorConsolePanels.length },
    { label: dict.behanceVisualsEyebrow, value: behanceVisuals.length },
    { label: dict.languagesTitle, value: softwareLanguages.length },
    { label: dict.motionModesEyebrow, value: motionSceneModes.length },
    { label: dict.motionBudgetEyebrow, value: motionRuntimeBudgets.length },
    { label: dict.navPlatformAdapters, value: platformAdapters.length },
    { label: dict.motionPresetsMetricPresets, value: scenePresetSummary.total },
    { label: dict.osEngineEyebrow, value: supremeOsEngineNodes.length }
  ];

  return (
    <main className="page-shell readiness-shell" id="page-main-content">
      <a href="#readiness-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/motion")}>{dict.navMotion}</Link>
          <Link href={withLocalePath(locale, "/compatibility")}>{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/readiness")} aria-current="page">{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero readiness-hero" id="readiness-content">
        <p className="eyebrow">{dict.readinessEyebrow}</p>
        <h1>{dict.readinessTitle}</h1>
        <p className="page-lead">{dict.readinessLead}</p>
        <aside className="readiness-decision" data-status={readinessDecision.status} aria-label={readinessDecision.label}>
          <div>
            <span>{readinessDecision.status}</span>
            <h2>{readinessDecision.label}</h2>
            <p>{readinessDecision.signal}</p>
          </div>
          <div>
            <p>{readinessDecision.rollbackCue}</p>
            <ul>
              {readinessDecision.watchlist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="readiness-metrics" aria-label={dict.readinessTitle}>
          {counts.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section readiness-section" aria-labelledby="readiness-gates-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.readinessEyebrow}</p>
            <h2 id="readiness-gates-title">{dict.readinessGatesTitle}</h2>
          </div>
          <p>{dict.readinessGatesLead}</p>
        </div>
        <div className="readiness-gate-grid">
          {readinessGates.map((gate) => (
            <article className="readiness-card" data-status={gate.status} key={gate.id}>
              <p className="kicker">{gate.area} / {gate.status}</p>
              <h3>{gate.label}</h3>
              <p>{gate.signal}</p>
              <ul>
                {gate.proof.map((proof) => (
                  <li key={proof}>{proof}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section readiness-section" aria-labelledby="readiness-smoke-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.readinessEyebrow}</p>
            <h2 id="readiness-smoke-title">{dict.readinessSmokeTitle}</h2>
          </div>
          <p>{dict.readinessSmokeLead}</p>
        </div>
        <div className="readiness-route-list">
          {readinessSmokeRoutes.map((route) => {
            const localizedRoute = withLocalePath(locale, route.path);
            return (
              <article key={route.id}>
                <span>{route.surface}</span>
                <h3>
                  <Link href={localizedRoute}>{localizedRoute}</Link>
                </h3>
                <p>{route.expectation}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section readiness-section" aria-labelledby="readiness-features-title">
        <div className="readiness-feature-panel">
          <div>
            <p className="eyebrow">{dict.readinessFeaturesTitle}</p>
            <h2 id="readiness-features-title">{dict.readinessFeaturesTitle}</h2>
            <p>{dict.readinessFeaturesLead}</p>
            <Link className="primary-link" href={readinessApiPath}>{dict.readinessApiCta}</Link>
          </div>
          <div className="readiness-feature-list">
            {readinessFeatures.map((feature) => (
              <article key={feature.id}>
                <span>{feature.surface}</span>
                <h3>{feature.label}</h3>
                <p>{feature.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
