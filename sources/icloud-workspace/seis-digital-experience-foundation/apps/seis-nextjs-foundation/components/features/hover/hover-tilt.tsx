"use client";

import { ReactNode, useState } from "react";

type HoverTiltProps = {
  children: ReactNode;
};

export function HoverTilt({ children }: HoverTiltProps) {
  const [tilt, setTilt] = useState("rotateX(0deg) rotateY(0deg)");

  return (
    <div
      className="rounded-lg border border-seis-line px-3 py-2 transition-transform duration-150"
      style={{ transform: tilt, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
        setTilt(`rotateX(${y.toFixed(2)}deg) rotateY(${x.toFixed(2)}deg)`);
      }}
      onMouseLeave={() => setTilt("rotateX(0deg) rotateY(0deg)")}
    >
      {children}
    </div>
  );
}
