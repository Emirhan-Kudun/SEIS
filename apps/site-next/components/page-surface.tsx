import Link from "next/link";

import {
  behanceEmbeds,
  behanceVisuals,
  drawings,
  evolutionTracks,
  getDictionary,
  portfolioCollections,
  portfolioIndex,
  qualityStandards,
  services,
  works
} from "@seis/content";

import { BehanceEmbedPanel } from "./behance-embed-panel";
import { BehanceVisualGrid } from "./behance-visual-grid";
import { BriefIntakeForm } from "./brief-intake-form";
import { CinematicShowcaseScene } from "./cinematic-showcase-scene";
import { ContactHub } from "./contact-hub";
import { DrawingArchive } from "./drawing-archive";
import { EvolutionRoadmap } from "./evolution-roadmap";
import { PortfolioCollections } from "./portfolio-collections";
import { PortfolioIndex } from "./portfolio-index";

type PageMode = "portfolio" | "drawings" | "lab" | "contact";

const navItems = [
  ["/", "Home"],
  ["/portfolio", "Portfolio"],
  ["/#behance", "Behance"],
  ["/drawings", "Drawings"],
  ["/lab", "Lab"],
  ["/contact", "Contact"]
] as const;

export function PageSurface({ mode }: { mode: PageMode }) {
  const dict = getDictionary("en");
  const featuredDrawings = drawings.filter((drawing) => drawing.featured).slice(0, 8);
  const motionPortfolioCards = [
    ...behanceVisuals.filter((item) => item.featured).slice(0, 3).map((item) => ({
      id: `behance-${item.id}`,
      image: item.image,
      title: item.title,
      meta: `Behance / ${item.category}`,
      source: "behance"
    })),
    ...featuredDrawings.slice(0, 3).map((drawing) => ({
      id: `drawing-${drawing.id}`,
      image: drawing.src,
      title: drawing.title,
      meta: `Drawing / ${drawing.category}`,
      source: "drawing"
    }))
  ];

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
            <div className="portfolio-3d-cards" aria-label="Animated Behance and drawing gallery">
              {motionPortfolioCards.map((card) => (
                <figure className="portfolio-3d-card" data-source={card.source} key={card.id}>
                  <img src={card.image} alt={`${card.title} - ${card.meta}`} loading="lazy" />
                  <figcaption>
                    <strong>{card.title}</strong>
                    <span>{card.meta}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <PortfolioCollections dictionary={dict} collections={portfolioCollections} />
          <BehanceVisualGrid dictionary={dict} items={behanceVisuals} />
          <BehanceEmbedPanel dictionary={dict} embeds={behanceEmbeds} />
          <PortfolioIndex dictionary={dict} items={portfolioIndex} />
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
          <p>{dict.drawingArchiveLead}</p>
          <DrawingArchive dictionary={dict} drawings={drawings} />
        </section>
      )}

      {mode === "lab" && (
        <section className="section page-hero lab-page">
          <EvolutionRoadmap dictionary={dict} tracks={evolutionTracks} standards={qualityStandards} />
        </section>
      )}

      {mode === "contact" && (
        <section className="section page-hero contact-page">
          <p className="eyebrow">{dict.contactTitle}</p>
          <h1>{dict.contactLead}</h1>
          <div className="contact-layout">
            <ContactHub dictionary={dict} />
            <BriefIntakeForm dictionary={dict} services={services} />
          </div>
        </section>
      )}
    </main>
  );
}
