import { useState } from "react";

import {
  behanceEmbeds,
  behanceVisuals,
  contactQa,
  drawings,
  evolutionTracks,
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
  const featuredDrawings = drawings.filter((drawing) => drawing.featured).slice(0, 6);

  return (
    <main>
      <nav className="nav">
        <strong>Emirhan Kudun</strong>
        <div>
          {locales.map((item) => (
            <button className={locale === item ? "active" : ""} key={item} onClick={() => setLocale(item)}>
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <section className="hero">
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

      <section className="grid">
        {works.slice(0, 6).map((work) => (
          <article key={work.id}>
            <small>{work.tag}</small>
            <h2>{work.title}</h2>
            <p>{work.summary}</p>
          </article>
        ))}
      </section>

      <section className="drawings">
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

      <section className="visuals">
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

      <section className="portfolio-index">
        <div>
          <small>Portfolio / Index</small>
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

      <section className="grid">
        {behanceEmbeds.slice(0, 3).map((embed) => (
          <article className="embed-card" key={embed.id}>
            <small>{embed.category}</small>
            <h2>{embed.title}</h2>
            <p>{embed.notes}</p>
            <pre><code>{embed.embedCode}</code></pre>
          </article>
        ))}
      </section>

      <section className="contact-preview">
        <div>
          <small>Q&A / Contact</small>
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
