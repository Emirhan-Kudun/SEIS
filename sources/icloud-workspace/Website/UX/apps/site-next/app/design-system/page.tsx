import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary } from "@seis/content";
import { designPrinciples, designTokenGroups } from "@seis/content/design-system";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navDesign,
    description: dict.designSystemLead,
    path: "/design-system",
    locale
  });
}

export default async function DesignSystemPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return (
    <main className="page-shell" id="page-main-content">
      <a href="#design-system-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/lab")}>{dict.navLab}</Link>
          <Link href={withLocalePath(locale, "/design-system")} aria-current="page">{dict.navDesign}</Link>
          <Link href={withLocalePath(locale, "/motion")}>{dict.navMotion}</Link>
          <Link href={withLocalePath(locale, "/compatibility")}>{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/drawings")}>{dict.navDrawings}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero" id="design-system-content">
        <p className="eyebrow">{dict.designSystemEyebrow}</p>
        <h1>{dict.designSystemTitle}</h1>
        <p>{dict.designSystemLead}</p>

        <div className="card-grid">
          {designPrinciples.map((principle) => (
            <article className="work-card" key={principle.id}>
              <p className="kicker">{principle.id}</p>
              <h2>{principle.title}</h2>
              <p>{principle.summary}</p>
              <span>{principle.signal}</span>
            </article>
          ))}
        </div>

        <div className="runtime-grid design-token-grid">
          {designTokenGroups.map((group) => (
            <article className="runtime-card" data-status="active" key={group.id}>
              <p className="kicker">{dict.designSystemTokenGroup}</p>
              <h2>{group.label}</h2>
              <p>{group.values.join(" / ")}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
