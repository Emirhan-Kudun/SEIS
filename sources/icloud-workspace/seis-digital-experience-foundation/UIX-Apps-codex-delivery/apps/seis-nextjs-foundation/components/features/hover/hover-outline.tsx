import { ReactNode } from "react";

type HoverOutlineProps = {
  children: ReactNode;
};

export function HoverOutline({ children }: HoverOutlineProps) {
  return (
    <div className="rounded-lg border border-seis-line px-3 py-2 transition-colors duration-200 hover:border-seis-accent">
      {children}
    </div>
  );
}
