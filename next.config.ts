import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
import https from "https";

// Self-executing download helper to get Earth textures offline
(async () => {
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const textures = [
    {
      name: "earth_specular_2048.jpg",
      urls: [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
      ]
    },
    {
      name: "earth_normal_2048.jpg",
      urls: [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
      ]
    },
    {
      name: "earth_clouds_1024.png",
      urls: [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png"
      ]
    },
    {
      name: "earth_lights_2048.png",
      urls: [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png",
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.jpg",
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.jpg"
      ]
    }
  ];

  const downloadFile = (url: string, dest: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      }).on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
  };

  for (const texture of textures) {
    const dest = path.join(publicDir, texture.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`[Earth textures] ${texture.name} already exists. Skipping.`);
      continue;
    }
    
    let success = false;
    for (const url of texture.urls) {
      try {
        console.log(`[Earth textures] Downloading ${texture.name} from ${url}...`);
        await downloadFile(url, dest);
        success = true;
        break;
      } catch (err: any) {
        console.warn(`[Earth textures] Failed URL ${url}: ${err.message}`);
      }
    }
    if (!success) {
      console.error(`[Earth textures] Failed to download ${texture.name} from all sources!`);
    }
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
