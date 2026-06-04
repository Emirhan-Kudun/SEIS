import { ReactNode } from "react";

type HoverLiftProps = {
  children: ReactNode;
};

export function HoverLift({ children }: HoverLiftProps) {
  return (
    <div className="rounded-lg border border-seis-line px-3 py-2 transition-transform duration-200 hover:-translate-y-0.5">
      {children}
    </div>
  );
}
