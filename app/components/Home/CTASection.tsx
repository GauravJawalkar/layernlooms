"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative w-full py-12 sm:py-24 flex items-center justify-center overflow-hidden text-foreground transition-colors duration-300 shadow-sm">
      {/* Background Floating Watermark with Slow Ambient Breath */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.05] dark:opacity-[0.035]"
        animate={{
          scale: [1, 1.03, 1],
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      >
        <h2 className="text-[12vw] font-black leading-[0.8] text-center whitespace-nowrap uppercase tracking-tighter text-foreground">
          Let&apos;s Work
          <br />
          Together
        </h2>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300/80 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.04] backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-800 dark:text-neutral-200 uppercase">
            Work With Us
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-9 sm:mb-16 leading-[1.16] sm:leading-[1.1]"
        >
          Have a Project in Mind?
          <br className="hidden sm:block" /> Let&apos;s Build Something Remarkable
        </motion.h3>

        {/* Circular Spring-Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative"
        >
          {/* Ambient Pulsing Glow Aura */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 dark:bg-white/10 blur-xl pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              href="/contact"
              className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/25 hover:shadow-primary/45 transition-shadow duration-300 border border-primary/20 dark:border-white/20 select-none cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7 mb-2 sm:mb-3 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-1" />
              <span className="text-sm sm:text-base font-bold text-center leading-tight tracking-tight">
                Let&apos;s Talk
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
