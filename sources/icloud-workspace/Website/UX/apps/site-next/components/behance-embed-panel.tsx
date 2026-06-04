"use client";

import { useState } from "react";

import type { BehanceEmbedItem, LocalizedDictionary } from "@seis/content";
import type { CSSProperties } from "react";

type BehanceEmbedPanelProps = {
  dictionary: LocalizedDictionary;
  embeds: BehanceEmbedItem[];
  compact?: boolean;
};

const INITIAL_EMBED_COUNT = 6;
const EMBED_BATCH_SIZE = 6;

export function BehanceEmbedPanel({ dictionary, embeds, compact = false }: BehanceEmbedPanelProps) {
  const [copyState, setCopyState] = useState<{ id: string; status: "copied" | "error" } | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_EMBED_COUNT);
  const compactEmbeds = embeds.filter((item) => item.featured).slice(0, 3);
  const visibleEmbeds = compact ? compactEmbeds : embeds.slice(0, visibleCount);
  const hasMoreEmbeds = !compact && visibleEmbeds.length < embeds.length;
  const loadStatus = dictionary.embedLoadStatus
    .replace("{shown}", visibleEmbeds.length.toString())
    .replace("{total}", embeds.length.toString());

  async function copyEmbedCode(embed: BehanceEmbedItem) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("clipboard_unavailable");
      }

      await navigator.clipboard.writeText(embed.embedCode);
      setCopyState({ id: embed.id, status: "copied" });
    } catch {
      setCopyState({ id: embed.id, status: "error" });
    }

    window.setTimeout(() => setCopyState((current) => current?.id === embed.id ? null : current), 1600);
  }

  return (
    <div className="behance-panel" data-compact={compact}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{dictionary.behanceEmbedEyebrow}</p>
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
                {copyState?.id === embed.id && copyState.status === "copied" ? dictionary.copied : dictionary.copyEmbed}
              </button>
              <a
                className="secondary-link"
                href={embed.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dictionary.behanceOpen}. ${dictionary.externalLinkLabel}`}
              >
                {dictionary.behanceOpen}
                <span className="sr-only">{dictionary.externalLinkLabel}</span>
              </a>
            </div>
            <p className="embed-status" role="status" aria-live="polite">
              {copyState?.id === embed.id && copyState.status === "copied" && dictionary.copied}
              {copyState?.id === embed.id && copyState.status === "error" && dictionary.copyFailed}
            </p>
          </article>
        ))}
      </div>
      {!compact && (
        <div className="embed-archive-controls">
          <p aria-live="polite">{loadStatus}</p>
          {hasMoreEmbeds && (
            <div className="embed-actions">
              <button
                className="secondary-link"
                type="button"
                onClick={() => setVisibleCount((count) => Math.min(count + EMBED_BATCH_SIZE, embeds.length))}
              >
                {dictionary.showMoreEmbeds}
              </button>
              <button className="secondary-link" type="button" onClick={() => setVisibleCount(embeds.length)}>
                {dictionary.showAllEmbeds}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
