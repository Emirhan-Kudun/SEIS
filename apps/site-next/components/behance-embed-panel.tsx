import type { BehanceEmbedItem, LocalizedDictionary } from "@seis/content";
import type { CSSProperties } from "react";

type BehanceEmbedPanelProps = {
  dictionary: LocalizedDictionary;
  embeds: BehanceEmbedItem[];
  compact?: boolean;
};

export function BehanceEmbedPanel({ dictionary, embeds, compact = false }: BehanceEmbedPanelProps) {
  const visibleEmbeds = compact ? embeds.filter((item) => item.featured).slice(0, 3) : embeds;

  return (
    <div className="behance-panel" data-compact={compact}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Behance / Embed</p>
          <h2>{dictionary.behanceTitle}</h2>
        </div>
        <p>{dictionary.behanceLead}</p>
      </div>
      <div className="behance-grid">
        {visibleEmbeds.map((embed) => (
          <article className="behance-card" key={embed.id}>
            <p className="kicker">{embed.category}</p>
            <h3>{embed.title}</h3>
            <p>{embed.notes}</p>
            <div className="behance-embed-frame" style={{ "--embed-aspect": embed.aspectRatio } as CSSProperties}>
              <iframe
                src={embed.embedUrl}
                title={`${embed.title} live Behance embed`}
                loading="lazy"
                allow="clipboard-write *; fullscreen *;"
                allowFullScreen
              />
            </div>
            <pre aria-label={`${embed.title} embed code`}>
              <code>{embed.embedCode}</code>
            </pre>
            <a className="secondary-link" href={embed.url} target="_blank" rel="noreferrer">
              {dictionary.behanceOpen}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
