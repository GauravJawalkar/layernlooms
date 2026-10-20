import * as THREE from "three";

export type EarthTextures = {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
  cloudsMap: THREE.Texture;
  lightsMap: THREE.Texture;
};

export type Quality = "low" | "medium" | "high";

const QUALITY_RES: Record<Quality, number> = { low: 256, medium: 512, high: 1024 };

const cache = new Map<string, EarthTextures>();
const loadingPromises = new Map<string, Promise<EarthTextures>>();

export function clearTextureCache() {
  for (const [, tex] of cache) disposeTextures(tex);
  cache.clear();
  loadingPromises.clear();
}

export function disposeTextures(t: EarthTextures) {
  t.map?.dispose();
  t.normalMap?.dispose();
  t.roughnessMap?.dispose();
  t.cloudsMap?.dispose();
  t.lightsMap?.dispose();
}

function configureTexture<T extends THREE.Texture>(tex: T, opts?: Partial<{ srgb: boolean; linear: boolean; nearest: boolean }>) {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  if (opts?.nearest) {
    tex.minFilter = THREE.LinearMipmapNearestFilter;
  } else {
    tex.minFilter = THREE.LinearMipmapLinearFilter;
  }
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  if (opts?.srgb) tex.colorSpace = THREE.SRGBColorSpace;
  if (opts?.linear) tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

export async function loadEarthTextures(quality: Quality): Promise<EarthTextures> {
  const key = `earth_${quality}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const pending = loadingPromises.get(key);
  if (pending) return pending;

  const promise = loadTexturesInternal(quality);
  loadingPromises.set(key, promise);

  try {
    const result = await promise;
    cache.set(key, result);
    return result;
  } finally {
    loadingPromises.delete(key);
  }
}

async function loadTexturesInternal(quality: Quality): Promise<EarthTextures> {
  const resolution = QUALITY_RES[quality];
  const loader = new THREE.TextureLoader();
  const base = (name: string) => `/earth_${name}_${resolution}.webp`;

  const [map, normalMap, roughnessMap, cloudsMap, lightsMap] = await Promise.all([
    loader.loadAsync(base("diffuse")),
    loader.loadAsync(base("normal")),
    loader.loadAsync(base("roughness")),
    loader.loadAsync(base("clouds")),
    loader.loadAsync(base("lights")),
  ]);

  return {
    map: configureTexture(map, { srgb: true, nearest: true }),
    normalMap: configureTexture(normalMap, { linear: true }),
    roughnessMap: configureTexture(roughnessMap, { linear: true, nearest: true }),
    cloudsMap: configureTexture(cloudsMap, { srgb: true, nearest: true }),
    lightsMap: configureTexture(lightsMap, { srgb: true, nearest: true }),
  };
}
