"use client";

import { memo, useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { loadEarthTextures } from "@/app/lib/texture-utils";
import type { EarthTextures, Quality } from "@/app/lib/texture-utils";

const SEGS: Record<Quality, number> = { low: 8, medium: 16, high: 24 };
const CLOUD_SEGS: Record<Quality, number> = { low: 6, medium: 10, high: 16 };
const GLOW_SEGS: Record<Quality, number> = { low: 6, medium: 8, high: 12 };
const CLOUD_SCALE: Record<Quality, number> = { low: 1.004, medium: 1.006, high: 1.008 };

function useQuality(): Quality {
  return useMemo(() => {
    if (typeof window === "undefined") return "medium";
    const mem = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency || 4;
    if ((mem && mem < 2) || cores <= 2) return "low";
    if ((mem && mem < 4) || cores <= 4) return "medium";
    return "high";
  }, []);
}

const EarthModel = memo(function EarthModel() {
  const quality = useQuality();

  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { width, height } = useThree((state) => state.viewport);
  const [textures, setTextures] = useState<EarthTextures | null>(null);
  const [error, setError] = useState(false);
  const ready = useRef(false);

  const radius = useMemo(() => Math.min(width * 0.55, 3.0), [width]);
  const baseY = useMemo(() => -height / 2 - radius * 0.38, [height, radius]);

  const eSegs = SEGS[quality];
  const cSegs = CLOUD_SEGS[quality];
  const gSegs = GLOW_SEGS[quality];
  const cScale = CLOUD_SCALE[quality];

  const normalScale = useMemo(() => new THREE.Vector2(0.4, 0.4), []);

  useEffect(() => {
    let active = true;
    const ctrl = new AbortController();

    (async () => {
      try {
        const tex = await loadEarthTextures(quality, ctrl.signal);
        if (!active) return;
        setTextures(tex);
        ready.current = true;
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Earth textures failed:", err);
        if (active) { setError(true); ready.current = true; }
      }
    })();

    return () => { active = false; ctrl.abort(); };
  }, [quality]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);

    if (groupRef.current) {
      const target = ready.current ? 1 : 0;
      const s = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(s + (target - s) * 0.03);
      groupRef.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }

    if (earthRef.current) earthRef.current.rotation.y += d * 0.025;
    if (cloudsRef.current) cloudsRef.current.rotation.y += d * 0.032;
    if (glowRef.current) glowRef.current.rotation.y += d * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, baseY, 0]} scale={[0, 0, 0]}>
      <mesh ref={earthRef} rotation={[0.41, 0, 0]}>
        <sphereGeometry args={[radius, eSegs, eSegs]} />
        {error || !textures ? (
          <meshStandardMaterial color="#09090b" roughness={0.8} metalness={0.1} />
        ) : (
          <meshStandardMaterial
            map={textures.map}
            normalMap={textures.normalMap}
            normalScale={normalScale}
            roughnessMap={textures.roughnessMap}
            metalness={0.25}
            emissiveMap={textures.lightsMap}
            emissive="#ffffff"
            emissiveIntensity={2.5}
          />
        )}
      </mesh>

      {textures && (
        <mesh ref={cloudsRef} scale={[cScale, cScale, cScale]} rotation={[0.41, 0, 0]}>
          <sphereGeometry args={[radius, cSegs, cSegs]} />
          <meshStandardMaterial
            map={textures.cloudsMap}
            transparent
            depthWrite={false}
            opacity={0.35}
            blending={THREE.NormalBlending}
          />
        </mesh>
      )}

      <mesh ref={glowRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[radius, gSegs, gSegs]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
});

export default EarthModel;
