"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0.5, scale: 0.95 },
        {
          opacity: 0.9,
          scale: 1.04,
          duration: 2.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-6 top-8 h-28 rounded-full bg-[radial-gradient(circle,var(--seis-hero-glow-a)_0%,var(--seis-hero-glow-b)_42%,rgba(0,0,0,0)_76%)]"
    />
  );
}
