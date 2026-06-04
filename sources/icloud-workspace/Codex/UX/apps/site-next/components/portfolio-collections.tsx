import type { LocalizedDictionary, PortfolioCollectionItem } from "@seis/content";

type PortfolioCollectionsProps = {
  dictionary: LocalizedDictionary;
  collections: PortfolioCollectionItem[];
  compact?: boolean;
};

export function PortfolioCollections({ dictionary, collections, compact = false }: PortfolioCollectionsProps) {
  const visibleCollections = compact ? collections.slice(0, 3) : collections;

  return (
    <section className="portfolio-collections" data-compact={compact} aria-labelledby="portfolio-collections-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{dictionary.portfolioCollectionsEyebrow}</p>
          <h2 id="portfolio-collections-title">{dictionary.portfolioCollectionsTitle}</h2>
        </div>
        <p>{dictionary.portfolioCollectionsLead}</p>
      </div>
      <div className="portfolio-collection-grid">
        {visibleCollections.map((collection) => (
          <article className="portfolio-collection-card" data-accent={collection.accent} key={collection.id}>
            <a className="portfolio-collection-media" href={collection.href} aria-label={`${dictionary.portfolioCollectionOpen}: ${collection.title}`}>
              {collection.images.slice(0, 3).map((image, index) => (
                <img src={image} alt={`${collection.title} visual ${index + 1}`} loading="lazy" decoding="async" key={`${collection.id}-${image}`} />
              ))}
            </a>
            <div className="portfolio-collection-copy">
              <p className="kicker">{collection.tone}</p>
              <h3>{collection.title}</h3>
              <p>{collection.summary}</p>
              <span>{dictionary.portfolioCollectionProof}</span>
              <ul>
                {collection.proof.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="text-link" href={collection.href}>{dictionary.portfolioCollectionOpen}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
