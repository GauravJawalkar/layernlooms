"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What is LayerNlooms?",
    answer: "LayerNlooms is a full-service digital agency specializing in modern web development, UI/UX design, and AI-powered solutions. We craft high-performance, custom websites and applications tailored to elevate your brand and drive business growth.",
  },
  {
    question: "What services do you offer?",
    answer: "We offer end-to-end web development services including custom website design, web application development, e-commerce solutions, UI/UX design, API integration, cloud deployment, and ongoing maintenance and support.",
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing is project-based and tailored to each client's specific needs. We provide a detailed quote after the discovery phase. For ongoing work, we offer retainer packages at competitive monthly rates.",
  },
  {
    question: "What is the typical timeline for building a website?",
    answer: "Timelines vary based on complexity. A standard business website takes 3-5 weeks, while custom web applications with advanced features can take 8-12 weeks. We provide a detailed roadmap during the discovery phase.",
  },
  {
    question: "Do you offer custom web design or use templates?",
    answer: "Every project is built from scratch with a custom design tailored to your brand identity and goals. We don't use pre-built templates, ensuring a unique, high-performance result.",
  },
  {
    question: "Will my website be mobile-friendly and responsive?",
    answer: "Absolutely. All our websites are built mobile-first with responsive design principles, ensuring they look and perform flawlessly across all devices from phones to desktops.",
  },
  {
    question: "What technologies do you use for web development?",
    answer: "We use modern stacks including React, Next.js, TypeScript, and Tailwind CSS for the frontend, with Node.js or Python for the backend. Every stack is chosen for performance and scalability.",
  },
  {
    question: "Do you provide hosting and domain setup assistance?",
    answer: "Yes, we assist with hosting setup, domain configuration, and SSL certificate installation. We recommend reliable providers and can manage the entire deployment process for you.",
  },
  {
    question: "What is your approach to SEO and performance optimization?",
    answer: "SEO and performance are built into every project from the start. We follow best practices for semantic HTML, Core Web Vitals, image optimization, and structured data to ensure fast load times and search visibility.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 sm:py-20 bg-secondary/60 dark:bg-zinc-950/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-neutral-200/40 dark:bg-zinc-900/10 blur-3xl opacity-75" />
        <div className="absolute bottom-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-neutral-200/40 dark:bg-zinc-900/10 blur-3xl opacity-75" />
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
          <p className="mt-4 text-lg text-textMuted max-w-2xl mx-auto">
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
              className="rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white dark:bg-zinc-950/40 overflow-hidden transition-colors duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm sm:text-base font-semibold text-foreground tracking-tight pr-2">
                  {faq.question}
                </span>
                <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-zinc-800 transition-colors duration-300">
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Plus className="w-4 h-4 text-textMuted" />
                  </motion.span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                      <p className="text-sm text-textMuted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
          <p className="mt-2 text-sm sm:text-base text-textMuted">
            Can't find what you're looking for? Our team is here to help with personalized answers.
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
