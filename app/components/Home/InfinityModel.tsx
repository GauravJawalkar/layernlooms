"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function InfinityModel() {
  const groupRef = useRef<THREE.Group>(null);
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const { width } = useThree((state) => state.viewport);

  // Generate the 3D Lemniscate of Bernoulli curve
  const { curve, geometry, glowGeometry, particlePositions, particleProgressArray } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 120;
    const a = 2.2; // Width factor
    const b = 1.0; // Height factor
    const c = 0.45; // Depth twist factor to avoid intersection

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const denom = 1 + sinT * sinT;
      
      const x = (a * cosT) / denom;
      const y = (b * sinT * cosT) / denom;
      const z = c * sinT; // Twist vertically at the crossing point

      points.push(new THREE.Vector3(x, y, z));
    }

    const path = new THREE.CatmullRomCurve3(points, true);

    // Initial position array for flow particles
    const particleCount = 40;
    const pos = new Float32Array(particleCount * 3);
    const progress: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      const startP = i / particleCount;
      progress.push(startP);
      const pt = path.getPointAt(startP);
      pos[i * 3] = pt.x;
      pos[i * 3 + 1] = pt.y;
      pos[i * 3 + 2] = pt.z;
    }

    return {
      curve: path,
      geometry: new THREE.TubeGeometry(path, 150, 0.06, 12, true),
      glowGeometry: new THREE.TubeGeometry(path, 150, 0.12, 8, true),
      particlePositions: pos,
      particleProgressArray: progress,
    };
  }, []);

  const particleProgress = useRef<number[]>(particleProgressArray);

  // Responsive scaling based on viewport width
  // Fits beautifully on both mobile (small width) and desktop
  const responsiveScale = useMemo(() => {
    return Math.min(width / 5.0, 1.1);
  }, [width]);

  useFrame((state, delta) => {
    // Smoothen delta to prevent frame skips from snapping calculations
    const d = Math.min(delta, 0.1);

    // Float, tilt and rotate the main loop
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      groupRef.current.rotation.y += d * 0.3;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.08;
    }

    // Move particles along the 3D curve
    if (particlesRef.current && curve) {
      const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < 40; i++) {
        // Increment progress (velocity is 0.05 units per frame/second)
        let p = (particleProgress.current[i] + d * 0.04) % 1.0;
        particleProgress.current[i] = p;

        const pt = curve.getPointAt(p);
        posAttr.setXYZ(i, pt.x, pt.y, pt.z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={[responsiveScale, responsiveScale, responsiveScale]}>
      {/* Sleek metallic main loop */}
      <mesh ref={mainMeshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#e4e4e7" // zinc-200 for a brighter silver/chrome appearance
          metalness={0.5}  // balanced metalness so it reacts beautifully to direct lights without going pitch black
          roughness={0.2}
          emissive="#27272a"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Subtle outer glowing shell/wireframe */}
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating particles flowing along the loop */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={40}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.16}
          sizeAttenuation={true}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
