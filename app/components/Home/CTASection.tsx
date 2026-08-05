"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative w-full py-24 sm:py-36 flex items-center justify-center overflow-hidden bg-secondary/40 dark:bg-zinc-950/20 text-foreground transition-colors duration-300 rounded-2xl border border-neutral-300 dark:border-white/[0.06]">
      
      {/* Background Huge Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.05] dark:opacity-[0.03]">
        <h2 className="text-[12vw] font-black leading-[0.8] text-center whitespace-nowrap uppercase tracking-tighter text-foreground">
          Let&apos;s Work<br/>Together
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto">
        
        {/* Top Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-primary font-semibold text-sm sm:text-base tracking-wide">
            Work With Us
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-12 sm:mb-20 leading-[1.2] sm:leading-[1.1]"
        >
          Have Any Projects On Minds!<br className="hidden sm:block" /> Feel Free to Contact Us
        </motion.h3>

        {/* Circular Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/contact" 
            className="group flex flex-col items-center justify-center w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all duration-500 shadow-xl shadow-primary/20 hover:shadow-primary/40"
          >
            <ArrowUp className="w-5 h-5 sm:w-7 sm:h-7 mb-2 sm:mb-3 group-hover:-translate-y-2 transition-transform duration-500" />
            <span className="text-sm sm:text-base font-bold text-center leading-tight tracking-tight">
              Let&apos;s Talk<br/>With Us
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
