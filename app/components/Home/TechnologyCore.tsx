"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// ─── LOGO COMPONENTS ───

// Modern Frontend Switch Icon
function FrontendIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center shrink-0 border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-900/40 rounded-xl text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="3" width="8" height="18" rx="4" />
        <line x1="12" y1="7" x2="12" y2="17" />
        <circle cx="12" cy="10" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}

// Intelligent Systems Network Hub Icon
function IntelligentIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center shrink-0 border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-900/40 rounded-xl text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="12" cy="6" r="3" />
        <line x1="12" y1="9" x2="12" y2="12" />
        <line x1="8.1" y1="15.9" x2="12" y2="12" />
        <line x1="15.9" y1="15.9" x2="12" y2="12" />
      </svg>
    </div>
  );
}

// Cloud Scale Server Rack Icon
function CloudScaleIcon() {
  return (
    <div className="w-12 h-12 flex items-center justify-center shrink-0 border border-neutral-200/80 dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-900/40 rounded-xl text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="18" height="4" rx="1" />
        <circle cx="6.5" cy="6" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="12" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="18" r="0.5" fill="currentColor" />
        <line x1="11" y1="6" x2="17" y2="6" />
        <line x1="11" y1="12" x2="17" y2="12" />
        <line x1="11" y1="18" x2="17" y2="18" />
      </svg>
    </div>
  );
}

// ─── STACKS DATA ───
const stackItems = [
  {
    id: "frontend",
    title: "Modern Frontend",
    description: "Custom interfaces engineered with React 19 and Next.js for high-performance page loads, SEO excellence, and fluid user experience.",
    logo: FrontendIcon,
    tags: ["React 19 / Next.js", "Framer Motion", "TailwindCSS"],
  },
  {
    id: "backend",
    title: "Intelligent Systems",
    description: "Production-grade artificial intelligence pipelines, custom natural language agents, and automated analytics models.",
    logo: IntelligentIcon,
    tags: ["LLM Orchestration", "Predictive Models", "RAG Pipelines"],
  },
  {
    id: "cloud",
    title: "Cloud Scale",
    description: "High-concurrency serverless services and API endpoints utilizing microservices architecture for massive scalability.",
    logo: CloudScaleIcon,
    tags: ["Serverless & Microservices", "CI/CD Deployment", "Containerization"],
  },
];

export default function TechnologyCore() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Reusable Card Component with Glassmorphism
  const renderCard = (item: typeof stackItems[0], index: number) => {
    const LogoComponent = item.logo;
    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.55,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        onMouseEnter={() => setHoveredCard(item.id)}
        onMouseLeave={() => setHoveredCard(null)}
        className="group relative rounded-2xl border border-neutral-300 dark:border-white/[0.08] bg-gradient-to-br from-white/90 to-neutral-50/90 dark:from-neutral-900 dark:to-neutral-950 backdrop-blur-md p-5 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-colors duration-300 hover:border-neutral-400 dark:hover:border-white/25 flex flex-col justify-start cursor-default overflow-hidden no-snap w-full"
      >
        {/* 1. Logo and Arrow Row */}
        <div className="flex justify-between items-start w-full">
          <LogoComponent />
          <span className="text-neutral-400 dark:text-neutral-600 transition-colors group-hover:text-neutral-900 dark:group-hover:text-white text-lg font-normal cursor-pointer select-none">
            ↗
          </span>
        </div>

        {/* 2. Content */}
        <div className="mt-5 sm:mt-6">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
            {item.title}
          </h3>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors duration-300 md:min-h-[72px]">
            {item.description}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Built on a foundation of fast, production-grade{" "}
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent font-extrabold">
              technology
            </span>
          </h2>
        </motion.div>

        {/* Desktop Circuit Visualization Block (hidden on mobile) */}
        <div className="relative hidden lg:block h-[200px] max-w-5xl mx-auto mt-12">
          {/* Centered Microchip (Technology Core / Powered By) */}
          <div className="absolute top-[30px] left-1/2 -translate-x-1/2 z-20 w-[240px] h-[60px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-950 p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-white dark:bg-neutral-900/95 flex flex-col items-center justify-center px-4 select-none">
              <span className="text-[9px] font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">Technology Core</span>
              <span className="text-xs font-semibold tracking-[0.05em] text-neutral-800 dark:text-neutral-200 mt-0.5 flex items-center gap-1.5">
                Powered By
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
              </span>
            </div>
          </div>

          {/* SVG Connecting Paths */}
          <svg className="absolute inset-0 w-full h-full max-w-5xl mx-auto" viewBox="0 0 1000 200" fill="none">
            {/* Metallic definition gradients */}
            <defs>
              <linearGradient id="metallic-pin" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--border)" />
                <stop offset="50%" stopColor="var(--muted-foreground)" />
                <stop offset="100%" stopColor="var(--border)" />
              </linearGradient>
              <linearGradient id="metallic-pin-h" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--border)" />
                <stop offset="50%" stopColor="var(--muted-foreground)" />
                <stop offset="100%" stopColor="var(--border)" />
              </linearGradient>
              <linearGradient id="circuitPulseBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--foreground)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Pins on the Top (6 pins) */}
            <rect x="417" y="20" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="449" y="20" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="481" y="20" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="513" y="20" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="545" y="20" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="577" y="20" width="6" height="10" rx="1" fill="url(#metallic-pin)" />

            {/* Pins on the Bottom (6 pins) */}
            <rect x="417" y="90" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="449" y="90" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="481" y="90" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="513" y="90" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="545" y="90" width="6" height="10" rx="1" fill="url(#metallic-pin)" />
            <rect x="577" y="90" width="6" height="10" rx="1" fill="url(#metallic-pin)" />

            {/* Pins on the Left (2 pins) */}
            <rect x="380" y="45" width="10" height="6" rx="1" fill="url(#metallic-pin-h)" />
            <rect x="380" y="69" width="10" height="6" rx="1" fill="url(#metallic-pin-h)" />

            {/* Pins on the Right (2 pins) */}
            <rect x="610" y="45" width="10" height="6" rx="1" fill="url(#metallic-pin-h)" />
            <rect x="610" y="69" width="10" height="6" rx="1" fill="url(#metallic-pin-h)" />

            {/* Top decorative traces and contact pads */}
            <path d="M 420,20 L 420,4 Q 420,0 405,0 L 100,0" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="100" cy="4" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            <path d="M 580,20 L 580,4 Q 580,0 595,0 L 900,0" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="900" cy="4" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            <path d="M 452,20 L 452,0" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 548,20 L 548,0" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 484,20 L 484,0" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 516,20 L 516,0" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Side decorative traces and contact pads */}
            <path d="M 380,48 L 50,48" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="48" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            <path d="M 380,72 L 80,72" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="80" cy="72" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            <path d="M 620,48 L 950,48" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="950" cy="48" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            <path d="M 620,72 L 920,72" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="920" cy="72" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            {/* Bottom decorative traces and contact pads */}
            <path d="M 420,100 L 420,115 Q 420,130 405,130 L 320,130" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="320" cy="130" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            <path d="M 580,100 L 580,115 Q 580,130 595,130 L 680,130" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="680" cy="130" r="3.5" className="stroke-neutral-200/80 dark:stroke-neutral-800 fill-white dark:fill-black" strokeWidth="1.5" />

            {/* Gray Static Circuit Lines (Background connectors to cards) */}
            <path d="M 452,100 L 452,115 Q 452,135 432,135 L 186.6,135 Q 166.6,135 166.6,155 L 166.6,200" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 484,100 L 484,112 Q 484,120 492,120 Q 500,120 500,128 L 500,200" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 548,100 L 548,115 Q 548,135 568,135 L 813.3,135 Q 833.3,135 833.3,155 L 833.3,200" stroke="currentColor" className="text-neutral-200/80 dark:text-neutral-800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Glowing Active path on hover (Monochromatic) */}
            <motion.path
              d="M 452,100 L 452,115 Q 452,135 432,135 L 186.6,135 Q 166.6,135 166.6,155 L 166.6,200"
              stroke="currentColor"
              className="text-neutral-400 dark:text-white/40"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredCard === "frontend" ? 0.95 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M 484,100 L 484,112 Q 484,120 492,120 Q 500,120 500,128 L 500,200"
              stroke="currentColor"
              className="text-neutral-400 dark:text-white/40"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredCard === "backend" ? 0.95 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M 548,100 L 548,115 Q 548,135 568,135 L 813.3,135 Q 833.3,135 833.3,155 L 833.3,200"
              stroke="currentColor"
              className="text-neutral-400 dark:text-white/40"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredCard === "cloud" ? 0.95 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* ─── ANIMATED DATA PULSE STREAMS (Smooth Framer Motion) ─── */}
            <motion.path
              d="M 452,100 L 452,115 Q 452,135 432,135 L 186.6,135 Q 166.6,135 166.6,155 L 166.6,200"
              stroke="url(#circuitPulseBeam)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40 220"
              animate={{ strokeDashoffset: [260, -260] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
            />
            <motion.path
              d="M 484,100 L 484,112 Q 484,120 492,120 Q 500,120 500,128 L 500,200"
              stroke="url(#circuitPulseBeam)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="30 180"
              animate={{ strokeDashoffset: [210, -210] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.8, ease: "linear" }}
            />
            <motion.path
              d="M 548,100 L 548,115 Q 548,135 568,135 L 813.3,135 Q 833.3,135 833.3,155 L 833.3,200"
              stroke="url(#circuitPulseBeam)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40 220"
              animate={{ strokeDashoffset: [260, -260] }}
              transition={{ repeat: Infinity, duration: 3.2, delay: 1.4, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Mobile Microchip Indicator (Mobile only) */}
        <div className="lg:hidden flex flex-col items-center max-w-md mx-auto mt-8 mb-6">
          <div className="z-10 w-[240px] h-[60px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-950 p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-white dark:bg-neutral-900/95 flex flex-col items-center justify-center px-4 select-none">
              <span className="text-[9px] font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">Technology Core</span>
              <span className="text-xs font-semibold tracking-[0.05em] text-neutral-800 dark:text-neutral-200 mt-0.5 flex items-center gap-1.5">
                Powered By
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        {/* Unified Cards Grid (Rendered once in DOM, responsive for mobile & desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-md md:max-w-5xl mx-auto mt-6 lg:mt-0">
          {stackItems.map((item, index) => renderCard(item, index))}
        </div>
      </div>
    </section>
  );
}
