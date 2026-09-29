"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Cloud, Shield, Smartphone, Database } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeColors: Record<string, string> = {
  zinc: "oklch(0.708 0 0)",
  purple: "oklch(0.7 0.22 270)",
  green: "oklch(0.65 0.15 150)",
  cyan: "oklch(0.75 0.15 200)",
  amber: "oklch(0.8 0.18 80)",
  pink: "oklch(0.75 0.22 340)",
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
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/30 blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/30 blur-3xl opacity-70" />
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
              className="transition-all duration-500 font-extrabold"
              style={{
                color: activeColor,
              }}
            >
              Expertise
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
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
              className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:border-accent-current/30 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/80 border border-border text-accent-current transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-current group-hover:text-accent-current-foreground group-hover:shadow-md">
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {area.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

