"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PROC_RES = 1024;

function resizePreserveAspect(img: HTMLImageElement) {
  const aspect = img.width / img.height;
  let w: number, h: number;
  if (aspect >= 1) {
    w = Math.min(img.width, PROC_RES);
    h = Math.round(w / aspect);
  } else {
    h = Math.min(img.height, PROC_RES);
    w = Math.round(h * aspect);
  }
  if (w === img.width && h === img.height) return img;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  c.getContext("2d")!.drawImage(img, 0, 0, w, h);
  return c;
}

function processTextures(specularImage: HTMLImageElement) {
  const src = resizePreserveAspect(specularImage) as HTMLImageElement | HTMLCanvasElement;
  const w = src.width;
  const h = src.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(src, 0, 0);
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = w;
  roughCanvas.height = h;
  const rCtx = roughCanvas.getContext("2d")!;
  const rImgData = rCtx.createImageData(w, h);
  const rd = rImgData.data;

  for (let i = 0; i < d.length; i += 4) {
    const t = d[i] / 255;
    const c = Math.floor(228 * (1 - t) + 9 * t);
    d[i] = c;
    d[i + 1] = c;
    d[i + 2] = Math.floor(231 * (1 - t) + 11 * t);
    d[i + 3] = 255;
    const rv = Math.floor((0.85 * (1 - t) + 0.08 * t) * 255);
    rd[i] = rd[i + 1] = rd[i + 2] = rv;
    rd[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);
  rCtx.putImageData(rImgData, 0, 0);
  return { diffuseCanvas: canvas, roughnessCanvas: roughCanvas };
}

function processImage(img: HTMLImageElement, fn: (d: Uint8ClampedArray, i: number) => void) {
  const src = resizePreserveAspect(img) as HTMLImageElement | HTMLCanvasElement;
  const w = src.width;
  const h = src.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(src, 0, 0);
  const imgData = ctx.getImageData(0, 0, w, h);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) fn(d, i);
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

function processClouds(cloudsImage: HTMLImageElement) {
  return processImage(cloudsImage, (d, i) => {
    const gray = (d[i] + d[i + 1] + d[i + 2]) / 3;
    d[i] = d[i + 1] = d[i + 2] = 255;
    d[i + 3] = d[i + 3] < 255 ? d[i + 3] : gray;
  });
}

function processLights(lightsImage: HTMLImageElement) {
  return processImage(lightsImage, (d, i) => {
    const gray = Math.max(d[i], d[i + 1], d[i + 2]);
    d[i] = d[i + 1] = d[i + 2] = gray;
    d[i + 3] = 255;
  });
}

export default function EarthModel() {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { width, height } = useThree((state) => state.viewport);
  const [entered, setEntered] = useState(false);
  const [textures, setTextures] = useState<{
    map: THREE.CanvasTexture;
    normalMap: THREE.Texture;
    roughnessMap: THREE.CanvasTexture;
    cloudsMap: THREE.CanvasTexture;
    lightsMap: THREE.CanvasTexture;
  } | null>(null);

  useEffect(() => {
    setEntered(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loader = new THREE.TextureLoader();
    let cancelled = false;

    async function load() {
      try {
        const [specular, normal, clouds, lights] = await Promise.all([
          loader.loadAsync("/earth_specular_2048.jpg"),
          loader.loadAsync("/earth_normal_2048.jpg"),
          loader.loadAsync("/earth_clouds_1024.png"),
          loader.loadAsync("/earth_lights_2048.png"),
        ]);

        if (cancelled) return;

        const { diffuseCanvas, roughnessCanvas } = processTextures(specular.image);
        const cloudsCanvas = processClouds(clouds.image);
        const lightsCanvas = processLights(lights.image);

        if (cancelled) return;

        const map = new THREE.CanvasTexture(diffuseCanvas);
        const roughnessMap = new THREE.CanvasTexture(roughnessCanvas);
        const cloudsMap = new THREE.CanvasTexture(cloudsCanvas);
        const lightsMap = new THREE.CanvasTexture(lightsCanvas);

        const fastTex = (t: THREE.Texture) => {
          t.wrapS = THREE.RepeatWrapping;
          t.wrapT = THREE.ClampToEdgeWrapping;
          t.minFilter = THREE.LinearMipmapNearestFilter;
          t.magFilter = THREE.LinearFilter;
          t.generateMipmaps = true;
        };

        [map, roughnessMap, cloudsMap, lightsMap].forEach(fastTex);

        normal.wrapS = THREE.RepeatWrapping;
        normal.wrapT = THREE.ClampToEdgeWrapping;
        normal.minFilter = THREE.LinearMipmapLinearFilter;
        normal.magFilter = THREE.LinearFilter;
        normal.generateMipmaps = true;

        map.colorSpace = THREE.SRGBColorSpace;
        cloudsMap.colorSpace = THREE.SRGBColorSpace;
        lightsMap.colorSpace = THREE.SRGBColorSpace;
        normal.colorSpace = THREE.NoColorSpace;
        roughnessMap.colorSpace = THREE.NoColorSpace;

        setTextures({ map, normalMap: normal, roughnessMap, cloudsMap, lightsMap });
      } catch (err) {
        console.error("Failed to load Earth textures:", err);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const radius = useMemo(() => Math.min(width * 0.55, 3.0), [width]);
  const positionY = useMemo(() => -height / 2 - radius * 0.38, [height, radius]);

  const normalScale = useMemo(() => new THREE.Vector2(0.4, 0.4), []);
  const emissiveColor = useMemo(() => new THREE.Color("#ffffff"), []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);

    if (groupRef.current) {
      const targetScale = entered ? 1 : 0;
      const s = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(s + (targetScale - s) * 0.03);
      groupRef.current.position.y = positionY + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }

    if (earthRef.current) earthRef.current.rotation.y += d * 0.025;
    if (cloudsRef.current) cloudsRef.current.rotation.y += d * 0.032;
    if (glowRef.current) glowRef.current.rotation.y += d * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, positionY, 0]} scale={[0, 0, 0]}>
      <mesh ref={earthRef} rotation={[0.41, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        {textures ? (
          <meshStandardMaterial
            map={textures.map}
            normalMap={textures.normalMap}
            normalScale={normalScale}
            roughnessMap={textures.roughnessMap}
            metalness={0.25}
            emissiveMap={textures.lightsMap}
            emissive={emissiveColor}
            emissiveIntensity={2.5}
          />
        ) : (
          <meshStandardMaterial color="#09090b" roughness={0.8} metalness={0.1} />
        )}
      </mesh>

      {textures && (
        <mesh ref={cloudsRef} scale={[1.008, 1.008, 1.008]} rotation={[0.41, 0, 0]} castShadow>
          <sphereGeometry args={[radius, 32, 32]} />
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
        <sphereGeometry args={[radius, 24, 24]} />
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
}
