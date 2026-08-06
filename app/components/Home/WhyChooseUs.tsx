"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeColors = {
  zinc: "#a1a1aa",
  purple: "#a78bfa",
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#fb923c",
  pink: "#f472b6",
};

const reasons = [
  {
    type: "trust",
    title: "Trust & Transparency",
    description: "Building lasting relationships through complete transparency, open communication, and dependable engineering. We align our goals with yours to create a foundation of mutual growth and shared success.",
  },
  {
    type: "innovation",
    title: "Innovation First",
    description: "Embracing cutting-edge creativity and advanced AI in every project we deliver. We challenge the status quo to build future-ready, high-impact solutions that set new benchmarks.",
  },
  {
    type: "reliability",
    title: "Uncompromising Reliability",
    description: "Delivering consistent engineering quality and robust architecture you can always count on. We build clean, battle-tested software designed to scale effortlessly under demanding workloads.",
  },
  {
    type: "expertise",
    title: "Deep Expertise",
    description: "Bringing deep industry knowledge and specialized skills to every custom solution. Our seasoned team applies proven design patterns and modern frameworks to solve complex challenges.",
  },
  {
    type: "growth",
    title: "Driven by Growth",
    description: "Empowering you to scale operations, reach new heights, and exceed market expectations. We engineer flexible digital systems built to evolve alongside your expanding vision.",
  },
  {
    type: "security",
    title: "Security & Compliance",
    description: "Shielding your product with enterprise-grade security, compliance-ready architecture, and proactive monitoring layered into every stage of development.",
  },
];

// MICRO-ANIMATED DETAILED ICON COMPONENTS

// VECTOR ILLUSTRATION COMPONENTS

function TrustIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[90px] sm:h-[110px]">
        {/* Capsule 1 (back) */}
        <motion.div
          animate={{ y: isHovered ? -4 : 0, opacity: isHovered ? 0.6 : 0.4 }}
          className="absolute top-2 left-6 w-[120px] h-8 rounded-full bg-neutral-200/10 dark:bg-neutral-800/10 border border-neutral-200/10 dark:border-white/5 flex items-center px-3 gap-2"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="w-16 h-1.5 rounded-full bg-neutral-350 dark:bg-neutral-700" />
        </motion.div>
        {/* Capsule 2 (middle) */}
        <motion.div
          animate={{ y: isHovered ? 2 : 0, x: isHovered ? 4 : 0 }}
          className="absolute top-10 left-10 w-[120px] h-8 rounded-full bg-neutral-200/20 dark:bg-neutral-800/20 border border-neutral-200/15 dark:border-white/10 flex items-center px-3 gap-2 shadow-lg"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
          <div className="w-16 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </motion.div>
        {/* Capsule 3 (front) */}
        <motion.div
          animate={{ scale: isHovered ? 1.04 : 1, y: isHovered ? -2 : 0 }}
          className="absolute top-6 left-2 w-[130px] h-9 rounded-full bg-white dark:bg-zinc-900 border flex items-center px-3 gap-2 shadow-xl"
          style={{ borderColor: `${color}30` }}
        >
          <motion.div
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: color }}
          >
            <svg className="w-2.5 h-2.5 text-white dark:text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: `${color}40` }} />
        </motion.div>
      </div>
    </div>
  );
}

function InnovationIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[100px] sm:h-[120px]">
        {/* Document 1 (back left) */}
        <motion.div
          animate={{ rotate: isHovered ? -12 : -8, x: isHovered ? -8 : 0 }}
          className="absolute top-3 left-4 w-[65px] h-[85px] rounded-lg bg-neutral-200/10 dark:bg-neutral-800/10 border border-neutral-200/10 dark:border-white/5 p-2"
        >
          <div className="w-8 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2" />
          <div className="w-6 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2" />
        </motion.div>
        {/* Document 2 (back right) */}
        <motion.div
          animate={{ rotate: isHovered ? 12 : 8, x: isHovered ? 8 : 0 }}
          className="absolute top-3 left-22 w-[65px] h-[85px] rounded-lg bg-neutral-200/10 dark:bg-neutral-800/10 border border-neutral-200/10 dark:border-white/5 p-2"
        >
          <div className="w-8 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2" />
          <div className="w-6 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2" />
        </motion.div>
        {/* Document 3 (front center) */}
        <motion.div
          animate={{ y: isHovered ? -4 : 0, scale: isHovered ? 1.02 : 1 }}
          className="absolute top-5 left-[55px] w-[70px] h-[90px] rounded-lg bg-white dark:bg-zinc-900 border p-2 shadow-2xl flex flex-col justify-between"
          style={{ borderColor: `${color}30` }}
        >
          <div>
            <div className="w-8 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2" />
            <div className="w-6 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-1.5" />
          </div>
          <div className="flex justify-end">
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
              <Check className="w-2.5 h-2.5" style={{ color: color }} />
            </div>
          </div>
        </motion.div>
        {/* Magnifying glass floating */}
        <motion.div
          animate={{ 
            y: isHovered ? [0, -3, 0] : 0,
            rotate: isHovered ? 10 : 0
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute bottom-2 right-4 w-8 h-8 rounded-full bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-lg"
          style={{ borderColor: `${color}30` }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function ReliabilityIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[90px] sm:h-[110px]">
        {/* Star Rating Card */}
        <motion.div
          animate={{ x: isHovered ? -3 : 0, y: isHovered ? -1 : 0 }}
          className="absolute top-2 left-2 w-[110px] h-[40px] rounded-xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 p-2 shadow-lg flex flex-col justify-between"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ color: color }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <div className="w-12 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </motion.div>

        {/* Folder Icon Card */}
        <motion.div
          animate={{ scale: isHovered ? 1.04 : 1, rotate: isHovered ? 3 : 0 }}
          className="absolute top-6 right-2 w-[45px] h-[45px] rounded-xl bg-white dark:bg-zinc-900 border flex flex-col items-center justify-center shadow-xl"
          style={{ borderColor: `${color}25` }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </motion.div>

        {/* Document Tag Card */}
        <motion.div
          animate={{ y: isHovered ? 1 : 0 }}
          className="absolute bottom-2 left-8 w-[80px] h-7 rounded-lg bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 flex items-center px-2 gap-1.5 shadow-md"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="w-8 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </motion.div>
      </div>
    </div>
  );
}

function ExpertiseIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[100px] sm:h-[120px] flex items-center justify-center">
        {/* Isometric stacked layers */}
        <div className="relative w-[110px] h-[75px]" style={{ transform: "rotateX(55deg) rotateZ(-45deg)", transformStyle: "preserve-3d" }}>
          {/* Bottom Layer */}
          <motion.div
            animate={{ translateZ: isHovered ? -12 : 0 }}
            className="absolute inset-0 rounded-xl bg-neutral-200/10 dark:bg-zinc-900/40 border border-neutral-300/10 dark:border-white/5 shadow-inner"
          />
          {/* Middle Layer */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-neutral-200/20 dark:bg-zinc-900/60 border border-neutral-300/20 dark:border-white/10"
            style={{ transform: "translateZ(12px)" }}
          />
          {/* Top Layer */}
          <motion.div
            animate={{ translateZ: isHovered ? 40 : 24 }}
            className="absolute inset-0 rounded-xl border flex flex-col justify-between p-2.5 bg-white dark:bg-zinc-900/90"
            style={{ 
              borderColor: `${color}40`, 
              boxShadow: `0 0 15px ${color}08`
            }}
          >
            <div className="flex justify-between items-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <div className="w-5 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          </motion.div>

          {/* Cursor pointer dot */}
          <motion.div
            animate={{ 
              translateZ: isHovered ? 52 : 34,
              scale: isHovered ? 1.15 : 1
            }}
            className="absolute w-3 h-3 rounded-full flex items-center justify-center m-auto inset-0"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
          >
            {/* Vertical projection beam */}
            <div 
              className="absolute bottom-1/2 w-[1px] h-[40px] origin-bottom"
              style={{ 
                background: `linear-gradient(to top, ${color}, transparent)`,
                transform: "rotateX(-55deg) rotateY(45deg) translateZ(0px)" 
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function GrowthIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[100px] sm:h-[120px] flex items-center justify-center">
        {/* Dotted orbits */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute w-20 h-20 rounded-full border border-dashed border-neutral-350 dark:border-zinc-700"
        />
        <motion.div
          animate={{ rotate: isHovered ? -360 : 0 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute w-28 h-28 rounded-full border border-dashed border-neutral-200/50 dark:border-zinc-800"
        />

        {/* Left avatar */}
        <motion.div
          animate={{ x: isHovered ? -4 : 0 }}
          className="absolute left-4 w-7 h-7 rounded-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-600 shadow-md"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </motion.div>

        {/* Right avatar */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          className="absolute right-4 w-7 h-7 rounded-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-600 shadow-md"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </motion.div>

        {/* Center main avatar */}
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          className="absolute w-10 h-10 rounded-full border flex items-center justify-center bg-white dark:bg-zinc-900 shadow-2xl z-10"
          style={{ borderColor: `${color}40` }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }}></span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function SecurityIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[100px] sm:h-[120px] flex items-center justify-center">
        {/* Scanning line */}
        <motion.div
          animate={{ y: isHovered ? [-30, 30, -30] : [-14, 14, -14] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute w-[130px] h-px"
          style={{ background: `linear-gradient(to right, transparent, ${color}aa, transparent)`, boxShadow: `0 0 8px ${color}66` }}
        />
        {/* Lock padlock */}
        <motion.div
          animate={{ y: isHovered ? -4 : 0, scale: isHovered ? 1.05 : 1 }}
          className="absolute w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border flex items-center justify-center shadow-xl z-10"
          style={{ borderColor: `${color}30` }}
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </motion.div>
        {/* Side data chips */}
        <motion.div
          animate={{ x: isHovered ? 6 : 0, opacity: isHovered ? 1 : 0.7 }}
          className="absolute left-6 top-4 w-9 h-9 rounded-xl bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ x: isHovered ? -6 : 0, opacity: isHovered ? 1 : 0.7 }}
          className="absolute right-6 top-4 w-9 h-9 rounded-xl bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        {/* Base floor */}
        <motion.div
          animate={{ width: isHovered ? 130 : 100 }}
          className="absolute bottom-3 h-[3px] rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${color}66, transparent)` }}
        />
      </div>
    </div>
  );
}

function SupportIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <div className="h-[140px] sm:h-[185px] w-full relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-black/30 border border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-center shadow-inner">
      <div className="relative w-[160px] sm:w-[180px] h-[100px] sm:h-[120px] flex items-center justify-center">
        {/* Radiating rings */}
        <motion.div
          animate={{ scale: isHovered ? [1, 1.25, 1] : 1, opacity: isHovered ? 0.25 : 0.12 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute w-16 h-16 rounded-full border"
          style={{ borderColor: `${color}55` }}
        />
        <motion.div
          animate={{ scale: isHovered ? [1, 1.18, 1] : 1, opacity: isHovered ? 0.2 : 0.08 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.4 }}
          className="absolute w-24 h-24 rounded-full border"
          style={{ borderColor: `${color}44` }}
        />
        {/* Headset center */}
        <motion.div
          animate={{ y: isHovered ? -5 : 0, rotate: isHovered ? 6 : 0 }}
          className="absolute w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 border flex items-center justify-center shadow-xl z-10"
          style={{ borderColor: `${color}30` }}
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ color: color }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 14a8 8 0 0116 0v2a2 2 0 01-2 2h-2v-6h2a6 6 0 00-12 0h2v6H6a2 2 0 01-2-2v-2zm2 2v2a2 2 0 002 2h2" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: color }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: color }} />
          </span>
        </motion.div>
        {/* Floating chat bubbles */}
        <motion.div
          animate={{ y: isHovered ? [-3, 2, -3] : 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute top-2 left-5 w-12 h-7 rounded-lg bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 flex items-center gap-1 px-2 shadow-md"
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${color}55` }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${color}33` }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${color}22` }} />
        </motion.div>
        <motion.div
          animate={{ y: isHovered ? [2, -3, 2] : 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }}
          className="absolute bottom-3 right-5 w-10 h-6 rounded-lg bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 px-2 flex items-center shadow-md"
        >
          <div className="w-6 h-1 rounded-full" style={{ backgroundColor: `${color}44` }} />
        </motion.div>
      </div>
    </div>
  );
}

function ValueCard({
  title,
  description,
  type,
  activeColor,
}: {
  title: string;
  description: string;
  type: string;
  activeColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full rounded-3xl border border-neutral-200/50 dark:border-white/[0.05] bg-white dark:bg-zinc-950/40 p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)] hover:border-neutral-300 dark:hover:border-white/[0.14]"
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${activeColor}, transparent)` }}
      />
      <div
        className="absolute -top-10 -right-10 h-28 w-28 rounded-full blur-3xl opacity-0 group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: activeColor }}
      />

      {type === "trust" && <TrustIllustration color={activeColor} isHovered={isHovered} />}
      {type === "innovation" && <InnovationIllustration color={activeColor} isHovered={isHovered} />}
      {type === "reliability" && <ReliabilityIllustration color={activeColor} isHovered={isHovered} />}
      {type === "expertise" && <ExpertiseIllustration color={activeColor} isHovered={isHovered} />}
      {type === "growth" && <GrowthIllustration color={activeColor} isHovered={isHovered} />}
      {type === "security" && <SecurityIllustration color={activeColor} isHovered={isHovered} />}
      {type === "support" && <SupportIllustration color={activeColor} isHovered={isHovered} />}

      <div className="mt-5 flex-1 space-y-2.5">
        <h3
          className="text-lg font-bold text-foreground tracking-tight transition-colors duration-300"
          style={{ color: isHovered ? activeColor : undefined }}
        >
          {title}
        </h3>
        <p className="text-sm text-textMuted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function WhyChooseUs() {
  const { pointerTheme } = useTheme();
  const activeColor = themeColors[pointerTheme] || "#a1a1aa";

  return (
    <section className="relative py-16 sm:py-20 bg-secondary/60 dark:bg-zinc-950/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -right-40 h-[400px] w-[400px] rounded-full bg-neutral-200/40 dark:bg-zinc-900/10 blur-3xl opacity-75" />
        <div className="absolute bottom-1/4 -left-40 h-[400px] w-[400px] rounded-full bg-neutral-200/40 dark:bg-zinc-900/10 blur-3xl opacity-75" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.03] backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeColor }} />
            Why Choose Us
          </span>
          <h2 className="mt-5 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            What Drives Our{" "}
            <span
              className="bg-clip-text text-transparent transition-all duration-500 font-extrabold"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeColor}, ${activeColor}bb)`,
              }}
            >
              Success
            </span>
          </h2>
          <p className="mt-4 text-lg text-textMuted max-w-2xl mx-auto">
            Our core values fuel every decision, inspire every project, and define who we are as a team.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {reasons.map((reason) => (
            <ValueCard
              key={reason.type}
              title={reason.title}
              description={reason.description}
              type={reason.type}
              activeColor={activeColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
