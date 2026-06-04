"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  behanceEmbeds,
  behanceVisuals,
  digitalLabAudiences,
  digitalLabCapabilities,
  digitalLabEngagements,
  digitalLabSurfaces,
  digitalLabWorkflow,
  drawings,
  evolutionTracks,
  getDigitalLabCopy,
  getDictionary,
  locales,
  portfolioCollections,
  portfolioIndex,
  qualityStandards,
  resolveLocale,
  services,
  works,
  type Locale
} from "@seis/content";

import { withLocalePath } from "../lib/locale-paths";
import { BriefIntakeForm } from "./brief-intake-form";
import { BehanceEmbedPanel } from "./behance-embed-panel";
import { BehanceVisualGrid } from "./behance-visual-grid";
import { CinematicHeroScene } from "./cinematic-hero-scene";
import { CinematicShowcaseScene } from "./cinematic-showcase-scene";
import { ContactHub } from "./contact-hub";
import { DigitalLabMatrix } from "./digital-lab-matrix";
import { DrawingArchive } from "./drawing-archive";
import { EvolutionRoadmap } from "./evolution-roadmap";
import { PortfolioCollections } from "./portfolio-collections";
import { PortfolioDiscoveryFlow } from "./portfolio-discovery-flow";
import { PortfolioIndex } from "./portfolio-index";

type ShellMode = "home";

const nav = [
  ["#home", "navHome"],
  ["#portfolio", "navPortfolio"],
  ["/portfolio-os", "navPortfolioOs"],
  ["/connector-console", "navConnectorConsole"],
  ["/platform-adapters", "navPlatformAdapters"],
  ["/cloud-environment", "navCloudEnvironment"],
  ["/server-handoff", "navServerHandoff"],
  ["/security-posture", "navSecurityPosture"],
  ["/studio-crm", "navStudioCrm"],
  ["/brief-triage", "navBriefTriage"],
  ["/publishing-console", "navPublishingConsole"],
  ["/case-study-builder", "navCaseStudyBuilder"],
  ["#behance", "navBehance"],
  ["#drawings", "navDrawings"],
  ["#lab", "navLab"],
  ["/design-system", "navDesign"],
  ["/readiness", "navReadiness"],
  ["/motion", "navMotion"],
  ["/motion-presets", "navMotionPresets"],
  ["/os", "navSupremeOs"],
  ["/compatibility", "navCompatibility"],
  ["/cv", "navExperience"],
  ["#contact", "navContact"]
] as const;
type NavKey = (typeof nav)[number][1];

export function SiteShell({ mode, locale: initialLocale }: { mode: ShellMode; locale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const digitalLabCopy = useMemo(() => getDigitalLabCopy(locale), [locale]);
  const featuredDrawings = useMemo(() => drawings.filter((drawing) => drawing.featured).slice(0, 8), []);
  const portfolioDrawings = useMemo(() => drawings.filter((drawing) => drawing.featured).slice(0, 6), []);
  const studioTiles = useMemo(() => [
    ...behanceVisuals.filter((item) => item.featured).slice(0, 2).map((item) => ({
      id: `behance-${item.id}`,
      image: item.image,
      title: item.title,
      meta: `Behance / ${item.category}`
    })),
    ...featuredDrawings.slice(0, 2).map((drawing) => ({
      id: `drawing-${drawing.id}`,
      image: drawing.src,
      title: drawing.title,
      meta: `Drawing / ${drawing.category}`
    }))
  ], [featuredDrawings]);

  useEffect(() => {
    const stored = window.localStorage.getItem("seis-locale");
    const storedLocale = resolveLocale(stored || initialLocale);
    setLocale(storedLocale);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("seis-locale", locale);
  }, [locale]);

  function selectLocale(item: Locale) {
    setLocale(item);
    setIsDrawerOpen(false);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  return (
    <main className="site-shell" data-mode={mode} id="main-content">
      <a href="#portfolio" className="skip-link">{dictionary.skipPortfolio}</a>
      <nav className="top-nav" aria-label={dictionary.primaryNavigationLabel} data-drawer-open={isDrawerOpen}>
        <a href="#home" className="brand" aria-label={dictionary.brandHomeLabel}>
          Emirhan Kudun
        </a>
        <button
          className="nav-menu-button"
          type="button"
          aria-controls="site-navigation-panel"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span className="sr-only">{dictionary.primaryNavigationLabel}</span>
        </button>
        <div className="nav-panel" id="site-navigation-panel">
          <div className="nav-links">
            {nav.map(([href, key]) => (
              <a key={href} href={href.startsWith("/") ? withLocalePath(locale, href) : href} onClick={closeDrawer}>
                {dictionary[key as NavKey]}
              </a>
            ))}
          </div>
          <div className="language-switcher" aria-label={dictionary.languageSelectorLabel}>
            {locales.map((item) => (
              <button
                className={item === locale ? "active" : ""}
                key={item}
                type="button"
                lang={item}
                aria-pressed={item === locale}
                aria-current={item === locale ? "true" : undefined}
                aria-label={`${dictionary.languageSelectorLabel}: ${item.toUpperCase()}`}
                onClick={() => selectLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <CinematicHeroScene />
        <div className="hero-copy">
          <p className="eyebrow">{dictionary.heroEyebrow}</p>
          <h1>{dictionary.heroTitle}</h1>
          <p>{dictionary.heroLead}</p>
          <div className="hero-actions">
            <a href="#portfolio" className="primary-link">{dictionary.heroPrimary}</a>
            <a href="#contact" className="secondary-link">{dictionary.startBrief}</a>
          </div>
        </div>
        <div className="hero-panel" aria-label={dictionary.heroPanelHighlightsLabel}>
          <span>Portfolio / Brief / Calm systems</span>
          <strong>{dictionary.heroPanelTitle}</strong>
          <p>{dictionary.heroPanelLead}</p>
          <div className="panel-line" />
          <div className="panel-metrics" aria-label={dictionary.heroMetricsLabel}>
            <span>{dictionary.studioMetricOne}</span>
            <span>{dictionary.studioMetricTwo}</span>
            <span>{dictionary.studioMetricThree}</span>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <p className="eyebrow">{dictionary.servicesEyebrow}</p>
        <h2>{dictionary.servicesTitle}</h2>
        <div className="card-grid compact">
          {services.map((service) => (
            <article className="work-card" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section digital-lab-section" id="lab">
        <DigitalLabMatrix
          copy={digitalLabCopy}
          surfaces={digitalLabSurfaces}
          capabilities={digitalLabCapabilities}
          workflow={digitalLabWorkflow}
          audiences={digitalLabAudiences}
          engagements={digitalLabEngagements}
        />
      </section>

      <section className="section studio-section" id="studio">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dictionary.studioEyebrow}</p>
            <h2>{dictionary.studioTitle}</h2>
          </div>
          <p>{dictionary.studioLead}</p>
        </div>
        <div className="studio-showcase">
          <CinematicShowcaseScene />
          <div className="studio-rail" aria-label={dictionary.studioRailLabel}>
            {studioTiles.map((tile) => (
              <article className="studio-tile" key={tile.id}>
                <Image src={tile.image} alt={`${tile.title} - ${tile.meta}`} width={360} height={450} sizes="(max-width: 720px) 100vw, 260px" />
                <span>
                  <small>{tile.meta}</small>
                  {tile.title}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-section" id="portfolio">
        <p className="eyebrow">{dictionary.portfolioEyebrow}</p>
        <h2>{dictionary.worksTitle}</h2>
        <PortfolioCollections dictionary={dictionary} collections={portfolioCollections} compact />
        <PortfolioDiscoveryFlow
          dictionary={dictionary}
          behanceVisuals={behanceVisuals}
          drawings={drawings}
          works={works}
          compact
          links={{ behance: "#behance", drawings: "#drawings", works: "#portfolio" }}
        />
        <div className="portfolio-feature-layout" aria-label={dictionary.portfolioDrawingHighlightsLabel}>
          <div className="portfolio-behance-callout">
            <p className="eyebrow">{dictionary.behancePortfolioEyebrow}</p>
            <h3>{dictionary.behanceTitle}</h3>
            <p>{dictionary.behanceLead}</p>
            <a className="text-link" href="#behance">{dictionary.behanceOpen}</a>
          </div>
          <BehanceVisualGrid dictionary={dictionary} items={behanceVisuals} compact showHeading={false} />
          <div className="portfolio-drawing-strip" aria-label={dictionary.portfolioDrawingHighlightsLabel}>
            {portfolioDrawings.map((drawing) => (
              <figure className="portfolio-drawing-card" key={`portfolio-${drawing.id}`}>
                <Image src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} width={280} height={360} sizes="(max-width: 720px) 100vw, 220px" />
                <figcaption>{drawing.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="card-grid">
          {works.map((work) => (
            <article className="work-card" key={work.id}>
              <p className="kicker">{work.tag}</p>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
              <span>{work.impact}</span>
              <a className="text-link" href={withLocalePath(locale, `/portfolio/${work.id}`)}>{dictionary.projectDetailOpen}</a>
            </article>
          ))}
        </div>
        <PortfolioIndex dictionary={dictionary} items={portfolioIndex} compact locale={locale} />
      </section>

      <section className="section behance-section" id="behance">
        <BehanceVisualGrid dictionary={dictionary} items={behanceVisuals} id="behance-visuals" />
        <BehanceEmbedPanel dictionary={dictionary} embeds={behanceEmbeds} compact />
      </section>

      <section className="section gallery-section" id="drawings">
        <p className="eyebrow">{dictionary.drawingArchiveEyebrow}</p>
        <h2>{dictionary.drawingsTitle}</h2>
        <p>{dictionary.drawingArchiveLead}</p>
        <div className="featured-strip" aria-label={dictionary.featuredDrawingsLabel}>
          {featuredDrawings.map((drawing) => (
            <figure className="featured-drawing" key={`featured-${drawing.id}`}>
              <Image src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} width={360} height={450} sizes="(max-width: 720px) 80vw, 260px" />
              <figcaption>{drawing.title}</figcaption>
            </figure>
          ))}
        </div>
        <DrawingArchive dictionary={dictionary} drawings={drawings} compact />
      </section>

      <section className="section evolution-section" id="evolution">
        <EvolutionRoadmap dictionary={dictionary} tracks={evolutionTracks} standards={qualityStandards} compact />
      </section>

      <section className="section contact-section" id="contact">
        <p className="eyebrow">{dictionary.contactEyebrow}</p>
        <h2>{dictionary.contactTitle}</h2>
        <p>{dictionary.contactLead}</p>
        <div className="contact-layout">
          <ContactHub dictionary={dictionary} />
          <BriefIntakeForm dictionary={dictionary} engagements={digitalLabEngagements} services={services} />
        </div>
      </section>
    </main>
  );
}
