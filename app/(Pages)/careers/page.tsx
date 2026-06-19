"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Send } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Careers{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Coming Soon
            </span>
          </h1>

          <motion.div
            className="mx-auto w-20 h-1 rounded-full bg-primary mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <p className="text-lg text-textMuted max-w-lg mx-auto mb-4">
            We&apos;re building something great and looking for talented people to join the journey.
          </p>
          <p className="text-sm text-textMuted/70 max-w-md mx-auto mb-10">
            Our career opportunities page is under construction. In the meantime, feel free to reach out — we&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-sm hover:opacity-90 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
              Get in Touch
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-all duration-300"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
