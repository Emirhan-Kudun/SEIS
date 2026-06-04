"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LazyScene = dynamic(
  () => import("@/components/three/hero-atmosphere-scene").then((mod) => mod.HeroAtmosphereScene),
  {
    ssr: false,
    loading: () => <AtmosphereFallback />
  }
);

function AtmosphereFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(139,198,255,0.2),transparent_36%),radial-gradient(circle_at_82%_72%,rgba(156,230,216,0.12),transparent_34%)]"
    />
  );
}

function shouldUseFallback() {
  if (typeof window === "undefined") return true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compactViewport = window.matchMedia("(max-width: 760px)").matches;
  const lowPowerCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;

  return reducedMotion || compactViewport || lowPowerCpu;
}

export function HeroAtmosphere() {
  const [fallback, setFallback] = useState(true);

  useEffect(() => {
    setFallback(shouldUseFallback());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[48%] opacity-80 lg:block">
      {fallback ? <AtmosphereFallback /> : <LazyScene />}
    </div>
  );
}
