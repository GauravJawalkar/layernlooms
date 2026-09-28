"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getAllServices } from "@/app/data/services";

const themeColors: Record<string, string> = {
  zinc: "oklch(0.708 0 0)",
  purple: "oklch(0.7 0.22 270)",
  green: "oklch(0.65 0.15 150)",
  cyan: "oklch(0.75 0.15 200)",
  amber: "oklch(0.8 0.18 80)",
  pink: "oklch(0.75 0.22 340)",
};

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
  const services = getAllServices();

  return (
    <section className="relative py-20 bg-secondary/30 overflow-hidden">
      {/* Ambient glassmorphic glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 -left-40 h-[450px] w-[450px] rounded-full bg-secondary/20 blur-3xl opacity-75" />
        <div className="absolute bottom-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-secondary/20 blur-3xl opacity-75" />
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
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end digital services tailored to your business needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.length === 0 ? (
            <div className="col-span-full text-center py-16 text-sm text-muted-foreground">
              No services available yet.
            </div>
          ) : (
            services.map((s, i) => (
              <motion.div
                key={s.slug}
                variants={itemVariants}
                className="group relative rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-accent-current/5 hover:border-accent-current/20 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to right, transparent, ${activeColor}88, transparent)` }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    0{i + 1}
                  </span>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-all hover:text-accent-current hover:gap-2.5"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
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
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 backdrop-blur-md px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-card hover:border-accent-current/30 hover:shadow-lg"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

