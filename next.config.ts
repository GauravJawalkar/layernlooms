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

  // Only check downloads if any texture is missing
  const missingTextures = textures.filter(
    (t) => !fs.existsSync(path.join(publicDir, t.name)) || fs.statSync(path.join(publicDir, t.name)).size < 10000
  );

  if (missingTextures.length === 0) {
    return;
  }

  for (const texture of missingTextures) {
    const dest = path.join(publicDir, texture.name);
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
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
