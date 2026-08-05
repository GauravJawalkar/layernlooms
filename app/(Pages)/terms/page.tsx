"use client";

import { motion } from "framer-motion";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Terms & Conditions", url: "/terms" }])} />
      
      <div className="relative pt-10 pb-16 overflow-hidden z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
       
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
            <p className="text-textMuted text-base">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>1. Introduction</h2>
              <p>
                Welcome to LayerNLooms. These terms and conditions outline the rules and regulations for the use of LayerNLooms's Website and Services.
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use LayerNLooms if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>2. License</h2>
              <p>
                Unless otherwise stated, LayerNLooms and/or its licensors own the intellectual property rights for all material on LayerNLooms. All intellectual property rights are reserved. You may access this from LayerNLooms for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <ul>
                <li>You must not republish material from LayerNLooms.</li>
                <li>You must not sell, rent, or sub-license material from LayerNLooms.</li>
                <li>You must not reproduce, duplicate or copy material from LayerNLooms.</li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>3. Services Provided</h2>
              <p>
                LayerNLooms provides enterprise-grade digital solutions, including web development, mobile applications, and AI-powered systems. The scope, deliverables, and timelines for each project will be outlined in a separate Statement of Work (SOW) or formal agreement signed by both parties.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>4. User Responsibilities</h2>
              <p>
                When requesting our services, you agree to provide accurate and complete information. You are responsible for ensuring that any materials, content, or data you provide to us do not infringe on the rights of third parties or violate any applicable laws.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>5. Disclaimer</h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, fraud, or fraudulent misrepresentation.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
              <h2>6. Changes to Terms</h2>
              <p>
                We reserve the right to revise these Terms and Conditions at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of our services after any changes indicates your acceptance of the new terms.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
