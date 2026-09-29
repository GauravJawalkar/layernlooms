"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SESSION_KEY = "lnl-preloaded";

type Phase = "count" | "exit" | "done";

export default function Preloader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("count");
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    // Skip on admin routes and on repeat visits within this session.
    let skip = pathname.startsWith("/admin");
    if (!skip) {
      try {
        skip = sessionStorage.getItem(SESSION_KEY) === "1";
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
    const duration = reduce ? 300 : 1700;
    const hold = reduce ? 0 : 250;

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
      const value = Math.round(eased * 100);
      if (numRef.current) numRef.current.textContent = String(value);
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
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

  if (phase === "done") return null;

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
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
          0
        </span>
        <span className="text-xl sm:text-2xl font-black text-muted-foreground">%</span>
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-[3px] w-56 sm:w-72 max-w-[70vw] overflow-hidden rounded-full bg-foreground/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-accent-current"
        />
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
        Loading Experience
      </p>
    </motion.div>
  );
}
