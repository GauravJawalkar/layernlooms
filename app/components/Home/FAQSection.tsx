"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import JsonLd, { getFAQPageSchema } from "../JsonLd";

const faqs = [
  {
    question: "What is LayerNLooms?",
    answer: "LayerNLooms is a full-service custom software development company and digital engineering agency based in Pune, India. We craft high-performance web applications, mobile platforms, enterprise cloud infrastructure, and AI-powered solutions tailored to drive business growth.",
  },
  {
    question: "What services do you offer?",
    answer: "We offer end-to-end custom software development services including web application development, mobile app development (iOS & Android), AI & ML integration, cloud infrastructure & DevOps, UI/UX design, SaaS analytics, and e-commerce solutions.",
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing is flexible to match project scope: Fixed Price contracts for defined scopes, Dedicated Engineering Teams for long-term velocity, and Time & Materials for evolving roadmaps. We provide transparent estimates following an initial discovery consultation.",
  },
  {
    question: "What is the typical timeline for building a custom software application?",
    answer: "Timelines depend on functional scope. A minimum viable product (MVP) or business website typically ships in 3-5 weeks, whereas complex web or mobile platforms with custom integrations take 8-12 weeks. We deliver working milestones at each sprint.",
  },
  {
    question: "Do you offer custom software development or use pre-built templates?",
    answer: "Every solution is architected from scratch. We do not use generic off-the-shelf templates. Our engineering uses modern design systems, clean code standards, and custom architectures built exclusively for your brand requirements.",
  },
  {
    question: "Will my application be mobile-friendly and responsive?",
    answer: "Yes, 100%. All applications are engineered mobile-first with adaptive layouts, ensuring responsive speed, touch optimization, and visual consistency across smartphones, tablets, and desktop displays.",
  },
  {
    question: "What technologies do you use for web and software development?",
    answer: "We specialize in modern engineering stacks including Next.js, React, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, and Kubernetes, deployed on AWS, GCP, or Azure.",
  },
  {
    question: "Do you provide cloud hosting, DevOps, and deployment assistance?",
    answer: "Yes. We manage end-to-end cloud provisioning, CI/CD automated deployment pipelines, domain and SSL configuration, serverless scaling, and cloud security monitoring on AWS, Google Cloud, and Vercel.",
  },
  {
    question: "What is your approach to SEO and performance optimization?",
    answer: "SEO and performance are baked into the architecture from day one. We implement semantic HTML5, Core Web Vitals optimization, server-side rendering (SSR), automated OpenGraph tags, and structured JSON-LD schema markup for superior search visibility.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <JsonLd data={getFAQPageSchema(faqs)} />
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-secondary/40 blur-3xl opacity-75" />
        <div className="absolute bottom-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-secondary/40 blur-3xl opacity-75" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-foreground to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent font-extrabold">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 sm:mt-16 space-y-3"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card overflow-hidden transition-colors duration-300"
            >
              <button
                id={`faq-btn-${index}`}
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-sm sm:text-base font-semibold text-foreground tracking-tight pr-2">
                  {faq.question}
                </span>
                <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-secondary transition-colors duration-300">
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  </motion.span>
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Still have questions?
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Our team is here to help with personalized answers.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-6 sm:px-8 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all duration-300"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}

