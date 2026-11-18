"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  PenTool,
  Code2,
  ShieldCheck,
  CloudUpload,
  Settings,
  type LucideIcon,
} from "lucide-react";
import {
  processSectionData,
  type ProcessStep,
} from "@/app/data/processSectionData";

const ICON_MAP: Record<ProcessStep["iconName"], LucideIcon> = {
  lightbulb: Lightbulb,
  "pen-tool": PenTool,
  code: Code2,
  "shield-check": ShieldCheck,
  "cloud-upload": CloudUpload,
  settings: Settings,
};

const easing = [0.16, 1, 0.3, 1] as const;

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden py-12 transition-colors duration-300 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-9 flex flex-col gap-4 sm:mb-12 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: easing }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-neutral-950 transition-colors duration-300 dark:text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              Our Process
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-600 transition-colors duration-300 dark:text-neutral-400 sm:mt-4 sm:text-[15px]">
              A structured, transparent approach that takes your project from
              concept to launch and beyond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12, ease: easing }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-2 text-[10px] font-medium text-neutral-600 transition-colors duration-300 dark:border-white/10 dark:bg-neutral-950/70 dark:text-neutral-300 sm:gap-3 sm:px-4 sm:py-2.5 sm:text-xs"
          >
            <span className="font-mono font-semibold text-accent-current">01</span>
            <span className="h-px w-5 bg-neutral-300 dark:bg-neutral-700 sm:w-7" />
            <span className="font-mono font-semibold text-accent-current">06</span>
            <ArrowRight
              className="h-3 w-3 text-neutral-400 sm:h-3.5 sm:w-3.5"
              aria-hidden="true"
            />
            <span className="uppercase tracking-[0.12em]">End-to-end delivery</span>
          </motion.div>
        </div>

        {/* ── Timeline & Cards ── */}
        <div className="relative">
          {/* Vertical timeline line — mobile (< sm) */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-5 w-px bg-neutral-200 dark:bg-white/10 sm:hidden"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easing }}
              className="h-full w-full origin-top bg-accent-current"
            />
          </div>

          {/* Horizontal timeline line — xl+ */}
          <div
            aria-hidden="true"
            className="absolute left-[8.333%] right-[8.333%] top-5 hidden h-px bg-neutral-200 dark:bg-white/10 xl:block"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easing }}
              className="h-full w-full origin-left bg-accent-current"
            />
          </div>

          {/*
            Grid breakpoints:
            - mobile  (< 640px):  1 col  — vertical stack, cards are vertical
            - sm      (640px+):   1 col  — vertical stack, cards are horizontal
            - md      (768px+):   2 cols — compact grid
            - lg      (1024px+):  3 cols — mid-size grid
            - xl      (1280px+):  6 cols — full horizontal timeline
          */}
          <ol
            aria-label="Our six-step project process"
            className="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-0"
          >
            {processSectionData.map((step, index) => {
              const Icon = ICON_MAP[step.iconName];

              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: easing,
                  }}
                  className="relative min-w-0 pl-14 sm:pl-0 md:pl-0 xl:flex xl:flex-col xl:px-2 xl:pb-1 xl:pt-14"
                >
                  {/* Step number circle */}
                  <div
                    className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-current bg-white font-mono text-[11px] font-bold text-accent-current shadow-sm dark:bg-neutral-950 sm:relative sm:left-auto sm:top-auto sm:mx-auto sm:mb-3 sm:translate-y-0 md:mb-3 xl:absolute xl:left-1/2 xl:top-0 xl:mx-0 xl:mb-0 xl:-translate-x-1/2 xl:translate-y-0"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>

                  <ProcessCard step={step} Icon={Icon} />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  Icon,
}: {
  step: ProcessStep;
  Icon: LucideIcon;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      whileHover={{
        y: -4,
        boxShadow: "0 16px 36px -24px var(--accent-current)",
      }}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors duration-300 hover:border-accent-current dark:border-white/10 dark:bg-neutral-950 flex flex-col sm:flex-row sm:min-h-[140px] md:flex-col md:min-h-0 xl:flex-1 xl:flex-col xl:min-h-0"
    >
      {/* Image area */}
      <div
        className="relative shrink-0 overflow-hidden bg-white dark:bg-neutral-950 h-[140px] w-full sm:h-auto sm:min-h-[140px] sm:w-[34%] md:h-[120px] md:min-h-0 md:w-full lg:h-[132px] xl:h-[132px]"
      >
        {!imgError ? (
          <Image
            src={step.image}
            alt={`${step.title} process illustration`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 767px) 34vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 190px"
            className="object-contain p-2 rounded-2xl grayscale invert transition-transform duration-500 ease-out group-hover:scale-105 dark:invert-0"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-neutral-500">
            {step.number}
          </div>
        )}
      </div>

      {/* Text area */}
      <div className="flex min-w-0 flex-1 flex-col justify-center p-3.5 sm:p-4">
        <div className="mb-2 flex items-center gap-2 sm:mb-2.5">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-current-muted text-accent-current-muted-foreground">
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            Step {step.number}
          </span>
        </div>

        <h3 className="text-sm font-bold leading-snug tracking-tight text-neutral-950 dark:text-white sm:text-base md:text-[15px] xl:text-[15px]">
          {step.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 sm:mt-1.5 md:text-[12px] xl:text-[11px]">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}
