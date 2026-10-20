"use client";

import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const isMobile = window.innerWidth < 768;
    const numStars = isMobile ? 50 : 120;

    interface Star {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      twinkleSpeed: number;
      color: string;
    }

    interface NebulaParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }

    let stars: Star[] = [];
    let nebulae: NebulaParticle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const starColors = [
      'rgba(255, 255, 255,', // Pure White
      'rgba(186, 230, 253,', // Ice Blue
      'rgba(254, 240, 138,', // Soft Gold
      'rgba(221, 214, 254,'  // Lavender White
    ];

    const initGalaxy = () => {
      stars = [];
      nebulae = [];

      // Initialize realistic stars
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.8 + 0.2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          alpha: Math.random(),
          maxAlpha: Math.random() * 0.5 + 0.5,
          twinkleSpeed: (Math.random() * 0.015) + 0.003,
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }

      // Initialize deep galactic nebula clouds
      const numNebulae = isMobile ? 3 : 6;
      for (let i = 0; i < numNebulae; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 300 + 200,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          color: i % 2 === 0 ? 'rgba(56, 189, 248, 0.03)' : 'rgba(168, 85, 247, 0.03)'
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw smooth nebula/galaxy dust clouds
      nebulae.forEach(neb => {
        neb.x += neb.vx;
        neb.y += neb.vy;

        if (neb.x < -neb.radius) neb.x = canvas.width + neb.radius;
        if (neb.x > canvas.width + neb.radius) neb.x = -neb.radius;
        if (neb.y < -neb.radius) neb.y = canvas.height + neb.radius;
        if (neb.y > canvas.height + neb.radius) neb.y = -neb.radius;

        const gradient = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
        gradient.addColorStop(0, neb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw real twinkling stars with subtle glowing halos for larger stars
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.alpha += star.twinkleSpeed;
        if (star.alpha > star.maxAlpha || star.alpha < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${Math.max(0, star.alpha)})`;
        ctx.fill();

        // Add soft glow core for larger stars to make them look realistic
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color} ${Math.max(0, star.alpha * 0.2)})`;
          ctx.fill();
        }
      });
    };

    const loop = () => {
      drawFrame();
      animationFrameId = requestAnimationFrame(loop);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resize();
    initGalaxy();

    if (prefersReducedMotion) {
      drawFrame();
      window.addEventListener('resize', resize, { passive: true });
      return () => window.removeEventListener('resize', resize);
    }

    let startTimer: ReturnType<typeof setTimeout> | undefined;
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        loop();
      });
    } else {
      startTimer = setTimeout(loop, 400);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      if (startTimer) clearTimeout(startTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60 z-0 mix-blend-screen"
    />
  );
}