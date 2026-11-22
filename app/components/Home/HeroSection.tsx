"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Top and bottom animated letter component (Vertical 180° X-axis flip with pause) ── */
function AnimatedLetter({
  char,
  delay = 0,
}: {
  char: string;
  delay?: number;
}) {
  return (
    <motion.span
      className="inline-block relative origin-center [transform-style:preserve-3d] [perspective:1000px]"
      animate={{
        rotateX: [0, 180, 0],
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: 1.8,
        duration: 2,
        delay,
        ease: "easeInOut",
      }}
    >
      {char}
    </motion.span>
  );
}

export default function HeroSection() {
  // Ref-based CSS variable update avoids 60-120fps React re-renders on mousemove
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[440px] sm:min-h-[540px] lg:h-[600px] w-full overflow-hidden bg-black text-white flex items-center select-none rounded-2xl sm:rounded-3xl my-2 shadow-2xl"
    >
      {/* ── 1. Diagonal Luminous Beam (Matching Reference Image Exact -18° Angle) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        {/* Core focused diagonal light ray */}
        <motion.div
          className="absolute -left-[20%] top-[40%] w-[150%] h-[110px] sm:h-[130px] -rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent blur-2xl will-change-transform"
          animate={{
            opacity: [0.8, 1, 0.8],
            scaleY: [0.95, 1.05, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        {/* Wider soft ambient diffused glow streak */}
        <div className="absolute -left-[30%] top-[32%] w-[170%] h-[260px] sm:h-[300px] -rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-3xl" />

        {/* Interactive specular cursor reflection */}
        <div
          ref={glowRef}
          className="absolute inset-0 transition-opacity duration-700 opacity-80"
          style={{
            background:
              "radial-gradient(800px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.045), transparent 65%)",
          }}
        />
      </div>

      {/* ── Main Hero Content Grid (Matching Reference Composition) ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-end">
          {/* ── Left Column: Prominent Bold Display Typography "Build Digital Think Beyond" ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <h1 className="text-[2.35rem] sm:text-7xl md:text-4xl lg:text-[7rem] font-bold tracking-[-0.045em] leading-[0.94] sm:leading-[0.89] text-white">
              {/* Line 1: Build Digital */}
              <span className="block">
                Build Digital
              </span>

              {/* Line 2: Think Beyond (with vertical bouncing 'i' in Think) */}
              <span className="block">
                Th
                <AnimatedLetter char="i" />
                nk Beyond
              </span>
            </h1>
          </motion.div>

          {/* ── Right Column: Lower-Right Content Block Matching Reference Design ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 lg:pl-8 xl:pl-12 lg:pb-4 flex flex-col justify-end"
          >
            {/* Small horizontal white dash indicator */}
            <div className="w-7 sm:w-8 h-[2.5px] rounded-full bg-white mb-5 sm:mb-6" />

            {/* Subtitle Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold tracking-tight text-white leading-[1.22] mb-3.5 sm:mb-4">
              Digital experiences <br className="hidden sm:inline" />
              for what comes next.
            </h2>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-neutral-400 font-normal mb-6 sm:mb-7 max-w-sm">
              We design and build digital experiences, intelligent systems, and scalable technology that help ambitious businesses move forward.
            </p>

            {/* Action: Clean Underlined 'Start a Project' Link (matching exact reference screenshot) */}
            <div>
              <Link
                href="/contact"
                className="inline-block text-xs sm:text-sm lg:text-[14.5px] font-semibold text-white border-b border-white pb-0.5 hover:opacity-75 transition-opacity duration-200"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
