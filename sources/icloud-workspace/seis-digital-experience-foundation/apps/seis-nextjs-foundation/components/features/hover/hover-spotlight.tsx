import { ReactNode } from "react";

type HoverSpotlightProps = {
  children: ReactNode;
};

export function HoverSpotlight({ children }: HoverSpotlightProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-seis-line px-3 py-2">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 10%, rgba(215,169,109,0.18), transparent 60%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}
