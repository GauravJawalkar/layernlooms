"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Cpu,
  Activity,
  Terminal,
  TrendingUp,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Elegant White & Grey Corner Glow (Subtle blur, soft blending, no interference) ─── */
function CornerMonochromeGlow() {
  return (
    <>
      {/* 1. Soft ambient monochrome radial glow - smoothly dissolves into background */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl select-none z-0"
        style={{
          background:
            "radial-gradient(circle at 65% 65%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 68%)",
        }}
      />

      {/* 2. Softened silver/white contoured curves with subtle opacity & smooth gradient fade */}
      <svg
        className="pointer-events-none absolute bottom-0 right-0 w-44 h-44 select-none z-0 overflow-visible opacity-55 dark:opacity-65 transition-opacity duration-300 group-hover:opacity-85"
        viewBox="0 0 160 160"
        fill="none"
      >
        <path
          d="M 160,35 Q 105,105 32,160"
          stroke="url(#silverGlowGradient1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 160,65 Q 120,120 68,160"
          stroke="url(#silverGlowGradient2)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="silverGlowGradient1"
            x1="160"
            y1="35"
            x2="32"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#d4d4d8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#71717a" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="silverGlowGradient2"
            x1="160"
            y1="65"
            x2="68"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#d4d4d8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#71717a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}

/* ─── 01. Trust & Transparency Visual ─── */
function TrustVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-neutral-300/70 dark:border-white/10 bg-neutral-100/60 dark:bg-black/40 p-3.5 flex flex-col justify-between backdrop-blur-md">
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-b border-neutral-200/80 dark:border-white/10 pb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
          <span className="text-neutral-800 dark:text-neutral-300">Audit Status: Verified</span>
        </span>
        <span className="text-neutral-950 dark:text-white font-semibold">100% IP</span>
      </div>

      <div className="space-y-1.5 pt-2.5">
        {[
          { label: "Source Code Ownership", val: "Client Owned" },
          { label: "Engineering Telemetry", val: "Live Slack Sync" },
          { label: "Deploy Pipeline", val: "Direct Access" },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ delay: idx * 0.04, duration: 0.2 }}
            className="flex items-center justify-between gap-2 text-xs px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-white/[0.03] border border-neutral-200/70 dark:border-white/5"
          >
            <span className="text-neutral-600 dark:text-neutral-400 font-medium text-[10px] sm:text-[11px] truncate">
              {item.label}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-neutral-950 dark:text-white shrink-0">
              <CheckCircle2 className="w-3 h-3 text-neutral-400 dark:text-neutral-200 shrink-0" />
              {item.val}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── 02. Innovation First Visual (Neural Synapse Matrix) ─── */
function InnovationVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[130px] sm:h-[155px] overflow-hidden rounded-xl border border-neutral-300/70 dark:border-white/10 bg-neutral-100/60 dark:bg-black/40 flex items-center justify-center backdrop-blur-md px-4">
      <svg className="w-full h-full max-w-[420px]" viewBox="0 0 340 110" fill="none">
        {/* Curved Synapse Connections */}
        <path
          d="M 40,55 Q 90,15 170,55 T 300,55"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-300 dark:text-neutral-800"
        />
        <path
          d="M 40,55 Q 90,95 170,55 T 300,55"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-300 dark:text-neutral-800"
        />
        <path
          d="M 90,30 L 250,80"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          className="text-neutral-300 dark:text-neutral-800"
        />
        <path
          d="M 90,80 L 250,30"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          className="text-neutral-300 dark:text-neutral-800"
        />

        {/* Dynamic Traveling Synapse Pulse */}
        <motion.circle
          r="3.5"
          className="fill-neutral-950 dark:fill-white"
          animate={{
            cx: isHovered ? [40, 170, 300] : [40, 300],
            cy: isHovered ? [55, 30, 55] : [55, 55],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* Neural Nodes */}
        {[
          { cx: 40, cy: 55, r: 5 },
          { cx: 95, cy: 30, r: 5 },
          { cx: 95, cy: 80, r: 5 },
          { cx: 170, cy: 55, r: 9, isCenter: true },
          { cx: 245, cy: 30, r: 5 },
          { cx: 245, cy: 80, r: 5 },
          { cx: 300, cy: 55, r: 5 },
        ].map((node, i) => (
          <g key={i}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className={`${
                node.isCenter
                  ? "fill-neutral-900 dark:fill-white shadow-lg"
                  : "fill-white dark:fill-neutral-900 stroke-neutral-400 dark:stroke-neutral-700 stroke-[1.5]"
              }`}
            />
            {node.isCenter && (
              <>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="16"
                  className="stroke-neutral-900/30 dark:stroke-white/30 fill-none stroke-[1] animate-ping"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="13"
                  className="stroke-neutral-900/40 dark:stroke-white/40 fill-none stroke-[1]"
                />
              </>
            )}
          </g>
        ))}
      </svg>

      <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <span>Neural Pipeline</span>
        <span className="text-neutral-950 dark:text-white font-semibold">LLM + Agentic Core</span>
      </div>
    </div>
  );
}

/* ─── 03. Uncompromising Reliability Visual (Oscilloscope Heartbeat) ─── */
function ReliabilityVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-neutral-300/70 dark:border-white/10 bg-neutral-100/60 dark:bg-black/40 p-3.5 flex flex-col justify-between backdrop-blur-md h-[130px] sm:h-[155px]">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-muted-foreground flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
          <span className="text-neutral-800 dark:text-neutral-300">Cluster: Operational</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-white/10 text-neutral-950 dark:text-white font-bold text-[10px]">
          99.99%
        </span>
      </div>

      {/* Real-time Oscilloscope Wave */}
      <div className="relative h-14 w-full flex items-center my-auto">
        <svg className="w-full h-full" viewBox="0 0 240 50" fill="none">
          <defs>
            <linearGradient id="ecgPulseBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--foreground)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="zipPointGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Base ECG Waveform (Single authentic pulse matching reference) */}
          <path
            d="M 0,25 L 70,25 L 75,28 L 84,7 L 94,43 L 104,15 L 112,28 L 118,25 L 240,25"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-950 dark:text-white"
          />

          {/* 2. Traveling Electrical Pulse Beam along the exact waveform path */}
          <motion.path
            d="M 0,25 L 70,25 L 75,28 L 84,7 L 94,43 L 104,15 L 112,28 L 118,25 L 240,25"
            stroke="url(#ecgPulseBeam)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="45 200"
            animate={{ strokeDashoffset: [245, -245] }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 2 : 3,
              ease: "linear",
            }}
          />

          {/* 3. Zip Point - Ambient Glow Aura */}
          <circle
            cx="70"
            cy="25"
            r="12"
            fill="url(#zipPointGlow)"
            className="pointer-events-none"
          />

          {/* 4. Zip Point - Pulsing Radar Ping Ring */}
          <motion.circle
            cx="70"
            cy="25"
            r="7"
            className="stroke-neutral-900/40 dark:stroke-white/50 fill-none stroke-[1]"
            animate={{ r: [5, 11, 5], opacity: [0.8, 0.15, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />

          {/* 5. Zip Point - Solid Marker firmly anchored directly on the line */}
          <circle
            cx="70"
            cy="25"
            r="3.5"
            className="fill-neutral-950 dark:fill-white"
          />
          <circle
            cx="70"
            cy="25"
            r="1.4"
            className="fill-white dark:fill-neutral-900"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] font-mono text-muted-foreground border-t border-neutral-200/70 dark:border-white/10 pt-2">
        <span className="truncate">Global P99 Latency: 18ms</span>
        <span className="text-neutral-900 dark:text-neutral-200 font-semibold shrink-0">0 Incidents</span>
      </div>
    </div>
  );
}

/* ─── 04. Deep Technical Expertise Visual (Terminal Config) ─── */
function ExpertiseVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-neutral-300/70 dark:border-white/10 bg-neutral-950 text-neutral-200 p-3 font-mono text-[11px] flex flex-col justify-between shadow-inner h-[130px] sm:h-[155px]">
      {/* Title Bar with Mac Dots */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[10px] text-neutral-500">architecture.config.ts</span>
      </div>

      {/* Code Snippet */}
      <div className="space-y-0.5 py-1 text-[10px] sm:text-[11px] leading-relaxed select-none overflow-x-auto">
        <div>
          <span className="text-purple-400">export const</span>{" "}
          <span className="text-blue-400">System</span> = {"{"}
        </div>
        <div className="pl-3.5">
          <span className="text-neutral-400">engineers:</span>{" "}
          <span className="text-amber-300">&quot;Senior Staff Only&quot;</span>,
        </div>
        <div className="pl-3.5">
          <span className="text-neutral-400">typeSafety:</span>{" "}
          <span className="text-emerald-400">true</span>,
        </div>
        <div>{"};"}</div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-500 border-t border-neutral-800 pt-1.5">
        <span>✓ 0 errors, 0 warnings</span>
        <span className="text-neutral-400">TypeScript 5.7</span>
      </div>
    </div>
  );
}

/* ─── 06. Security & Compliance Visual (Matching Reference Card 06) ─── */
function SecurityVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-neutral-300/70 dark:border-white/10 bg-neutral-100/60 dark:bg-black/40 p-3 sm:p-4 flex items-center justify-between gap-2 backdrop-blur-md h-[130px] sm:h-[155px]">
      {/* Left: Shield Icon with Corner Brackets */}
      <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-neutral-400 dark:border-neutral-600" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-neutral-400 dark:border-neutral-600" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-neutral-400 dark:border-neutral-600" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-neutral-400 dark:border-neutral-600" />

        <motion.div
          animate={{ scale: isHovered ? [1, 1.06, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center shadow-lg"
        >
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-950 dark:text-white" />
        </motion.div>
      </div>

      {/* Right: Security Checklist (Clean Monochrome) */}
      <div className="flex flex-col justify-center gap-1.5 sm:gap-2 pl-1 sm:pl-3 min-w-0 text-xs font-medium text-neutral-800 dark:text-neutral-200">
        <div className="inline-flex items-center gap-1.5 sm:gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-200 shrink-0" />
          <span className="text-[10.5px] sm:text-[11px] font-semibold truncate">SOC2 Ready</span>
        </div>
        <div className="inline-flex items-center gap-1.5 sm:gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-200 shrink-0" />
          <span className="text-[10.5px] sm:text-[11px] font-semibold truncate">AES-256 Encryption</span>
        </div>
        <div className="inline-flex items-center gap-1.5 sm:gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-200 shrink-0" />
          <span className="text-[10.5px] sm:text-[11px] font-semibold truncate">Automated Security Audits</span>
        </div>
      </div>
    </div>
  );
}

/* ─── 05. Built to Scale Effortlessly Visual (Chart in Card 05) ─── */
function GrowthVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-neutral-300/70 dark:border-white/10 bg-neutral-100/60 dark:bg-black/40 p-3 sm:p-4 flex flex-col justify-between backdrop-blur-md h-[130px] sm:h-[155px]">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-muted-foreground">Throughput Elasticity</span>
        <span className="text-neutral-950 dark:text-white font-bold">10x Scale</span>
      </div>

      {/* Scalability Curve */}
      <div className="relative h-16 w-full flex items-end my-1">
        <svg className="w-full h-full" viewBox="0 0 240 60" fill="none">
          <path
            d="M 10,55 Q 80,50 140,28 T 230,8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-neutral-950 dark:text-white"
          />
        </svg>

        <motion.div
          animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute right-2 top-1.5 w-3 h-3 rounded-full bg-neutral-950 dark:bg-white flex items-center justify-center shadow-md"
        >
          <div className="w-1 h-1 rounded-full bg-white dark:bg-neutral-950" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] font-mono text-muted-foreground border-t border-neutral-200/70 dark:border-white/10 pt-2">
        <span className="truncate">Zero Performance Degradation</span>
        <span className="text-neutral-950 dark:text-white font-semibold shrink-0">+100k Concurrent</span>
      </div>
    </div>
  );
}

/* ─── Main WhyChooseUs Section (Matching Exact Bento Grid from Image) ─── */
export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-8 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (Matching The Way We Build style exactly) ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-neutral-950 dark:text-white transition-colors duration-300">
              Why Choose Us
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] max-w-lg leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal transition-colors duration-300">
              Our core values guide every architectural decision, sprint delivery, and commitment to engineering excellence.
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
              6 Pillars of Excellence
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>

        {/* ── Exact Bento Grid Layout from Reference Screenshot ── */}
        <div className="space-y-4 sm:space-y-6">
          {/* ══════════════════════════════════════════════════════════
              ROW 1: Card 01 (5 cols) + Card 02 (7 cols - Wide)
             ══════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Card 01: Trust & Transparency (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              onMouseEnter={() => setHoveredCard("01")}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-300/80 dark:border-white/10 bg-card/90 dark:bg-[#0c0c0c]/95 p-4 sm:p-7 overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-white/25 shadow-sm hover:shadow-xl lg:col-span-5"
            >
              <CornerMonochromeGlow />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    01 / TRANSPARENCY
                  </span>
                  <div className="w-7 h-7 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                </div>

                <TrustVisual isHovered={hoveredCard === "01"} />
              </div>

              <div className="relative z-10 mt-4 sm:mt-5 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  Trust & Transparency
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal">
                  Complete visibility into every sprint, commit, and architectural decision. No black boxes, hidden markups, or vendor lock-in — you own 100% of your intellectual property and source code from day one.
                </p>
              </div>
            </motion.div>

            {/* Card 02: Innovation First (7 Cols - Wide) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onMouseEnter={() => setHoveredCard("02")}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-300/80 dark:border-white/10 bg-card/90 dark:bg-[#0c0c0c]/95 p-4 sm:p-7 overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-white/25 shadow-sm hover:shadow-xl lg:col-span-7"
            >
              <CornerMonochromeGlow />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    02 / AI & VELOCITY
                  </span>
                  <div className="w-7 h-7 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>

                <InnovationVisual isHovered={hoveredCard === "02"} />
              </div>

              <div className="relative z-10 mt-4 sm:mt-5 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  Innovation First
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal">
                  We pioneer production-grade generative AI, intelligent agents, and next-generation frameworks to build software that outpaces market standards and delivers unfair competitive advantages.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              ROW 2: Card 03 + Card 04 + Card 06 (3 Equal Columns)
             ══════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 03: Uncompromising Reliability */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onMouseEnter={() => setHoveredCard("03")}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-300/80 dark:border-white/10 bg-card/90 dark:bg-[#0c0c0c]/95 p-4 sm:p-7 overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-white/25 shadow-sm hover:shadow-xl"
            >
              <CornerMonochromeGlow />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    03 / SYSTEM RIGOR
                  </span>
                  <div className="w-7 h-7 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                </div>

                <ReliabilityVisual isHovered={hoveredCard === "03"} />
              </div>

              <div className="relative z-10 mt-4 sm:mt-5 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  Uncompromising Reliability
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal">
                  Engineered for mission-critical uptime under demanding real-world workloads. Clean architectures, automated failover pipelines, and zero-downtime CI/CD that you can bank on.
                </p>
              </div>
            </motion.div>

            {/* Card 04: Deep Technical Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseEnter={() => setHoveredCard("04")}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-300/80 dark:border-white/10 bg-card/90 dark:bg-[#0c0c0c]/95 p-4 sm:p-7 overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-white/25 shadow-sm hover:shadow-xl"
            >
              <CornerMonochromeGlow />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    04 / SENIOR TALENT
                  </span>
                  <div className="w-7 h-7 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                </div>

                <ExpertiseVisual />
              </div>

              <div className="relative z-10 mt-4 sm:mt-5 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  Deep Technical Expertise
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal">
                  No junior delegation. Your product is engineered by seasoned specialists with proven track records across distributed systems, modern web platforms, and large-scale cloud infrastructure.
                </p>
              </div>
            </motion.div>

            {/* Card 06: Security & Compliance (Right on Row 2) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              onMouseEnter={() => setHoveredCard("06")}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-300/80 dark:border-white/10 bg-card/90 dark:bg-[#0c0c0c]/95 p-4 sm:p-7 overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-white/25 shadow-sm hover:shadow-xl md:col-span-2 lg:col-span-1"
            >
              <CornerMonochromeGlow />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    06 / ZERO-TRUST DEFENSE
                  </span>
                  <div className="w-7 h-7 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                </div>

                <SecurityVisual isHovered={hoveredCard === "06"} />
              </div>

              <div className="relative z-10 mt-4 sm:mt-5 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  Security & Compliance
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal">
                  Enterprise-grade defense woven into every layer. End-to-end cryptographic encryption, SOC2-ready protocols, automated dependency audits, and proactive vulnerability scanning.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              ROW 3: Card 05 (Full Width Horizontal Card)
             ══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => setHoveredCard("05")}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative rounded-2xl sm:rounded-3xl border border-neutral-300/80 dark:border-white/10 bg-card/90 dark:bg-[#0c0c0c]/95 p-4 sm:p-7 overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-white/25 shadow-sm hover:shadow-xl"
          >
            <CornerMonochromeGlow />

            {/* Top row with Tag and Icon */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                05 / HYPER-GROWTH
              </span>
              <div className="w-7 h-7 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Horizontal 2-Column Split matching reference screenshot */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
              <div className="lg:col-span-5">
                <GrowthVisual isHovered={hoveredCard === "05"} />
              </div>
              <div className="lg:col-span-7 space-y-2.5 lg:pl-4">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
                  Built to Scale Effortlessly
                </h3>
                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal max-w-2xl">
                  Architectures designed from inception to absorb 10x traffic surges and expanding user bases with sub-50ms global response times and predictable infrastructure costs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
