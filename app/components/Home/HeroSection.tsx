"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[800px] w-full overflow-hidden bg-black my-5 rounded-4xl ">
      <div className="absolute inset-0 z-[2]">
        <Scene />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-transparent to-black/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
     

          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Weaving Digital
            <span className="mt-2 block bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>

          <p className="mt-6 mx-auto max-w-xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg">
            Enterprise-grade digital solutions — from web and mobile apps to
            AI-powered systems — with precision and innovation.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-2xl hover:shadow-white/20"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/50 backdrop-blur-xs px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-900/75"
            >
              Our Services
            </Link>
          </div>

         
        </motion.div>
      </div>
    </section>
  );
}
