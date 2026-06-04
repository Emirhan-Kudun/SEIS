import { ReactNode } from "react";

type HoverUnderlineProps = {
  children: ReactNode;
};

export function HoverUnderline({ children }: HoverUnderlineProps) {
  return (
    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-seis-accent after:transition-all after:duration-200 hover:after:w-full">
      {children}
    </span>
  );
}
