"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Cloud, Shield, Smartphone, Database } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeColors = {
  zinc: "#a1a1aa",
  purple: "#a78bfa",
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#fb923c",
  pink: "#f472b6",
};

const expertiseAreas = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Scalable, performant web applications using modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
  },
  {
    icon: Brain,
    title: "AI & ML Solutions",
    description: "Intelligent systems powered by machine learning and artificial intelligence.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Robust cloud architecture and infrastructure management at scale.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "End-to-end data pipelines, warehousing, and analytics solutions.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security audits, compliance, and threat protection.",
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

export default function ExpertiseSection() {
  const { pointerTheme } = useTheme();
  const activeColor = themeColors[pointerTheme] || "#a1a1aa";

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Ambient glassmorphic glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-neutral-200/30 dark:bg-zinc-900/10 blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-neutral-200/30 dark:bg-zinc-900/10 blur-3xl opacity-70" />
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
              Expertise
            </span>
          </h2>
          <p className="mt-4 text-lg text-textMuted max-w-2xl mx-auto">
            We bring deep technical expertise across a wide range of domains to deliver impactful solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-neutral-200/50 dark:border-white/[0.05] bg-white/60 dark:bg-white/[0.02] backdrop-blur-md p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/[0.05] hover:border-neutral-300 dark:hover:border-white/[0.12] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/50 dark:border-white/[0.08] text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 group-hover:shadow-md">
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 text-sm text-textMuted leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
