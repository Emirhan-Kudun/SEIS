import type { Metadata } from "next";
import Link from "next/link";

import {
  caseStudyBuilderStages,
  caseStudyBuilderTemplates,
  getDictionary,
  works
} from "@seis/content";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.caseStudyBuilderTitle,
    description: dict.caseStudyBuilderLead,
    path: "/case-study-builder",
    locale
  });
}

export default async function CaseStudyBuilderPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const metrics = [
    { label: dict.caseStudyBuilderMetricStages, value: caseStudyBuilderStages.length },
    { label: dict.caseStudyBuilderMetricTemplates, value: caseStudyBuilderTemplates.length },
    { label: dict.caseStudyBuilderMetricWorks, value: works.length }
  ];

  return (
    <main className="page-shell case-study-builder-shell" id="page-main-content">
      <a href="#case-study-builder-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/case-study-builder")} aria-current="page">{dict.navCaseStudyBuilder}</Link>
          <Link href={withLocalePath(locale, "/motion-presets")}>{dict.navMotionPresets}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero case-study-builder-hero" id="case-study-builder-content">
        <p className="eyebrow">{dict.caseStudyBuilderEyebrow}</p>
        <h1>{dict.caseStudyBuilderTitle}</h1>
        <p className="page-lead">{dict.caseStudyBuilderLead}</p>
        <div className="readiness-metrics" aria-label={dict.caseStudyBuilderTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section case-study-builder-section" aria-labelledby="case-study-builder-stages-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.caseStudyBuilderEyebrow}</p>
            <h2 id="case-study-builder-stages-title">{dict.caseStudyBuilderStagesTitle}</h2>
          </div>
          <p>{dict.caseStudyBuilderStagesLead}</p>
        </div>
        <div className="case-study-stage-grid">
          {caseStudyBuilderStages.map((stage, index) => (
            <article className="case-study-stage-card" data-stage={stage.id} key={stage.id}>
              <span>{String(index + 1).padStart(2, "0")} / {stage.label}</span>
              <h3>{stage.purpose}</h3>
              <p>{stage.prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section case-study-builder-section" aria-labelledby="case-study-builder-templates-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.caseStudyBuilderEyebrow}</p>
            <h2 id="case-study-builder-templates-title">{dict.caseStudyBuilderTemplatesTitle}</h2>
          </div>
          <p>{dict.caseStudyBuilderTemplatesLead}</p>
        </div>
        <div className="case-study-template-grid">
          {caseStudyBuilderTemplates.map((template) => (
            <article className="case-study-template-card" key={template.id}>
              <h3>{template.title}</h3>
              <p>{template.bestFor}</p>
              <ol>
                {template.structure.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
        <div className="case-study-builder-actions">
          <Link className="primary-link" href="/api/case-study-builder">{dict.caseStudyBuilderApiCta}</Link>
          <Link className="secondary-link" href={withLocalePath(locale, "/portfolio")}>{dict.caseStudyBuilderPortfolioCta}</Link>
        </div>
      </section>
    </main>
  );
}
