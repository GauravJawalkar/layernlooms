"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useInView,
  animate,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  servicesSectionData,
  type ServiceItem,
} from "@/app/data/servicesSectionData";

/* ── Duplicate the array for seamless infinite loop ── */
const LOOP_DATA: (ServiceItem & { uid: string })[] = [
  ...servicesSectionData.map((s) => ({ ...s, uid: s.id })),
  ...servicesSectionData.map((s) => ({ ...s, uid: `${s.id}--clone` })),
];

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
export default function OurServices() {
  /* uid of the currently hovered card */
  const [hoveredUid, setHoveredUid] = useState<string | null>(null);
  /* whether continuous auto-slide is paused */
  const [isPaused, setIsPaused] = useState(false);

  /* Track & motion controls */
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionVisible = useInView(sectionRef, { margin: "120px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const halfWidthRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* Pointer drag refs */
  const isPointerDownRef = useRef(false);
  const startPointerXRef = useRef(0);
  const startXValRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Measure half-width of the track (one set of cards)
  const measureTrack = useCallback(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }
  }, []);

  useEffect(() => {
    measureTrack();
    window.addEventListener("resize", measureTrack, { passive: true });
    return () => {
      window.removeEventListener("resize", measureTrack);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [measureTrack]);

  /* ── Continuous steady auto-slide (pauses when off-screen to save CPU/battery) ── */
  const PIXELS_PER_MS = 0.03;

  useAnimationFrame((_time, delta) => {
    if (!isSectionVisible || isPaused || isAnimatingRef.current || isPointerDownRef.current) return;

    const half = halfWidthRef.current;
    if (!half) {
      measureTrack();
      return;
    }

    // Cap delta to prevent huge jumps when switching tabs
    const safeDelta = Math.min(delta, 50);
    const moveBy = safeDelta * PIXELS_PER_MS;

    let nextX = x.get() - moveBy;
    if (nextX <= -half) {
      nextX += half;
    }
    x.set(nextX);
  });

  /* ── Navigation: Next & Prev ── */
  const pauseAndResume = (delay = 2000) => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, delay);
  };

  const handleNext = () => {
    if (isAnimatingRef.current || !trackRef.current) return;
    isAnimatingRef.current = true;
    pauseAndResume(2200);

    const cardEl = trackRef.current.querySelector<HTMLElement>("[data-service-card]");
    const step = cardEl
      ? cardEl.offsetWidth + (window.innerWidth < 640 ? 12 : 16)
      : 326;
    const half = halfWidthRef.current || trackRef.current.scrollWidth / 2;

    const currentX = x.get();
    let targetX = currentX - step;

    if (targetX <= -half) {
      x.set(currentX + half);
      targetX = currentX + half - step;
    }

    animate(x, targetX, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        const finalX = x.get();
        if (finalX <= -half) {
          x.set(finalX + half);
        }
        isAnimatingRef.current = false;
      },
    });
  };

  const handlePrev = () => {
    if (isAnimatingRef.current || !trackRef.current) return;
    isAnimatingRef.current = true;
    pauseAndResume(2200);

    const cardEl = trackRef.current.querySelector<HTMLElement>("[data-service-card]");
    const step = cardEl
      ? cardEl.offsetWidth + (window.innerWidth < 640 ? 12 : 16)
      : 326;
    const half = halfWidthRef.current || trackRef.current.scrollWidth / 2;

    const currentX = x.get();
    let targetX = currentX + step;

    if (targetX > 0) {
      x.set(currentX - half);
      targetX = currentX - half + step;
    }

    animate(x, targetX, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        const finalX = x.get();
        if (finalX > 0) {
          x.set(finalX - half);
        }
        isAnimatingRef.current = false;
      },
    });
  };

  /* ── Pointer Drag / Swipe Handlers ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimatingRef.current) return;
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    startPointerXRef.current = e.clientX;
    startXValRef.current = x.get();
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const diff = e.clientX - startPointerXRef.current;
    if (Math.abs(diff) > 4) {
      hasMovedRef.current = true;
    }

    const half = halfWidthRef.current;
    let next = startXValRef.current + diff;
    if (half > 0) {
      if (next <= -half) next += half;
      if (next > 0) next -= half;
    }
    x.set(next);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    pauseAndResume(1200);
  };

  const handleCardClick = (uid: string) => {
    if (hasMovedRef.current) return;
    setHoveredUid((prev) => (prev === uid ? null : uid));
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-7 sm:py-14 overflow-hidden"
    >
      {/* ── Section Header (Pure Tailwind for instantaneous light/dark adaptation) ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5 sm:mb-9">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-neutral-950 dark:text-white transition-colors duration-300">
              Technology services built around your business
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] max-w-lg leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              End-to-end technology capabilities engineered for scale,
              durability, and measurable enterprise outcomes.
            </p>
          </motion.div>

          <div className="flex sm:hidden items-center justify-between gap-2 pt-1">
            <span className="text-[10px] tracking-widest uppercase font-medium text-neutral-500 dark:text-neutral-400">
              Tap card or swipe
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous service"
                className="w-9 h-9 rounded-full flex items-center justify-center border bg-white/95 dark:bg-black/85 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next service"
                className="w-9 h-9 rounded-full flex items-center justify-center border bg-white/95 dark:bg-black/85 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white active:scale-95 transition-transform"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 select-none shrink-0 text-neutral-500 dark:text-neutral-400 transition-colors duration-300"
          >
            <span className="text-[11px] tracking-widest uppercase font-medium">
              Scroll or swipe to navigate services
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* ── Carousel with Floating Edge Navigation Buttons (reveal on hover) ── */}
      <div className="group relative w-full overflow-hidden">
        {/* Floating Left Navigation Button (reveals on hover, high contrast in both modes) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden items-center pl-3 sm:flex sm:pl-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border cursor-pointer active:scale-95 hover:scale-110 shadow-xl transition-all duration-300 opacity-0 -translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto bg-white/95 dark:bg-black/85 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-neutral-900 dark:hover:border-white"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Floating Right Navigation Button (reveals on hover, high contrast in both modes) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden items-center pr-3 sm:flex sm:pr-6">
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border cursor-pointer active:scale-95 hover:scale-110 shadow-xl transition-all duration-300 opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto bg-white/95 dark:bg-black/85 border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-neutral-900 dark:hover:border-white"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ── Interactive Track (Drag + Continuous Auto-Slide with Edge Fade Shadows) ── */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="cursor-grab active:cursor-grabbing select-none touch-pan-y"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          }}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-3 sm:gap-4 w-max pl-4 sm:pl-6 lg:pl-8 py-3 sm:py-4 will-change-transform"
          >
            {LOOP_DATA.map((service, index) => (
              <ServiceCard
                key={service.uid}
                service={service}
                entranceIndex={index % servicesSectionData.length}
                isActive={hoveredUid === service.uid}
                onMouseEnter={() => {
                  setHoveredUid(service.uid);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredUid(null);
                  setIsPaused(false);
                }}
                onClick={() => handleCardClick(service.uid)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Service Card (100% CSS/Tailwind theme-aware — zero hydration mismatch or theme lag)
───────────────────────────────────────── */
interface ServiceCardProps {
  service: ServiceItem;
  entranceIndex: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function ServiceCard({
  service,
  entranceIndex,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ServiceCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      data-service-card
      /* Entrance */
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      /* Hover lift */
      animate={{ y: isActive ? -8 : 0 }}
      transition={{
        opacity: {
          duration: 0.5,
          delay: Math.min(entranceIndex * 0.05, 0.38),
        },
        y: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      /* Fixed card dimensions — no layout shift on hover */
      className={`relative flex-shrink-0 w-[240px] h-[295px] sm:w-[290px] sm:h-[350px] lg:w-[310px] rounded-2xl overflow-hidden cursor-pointer select-none border-[1.5px] transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
        isActive
          ? "bg-white border-black/50 dark:border-white/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)]"
          : "bg-white dark:bg-[#080808] border-black/12 dark:border-white/22 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
      }`}
    >
      {/* ── Full-card background image (non-hovered state) ── */}
      <AnimatePresence initial={false}>
        {!isActive && (
          <motion.div
            key="bg-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 bg-white dark:bg-[#080808]"
          >
            {!imgError ? (
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 600px) 240px, 310px"
                onError={() => setImgError(true)}
                className="object-contain object-bottom grayscale invert brightness-105 dark:invert-0 dark:brightness-100 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-[#111] dark:to-[#1c1c1c]" />
            )}
            {/* Protective gradient overlay: preserves 100% text legibility in both modes */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_40%,rgba(255,255,255,0.8)_52%,rgba(255,255,255,0.25)_68%,transparent_82%)] dark:bg-[linear-gradient(to_bottom,#080808_0%,#080808_40%,rgba(8,8,8,0.8)_52%,rgba(8,8,8,0.25)_68%,transparent_82%)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Card content ── */}
      <div className="relative z-10 flex flex-col h-full p-4 sm:p-6">
        {/* Number + Category */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold tracking-wider transition-colors duration-300 ${
              isActive
                ? "text-neutral-950 dark:text-black"
                : "text-neutral-950 dark:text-white"
            }`}
          >
            {service.number}
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
              isActive
                ? "text-slate-500 dark:text-neutral-600"
                : "text-slate-500 dark:text-white/60"
            }`}
          >
            {service.category}
          </span>
        </div>

        {/* Divider */}
        <div
          className={`mt-3 h-px w-full transition-colors duration-300 ${
            isActive
              ? "bg-black/10 dark:bg-black/12"
              : "bg-black/8 dark:bg-white/16"
          }`}
        />

        {/* Title */}
        <motion.h3
          className={`mt-3 sm:mt-4 text-lg sm:text-2xl font-bold tracking-tight leading-[1.2] transition-colors duration-300 ${
            isActive
              ? "text-neutral-950 dark:text-black"
              : "text-neutral-950 dark:text-white"
          }`}
        >
          {service.title}
        </motion.h3>

        {/* Description — slides in on hover */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 sm:mt-3 text-[11.5px] sm:text-[13.5px] leading-relaxed line-clamp-4 sm:line-clamp-5 text-slate-700 dark:text-neutral-700 transition-colors duration-300"
            >
              {service.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Spacer pushes CTA to bottom */}
        <div className="flex-1" />

        {/* CTA — visible only on hover */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between pt-2 sm:pt-4 border-t border-black/10 transition-colors duration-300"
            >
              <Link
                href={service.href}
                className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-950 dark:text-black hover:opacity-70 transition-opacity duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                Explore service
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
              </Link>

              <Link
                href={service.href}
                aria-label={`Explore ${service.title}`}
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-950 dark:text-black border border-black/20 transition-all duration-200"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
