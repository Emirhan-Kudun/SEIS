import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, motionRuntimeBudgets, motionSceneModes, softwareLanguages } from "@seis/content";

import { MotionLanguageStage } from "../../components/motion-language-stage";
import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navMotion,
    description: dict.motionLead,
    path: "/motion",
    locale
  });
}

export default async function MotionPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const budgetStatusLabels = {
    active: dict.motionBudgetStatusActive,
    guarded: dict.motionBudgetStatusGuarded
  };
  const activeLanguages = softwareLanguages.filter((language) => language.status === "active");
  const plannedLanguages = softwareLanguages.filter((language) => language.status === "planned");
  const roadmap = [dict.motionRoadmapOne, dict.motionRoadmapTwo, dict.motionRoadmapThree];

  return (
    <main className="page-shell motion-shell" id="page-main-content">
      <a href="#motion-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/motion")} aria-current="page">{dict.navMotion}</Link>
          <Link href={withLocalePath(locale, "/lab")}>{dict.navLab}</Link>
          <Link href={withLocalePath(locale, "/compatibility")}>{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/cv")}>{dict.navExperience}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <div id="motion-content">
        <MotionLanguageStage dictionary={dict} languages={softwareLanguages} />
        <section className="section motion-mode-section" aria-labelledby="motion-mode-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{dict.motionModesEyebrow}</p>
              <h2 id="motion-mode-title">{dict.motionModesTitle}</h2>
            </div>
            <p>{dict.motionModesLead}</p>
          </div>
          <div className="motion-mode-grid">
            {motionSceneModes.map((mode) => (
              <article className="motion-mode-card" data-mode={mode.id} key={mode.id}>
                <span>{dict[mode.intensityKey]}</span>
                <h3>{dict[mode.labelKey]}</h3>
                <p>{dict[mode.purposeKey]}</p>
                <small>{dict[mode.constraintKey]}</small>
              </article>
            ))}
          </div>
        </section>
        <section className="section motion-stack-section" aria-labelledby="motion-stack-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{dict.languagesTitle}</p>
              <h2 id="motion-stack-title">{dict.motionStackTitle}</h2>
            </div>
            <p>{dict.motionStackLead}</p>
          </div>
          <div className="motion-stack-columns">
            <div className="language-grid" aria-label={dict.motionStackTitle}>
              {[...activeLanguages, ...plannedLanguages].map((language) => (
                <article className="language-card" data-status={language.status} key={language.id}>
                  <p className="kicker">{language.layer}</p>
                  <h3>{language.name}</h3>
                  <p>{language.role}</p>
                </article>
              ))}
            </div>
            <aside className="motion-roadmap" aria-labelledby="motion-roadmap-title">
              <h2 id="motion-roadmap-title">{dict.motionRoadmapTitle}</h2>
              <ol>
                {roadmap.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
              <Link className="primary-link" href={withLocalePath(locale, "/contact")}>{dict.startBrief}</Link>
            </aside>
          </div>
        </section>
        <section className="section motion-budget-section" aria-labelledby="motion-budget-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{dict.motionBudgetEyebrow}</p>
              <h2 id="motion-budget-title">{dict.motionBudgetTitle}</h2>
            </div>
            <p>{dict.motionBudgetLead}</p>
          </div>
          <div className="motion-budget-grid">
            {motionRuntimeBudgets.map((budget) => (
              <article className="motion-budget-card" data-status={budget.status} key={budget.id}>
                <span>{budgetStatusLabels[budget.status]}</span>
                <h3>{budget.label}</h3>
                <p>{budget.target}</p>
                <small>{budget.proof}</small>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
