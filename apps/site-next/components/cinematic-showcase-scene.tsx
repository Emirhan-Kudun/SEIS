"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const showcaseImages = [
  "/drawings/karakalem-01.jpg",
  "/drawings/renk-11.jpg",
  "/drawings/renk-04.jpg",
  "/drawings/karakalem-03.jpg"
];

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

export function CinematicShowcaseScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const stableCanvas = canvas as HTMLCanvasElement;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: stableCanvas,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 760 ? 1.2 : 1.55));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x10100e, 6, 18);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0.65, 8.2);

    const root = new THREE.Group();
    scene.add(root);

    const textureLoader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const planeGeometry = new THREE.PlaneGeometry(1.18, 1.5);
    const panels = showcaseImages.map((src, index) => {
      const texture = textureLoader.load(src);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 0.78,
        side: THREE.DoubleSide,
        transparent: true
      });
      const mesh = new THREE.Mesh(planeGeometry, material);
      const angle = index / showcaseImages.length * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 2.9, Math.sin(index * 1.4) * 0.52, Math.sin(angle) * 1.75);
      mesh.rotation.set(0.08, -angle + Math.PI * 0.5, (index - 1.5) * 0.05);
      root.add(mesh);
      return mesh;
    });

    const ringGeometry = new THREE.TorusGeometry(2.85, 0.01, 8, 160);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd6b16f,
      opacity: 0.42,
      transparent: true
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI * 0.52;
    root.add(ring);

    const gridGeometry = new THREE.BufferGeometry();
    const gridPositions: number[] = [];
    for (let i = -4; i <= 4; i += 1) {
      gridPositions.push(-4, -1.7, i * 0.42, 4, -1.7, i * 0.42);
      gridPositions.push(i * 0.7, -1.7, -2, i * 0.7, -1.7, 2);
    }
    gridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(gridPositions, 3));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x8fd5c8,
      opacity: 0.16,
      transparent: true
    });
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    root.add(grid);

    const nodeGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const statusMaterials = [0x94b88f, 0xd6b16f, 0xd98b74].map((color) => (
      new THREE.MeshBasicMaterial({ color, opacity: 0.74, transparent: true })
    ));
    const nodes = statusMaterials.map((material, index) => {
      const node = new THREE.Mesh(nodeGeometry, material);
      node.position.set(-1.2 + index * 1.2, 1.55 - index * 0.12, -0.55);
      root.add(node);
      return node;
    });

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
      const motionScale = reduceMotionQuery.matches ? 0.08 : 1;
      root.rotation.y = seconds * 0.16 * motionScale + pointerX * 0.12;
      root.rotation.x = pointerY * -0.04;
      ring.rotation.z = seconds * 0.12 * motionScale;
      grid.position.z = Math.sin(seconds * 0.22) * 0.2 * motionScale;

      panels.forEach((panel, index) => {
        panel.position.y += Math.sin(seconds * 0.42 + index) * 0.0009 * motionScale;
      });

      nodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(seconds * 1.6 + index) * 0.16 * motionScale;
        node.scale.setScalar(pulse);
      });

      camera.position.x = pointerX * 0.22;
      camera.position.y = 0.65 - pointerY * 0.12;
      camera.lookAt(0, 0, 0);
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
    }, { threshold: 0.04 });

    stableCanvas.addEventListener("pointermove", onPointerMove, { passive: true });
    observer.observe(stableCanvas);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      stableCanvas.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      planeGeometry.dispose();
      panels.forEach((panel) => disposeMaterial(panel.material));
      textures.forEach((texture) => texture.dispose());
      ringGeometry.dispose();
      ringMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      nodeGeometry.dispose();
      statusMaterials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="showcase-scene" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
