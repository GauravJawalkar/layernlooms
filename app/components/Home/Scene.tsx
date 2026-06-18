"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import EarthModel from "./EarthModel";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 20 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ pointerEvents: "none" }}
    >
      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 5, 5]} intensity={2.2} />
      <directionalLight position={[-6, -3, -5]} intensity={0.45} />

      <EarthModel />
    </Canvas>
  );
}
