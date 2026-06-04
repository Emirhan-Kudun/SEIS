"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function SpatialScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <group rotation={[-0.28, 0.42, 0]}>
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[1.2, 1.2, 0.1]} />
          <meshStandardMaterial color="#8bc6ff" metalness={0.08} roughness={0.55} />
        </mesh>
        <mesh position={[0.45, 0.15, 0.12]}>
          <sphereGeometry args={[0.48, 24, 16]} />
          <meshStandardMaterial color="#b8ddff" metalness={0.16} roughness={0.42} />
        </mesh>
        <mesh position={[1.18, -0.34, -0.08]}>
          <torusGeometry args={[0.32, 0.035, 12, 48]} />
          <meshStandardMaterial color="#60f9dc" metalness={0.2} roughness={0.38} />
        </mesh>
      </group>
      <OrbitControls enableDamping={false} enablePan={false} enableZoom={false} />
    </>
  );
}

export function SpatialPreviewPanel() {
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowCapacity, setLowCapacity] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    setLowCapacity((navigator.hardwareConcurrency || 4) <= 2);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const canRender = enabled && !reducedMotion && !lowCapacity;
  const status = useMemo(() => {
    if (reducedMotion) return "Reduced motion fallback active";
    if (lowCapacity) return "Low capacity fallback active";
    return enabled ? "Spatial preview active" : "Spatial preview idle";
  }, [enabled, lowCapacity, reducedMotion]);

  return (
    <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">Spatial Layer</p>
          <h2 className="mt-2 font-serif text-3xl">Manual low-power 3D preview</h2>
          <p className="mt-2 max-w-2xl text-sm text-seis-muted">
            This canvas stays disabled until requested, respects reduced motion, avoids camera loops, and keeps the planning route usable without WebGL.
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-lg border border-seis-line px-4 py-2 text-xs uppercase tracking-[0.12em] text-seis-muted hover:border-seis-accent hover:text-seis-accent"
          onClick={() => setEnabled((value) => !value)}
          aria-pressed={enabled}
        >
          {enabled ? "Disable preview" : "Enable preview"}
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-seis-line bg-[#10131a]">
        {canRender ? (
          <div className="h-[280px]">
            <Canvas
              camera={{ position: [3, 2.2, 4.2], fov: 42 }}
              dpr={[1, 1.35]}
              frameloop="demand"
              gl={{ antialias: false, powerPreference: "low-power" }}
            >
              <Suspense fallback={null}>
                <SpatialScene />
              </Suspense>
            </Canvas>
          </div>
        ) : (
          <div className="grid min-h-[280px] place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(139,198,255,.18),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(96,249,220,.14),transparent_32%),#10131a] p-6 text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{status}</p>
              <p className="mt-2 max-w-xl text-sm text-seis-muted">
                Static fallback keeps the page calm and readable while preserving the future spatial direction.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
