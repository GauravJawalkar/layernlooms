"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Search, PenTool, Code2, Rocket, RefreshCw, Settings } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const themeColors = {
  zinc: "#a1a1aa",
  purple: "#a78bfa",
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#fb923c",
  pink: "#f472b6",
};

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We analyze your requirements, goals, and target audience to define the project scope.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Our team creates intuitive UI/UX designs and architecture blueprints.",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Agile development with regular sprints and transparent progress tracking.",
  },
  {
    icon: RefreshCw,
    title: "Testing",
    description: "Comprehensive quality assurance including automated and manual testing.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Smooth deployment with CI/CD pipelines and zero-downtime strategies.",
  },
  {
    icon: Settings,
    title: "Maintenance",
    description: "Ongoing support, monitoring, and continuous improvement post-launch.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ProcessSection() {
  const { pointerTheme } = useTheme();
  const activeColor = themeColors[pointerTheme as keyof typeof themeColors] || "#a1a1aa";
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden transition-colors duration-300">
      {/* 1. Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />
      
      {/* 2. Radial Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_30%,var(--background)_100%)] pointer-events-none -z-10" />

      {/* 3. Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-neutral-100/50 dark:bg-zinc-950/20 blur-3xl opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Our{" "}
            <span
              className="bg-clip-text text-transparent transition-all duration-500 font-extrabold"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeColor}, ${activeColor}bb)`,
              }}
            >
              Process
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            A structured, transparent approach that takes your project from concept to launch.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="mt-20 relative min-h-[400px] max-w-5xl mx-auto">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-[0.5px] top-4 bottom-4 w-[1px] lg:w-[2px] bg-neutral-200 dark:bg-neutral-900 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-neutral-400 dark:via-white/40 to-transparent"
              animate={{ top: ["-128px", "100%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Stepped Timeline Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12 lg:space-y-16"
          >
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepNumber = `0${index + 1}`;
              const IconComponent = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center pl-16 lg:pl-0"
                >
                  {/* Step Indicator Node (Circle with Icon) */}
                  <div
                    className={`absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-4 lg:top-1/2 lg:-translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      hoveredStep === index
                        ? "border-neutral-400 dark:border-white/30 bg-neutral-50 dark:bg-neutral-800 shadow-[0_0_20px_rgba(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] scale-110"
                        : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                    }`}
                  >
                    {/* Ripple Halo animation */}
                    {hoveredStep === index && (
                      <motion.div
                        className="absolute inset-[-4px] rounded-full border border-neutral-400/30 dark:border-white/20 pointer-events-none"
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}

                    <IconComponent
                      className={`h-5 w-5 transition-colors duration-300 ${
                        hoveredStep === index ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    />
                  </div>

                  {/* Left Column (Desktop: visible if Even, Mobile: always visible) */}
                  <div className={`w-full relative ${isEven ? "lg:text-right block" : "hidden lg:block lg:opacity-0 pointer-events-none"}`}>
                    {/* Horizontal Connector Line (desktop only) */}
                    <div className={`hidden lg:block absolute right-[-32px] top-1/2 -translate-y-1/2 w-8 h-[1.5px] transition-colors duration-300 pointer-events-none ${
                      hoveredStep === index ? "bg-neutral-400 dark:bg-white/30" : "bg-neutral-200 dark:bg-neutral-900"
                    }`} />

                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="group relative rounded-2xl border border-neutral-300 dark:border-white/[0.06] bg-gradient-to-br from-white/90 to-neutral-50/90 dark:from-neutral-900 dark:to-neutral-950 backdrop-blur-md p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-400 dark:hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.02)] flex flex-col justify-start cursor-default overflow-hidden no-snap w-full"
                    >
                      {/* Outline Watermark Number */}
                      <span className={`absolute top-6 font-black text-4xl lg:text-5xl text-neutral-100 dark:text-neutral-900/50 select-none transition-colors duration-300 group-hover:text-neutral-200/80 dark:group-hover:text-neutral-800/80 ${isEven ? "left-6 lg:left-6 lg:right-auto right-6" : "right-6"}`}>
                        {stepNumber}
                      </span>

                      <div className="relative z-10">
                        <span className="text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                          Step {index + 1}
                        </span>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column (Desktop: visible if Odd, Mobile: always hidden) */}
                  <div className={`w-full relative ${!isEven ? "block lg:text-left" : "hidden lg:block lg:opacity-0 pointer-events-none"}`}>
                    {/* Horizontal Connector Line (desktop only) */}
                    <div className={`hidden lg:block absolute left-[-32px] top-1/2 -translate-y-1/2 w-8 h-[1.5px] transition-colors duration-300 pointer-events-none ${
                      hoveredStep === index ? "bg-neutral-400 dark:bg-white/30" : "bg-neutral-200 dark:bg-neutral-900"
                    }`} />

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="group relative rounded-2xl border border-neutral-300 dark:border-white/[0.06] bg-gradient-to-br from-white/90 to-neutral-50/90 dark:from-neutral-900 dark:to-neutral-950 backdrop-blur-md p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-400 dark:hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.02)] flex flex-col justify-start cursor-default overflow-hidden no-snap w-full"
                    >
                      {/* Outline Watermark Number */}
                      <span className="absolute top-6 right-6 font-black text-4xl lg:text-5xl text-neutral-100 dark:text-neutral-900/50 select-none transition-colors duration-300 group-hover:text-neutral-200/80 dark:group-hover:text-neutral-800/80">
                        {stepNumber}
                      </span>

                      <div className="relative z-10">
                        <span className="text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                          Step {index + 1}
                        </span>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
