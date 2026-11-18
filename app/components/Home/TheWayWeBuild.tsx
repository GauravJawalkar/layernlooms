"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

interface BuildPillar {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

const pillars: BuildPillar[] = [
  {
    id: "business-first",
    number: "01",
    tag: "BUSINESS FIRST",
    title: "Technology should solve a real business problem.",
    description:
      "We don't just build software. We start with the business problem, understand what actually matters, and turn it into technology that creates measurable value.",
    image: "/way-we-build/01_business_first.jpg",
  },
  {
    id: "real-ownership",
    number: "02",
    tag: "REAL OWNERSHIP",
    title: "Your product stays yours.",
    description:
      "Clean architecture, documented systems, transparent development, and complete ownership of the work we deliver.",
    image: "/way-we-build/02_real_ownership.jpg",
  },
  {
    id: "built-to-evolve",
    number: "03",
    tag: "BUILT TO EVOLVE",
    title: "Technology shouldn't become a limitation.",
    description:
      "We design systems that can adapt, scale, and evolve as your business changes.",
    image: "/way-we-build/03_built_to_evolve.jpg",
  },
  {
    id: "direct-collaboration",
    number: "04",
    tag: "DIRECT COLLABORATION",
    title: "No unnecessary layers.",
    description:
      "You work directly with the people building your product, keeping decisions clear, communication fast, and execution focused.",
    image: "/way-we-build/04_direct_collaboration.jpg",
  },
];

/* ── Smooth Framer Motion easing for accordion expand/collapse ── */
const expandEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
const contentEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const accordionTransition: Transition = {
  duration: 0.72,
  ease: expandEase,
};

export default function TheWayWeBuild() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="the-way-we-build"
      className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: contentEase }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-neutral-950 dark:text-white transition-colors duration-300">
              The Way We Build
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] max-w-lg leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              Our engineering philosophy, built on complete ownership, direct
              collaboration, and future-proof architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 select-none shrink-0 text-neutral-500 dark:text-neutral-400 transition-colors duration-300"
          >
            <span className="text-[11px] tracking-widest uppercase font-medium">
              Click any card to expand
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            DESKTOP & TABLET  ─  Horizontal Accordion (≥ md)
           ══════════════════════════════════════════════════════════ */}
        <div className="hidden md:block">
          {/* Outer container panel – dark rounded shell that wraps all cards */}
          <div className="relative rounded-[24px] sm:rounded-[28px] border border-neutral-200/70 dark:border-white/10 bg-neutral-100 dark:bg-neutral-950 p-2.5 sm:p-3 shadow-xl shadow-neutral-950/5 dark:shadow-black/50 overflow-hidden">
            {/* Flex row of accordion items */}
            <div className="flex gap-2 sm:gap-2.5 h-[420px] sm:h-[460px] lg:h-[500px]">
              {pillars.map((pillar, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={pillar.id}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-label={`${pillar.number} ${pillar.tag}`}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIndex(index);
                      }
                    }}
                    /* Animate the flex value for smooth width transition */
                    animate={{ flex: isActive ? 5 : 0.55 }}
                    transition={accordionTransition}
                    className={`relative rounded-[18px] sm:rounded-[22px] overflow-hidden cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                      isActive
                        ? ""
                        : "border border-neutral-300/60 dark:border-white/[0.08] bg-neutral-200/60 dark:bg-black/70 hover:bg-neutral-200 dark:hover:bg-black/90 hover:border-neutral-400/60 dark:hover:border-white/[0.14] transition-colors duration-300"
                    }`}
                  >
                    {/* ────────────────────────────────────────────
                        BACKGROUND IMAGE  –  always present, fades
                       ──────────────────────────────────────────── */}
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 1.06,
                      }}
                      transition={{
                        opacity: { duration: 0.6, ease: expandEase },
                        scale: { duration: 0.9, ease: expandEase },
                      }}
                    >
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 1024px) 80vw, 70vw"
                        className="object-cover object-center"
                      />
                      {/* Left-to-right gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15" />
                      {/* Bottom-to-top gradient for extra contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </motion.div>

                    {/* ────────────────────────────────────────────
                        EXPANDED CONTENT  –  staggered fade-in text
                       ──────────────────────────────────────────── */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`expanded-${pillar.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.18,
                            ease: contentEase,
                          }}
                          className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8"
                        >
                          {/* Top: Number + Tag */}
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.22,
                              ease: contentEase,
                            }}
                            className="flex items-center gap-3"
                          >
                            <span className="text-xs sm:text-sm font-bold font-mono tracking-wider text-white/80">
                              {pillar.number}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-white/90 pb-0.5 border-b border-white/40">
                              {pillar.tag}
                            </span>
                          </motion.div>

                          {/* Bottom: Title + Description with stagger */}
                          <div className="max-w-md lg:max-w-lg">
                            <motion.h3
                              initial={{ opacity: 0, y: 18 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.3,
                                ease: contentEase,
                              }}
                              className="text-[1.65rem] sm:text-3xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-[1.12] mb-3 sm:mb-4"
                            >
                              {pillar.title}
                            </motion.h3>
                            <motion.p
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.45,
                                delay: 0.42,
                                ease: contentEase,
                              }}
                              className="text-[13px] sm:text-sm text-neutral-300/90 leading-relaxed font-normal max-w-md"
                            >
                              {pillar.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ────────────────────────────────────────────
                        COLLAPSED PILL  –  vertical number + tag
                       ──────────────────────────────────────────── */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 0 : 1,
                      }}
                      transition={{ duration: 0.25, ease: expandEase }}
                      className="absolute inset-0 flex flex-col items-center justify-between py-6 sm:py-7 z-10 pointer-events-none"
                    >
                      {/* Number */}
                      <span className="text-[11px] sm:text-xs font-bold font-mono tracking-wider text-neutral-500 dark:text-neutral-500">
                        {pillar.number}
                      </span>

                      {/* Vertical Tag */}
                      <div className="flex-1 flex items-center justify-center py-4">
                        <span
                          style={{ writingMode: "vertical-rl" }}
                          className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-600 dark:text-neutral-400 select-none whitespace-nowrap"
                        >
                          {pillar.tag}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MOBILE  ─  Vertical Accordion (< md)
           ══════════════════════════════════════════════════════════ */}
        <div className="flex md:hidden flex-col gap-3 w-full">
          {pillars.map((pillar, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={pillar.id}
                className="rounded-2xl border overflow-hidden transition-all duration-300 bg-neutral-100/90 dark:bg-neutral-900/60 border-neutral-300/80 dark:border-white/10"
              >
                {/* Accordion header */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono text-neutral-500 dark:text-neutral-400">
                      {pillar.number}
                    </span>
                    <span className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-900 dark:text-white">
                      {pillar.tag}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                      isActive
                        ? "rotate-180 text-neutral-950 dark:text-white"
                        : ""
                    }`}
                  />
                </button>

                {/* Expanded body */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: contentEase }}
                      className="overflow-hidden"
                    >
                      <div className="relative h-48 sm:h-56 w-full">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      </div>
                      <div className="p-4 sm:p-5 bg-white dark:bg-neutral-950">
                        <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-2 leading-snug">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                          {pillar.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
