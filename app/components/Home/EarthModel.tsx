"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE_ENV from "three";

function processTextures(specularImage: HTMLImageElement) {
  const width = specularImage.width;
  const height = specularImage.height;

  // Create canvas for diffuse map
  const diffuseCanvas = document.createElement("canvas");
  diffuseCanvas.width = width;
  diffuseCanvas.height = height;
  const diffuseCtx = diffuseCanvas.getContext("2d")!;
  
  // Draw specular image
  diffuseCtx.drawImage(specularImage, 0, 0);
  const imgData = diffuseCtx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Create canvas for roughness map
  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = width;
  roughnessCanvas.height = height;
  const roughnessCtx = roughnessCanvas.getContext("2d")!;
  const roughnessImgData = roughnessCtx.createImageData(width, height);
  const roughnessData = roughnessImgData.data;

  // Process pixel data: Specular map has white oceans (high specularity) and black land
  for (let i = 0; i < data.length; i += 4) {
    const spec = data[i]; // 0 to 255
    const t = spec / 255.0; // 0 (land) to 1 (ocean)

    // Diffuse map: Land = elegant soft zinc/white (#e4e4e7), Ocean = dark charcoal/black (#09090b)
    const r = Math.floor(228 * (1 - t) + 9 * t);
    const g = Math.floor(228 * (1 - t) + 9 * t);
    const b = Math.floor(231 * (1 - t) + 11 * t);

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = 255;

    // Roughness map: Land = matte (0.85), Ocean = glossy specular reflections (0.08)
    const roughnessVal = Math.floor((0.85 * (1 - t) + 0.08 * t) * 255);
    roughnessData[i] = roughnessVal;
    roughnessData[i + 1] = roughnessVal;
    roughnessData[i + 2] = roughnessVal;
    roughnessData[i + 3] = 255;
  }

  diffuseCtx.putImageData(imgData, 0, 0);
  roughnessCtx.putImageData(roughnessImgData, 0, 0);

  return { diffuseCanvas, roughnessCanvas };
}

function processCloudsTexture(cloudsImage: HTMLImageElement) {
  const width = cloudsImage.width;
  const height = cloudsImage.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(cloudsImage, 0, 0);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Convert grayscale/black background to transparency
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    const gray = (r + g + b) / 3;

    // Set output to pure white with transparency proportional to gray value or original alpha
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = a < 255 ? a : gray;
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

function processLightsTexture(lightsImage: HTMLImageElement) {
  const width = lightsImage.width;
  const height = lightsImage.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(lightsImage, 0, 0);

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Convert colored night lights to grayscale/white city lights map
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Grayscale value based on maximum intensity
    const gray = Math.max(r, g, b);

    // Make city lights white/zinc glow
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
    data[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

export default function EarthModel() {
  const groupRef = useRef<THREE_ENV.Group>(null);
  const earthRef = useRef<THREE_ENV.Mesh>(null);
  const cloudsRef = useRef<THREE_ENV.Mesh>(null);
  const glowRef = useRef<THREE_ENV.Mesh>(null);

  const { width, height } = useThree((state) => state.viewport);
  const [entered, setEntered] = useState(false);
  const [textures, setTextures] = useState<any>(null);

  useEffect(() => {
    setEntered(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loader = new THREE_ENV.TextureLoader();

    // Load specular map first, then process and load other maps
    loader.load(
      "/earth_specular_2048.jpg",
      (specularTex) => {
        try {
          const { diffuseCanvas, roughnessCanvas } = processTextures(specularTex.image);

          const map = new THREE_ENV.CanvasTexture(diffuseCanvas);
          const roughnessMap = new THREE_ENV.CanvasTexture(roughnessCanvas);

          // Load normal map and clouds map
          loader.load("/earth_normal_2048.jpg", (normalTex) => {
            loader.load("/earth_clouds_1024.png", (cloudsTex) => {
              loader.load("/earth_lights_2048.png", (lightsTex) => {
                const processedCloudsCanvas = processCloudsTexture(cloudsTex.image);
                const processedCloudsTex = new THREE_ENV.CanvasTexture(processedCloudsCanvas);

                const processedLightsCanvas = processLightsTexture(lightsTex.image);
                const processedLightsTex = new THREE_ENV.CanvasTexture(processedLightsCanvas);

                // Configure texture filters & mipmaps
                [map, normalTex, roughnessMap, processedCloudsTex, processedLightsTex].forEach((tex) => {
                  tex.wrapS = THREE_ENV.RepeatWrapping;
                  tex.wrapT = THREE_ENV.ClampToEdgeWrapping;
                  tex.minFilter = THREE_ENV.LinearMipmapLinearFilter;
                  tex.magFilter = THREE_ENV.LinearFilter;
                  tex.generateMipmaps = true;
                });

                map.colorSpace = THREE_ENV.SRGBColorSpace;
                processedCloudsTex.colorSpace = THREE_ENV.SRGBColorSpace;
                processedLightsTex.colorSpace = THREE_ENV.SRGBColorSpace;

                // Treat normal maps and roughness maps as linear data to prevent color distortions
                normalTex.colorSpace = THREE_ENV.NoColorSpace;
                roughnessMap.colorSpace = THREE_ENV.NoColorSpace;

                setTextures({
                  map,
                  normalMap: normalTex,
                  roughnessMap,
                  cloudsMap: processedCloudsTex,
                  lightsMap: processedLightsTex,
                });
              });
            });
          });
        } catch (err) {
          console.error("Failed to process Earth textures:", err);
        }
      },
      undefined,
      (err) => {
        console.error("Failed to load Earth specular texture:", err);
      }
    );
  }, []);

  const radius = useMemo(() => {
    return Math.min(width * 0.55, 3.0);
  }, [width]);

  const positionY = useMemo(() => {
    // Positioning perfectly centered at the bottom of the canvas
    return -height / 2 - radius * 0.38;
  }, [height, radius]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);

    if (groupRef.current) {
      const targetScale = entered ? 1 : 0;
      const currentScale = groupRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.03;
      groupRef.current.scale.setScalar(newScale);

      // Floats gently up and down
      groupRef.current.position.y = positionY + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += d * 0.025;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += d * 0.032;
    }

    if (glowRef.current) {
      glowRef.current.rotation.y += d * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[0, positionY, 0]} scale={[0, 0, 0]}>
      {/* Real Earth Sphere */}
      <mesh ref={earthRef} rotation={[0.41, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        {textures ? (
          <meshStandardMaterial
            map={textures.map}
            normalMap={textures.normalMap}
            normalScale={new THREE_ENV.Vector2(0.4, 0.4)}
            roughnessMap={textures.roughnessMap}
            metalness={0.25}
            emissiveMap={textures.lightsMap}
            emissive={new THREE_ENV.Color("#ffffff")}
            emissiveIntensity={2.5}
          />
        ) : (
          <meshStandardMaterial
            color="#09090b"
            roughness={0.8}
            metalness={0.1}
          />
        )}
      </mesh>

      {/* Layered clouds mesh */}
      <mesh ref={cloudsRef} scale={[1.008, 1.008, 1.008]} rotation={[0.41, 0, 0]} castShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={textures?.cloudsMap || null}
          transparent
          depthWrite={false}
          opacity={0.35}
          wireframe={!textures}
          blending={THREE_ENV.NormalBlending}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh ref={glowRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          blending={THREE_ENV.AdditiveBlending}
          side={THREE_ENV.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
