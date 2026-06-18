"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import EarthModel from "./EarthModel";
import ParticleField from "./ParticleField";

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight 
        castShadow 
        position={[6, 5, 5]} 
        intensity={2.2} 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-6, -3, -5]} intensity={0.45} />
      <Suspense fallback={null}>
        <EarthModel />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
