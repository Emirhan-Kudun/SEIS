"use client";

import { ReactNode } from "react";

import { hoverTokens } from "@/lib/features/hover/hover-tokens";

type HoverGlowProps = {
  children: ReactNode;
};

export function HoverGlow({ children }: HoverGlowProps) {
  return (
    <div
      style={{ transition: "box-shadow 220ms ease, border-color 220ms ease" }}
      className="rounded-lg border border-seis-line px-3 py-2 hover:border-seis-accent"
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow = hoverTokens.shadowGlow;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </div>
  );
}
