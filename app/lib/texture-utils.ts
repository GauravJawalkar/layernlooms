import * as THREE from "three";

export type EarthTextures = {
  map: THREE.CanvasTexture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.CanvasTexture;
  cloudsMap: THREE.CanvasTexture;
  lightsMap: THREE.CanvasTexture;
};

export type Quality = "low" | "medium" | "high";

const QUALITY_RES: Record<Quality, number> = { low: 256, medium: 512, high: 1024 };
const LOAD_TIMEOUT = 10000;

function resizeWithAspect(img: HTMLImageElement, maxDim: number) {
  const aspect = img.width / img.height;
  const w = aspect >= 1 ? maxDim : Math.round(maxDim * aspect);
  const h = aspect >= 1 ? Math.round(maxDim / aspect) : maxDim;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  return { canvas: c, width: w, height: h };
}

function processPixels(
  img: HTMLImageElement,
  maxDim: number,
): { diffuse: HTMLCanvasElement; roughness: HTMLCanvasElement } {
  const { canvas, width, height } = resizeWithAspect(img, maxDim);
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;

  const rCanvas = document.createElement("canvas");
  rCanvas.width = width;
  rCanvas.height = height;
  const rCtx = rCanvas.getContext("2d")!;
  const rData = rCtx.createImageData(width, height);
  const rd = rData.data;

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
  rCtx.putImageData(rData, 0, 0);
  return { diffuse: canvas, roughness: rCanvas };
}

function processSingleChannel(img: HTMLImageElement, maxDim: number, fn: (d: Uint8ClampedArray, i: number) => void) {
  const { canvas, width, height } = resizeWithAspect(img, maxDim);
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.getImageData(0, 0, width, height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) fn(d, i);
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

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

export async function loadEarthTextures(quality: Quality, signal?: AbortSignal): Promise<EarthTextures> {
  const key = `earth_${quality}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const pending = loadingPromises.get(key);
  if (pending) return pending;

  const promise = loadTexturesInternal(quality, signal);
  loadingPromises.set(key, promise);

  try {
    const result = await promise;
    cache.set(key, result);
    return result;
  } finally {
    loadingPromises.delete(key);
  }
}

async function loadTexturesInternal(quality: Quality, signal?: AbortSignal): Promise<EarthTextures> {
  const maxRes = QUALITY_RES[quality];
  const loader = new THREE.TextureLoader();
  const base = "/";

  function loadImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const timer = setTimeout(() => reject(new Error(`Timeout loading ${src}`)), LOAD_TIMEOUT);
      img.onload = () => { clearTimeout(timer); resolve(img); };
      img.onerror = () => { clearTimeout(timer); reject(new Error(`Failed to load ${src}`)); };
      if (signal) signal.addEventListener("abort", () => { clearTimeout(timer); img.src = ""; reject(new DOMException("Aborted", "AbortError")); });
      img.src = src;
    });
  }

  const [specularImg, normalImg, cloudsImg, lightsImg] = await Promise.all([
    loadImg(`${base}earth_specular_2048.jpg`),
    loadImg(`${base}earth_normal_2048.jpg`),
    loadImg(`${base}earth_clouds_1024.png`),
    loadImg(`${base}earth_lights_2048.png`),
  ]);

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const { diffuse: diffuseCanvas, roughness: roughnessCanvas } = processPixels(specularImg, maxRes);
  const cloudsCanvas = processSingleChannel(cloudsImg, Math.min(maxRes, 512), (d, i) => {
    const gray = (d[i] + d[i + 1] + d[i + 2]) / 3;
    d[i] = d[i + 1] = d[i + 2] = 255;
    d[i + 3] = d[i + 3] < 255 ? d[i + 3] : gray;
  });
  const lightsCanvas = processSingleChannel(lightsImg, maxRes, (d, i) => {
    const gray = Math.max(d[i], d[i + 1], d[i + 2]);
    d[i] = d[i + 1] = d[i + 2] = gray;
    d[i + 3] = 255;
  });

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const map = configureTexture(new THREE.CanvasTexture(diffuseCanvas), { srgb: true, nearest: true });
  const normalMap = configureTexture(await loader.loadAsync(`${base}earth_normal_2048.jpg`), { linear: true });
  const roughnessMap = configureTexture(new THREE.CanvasTexture(roughnessCanvas), { linear: true, nearest: true });
  const cloudsMap = configureTexture(new THREE.CanvasTexture(cloudsCanvas), { srgb: true, nearest: true });
  const lightsMap = configureTexture(new THREE.CanvasTexture(lightsCanvas), { srgb: true, nearest: true });

  return { map, normalMap, roughnessMap, cloudsMap, lightsMap };
}
