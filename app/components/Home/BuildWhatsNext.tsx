"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    value: 10,
    suffix: "+",
    label: "PROJECTS DELIVERED",
  },
  {
    value: 2,
    suffix: "+",
    label: "YEARS IN BUSINESS",
  },
  {
    value: 10,
    suffix: "+",
    label: "TEAM MEMBERS",
  },
  {
    value: 98,
    suffix: "%",
    label: "CLIENT SATISFACTION",
  },
];

/* ─────────────────────────────────────────
   Animated Spring Counter Component
───────────────────────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 60,
    damping: 18,
    duration: 1.6,
  });
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springVal]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   Build What's Next Component
   - Fully Transparent (no outer background, no border)
   - Scroll-linked parallax text motion effect
   - Animated scroll down indicator
───────────────────────────────────────── */
export default function BuildWhatsNext() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Multi-plane parallax translations as user scrolls down
  const yLine1 = useTransform(scrollYProgress, [0, 0.45, 1], [35, 0, -25]);
  const yLine2 = useTransform(scrollYProgress, [0, 0.45, 1], [60, 0, -45]);
  const titleScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.98]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.35, 1, 1, 0.45]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-transparent py-10 sm:py-16 overflow-hidden transition-colors duration-300"
    >
      {/* ── 1. Scroll-Linked Punchy Heading ── */}
      <div className="text-center px-4 pt-2 pb-8 sm:pb-12">
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative inline-block"
        >
          {/* Ambient center spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[200px] bg-neutral-300/10 dark:bg-white/[0.035] rounded-full blur-3xl pointer-events-none -z-10" />

          <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter text-neutral-950 dark:text-white leading-[0.96] sm:leading-[0.92] select-none transition-colors duration-300">
            {/* Line 1 with parallax */}
            <motion.span
              style={{ y: yLine1 }}
              className="block will-change-transform"
            >
              Let&apos;s Build
            </motion.span>

            {/* Line 2 with offset parallax */}
            <motion.span
              style={{ y: yLine2 }}
              className="block mt-1 sm:mt-2 text-neutral-800 dark:text-neutral-100 will-change-transform"
            >
              What&apos;s Next
            </motion.span>
          </h2>
        </motion.div>

        {/* ── Scroll Down Text Indicator ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-1.5 mt-8 sm:mt-10 select-none text-neutral-400 dark:text-neutral-500"
        >
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 stroke-[2.2]" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── 2. Subtle Horizontal Divider Line ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-8 sm:mb-12">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent origin-center"
        />
      </div>

      {/* ── 3. Four Stats Columns (Transparent, Clean, Responsive) ── */}
      <div className="mx-auto max-w-5xl px-1 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 items-center text-center">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center justify-center px-1.5 py-2.5 sm:p-3 transition-transform duration-300 hover:-translate-y-1 cursor-default select-none"
            >
              {/* Number with Animated Spring Counter */}
              <div className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold tracking-tight text-neutral-950 dark:text-white leading-none transition-colors duration-300">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* All-Caps Label */}
              <span className="mt-2 sm:mt-3.5 text-[clamp(0.53rem,2.4vw,0.72rem)] sm:text-[11px] md:text-xs font-bold tracking-[0.06em] sm:tracking-[0.18em] md:tracking-[0.25em] text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white uppercase whitespace-nowrap transition-colors duration-200">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
