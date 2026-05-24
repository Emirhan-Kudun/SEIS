"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const galleryTextures = [
  "/drawings/renk-11.jpg",
  "/drawings/karakalem-02.jpg",
  "/drawings/renk-05.jpg",
  "/drawings/karakalem-03.jpg",
  "/drawings/renk-01.jpg"
];

function buildRibbonMaterial(color: string, opacity: number) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.2,
    metalness: 0.62,
    opacity,
    roughness: 0.26,
    side: THREE.DoubleSide,
    transparent: true
  });
}

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

export function CinematicHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const targetCanvas = canvasRef.current;
    if (!targetCanvas) return undefined;
    const stableCanvas = targetCanvas as HTMLCanvasElement;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090908, 0.045);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: stableCanvas,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.25 : 1.65));

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 90);
    camera.position.set(0.2, 0.48, 9.6);

    const studio = new THREE.Group();
    const gallery = new THREE.Group();
    const constellation = new THREE.Group();
    scene.add(studio, gallery, constellation);

    const coreGeometry = new THREE.IcosahedronGeometry(1.34, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8b775,
      emissive: 0x5a3e16,
      emissiveIntensity: 0.34,
      metalness: 0.74,
      roughness: 0.2
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.scale.set(1.05, 0.72, 1.05);
    studio.add(core);

    const innerGeometry = new THREE.OctahedronGeometry(0.62, 2);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xefe1bf,
      emissive: 0xb87928,
      emissiveIntensity: 0.18,
      metalness: 0.68,
      roughness: 0.18,
      transparent: true,
      opacity: 0.76
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    studio.add(innerCore);

    const ringGeometry = new THREE.TorusGeometry(2.18, 0.012, 12, 180);
    const rings = [0, 1, 2, 3].map((index) => {
      const ring = new THREE.Mesh(
        ringGeometry,
        buildRibbonMaterial(index % 2 === 0 ? "#d6b16f" : "#f0d79f", 0.62 - index * 0.08)
      );
      ring.rotation.set(index * 0.74, index * 0.58, index * 0.38);
      ring.scale.setScalar(1 + index * 0.29);
      studio.add(ring);
      return ring;
    });

    const textureLoader = new THREE.TextureLoader();
    const cardGeometry = new THREE.PlaneGeometry(1.05, 1.36, 1, 1);
    const loadedTextures: THREE.Texture[] = [];
    const cards = galleryTextures.map((src, index) => {
      const texture = textureLoader.load(src);
      texture.colorSpace = THREE.SRGBColorSpace;
      loadedTextures.push(texture);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 0.62,
        side: THREE.DoubleSide,
        transparent: true
      });
      const card = new THREE.Mesh(cardGeometry, material);
      const angle = index / galleryTextures.length * Math.PI * 2;
      card.position.set(Math.cos(angle) * 3.9, (index - 2) * 0.36, Math.sin(angle) * 1.15 - 0.35);
      card.rotation.set(0.16 * Math.sin(angle), -angle + Math.PI * 0.5, 0.05 * index);
      gallery.add(card);
      return card;
    });

    const nodeGeometry = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x8fd5c8, transparent: true, opacity: 0.72 });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8fd5c8, transparent: true, opacity: 0.22 });
    const nodes: THREE.Mesh[] = [];
    const linePositions: number[] = [];
    for (let index = 0; index < 18; index += 1) {
      const angle = index / 18 * Math.PI * 2;
      const radius = 4.6 + (index % 3) * 0.34;
      const y = Math.sin(index * 1.7) * 1.34;
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * 2.2 - 1.8);
      constellation.add(node);
      nodes.push(node);

      if (index > 0) {
        const prev = nodes[index - 1].position;
        linePositions.push(prev.x, prev.y, prev.z, node.position.x, node.position.y, node.position.z);
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const connectorLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellation.add(connectorLines);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 3.4 + Math.random() * 6.6;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 4.8;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = height;
      positions[index * 3 + 2] = Math.sin(angle) * radius - 2.2;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xe5c27b,
        opacity: 0.34,
        size: 0.023,
        transparent: true
      })
    );
    scene.add(particles);

    const keyLight = new THREE.PointLight(0xf3ce8a, 6.4, 18);
    keyLight.position.set(3.2, 2.6, 3.8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x76d7c4, 2.2, 18);
    rimLight.position.set(-3.8, -0.9, 3.4);
    scene.add(rimLight);

    const ambient = new THREE.AmbientLight(0xc7ad78, 0.42);
    scene.add(ambient);

    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollProgress = 0;
    let isVisible = true;

    function resizeRendererToDisplaySize() {
      const width = stableCanvas.clientWidth;
      const height = stableCanvas.clientHeight;
      const ratio = renderer.getPixelRatio();
      const needsResize = stableCanvas.width !== Math.floor(width * ratio)
        || stableCanvas.height !== Math.floor(height * ratio);

      if (needsResize) {
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      }
    }

    function updateScrollProgress() {
      const bounds = stableCanvas.getBoundingClientRect();
      const viewport = Math.max(window.innerHeight, 1);
      scrollProgress = Math.min(1, Math.max(0, (viewport - bounds.top) / (viewport + Math.max(bounds.height, 1))));
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = stableCanvas.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
    }

    function render(time: number) {
      const reduceMotion = reduceMotionQuery.matches;
      const seconds = time * 0.001;
      resizeRendererToDisplaySize();

      const motionScale = reduceMotion ? 0.08 : 1;
      const depthShift = reduceMotion ? 0 : scrollProgress;

      camera.position.x = 0.2 + pointerX * 0.18;
      camera.position.y = 0.48 - pointerY * 0.12 + depthShift * 0.34;
      camera.position.z = 9.6 - depthShift * 1.28;
      camera.lookAt(0, 0.04, 0);

      studio.rotation.y = seconds * 0.18 * motionScale + pointerX * 0.1 + depthShift * 0.28;
      studio.rotation.x = Math.sin(seconds * 0.22) * 0.09 * motionScale - pointerY * 0.04;
      gallery.rotation.y = -seconds * 0.07 * motionScale - depthShift * 0.38;
      gallery.position.y = Math.sin(seconds * 0.16) * 0.1 * motionScale;
      constellation.rotation.y = seconds * 0.05 * motionScale + depthShift * 0.46;
      particles.rotation.y = seconds * 0.024 * motionScale;

      core.rotation.y = seconds * 0.26 * motionScale;
      innerCore.rotation.x = -seconds * 0.34 * motionScale;
      innerCore.rotation.z = seconds * 0.24 * motionScale;

      rings.forEach((ring, index) => {
        ring.rotation.z += (0.0018 + index * 0.0007) * motionScale;
        ring.rotation.x += (0.001 + index * 0.0005) * motionScale;
      });

      cards.forEach((card, index) => {
        card.position.y += Math.sin(seconds * 0.34 + index) * 0.0008 * motionScale;
      });

      renderer.render(scene, camera);
      if (isVisible) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible && animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }, { threshold: 0.02 });

    stableCanvas.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    observer.observe(stableCanvas);
    updateScrollProgress();
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      stableCanvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      observer.disconnect();
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      rings.forEach((ring) => disposeMaterial(ring.material));
      cardGeometry.dispose();
      cards.forEach((card) => disposeMaterial(card.material));
      loadedTextures.forEach((texture) => texture.dispose());
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeometry.dispose();
      disposeMaterial(particles.material);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cinematic-scene" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="cinematic-vignette" />
    </div>
  );
}
