"use client";

import { motion } from "framer-motion";
import { Handshake, Timer, PiggyBank, Scale } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeColors = {
  zinc: "#a1a1aa",
  purple: "#a78bfa",
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#fb923c",
  pink: "#f472b6",
};

const models = [
  {
    icon: Handshake,
    title: "Fixed Price",
    description: "Well-defined scope with a fixed budget and timeline. Ideal for projects with clear requirements.",
  },
  {
    icon: Timer,
    title: "Time & Material",
    description: "Flexible engagement for evolving projects. Pay for actual time and resources used.",
  },
  {
    icon: PiggyBank,
    title: "Dedicated Team",
    description: "Full-time dedicated engineers who work as an extension of your in-house team.",
  },
  {
    icon: Scale,
    title: "Build-Operate-Transfer",
    description: "We build and operate your offshore team, then transfer full control to you.",
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

export default function EngagementModels() {
  const { pointerTheme } = useTheme();
  const activeColor = themeColors[pointerTheme] || "#a1a1aa";

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Engagement{" "}
            <span
              className="bg-clip-text text-transparent transition-all duration-500 font-extrabold"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeColor}, ${activeColor}bb)`,
              }}
            >
              Models
            </span>
          </h2>
          <p className="mt-4 text-lg text-textMuted max-w-2xl mx-auto">
            Flexible engagement options tailored to your project needs and budget.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {models.map((model) => (
            <motion.div
              key={model.title}
              variants={itemVariants}
              className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <model.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {model.title}
              </h3>
              <p className="mt-3 text-sm text-textMuted leading-relaxed">
                {model.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
