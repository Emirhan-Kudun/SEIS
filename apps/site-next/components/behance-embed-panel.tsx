"use client";

import { useState } from "react";

import type { BehanceEmbedItem, LocalizedDictionary } from "@seis/content";
import type { CSSProperties } from "react";

type BehanceEmbedPanelProps = {
  dictionary: LocalizedDictionary;
  embeds: BehanceEmbedItem[];
  compact?: boolean;
};

export function BehanceEmbedPanel({ dictionary, embeds, compact = false }: BehanceEmbedPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const visibleEmbeds = compact ? embeds.filter((item) => item.featured).slice(0, 3) : embeds;

  async function copyEmbedCode(embed: BehanceEmbedItem) {
    await navigator.clipboard.writeText(embed.embedCode);
    setCopiedId(embed.id);
    window.setTimeout(() => setCopiedId((current) => current === embed.id ? null : current), 1600);
  }

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
              />
            </div>
            <pre aria-label={`${embed.title} embed code`}>
              <code>{embed.embedCode}</code>
            </pre>
            <div className="embed-actions">
              <button className="secondary-link" onClick={() => void copyEmbedCode(embed)} type="button">
                {copiedId === embed.id ? "Copied" : "Copy embed"}
              </button>
              <a className="secondary-link" href={embed.url} target="_blank" rel="noreferrer">
                {dictionary.behanceOpen}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
