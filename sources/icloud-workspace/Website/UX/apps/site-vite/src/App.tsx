import { useState } from "react";

import {
  behanceEmbeds,
  behanceVisuals,
  contactQa,
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
  services,
  siteMeta,
  socialLinks,
  works,
  type Locale
} from "@seis/content";

export function App() {
  const [locale, setLocale] = useState<Locale>("tr");
  const dict = getDictionary(locale);
  const digitalLabCopy = getDigitalLabCopy(locale);
  const featuredDrawings = drawings.filter((drawing) => drawing.featured).slice(0, 6);
  const navItems = [
    { id: "home", label: dict.navHome },
    { id: "portfolio", label: dict.navPortfolio },
    { id: "behance", label: dict.navBehance },
    { id: "drawings", label: dict.navDrawings },
    { id: "contact", label: dict.navContact }
  ];
  const discoveryLanes = [
    {
      id: "behance",
      title: dict.behanceVisualsTitle,
      summary: dict.portfolioFlowBehanceLead,
      metric: `${behanceVisuals.length} ${dict.portfolioMetricBehance}`,
      images: behanceVisuals.filter((item) => item.featured).slice(0, 3).map((item) => item.image)
    },
    {
      id: "drawings",
      title: dict.drawingsTitle,
      summary: dict.portfolioFlowDrawingsLead,
      metric: `${drawings.length} ${dict.portfolioMetricDrawings}`,
      images: featuredDrawings.slice(0, 3).map((drawing) => drawing.src)
    },
    {
      id: "works",
      title: dict.worksTitle,
      summary: dict.portfolioFlowWorksLead,
      metric: `${works.length} ${dict.portfolioMetricWorks}`,
      images: []
    }
  ];

  return (
    <main>
      <nav className="nav">
        <a className="nav-brand" href="#home">Emirhan Kudun</a>
        <div className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="locale-controls">
          {locales.map((item) => (
            <button className={locale === item ? "active" : ""} key={item} onClick={() => setLocale(item)} type="button">
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <section className="hero" id="home">
        <p>{dict.heroEyebrow}</p>
        <h1>{dict.heroTitle}</h1>
        <span>{dict.heroLead}</span>
        <div className="hero-metrics" aria-label="Portfolio preview metrics">
          <strong>{dict.studioMetricOne}</strong>
          <strong>{dict.studioMetricTwo}</strong>
          <strong>{dict.studioMetricThree}</strong>
        </div>
      </section>

      <section className="grid">
        {services.map((service) => (
          <article key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
          </article>
        ))}
      </section>

      <section className="digital-lab">
        <div>
          <small>{digitalLabCopy.eyebrow}</small>
          <h2>{digitalLabCopy.title}</h2>
          <p>{digitalLabCopy.lead}</p>
        </div>
        <div className="digital-lab-surfaces" aria-label={digitalLabCopy.surfacesLabel}>
          {digitalLabSurfaces.map((surface) => (
            <article key={surface.id}>
              <h3>{surface.label}</h3>
              <p>{surface.summary}</p>
            </article>
          ))}
        </div>
        <div className="digital-lab-capabilities" aria-label={digitalLabCopy.capabilitiesLabel}>
          {digitalLabCapabilities.map((capability) => (
            <article key={capability.id}>
              <small>{capability.stage}</small>
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
            </article>
          ))}
        </div>
        <ol className="digital-lab-workflow" aria-label={digitalLabCopy.workflowLabel}>
          {digitalLabWorkflow.map((step) => (
            <li key={step.id}>
              <strong>{step.label}</strong>
              <span>{step.summary}</span>
            </li>
          ))}
        </ol>
        <div className="digital-lab-audiences" aria-label={digitalLabCopy.audiencesLabel}>
          {digitalLabAudiences.map((audience) => (
            <article key={audience.id}>
              <small>{audience.name}</small>
              <h3>{audience.need}</h3>
              <p>{audience.labResponse}</p>
            </article>
          ))}
        </div>
        <div className="digital-lab-engagements" aria-label={digitalLabCopy.engagementsLabel}>
          {digitalLabEngagements.map((engagement) => (
            <article key={engagement.id}>
              <small>{engagement.pace}</small>
              <h3>{engagement.title}</h3>
              <p>{engagement.bestFor}</p>
              <strong>{engagement.qualityGate}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="grid" id="portfolio">
        {works.slice(0, 6).map((work) => (
          <article key={work.id}>
            <small>{work.tag}</small>
            <h2>{work.title}</h2>
            <p>{work.summary}</p>
          </article>
        ))}
      </section>

      <section className="drawings" id="drawings">
        {featuredDrawings.map((drawing) => (
          <figure key={drawing.id}>
            <img src={drawing.src} alt={drawing.title} loading="lazy" />
            <figcaption>
              <strong>{drawing.title}</strong>
              <span>{drawing.category}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="visuals" id="behance">
        <div>
          <small>Behance / Visuals</small>
          <h2>{dict.behanceVisualsTitle}</h2>
          <p>{dict.behanceVisualsLead}</p>
        </div>
        <div className="visual-grid">
          {behanceVisuals.map((item) => (
            <a className="visual-card" href={item.href} target="_blank" rel="noreferrer" key={item.id}>
              <img src={item.image} alt={`${item.title} - ${item.category}`} loading="lazy" />
              <span>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="collections">
        <div>
          <small>{dict.portfolioCollectionsEyebrow}</small>
          <h2>{dict.portfolioCollectionsTitle}</h2>
          <p>{dict.portfolioCollectionsLead}</p>
        </div>
        <div className="collection-grid">
          {portfolioCollections.slice(0, 3).map((collection) => (
            <article data-accent={collection.accent} key={collection.id}>
              <div className="collection-media">
                {collection.images.slice(0, 3).map((image) => (
                  <img src={image} alt={collection.title} loading="lazy" key={image} />
                ))}
              </div>
              <small>{collection.tone}</small>
              <h3>{collection.title}</h3>
              <p>{collection.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow">
        <div>
          <small>{dict.portfolioFlowEyebrow}</small>
          <h2>{dict.portfolioFlowTitle}</h2>
          <p>{dict.portfolioFlowLead}</p>
        </div>
        <div className="flow-grid">
          {discoveryLanes.map((lane, index) => (
            <article data-lane={lane.id} key={lane.id}>
              <div className="flow-head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{lane.metric}</small>
              </div>
              <div className="flow-media" aria-hidden="true">
                {lane.images.length > 0 ? lane.images.map((image) => (
                  <img src={image} alt="" loading="lazy" key={image} />
                )) : works.slice(0, 3).map((work) => (
                  <span key={work.id}>{work.title.slice(0, 2)}</span>
                ))}
              </div>
              <h3>{lane.title}</h3>
              <p>{lane.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-index">
        <div>
          <small>{dict.portfolioIndexEyebrow}</small>
          <h2>{dict.portfolioIndexTitle}</h2>
          <p>{dict.portfolioIndexLead}</p>
        </div>
        <div className="portfolio-index-grid">
          {portfolioIndex.slice(0, 12).map((item) => (
            <a className="portfolio-index-card" data-source={item.source} href={item.href} key={item.id}>
              {item.image ? (
                <img src={item.image} alt={`${item.title} - ${item.category}`} loading="lazy" />
              ) : (
                <span className="portfolio-index-monogram">{item.title.slice(0, 2)}</span>
              )}
              <span>
                <small>{item.source} / {item.category}</small>
                <strong>{item.title}</strong>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="embed-library" id="embed-library">
        <div>
          <small>{dict.behanceEmbedEyebrow}</small>
          <h2>{behanceEmbeds.length} {dict.portfolioMetricEmbeds}</h2>
          <p>{dict.portfolioIndexLead}</p>
        </div>
        <div className="embed-library-grid">
          {behanceEmbeds.map((embed) => (
            <article className="embed-card" key={embed.id}>
              <small>{embed.category}</small>
              <h3>{embed.title}</h3>
              <p>{embed.notes}</p>
              <pre><code>{embed.embedCode}</code></pre>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-preview" id="contact">
        <div>
          <small>{dict.qaEyebrow}</small>
          <h2>{dict.qaTitle}</h2>
          <p>{dict.qaLead}</p>
          <a className="mail-link" href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" key={link.id}>
                <span>{link.mark}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="qa-grid">
          {contactQa.map((item) => (
            <article key={item.id}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-preview">
        <div>
          <small>Lab / Long-term</small>
          <h2>{dict.evolutionTitle}</h2>
          <p>{dict.evolutionLead}</p>
        </div>
        <div className="lab-grid">
          {evolutionTracks.map((track) => (
            <article key={track.id}>
              <small>{track.status} / {track.timeframe}</small>
              <h3>{track.title}</h3>
              <p>{track.summary}</p>
            </article>
          ))}
        </div>
        <div className="quality-mini-grid">
          {qualityStandards.map((standard) => (
            <article key={standard.id}>
              <strong>{standard.title}</strong>
              <p>{standard.metric}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
