import Link from "next/link";

import {
  behanceEmbeds,
  caseStudies,
  drawings,
  getDictionary,
  services,
  siteMeta,
  works
} from "@seis/content";

import { BehanceEmbedPanel } from "./behance-embed-panel";
import { BriefIntakeForm } from "./brief-intake-form";
import { CinematicShowcaseScene } from "./cinematic-showcase-scene";
import { DecisionQuestionsPanel } from "./decision-questions-panel";

type PageMode = "portfolio" | "drawings" | "cases" | "contact";

const navItems = [
  ["/", "Home"],
  ["/portfolio", "Portfolio"],
  ["/#behance", "Behance"],
  ["/drawings", "Drawings"],
  ["/case-studies", "Case studies"],
  ["/contact", "Contact"]
] as const;

export function PageSurface({ mode }: { mode: PageMode }) {
  const dict = getDictionary("en");
  const featuredDrawings = drawings.filter((drawing) => drawing.featured).slice(0, 8);

  return (
    <main className="page-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <Link href="/" className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          {navItems.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {mode === "portfolio" && (
        <section className="section page-hero">
          <p className="eyebrow">Behance / Drawings / Portfolio</p>
          <h1>Behance, drawing archive and selected visual systems in one cinematic portfolio.</h1>
          <div className="studio-showcase portfolio-3d-showcase">
            <CinematicShowcaseScene />
            <div className="portfolio-3d-cards" aria-label="Animated drawing gallery">
              {featuredDrawings.slice(0, 6).map((drawing) => (
                <figure className="portfolio-3d-card" key={`motion-${drawing.id}`}>
                  <img src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} loading="lazy" />
                  <figcaption>{drawing.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <BehanceEmbedPanel dictionary={dict} embeds={behanceEmbeds} />
          <div className="featured-strip" aria-label="Portfolio drawing selection">
            {featuredDrawings.map((drawing) => (
              <figure className="featured-drawing" key={drawing.id}>
                <img src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} loading="lazy" />
                <figcaption>{drawing.title}</figcaption>
              </figure>
            ))}
          </div>
          <div className="card-grid">
            {works.map((work) => (
              <article className="work-card" key={work.id}>
                <p className="kicker">{work.tag}</p>
                <h2>{work.title}</h2>
                <p>{work.summary}</p>
                <span>{work.impact}</span>
                <Link className="text-link" href={`/portfolio/${work.id}`}>Open project detail</Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "drawings" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.drawingsTitle}</p>
          <h1>Drawing archive as a quiet visual research layer.</h1>
          <div className="drawing-grid">
            {drawings.map((drawing) => (
              <figure className="drawing-card" key={drawing.id}>
                <img src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} loading="lazy" />
                <figcaption>
                  <strong>{drawing.title}</strong>
                  <span>{drawing.tone}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {mode === "cases" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.casesTitle}</p>
          <h1>Case studies that explain visual decisions, gallery structure and client-facing outcomes.</h1>
          <div className="stack">
            {caseStudies.map((study) => (
              <article className="case-card" key={study.slug}>
                <p className="kicker">{study.year} / {study.role}</p>
                <h2>{study.title}</h2>
                <p>{study.challenge}</p>
                <ol>
                  {study.process.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p><strong>Solution:</strong> {study.solution}</p>
                <p><strong>Outcome:</strong> {study.outcome}</p>
                <Link className="text-link" href={`/case-studies/${study.slug}`}>Open case detail</Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "contact" && (
        <section className="section page-hero contact-page">
          <p className="eyebrow">{dict.contactTitle}</p>
          <h1>{dict.contactLead}</h1>
          <div className="contact-layout">
            <div className="contact-direct">
              <a className="primary-link" href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
              <p>{dict.briefReady}</p>
            </div>
            <BriefIntakeForm dictionary={dict} services={services} />
          </div>
          <DecisionQuestionsPanel />
        </section>
      )}
    </main>
  );
}
