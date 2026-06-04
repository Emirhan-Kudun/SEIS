"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";

import type { LocalizedDictionary, SoftwareLanguageItem } from "@seis/content";

type MotionLanguageStageProps = {
  dictionary: LocalizedDictionary;
  languages: SoftwareLanguageItem[];
};

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

export function MotionLanguageStage({ dictionary, languages }: MotionLanguageStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fallback, setFallback] = useState(false);
  const featuredLanguages = useMemo(() => languages.slice(0, 12), [languages]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const stableCanvas = canvas as HTMLCanvasElement;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      setFallback(true);
      return undefined;
    }

    const contextAttributes = {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
      powerPreference: "low-power" as WebGLPowerPreference
    };
    const webGlContext = stableCanvas.getContext("webgl2", contextAttributes)
      || stableCanvas.getContext("webgl", contextAttributes);

    if (!webGlContext) {
      setFallback(true);
      return undefined;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: stableCanvas,
        context: webGlContext as WebGLRenderingContext,
        preserveDrawingBuffer: false,
        powerPreference: "low-power"
      });
    } catch {
      setFallback(true);
      return undefined;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1 : 1.25));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090908, 0.05);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(0, 0.4, 9.8);

    const root = new THREE.Group();
    const orbit = new THREE.Group();
    scene.add(root, orbit);

    const coreGeometry = new THREE.IcosahedronGeometry(1.08, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6b16f,
      emissive: 0x5f3d13,
      emissiveIntensity: 0.35,
      metalness: 0.72,
      roughness: 0.24
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);

    const boxGeometry = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    const activeMaterial = new THREE.MeshStandardMaterial({
      color: 0x8fd5c8,
      emissive: 0x1c6a61,
      emissiveIntensity: 0.2,
      metalness: 0.45,
      roughness: 0.34
    });
    const plannedMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0d79f,
      emissive: 0x6d4a1d,
      emissiveIntensity: 0.18,
      metalness: 0.4,
      roughness: 0.38
    });
    const satellites = featuredLanguages.map((language, index) => {
      const angle = index / featuredLanguages.length * Math.PI * 2;
      const mesh = new THREE.Mesh(boxGeometry, language.status === "active" ? activeMaterial : plannedMaterial);
      mesh.position.set(Math.cos(angle) * 3.7, Math.sin(index * 0.82) * 1.05, Math.sin(angle) * 2.1);
      mesh.rotation.set(index * 0.2, angle, index * 0.12);
      mesh.scale.setScalar(language.status === "active" ? 0.86 : 0.68);
      orbit.add(mesh);
      return mesh;
    });

    const ringGeometry = new THREE.TorusGeometry(3.72, 0.01, 8, 180);
    const ringMaterials = [0xd6b16f, 0x8fd5c8, 0xf6e8c9].map((color, index) => (
      new THREE.MeshBasicMaterial({ color, opacity: 0.34 - index * 0.08, transparent: true })
    ));
    const rings = ringMaterials.map((material, index) => {
      const ring = new THREE.Mesh(ringGeometry, material);
      ring.rotation.set(Math.PI * (0.46 + index * 0.08), index * 0.24, index * 0.4);
      ring.scale.setScalar(1 + index * 0.16);
      root.add(ring);
      return ring;
    });

    const lights = [
      new THREE.PointLight(0xf3ce8a, 4.2, 16),
      new THREE.PointLight(0x8fd5c8, 2.3, 16),
      new THREE.AmbientLight(0xc7ad78, 0.36)
    ];
    lights[0].position.set(3.4, 2.2, 4);
    lights[1].position.set(-3.6, -0.8, 3.2);
    lights.forEach((light) => scene.add(light));

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let isVisible = true;

    function resize() {
      const width = stableCanvas.clientWidth;
      const height = stableCanvas.clientHeight;
      const ratio = renderer.getPixelRatio();
      if (stableCanvas.width !== Math.floor(width * ratio) || stableCanvas.height !== Math.floor(height * ratio)) {
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      }
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = stableCanvas.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
    }

    function render(time: number) {
      resize();
      const seconds = time * 0.001;
      root.rotation.y = seconds * 0.16 + pointerX * 0.12;
      root.rotation.x = pointerY * -0.04 + Math.sin(seconds * 0.22) * 0.03;
      orbit.rotation.y = -seconds * 0.2;
      core.rotation.y = seconds * 0.34;
      core.rotation.x = Math.sin(seconds * 0.25) * 0.12;
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0015 + index * 0.0005;
      });
      satellites.forEach((satellite, index) => {
        satellite.rotation.x += 0.004 + index * 0.0002;
        satellite.rotation.y += 0.003;
      });
      renderer.render(scene, camera);

      if (isVisible) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible && frame === 0) {
        frame = window.requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });

    stableCanvas.addEventListener("pointermove", onPointerMove, { passive: true });
    observer.observe(stableCanvas);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      stableCanvas.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      coreGeometry.dispose();
      coreMaterial.dispose();
      boxGeometry.dispose();
      activeMaterial.dispose();
      plannedMaterial.dispose();
      ringGeometry.dispose();
      ringMaterials.forEach((material) => material.dispose());
      rings.forEach((ring) => disposeMaterial(ring.material));
      renderer.dispose();
    };
  }, [featuredLanguages]);

  return (
    <section className="motion-language-stage" aria-labelledby="motion-stage-title">
      <div className="motion-stage-copy">
        <p className="eyebrow">{dictionary.motionEyebrow}</p>
        <h1 id="motion-stage-title">{dictionary.motionTitle}</h1>
        <p>{dictionary.motionLead}</p>
      </div>
      <div className="motion-stage-scene" aria-label={dictionary.motionSceneLabel}>
        {fallback ? (
          <div className="motion-stage-fallback" role="presentation">
            {featuredLanguages.map((language, index) => (
              <span data-status={language.status} key={language.id} style={{ "--motion-index": index } as CSSProperties & Record<"--motion-index", number>}>
                {language.name}
              </span>
            ))}
          </div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
      <div className="motion-language-orbit" aria-label={dictionary.motionStackTitle}>
        {featuredLanguages.map((language) => (
          <article data-status={language.status} key={language.id}>
            <span>{language.layer}</span>
            <strong>{language.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
