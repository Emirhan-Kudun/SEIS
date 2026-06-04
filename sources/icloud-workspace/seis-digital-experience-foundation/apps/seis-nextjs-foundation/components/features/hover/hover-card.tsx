import { ReactNode } from "react";

import { hoverPresets } from "@/lib/features/hover/hover-presets";

type HoverCardProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function HoverCard({ title, subtitle, children }: HoverCardProps) {
  return (
    <article
      style={hoverPresets.card}
      className="group rounded-xl border border-seis-line bg-seis-surface p-4 hover:-translate-y-0.5 hover:border-seis-accent hover:shadow-cinematic"
    >
      <p className="text-xs uppercase tracking-[0.08em] text-seis-accent">{subtitle}</p>
      <h3 className="mt-2 font-serif text-2xl text-seis-text">{title}</h3>
      {children ? <div className="mt-3 text-sm text-seis-muted">{children}</div> : null}
    </article>
  );
}
