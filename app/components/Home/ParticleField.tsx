"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

function createDeterministicPositions(count: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const s1 = Math.sin(i * 12.9898 + 1) * 43758.5453;
    const s2 = Math.sin(i * 78.233 + 2) * 43758.5453;
    const s3 = Math.sin(i * 45.164 + 3) * 43758.5453;
    pos[i * 3] = (s1 - Math.floor(s1) - 0.5) * 20;
    pos[i * 3 + 1] = (s2 - Math.floor(s2) - 0.5) * 20;
    pos[i * 3 + 2] = (s3 - Math.floor(s3) - 0.5) * 10 - 3;
  }
  return pos;
}

const STATIC_POSITIONS = createDeterministicPositions(PARTICLE_COUNT);

export default function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = STATIC_POSITIONS;

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

