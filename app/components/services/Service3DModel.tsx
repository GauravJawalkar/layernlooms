"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  ContactShadows,
  RoundedBox,
  MeshDistortMaterial,
  useCursor,
} from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shared black & white materials                                      */
/* NOTE: module-level materials are intentionally never disposed -     */
/* they are reused by every services canvas on the page.               */
/* ------------------------------------------------------------------ */
const M = {
  white: new THREE.MeshPhysicalMaterial({
    color: "#f2f2f2",
    metalness: 0.1,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }),
  black: new THREE.MeshPhysicalMaterial({
    color: "#0d0d0d",
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  }),
  chrome: new THREE.MeshStandardMaterial({
    color: "#d0d0d0",
    metalness: 1,
    roughness: 0.12,
  }),
  glow: new THREE.MeshBasicMaterial({ color: "#ffffff" }),
  screen: new THREE.MeshStandardMaterial({
    color: "#050505",
    roughness: 0.05,
    metalness: 0.4,
  }),
};

type V3 = [number, number, number];

function RB({
  size,
  pos = [0, 0, 0],
  rot,
  mat,
  r = 0.06,
}: {
  size: V3;
  pos?: V3;
  rot?: V3;
  mat: THREE.Material;
  r?: number;
}) {
  return (
    <RoundedBox
      args={size}
      radius={r}
      smoothness={4}
      position={pos}
      rotation={rot}
      material={mat}
    />
  );
}

const lerp = THREE.MathUtils.lerp;

/* ------------------------------------------------------------------ */
/* Reusable effect: expanding fading ring                              */
/* ------------------------------------------------------------------ */
function Ripple({
  offset = 0,
  speed = 0.5,
  rotation = [-Math.PI / 2, 0, 0],
  position = [0, 0, 0],
  max = 2.2,
  color = "#ffffff",
}: {
  offset?: number;
  speed?: number;
  rotation?: V3;
  position?: V3;
  max?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    [color]
  );
  useEffect(() => () => mat.dispose(), [mat]);
  useFrame(({ clock }) => {
    const p = (clock.elapsedTime * speed + offset) % 1;
    if (ref.current) ref.current.scale.setScalar(0.2 + p * max);
    mat.opacity = (1 - p) * 0.8;
  });
  return (
    <mesh ref={ref} rotation={rotation} position={position} material={mat}>
      <torusGeometry args={[1, 0.02, 8, 48]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Web development: browser window, live cursor, wireframe globe       */
/* ------------------------------------------------------------------ */
function Browser() {
  const cursor = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (cursor.current) {
      cursor.current.position.x = Math.sin(t * 1.1) * 0.8;
      cursor.current.position.y = Math.cos(t * 0.8) * 0.35 - 0.1;
    }
    bars.current?.children.forEach((c, i) => {
      c.scale.x = 0.65 + 0.35 * Math.sin(t * 1.4 + i * 1.3);
    });
    if (globe.current) globe.current.rotation.y = t * 0.6;
  });

  return (
    <group rotation={[0, -0.35, 0]}>
      <RB size={[0.02 + 3, 2.1, 0.14]} mat={M.white} r={0.12} />
      <RB size={[3.02, 0.34, 0.16]} pos={[0, 0.88, 0]} mat={M.black} r={0.07} />
      {[-1.25, -1.1, -0.95].map((x, i) => (
        <mesh key={i} position={[x, 0.88, 0.1]} material={M.white}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>
      ))}
      <RB size={[1.4, 0.13, 0.03]} pos={[0.5, 0.88, 0.09]} mat={M.chrome} r={0.01} />
      <RB size={[1.3, 0.85, 0.05]} pos={[-0.65, 0.15, 0.09]} mat={M.black} r={0.05} />
      <group ref={bars} position={[0.7, 0.15, 0.09]}>
        {[0.3, 0.05, -0.2].map((y, i) => (
          <RB key={i} size={[1.1, 0.12, 0.03]} pos={[0, y, 0]} mat={i === 0 ? M.black : M.chrome} r={0.01} />
        ))}
      </group>
      {[-0.95, -0.32, 0.31].map((x, i) => (
        <RB key={i} size={[0.55, 0.5, 0.05]} pos={[x + 0.3, -0.65, 0.09]} mat={i === 1 ? M.black : M.chrome} r={0.05} />
      ))}
      <group ref={cursor} position={[0, 0, 0.5]}>
        <mesh material={M.black} rotation={[0, 0, 0.5]}>
          <coneGeometry args={[0.13, 0.34, 3]} />
        </mesh>
      </group>
      <mesh ref={globe} position={[1.75, 1.05, -0.3]}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshBasicMaterial color="#8a8a8a" wireframe />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: real smartphone with live screen and notifications          */
/* ------------------------------------------------------------------ */
function Phone() {
  const ref = useRef<THREE.Group>(null);
  const ui = useRef<THREE.Group>(null);
  const notes = useRef<THREE.Group>(null);
  const progress = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.6) * 0.55;
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.07;
    }
    ui.current?.children.forEach((c, i) => {
      c.scale.x = 0.7 + 0.3 * Math.sin(t * 1.6 + i);
    });
    notes.current?.children.forEach((c, i) => {
      c.position.y = (i ? -0.5 : 0.5) + Math.sin(t * 1.5 + i * 2) * 0.08;
    });
    if (progress.current) {
      const p = 0.15 + 0.85 * ((t * 0.3) % 1);
      progress.current.scale.x = p;
      progress.current.position.x = -0.48 + 0.48 * p;
    }
  });

  return (
    <group ref={ref} scale={0.92}>
      <RB size={[1.4, 2.8, 0.17]} mat={M.black} r={0.22} />
      <RB size={[1.3, 2.7, 0.02]} pos={[0, 0, 0.09]} mat={M.chrome} r={0.17} />
      <RB size={[1.26, 2.66, 0.02]} pos={[0, 0, 0.1]} mat={M.screen} r={0.15} />
      <RB size={[0.36, 0.09, 0.02]} pos={[0, 1.2, 0.115]} mat={M.chrome} r={0.04} />
      <RB size={[1.0, 0.55, 0.015]} pos={[0, 0.7, 0.115]} mat={M.white} r={0.07} />
      <mesh material={M.glow} position={[0, 0.7, 0.13]}>
        <circleGeometry args={[0.13, 24]} />
      </mesh>
      <group ref={ui} position={[0, 0.1, 0.115]}>
        {[0.15, -0.1, -0.35].map((y, i) => (
          <RB key={i} size={[1.0, 0.16, 0.015]} pos={[0, y, 0]} mat={i === 1 ? M.chrome : M.white} r={0.05} />
        ))}
      </group>
      <RB size={[1.0, 0.05, 0.01]} pos={[0, -0.72, 0.115]} mat={M.chrome} r={0.01} />
      <mesh ref={progress} position={[0, -0.72, 0.125]} material={M.white}>
        <boxGeometry args={[1.0, 0.05, 0.01]} />
      </mesh>
      {[-0.36, 0, 0.36].map((x, i) => (
        <RB key={i} size={[0.26, 0.26, 0.015]} pos={[x, -1.0, 0.115]} mat={i === 1 ? M.white : M.chrome} r={0.07} />
      ))}
      <RB size={[0.4, 0.03, 0.01]} pos={[0, -1.25, 0.115]} mat={M.white} r={0.01} />
      <RB size={[0.03, 0.45, 0.06]} pos={[0.71, 0.4, 0]} mat={M.chrome} r={0.01} />
      <RB size={[0.03, 0.25, 0.06]} pos={[-0.71, 0.65, 0]} mat={M.chrome} r={0.01} />
      <RB size={[0.03, 0.25, 0.06]} pos={[-0.71, 0.3, 0]} mat={M.chrome} r={0.01} />
      {/* back camera */}
      <RB size={[0.58, 0.58, 0.05]} pos={[-0.3, 0.95, -0.11]} mat={M.chrome} r={0.12} />
      {[[-0.42, 1.09], [-0.18, 1.09], [-0.3, 0.83]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -0.15]} rotation={[Math.PI / 2, 0, 0]} material={M.black}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
        </mesh>
      ))}
      {/* floating notifications */}
      <group ref={notes}>
        <RB size={[0.9, 0.24, 0.04]} pos={[0.85, 0.5, 0.55]} mat={M.white} r={0.08} />
        <RB size={[0.8, 0.24, 0.04]} pos={[-0.85, -0.5, 0.55]} mat={M.black} r={0.08} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* AI / ML: neural network with firing nodes                           */
/* ------------------------------------------------------------------ */
function Neural() {
  const nodes = useRef<THREE.Group>(null);
  const pts = useMemo(() => {
    const a: THREE.Vector3[] = [];
    const n = 26;
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      const k = 1.4 + ((i * 37) % 10) / 25;
      a.push(new THREE.Vector3(Math.cos(th) * r * k, y * k, Math.sin(th) * r * k));
    }
    return a;
  }, []);
  const linePos = useMemo(() => {
    const arr: number[] = [];
    pts.forEach((p, i) =>
      pts.forEach((q, j) => {
        if (j > i && p.distanceTo(q) < 1.35) arr.push(p.x, p.y, p.z, q.x, q.y, q.z);
      })
    );
    return new Float32Array(arr);
  }, [pts]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    nodes.current?.children.forEach((c, i) => {
      const pulse = Math.max(0, Math.sin(t * 2.2 - i * 0.7));
      c.scale.setScalar(1 + pulse * 0.9);
    });
  });

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.7, 3]} />
        <MeshDistortMaterial color="#0d0d0d" distort={0.45} speed={2.5} roughness={0.15} metalness={0.9} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8a8a8a" transparent opacity={0.7} />
      </lineSegments>
      <group ref={nodes}>
        {pts.map((p, i) => (
          <mesh key={i} position={p} material={i % 2 ? M.black : M.white}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Cloud: soft cloud, data packets moving up and down, base ripples    */
/* ------------------------------------------------------------------ */
function Cloud() {
  const cloud = useRef<THREE.Group>(null);
  const packets = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (cloud.current) cloud.current.position.y = 0.9 + Math.sin(t * 1.2) * 0.08;
    packets.current?.children.forEach((c, i) => {
      const up = i % 2 === 0;
      const p = (t * 0.45 + i / 6) % 1;
      c.position.y = up ? -1.3 + p * 1.9 : 0.6 - p * 1.9;
      c.scale.setScalar(Math.sin(p * Math.PI));
    });
  });

  return (
    <group>
      <group ref={cloud}>
        {[
          [-0.8, -0.1, 0.55],
          [-0.2, 0.25, 0.75],
          [0.5, 0.15, 0.65],
          [1.0, -0.15, 0.5],
          [0.1, -0.2, 0.7],
        ].map(([x, y, r], i) => (
          <mesh key={i} position={[x, y, 0]} material={M.white}>
            <sphereGeometry args={[r, 24, 24]} />
          </mesh>
        ))}
      </group>
      <group ref={packets}>
        {[-0.9, -0.5, -0.1, 0.3, 0.7, 1.1].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.5]} material={i % 2 ? M.white : M.black}>
            <boxGeometry args={[0.13, 0.13, 0.13]} />
          </mesh>
        ))}
      </group>
      <mesh position={[0.1, -1.55, 0]} material={M.black}>
        <cylinderGeometry args={[1.5, 1.6, 0.14, 48]} />
      </mesh>
      <Ripple position={[0.1, -1.45, 0]} offset={0} speed={0.35} max={1.6} />
      <Ripple position={[0.1, -1.45, 0]} offset={0.5} speed={0.35} max={1.6} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* UI / UX: exploded artboards with a bezier curve drawing itself      */
/* ------------------------------------------------------------------ */
function Design() {
  const layers = useRef<THREE.Group>(null);
  const pen = useRef<THREE.Mesh>(null);
  const anchors = useRef<THREE.Group>(null);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.8, -0.9, 0.08),
        new THREE.Vector3(-0.3, 0.1, 0.08),
        new THREE.Vector3(0.3, -0.5, 0.08),
        new THREE.Vector3(0.8, 0.6, 0.08),
      ]),
    []
  );
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.035, 8, false), [curve]);
  useEffect(() => () => tube.dispose(), [tube]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    layers.current?.children.forEach((c, i) => {
      c.position.z = (i - 1) * (0.55 + 0.2 * Math.sin(t * 0.8));
    });
    const p = Math.min(1, (t * 0.35) % 1.5);
    if (pen.current) {
      const total = tube.index ? tube.index.count : 0;
      tube.setDrawRange(0, Math.floor((p * total) / 3) * 3);
    }
    anchors.current?.children.forEach((c, i) => {
      const target = p >= i / 3 - 0.01 ? 1 : 0;
      c.scale.setScalar(lerp(c.scale.x, target, 0.15));
    });
  });

  return (
    <group rotation={[0, -0.5, 0]}>
      <group ref={layers}>
        <group>
          <RB size={[2.2, 2.9, 0.06]} mat={M.black} r={0.1} />
        </group>
        <group>
          <RB size={[2.2, 2.9, 0.06]} mat={M.chrome} r={0.1} />
        </group>
        <group>
          <RB size={[2.2, 2.9, 0.06]} mat={M.white} r={0.1} />
          <mesh position={[-0.55, 1.0, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={M.black}>
            <cylinderGeometry args={[0.28, 0.28, 0.03, 24]} />
          </mesh>
          <RB size={[0.9, 0.12, 0.03]} pos={[0.3, 1.05, 0.04]} mat={M.black} r={0.01} />
          <RB size={[0.6, 0.09, 0.03]} pos={[0.15, 0.85, 0.04]} mat={M.chrome} r={0.01} />
          <mesh ref={pen} geometry={tube} material={M.black} />
          <group ref={anchors}>
            {curve.points.map((p, i) => (
              <mesh key={i} position={p} material={M.white} scale={0}>
                <boxGeometry args={[0.12, 0.12, 0.05]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Digital marketing: megaphone with sound waves                       */
/* ------------------------------------------------------------------ */
function Megaphone() {
  const wave = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);

  const waveMats = useMemo(
    () =>
      [0, 1, 2].map(
        () =>
          new THREE.MeshBasicMaterial({
            color: "#ffffff",
            transparent: true,
            depthWrite: false,
          })
      ),
    []
  );
  useEffect(() => () => waveMats.forEach((m) => m.dispose()), [waveMats]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (body.current) {
      const kick = Math.max(0, Math.sin(t * 3)) * 0.05;
      body.current.scale.setScalar(1 + kick);
    }
    wave.current?.children.forEach((c, i) => {
      const p = (t * 0.55 + i / 3) % 1;
      c.position.x = 1.0 + p * 1.9;
      c.scale.setScalar(0.35 + p * 0.9);
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.85;
    });
  });

  return (
    <group position={[-0.9, 0, 0]}>
      <group ref={body}>
        <mesh material={M.white} rotation={[0, 0, -Math.PI / 2]} position={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.35, 1.5, 48]} />
        </mesh>
        <mesh material={M.black} rotation={[0, Math.PI / 2, 0]} position={[0.96, 0, 0]}>
          <torusGeometry args={[0.95, 0.07, 12, 48]} />
        </mesh>
        <mesh material={M.chrome} rotation={[0, 0, -Math.PI / 2]} position={[-0.75, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.3, 0.5, 32]} />
        </mesh>
        <RB size={[0.32, 0.7, 0.28]} pos={[-0.15, -0.75, 0]} mat={M.black} r={0.1} />
      </group>
      <group ref={wave}>
        {waveMats.map((m, i) => (
          <mesh key={i} rotation={[0, Math.PI / 2, 0]} material={m}>
            <torusGeometry args={[1, 0.03, 8, 48]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* SaaS analytics: growing bars and a trend line with a live marker    */
/* ------------------------------------------------------------------ */
const HEIGHTS = [0.8, 1.2, 1.0, 1.7, 2.3];

function Analytics() {
  const bars = useRef<THREE.Group>(null);
  const orb = useRef<THREE.Mesh>(null);
  const intro = useRef(0);
  const heights = HEIGHTS;

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        heights.map((h, i) => new THREE.Vector3(-1.2 + i * 0.6, -1.0 + h + 0.3, 0.3))
      ),
    [heights]
  );
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.03, 8, false), [curve]);
  useEffect(() => () => tube.dispose(), [tube]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    intro.current = lerp(intro.current, 1, 1 - Math.exp(-delta * 2));
    bars.current?.children.forEach((c, i) => {
      const grow = THREE.MathUtils.clamp(intro.current * 1.6 - i * 0.12, 0, 1);
      c.scale.y = Math.max(0.001, heights[i] * grow * (0.94 + 0.06 * Math.sin(t * 1.5 + i)));
    });
    if (orb.current) orb.current.position.copy(curve.getPoint((t * 0.25) % 1));
  });

  return (
    <group>
      <RB size={[3.4, 0.16, 1.2]} pos={[0, -1.08, 0]} mat={M.black} r={0.06} />
      <group ref={bars}>
        {heights.map((_, i) => (
          <group key={i} position={[-1.2 + i * 0.6, -1.0, 0]}>
            <mesh position={[0, 0.5, 0]} material={i % 2 ? M.black : M.white}>
              <boxGeometry args={[0.4, 1, 0.5]} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh geometry={tube} material={M.chrome} />
      <mesh ref={orb} material={M.glow}>
        <sphereGeometry args={[0.1, 16, 16]} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* E-commerce: shopping bag with orbiting parcels                      */
/* ------------------------------------------------------------------ */
function Bag() {
  const bag = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (bag.current) bag.current.scale.y = 1 + Math.sin(t * 2) * 0.025;
    orbit.current?.children.forEach((c, i) => {
      const a = t * 0.9 + (i * Math.PI * 2) / 3;
      c.position.set(Math.cos(a) * 1.9, Math.sin(t * 1.5 + i) * 0.25 + 0.1, Math.sin(a) * 1.9);
      c.rotation.set(t + i, t * 0.7, 0);
    });
  });

  return (
    <group>
      <group ref={bag}>
        <RB size={[1.7, 1.9, 0.9]} pos={[0, -0.1, 0]} mat={M.white} r={0.1} />
        <RB size={[1.72, 0.32, 0.92]} pos={[0, 0.72, 0]} mat={M.black} r={0.08} />
        <mesh position={[0, 0.88, 0]} material={M.chrome}>
          <torusGeometry args={[0.42, 0.045, 10, 28, Math.PI]} />
        </mesh>
        <RB size={[0.6, 0.6, 0.03]} pos={[0, -0.25, 0.46]} mat={M.black} r={0.1} />
        <mesh position={[0, -0.25, 0.48]} material={M.glow}>
          <circleGeometry args={[0.13, 24]} />
        </mesh>
      </group>
      <group ref={orbit}>
        {[0, 1, 2].map((i) => (
          <RB key={i} size={[0.32, 0.32, 0.32]} mat={i === 1 ? M.white : M.black} r={0.05} />
        ))}
      </group>
      <Ripple position={[0, -1.15, 0]} offset={0} speed={0.3} max={1.8} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Default                                                             */
/* ------------------------------------------------------------------ */
function Orb() {
  return (
    <mesh>
      <sphereGeometry args={[1.3, 48, 48]} />
      <MeshDistortMaterial color="#0d0d0d" distort={0.4} speed={2} roughness={0.15} metalness={0.9} />
    </mesh>
  );
}

const MODELS: Record<string, { Model: () => React.JSX.Element; spin: boolean }> = {
  "web-development": { Model: Browser, spin: false },
  "mobile-app-development": { Model: Phone, spin: false },
  "ai-ml-solutions": { Model: Neural, spin: true },
  "cloud-infrastructure": { Model: Cloud, spin: true },
  "ui-ux-design": { Model: Design, spin: false },
  "digital-marketing": { Model: Megaphone, spin: false },
  "saas-analytics": { Model: Analytics, spin: true },
  "e-commerce-development": { Model: Bag, spin: true },
};

/* ------------------------------------------------------------------ */
/* Rig: entrance pop, mouse-follow tilt, hover scale, slow spin        */
/* ------------------------------------------------------------------ */
function Rig({ slug, baseScale = 1 }: { slug: string; baseScale?: number }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const entry = MODELS[slug] ?? { Model: Orb, spin: true };
  const { Model, spin } = entry;

  useFrame((state, delta) => {
    const k = 1 - Math.exp(-delta * 6);
    if (outer.current) {
      const s = baseScale * (hovered ? 1.1 : 1);
      outer.current.scale.setScalar(lerp(outer.current.scale.x, s, k));
      outer.current.rotation.y = lerp(outer.current.rotation.y, state.pointer.x * 0.5, k);
      outer.current.rotation.x = lerp(outer.current.rotation.x, -state.pointer.y * 0.35, k);
    }
    if (inner.current && spin) inner.current.rotation.y += delta * (hovered ? 1.2 : 0.35);
  });

  return (
    <group
      ref={outer}
      scale={0.001}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <group ref={inner}>
        <Model />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */
export default function Service3DModel({
  slug,
  className,
  variant = "hero",
}: {
  slug: string;
  className?: string;
  variant?: "card" | "hero";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // everInView latches true on first intersection (mount gate),
  // inView tracks current visibility to pause the frameloop off-screen.
  const everInView = useInView(containerRef, { once: true, amount: 0 });
  const inView = useInView(containerRef, { amount: 0 });
  const isCard = variant === "card";

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className || ""}`}>
      {everInView && (
        <Canvas
          camera={{ position: [0, 0, isCard ? 6.8 : 6.2], fov: 45 }}
          dpr={isCard ? [1, 1.75] : [1, 2]}
          frameloop={inView ? "always" : "never"}
          gl={{
            antialias: true,
            alpha: true,
            stencil: false,
            powerPreference: isCard ? "default" : "high-performance",
          }}
        >
          <ambientLight intensity={0.6} />
          <spotLight position={[8, 10, 8]} angle={0.2} penumbra={1} intensity={1.4} />
          <pointLight position={[-8, -4, -6]} intensity={0.6} color="#ffffff" />

          <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.9}>
            <Rig slug={slug} baseScale={isCard ? 0.9 : 1} />
          </Float>

          {/* Local Lightformer rig - no remote HDRI fetch, works offline */}
          <Environment resolution={64} frames={1}>
            <Lightformer
              form="rect"
              intensity={2.6}
              position={[0, 4, 3]}
              scale={[7, 3, 1]}
              rotation={[-Math.PI / 3, 0, 0]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={1.4}
              position={[-5, 1, 2]}
              scale={[4, 5, 1]}
              rotation={[0, Math.PI / 3, 0]}
              color="#ffffff"
            />
            <Lightformer
              form="rect"
              intensity={1}
              position={[5, -1, -3]}
              scale={[5, 5, 1]}
              rotation={[0, -Math.PI / 3, 0]}
              color="#ffffff"
            />
            <Lightformer
              form="ring"
              intensity={1.6}
              position={[0, -3, 3]}
              scale={3}
              color="#ffffff"
            />
          </Environment>
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.45}
            scale={10}
            blur={2.5}
            far={4}
            color="#000000"
            frames={isCard ? 90 : Infinity}
          />
        </Canvas>
      )}
    </div>
  );
}
