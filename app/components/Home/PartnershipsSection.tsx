"use client";

import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const themeColors = {
  zinc: "#a1a1aa",
  purple: "#a78bfa",
  green: "#34d399",
  cyan: "#22d3ee",
  amber: "#fb923c",
  pink: "#f472b6",
};

const partners = [
  { name: "Imgira Tools", initials: "IT", logo: "https://www.google.com/s2/favicons?domain=imgira.site&sz=64&dc=1", description: "AI-Powered Development Tools" },
  { name: "Temp Nova", initials: "TN", logo: "https://www.temp-nova.com/logo.svg", description: "Temporary Email & Anonymous SMS" },
  { name: "Ecco-web", initials: "EW", logo: "", description: "Web & Digital Services" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function PartnerLogo({ initials, logo, color }: { initials: string; logo?: string; color: string }) {
  if (logo) {
    return (
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}18, ${color}06)`,
          border: `1px solid ${color}25`,
        }}
      >
        <img
          src={logo}
          alt={initials}
          className="w-8 h-8 object-contain"
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold tracking-wide shadow-inner shrink-0"
      style={{
        background: `linear-gradient(135deg, ${color}18, ${color}06)`,
        color: color,
        border: `1px solid ${color}25`,
      }}
    >
      {initials}
    </div>
  );
}

export default function PartnershipsSection() {
  const { pointerTheme } = useTheme();
  const activeColor = themeColors[pointerTheme as keyof typeof themeColors] || "#a1a1aa";

  return (
    <section className="relative py-16 sm:py-20 bg-secondary/30 dark:bg-zinc-950/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-neutral-200/20 dark:bg-zinc-900/10 blur-3xl opacity-75" />
        <div className="absolute bottom-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-neutral-200/20 dark:bg-zinc-900/10 blur-3xl opacity-75" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Partnerships That Drive{" "}
            <span
              className="bg-clip-text text-transparent transition-all duration-500 font-extrabold"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeColor}, ${activeColor}bb)`,
              }}
            >
              Success
            </span>
          </h2>
          <p className="mt-4 text-lg text-textMuted max-w-2xl mx-auto">
            We collaborate with industry-leading companies to deliver exceptional results.
          </p>
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-16 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={cardVariants}
              className="group relative rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white dark:bg-zinc-950/40 p-5 sm:p-6 shadow-xs dark:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-white/[0.12] hover:shadow-md dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center gap-4"
            >
              <PartnerLogo initials={partner.initials} logo={partner.logo} color={activeColor} />
              <div className="min-w-0">
                <h3
                  className="text-base font-bold text-foreground tracking-tight transition-colors duration-300 truncate"
                  style={{ color: undefined }}
                >
                  {partner.name}
                </h3>
                <p className="text-sm text-textMuted leading-relaxed truncate">
                  {partner.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile horizontal scroll */}
        <div className="mt-10 sm:hidden overflow-x-auto pb-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4 w-max px-2"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                variants={cardVariants}
                className="group relative rounded-2xl border border-neutral-200/50 dark:border-white/[0.06] bg-white dark:bg-zinc-950/40 p-4 shadow-xs dark:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-white/[0.12] hover:shadow-md dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center gap-3 w-[220px] shrink-0"
              >
                <PartnerLogo initials={partner.initials} logo={partner.logo} color={activeColor} />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground tracking-tight truncate">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-textMuted leading-relaxed truncate">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
