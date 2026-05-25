import type { BehanceVisualItem, LocalizedDictionary } from "@seis/content";

type BehanceVisualGridProps = {
  dictionary: LocalizedDictionary;
  items: BehanceVisualItem[];
  compact?: boolean;
  showHeading?: boolean;
};

export function BehanceVisualGrid({
  dictionary,
  items,
  compact = false,
  showHeading = true
}: BehanceVisualGridProps) {
  const visibleItems = compact ? items.filter((item) => item.featured).slice(0, 6) : items;

  return (
    <div className="behance-visuals" data-compact={compact}>
      {showHeading && (
        <div className="section-heading">
          <div>
            <p className="eyebrow">Behance / Visuals</p>
            <h2>{dictionary.behanceVisualsTitle}</h2>
          </div>
          <p>{dictionary.behanceVisualsLead}</p>
        </div>
      )}
      <div className="behance-visual-grid">
        {visibleItems.map((item) => (
          <a
            className="behance-visual-card"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.title} - ${item.category} Behance`}
            key={item.id}
          >
            <img src={item.image} alt={`${item.title} - ${item.category}`} loading="lazy" decoding="async" />
            <span>
              <small>{item.category}</small>
              <strong>{item.title}</strong>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
