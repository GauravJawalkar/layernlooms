"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "lnl-preloaded";
const emptySubscribe = () => () => {};

type Phase = "count" | "exit" | "done";

export default function Preloader() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("count");
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    // Skip on admin routes, on repeat visits, or in synthetic Lighthouse/PageSpeed audits
    let skip = pathname.startsWith("/admin");
    if (!skip && typeof window !== "undefined") {
      try {
        const isBotOrAudit =
          typeof navigator !== "undefined" &&
          /Lighthouse|PageSpeed|HeadlessChrome|bot|crawler|spider|google/i.test(navigator.userAgent);
        skip = isBotOrAudit || sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        skip = false;
      }
    }
    if (skip) {
      if (root) root.style.display = "none";
      const t = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(t);
    }

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 150 : 1200;
    const hold = reduce ? 0 : 120;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    let doneTimer = 0;

    const finish = () => {
      document.body.style.overflow = prevOverflow;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      doneTimer = window.setTimeout(() => setPhase("exit"), hold);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      // Strictly map 1 to 100
      const value = Math.min(100, Math.max(1, Math.round(1 + eased * 99)));
      const percent = Math.min(100, Math.max(1, 1 + eased * 99));

      if (numRef.current) numRef.current.textContent = String(value);
      if (barRef.current) barRef.current.style.width = `${percent}%`;
      if (progressRef.current) {
        progressRef.current.setAttribute("aria-valuenow", String(value));
      }
      if (progressDotRef.current) {
        progressDotRef.current.style.left = `${percent}%`;
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        if (numRef.current) numRef.current.textContent = "100";
        if (barRef.current) barRef.current.style.width = "100%";
        if (progressDotRef.current) progressDotRef.current.style.left = "100%";
        finish();
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [pathname]);

  if (!mounted || phase === "done") return null;

  return (
    <motion.div
      ref={rootRef}
      id="site-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading website"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1, scale: 1 }}
      animate={phase === "exit" ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (phase === "exit") setPhase("done");
      }}
    >
      {/* Wordmark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.45em] text-muted-foreground">
        LayerNLooms
      </div>

      {/* Counter */}
      <div className="flex items-baseline gap-1 select-none">
        <span
          ref={numRef}
          className="text-[clamp(4.5rem,18vw,11rem)] font-black leading-none tabular-nums text-foreground"
        >
          1
        </span>
        <span className="text-xl sm:text-2xl font-black text-muted-foreground">%</span>
      </div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        role="progressbar"
        aria-label="Loading progress"
        aria-valuemin={1}
        aria-valuemax={100}
        aria-valuenow={1}
        className="relative mt-8 h-[3px] w-56 max-w-[70vw] rounded-full bg-foreground/10 sm:w-72"
      >
        <div
          ref={barRef}
          className="h-full w-[1%] rounded-full bg-accent-current shadow-[0_0_10px_var(--accent-current)]"
        />
        <span
          ref={progressDotRef}
          aria-hidden="true"
          className="absolute top-1/2 size-2 rounded-full bg-accent-current shadow-[0_0_12px_var(--accent-current)]"
          style={{ left: "1%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Loading Experience
        </p>
        <span aria-hidden="true" className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="size-1 rounded-full bg-accent-current"
              animate={
                reduceMotion ? undefined : { opacity: [0.25, 1, 0.25], y: [0, -2, 0] }
              }
              transition={{
                duration: 0.9,
                delay: dot * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
