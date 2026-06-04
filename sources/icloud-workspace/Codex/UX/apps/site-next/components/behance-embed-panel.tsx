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
  const [copyState, setCopyState] = useState<{ id: string; status: "copied" | "error" } | null>(null);
  const visibleEmbeds = compact ? embeds.filter((item) => item.featured).slice(0, 3) : embeds;

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
    </div>
  );
}
