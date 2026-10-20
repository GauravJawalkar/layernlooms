"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import EarthModel from "./EarthModel";

function RenderWhileVisible() {
  const { gl, invalidate } = useThree();
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReducedMotion(media.matches);
      invalidate();
    };
    const updateVisibility = () => {
      if (!document.hidden) invalidate();
    };
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) invalidate();
    });
    observer.observe(gl.domElement);
    invalidate();

    return () => {
      media.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, [gl, invalidate]);

  useFrame(() => {
    if (visible && !reducedMotion && !document.hidden) invalidate();
  });

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 20 }}
      dpr={[1, 1.25]}
      frameloop="demand"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 5, 5]} intensity={2.2} />
      <directionalLight position={[-6, -3, -5]} intensity={0.45} />

      <EarthModel />
      <RenderWhileVisible />
    </Canvas>
  );
}
