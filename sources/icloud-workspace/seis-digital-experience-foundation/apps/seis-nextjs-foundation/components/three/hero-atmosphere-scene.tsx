"use client";

import { Canvas } from "@react-three/fiber";

function AtmosphereGeometry() {
  return (
    <group rotation={[-0.22, 0.34, 0.08]}>
      <mesh position={[-1.1, 0.18, 0]} scale={[1.9, 0.12, 1.9]}>
        <torusGeometry args={[1.1, 0.016, 16, 96]} />
        <meshStandardMaterial color="#8bc6ff" emissive="#1f3d5c" roughness={0.4} metalness={0.25} />
      </mesh>
      <mesh position={[0.18, 0, 0]} scale={[1.4, 1.4, 1.4]}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial color="#d8ecff" emissive="#2b4356" roughness={0.62} metalness={0.18} />
      </mesh>
      <mesh position={[1.2, -0.28, -0.36]} scale={[0.76, 0.76, 0.76]}>
        <octahedronGeometry args={[0.46, 0]} />
        <meshStandardMaterial color="#9ce6d8" emissive="#173f3a" roughness={0.72} metalness={0.12} />
      </mesh>
    </group>
  );
}

export function HeroAtmosphereScene() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.1, 4.1], fov: 36 }}
      dpr={[1, 1.35]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[2.5, 2, 3]} intensity={1.1} />
      <pointLight position={[-2, -1, 2]} intensity={0.8} color="#8bc6ff" />
      <AtmosphereGeometry />
    </Canvas>
  );
}
