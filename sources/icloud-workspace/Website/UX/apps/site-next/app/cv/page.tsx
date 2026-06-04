import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary } from "@seis/content";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navExperience,
    description: dict.cvLead,
    path: "/cv",
    locale
  });
}

export default async function CvPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const timeline = [
    {
      title: dict.cvTimelineOneTitle,
      meta: dict.cvTimelineOneMeta,
      body: dict.cvTimelineOneBody
    },
    {
      title: dict.cvTimelineTwoTitle,
      meta: dict.cvTimelineTwoMeta,
      body: dict.cvTimelineTwoBody
    },
    {
      title: dict.cvTimelineThreeTitle,
      meta: dict.cvTimelineThreeMeta,
      body: dict.cvTimelineThreeBody
    }
  ];
  const skills = [
    dict.cvSkillDesign,
    dict.cvSkillMotion,
    dict.cvSkillEngineering,
    dict.cvSkillGovernance
  ];

  return (
    <main className="page-shell cv-shell" id="page-main-content">
      <a href="#cv-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/drawings")}>{dict.navDrawings}</Link>
          <Link href={withLocalePath(locale, "/lab")}>{dict.navLab}</Link>
          <Link href={withLocalePath(locale, "/compatibility")}>{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/cv")} aria-current="page">{dict.navExperience}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero cv-hero" id="cv-content">
        <p className="eyebrow">{dict.cvEyebrow}</p>
        <h1>{dict.cvTitle}</h1>
        <p className="page-lead">{dict.cvLead}</p>
        <div className="cv-layout">
          <section className="cv-timeline" aria-labelledby="cv-timeline-title">
            <h2 id="cv-timeline-title">{dict.cvTimelineTitle}</h2>
            <ol>
              {timeline.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{item.meta}</small>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <aside className="cv-skills" aria-labelledby="cv-skills-title">
            <h2 id="cv-skills-title">{dict.cvSkillsTitle}</h2>
            <ul>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <Link className="primary-link" href={withLocalePath(locale, "/contact")}>
              {dict.cvContactCta}
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
