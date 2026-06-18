"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeColors = {
  zinc: "#a1a1aa",
  purple: "#a78bfa",
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#fb923c",
  pink: "#f472b6",
};

const services = [
  {
    image: "/web-dev.png",
    title: "Web Development",
    description: "Custom web applications, SaaS platforms, and enterprise portals built with modern frameworks.",
    href: "/services/web-development",
  },
  {
    image: "/mobile-app.png",
    title: "Mobile App Development",
    description: "Native iOS, Android, and cross-platform mobile solutions with exceptional UX.",
    href: "/services/mobile-app-development",
  },
  {
    image: "/ai-ml.png",
    title: "AI & ML Solutions",
    description: "Intelligent automation, predictive analytics, and custom machine learning models.",
    href: "/services/ai-ml-solutions",
  },
  {
    image: "/cloud-infra.png",
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture, migration, and managed infrastructure services.",
    href: "/services/cloud-infrastructure",
  },
  {
    image: "/data-eng.png",
    title: "Data Engineering",
    description: "Data pipelines, warehousing, visualization, and business intelligence solutions.",
    href: "/services/data-engineering",
  },
  {
    image: "/cybersecurity.png",
    title: "Cybersecurity",
    description: "Security audits, penetration testing, compliance, and threat monitoring.",
    href: "/services/cybersecurity",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function OurServices() {
  const { pointerTheme } = useTheme();
  const activeColor = themeColors[pointerTheme] || "#a1a1aa";

  return (
    <section className="relative py-20 bg-secondary/30 dark:bg-zinc-950/20 overflow-hidden">
      {/* Ambient glassmorphic glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 -left-40 h-[450px] w-[450px] rounded-full bg-neutral-200/20 dark:bg-zinc-900/10 blur-3xl opacity-75" />
        <div className="absolute bottom-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-neutral-200/20 dark:bg-zinc-900/10 blur-3xl opacity-75" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our{" "}
            <span
              className="bg-clip-text text-transparent transition-all duration-500 font-extrabold"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeColor}, ${activeColor}bb)`,
              }}
            >
              Services
            </span>
          </h2>
          <p className="mt-4 text-lg text-textMuted max-w-2xl mx-auto">
            End-to-end digital services tailored to your business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-neutral-200/50 dark:border-white/[0.05] bg-white/60 dark:bg-white/[0.02] backdrop-blur-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/[0.05] hover:border-neutral-300 dark:hover:border-white/[0.12] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-neutral-100/50 dark:bg-white/[0.02] border border-neutral-200/30 dark:border-white/[0.05] mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-textMuted leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-all hover:text-primary dark:hover:text-white hover:gap-2.5"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200/50 dark:border-white/[0.08] bg-white/40 dark:bg-white/[0.02] backdrop-blur-md px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/80 dark:hover:bg-white/[0.06] hover:border-neutral-300 dark:hover:border-white/[0.15] hover:shadow-lg"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
