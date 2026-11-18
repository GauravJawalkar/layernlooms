"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────
   Tech data — skillicons.dev slugs
───────────────────────────────────────── */
interface Tech {
  name: string;
  icon: string; // skillicons.dev slug
}

const ROW_ONE: Tech[] = [
  { name: "Java",        icon: "java"       },
  { name: "C++",         icon: "cpp"        },
  { name: "JavaScript",  icon: "js"         },
  { name: "TypeScript",  icon: "ts"         },
  { name: "MongoDB",     icon: "mongodb"    },
  { name: "MySQL",       icon: "mysql"      },
  { name: "PostgreSQL",  icon: "postgres"   },
  { name: "Redis",       icon: "redis"      },
  { name: "React",       icon: "react"      },
  { name: "Node.js",     icon: "nodejs"     },
  { name: "Express",     icon: "express"    },
  { name: "Python",      icon: "python"     },
  { name: "Next.js",     icon: "nextjs"     },
  { name: "GraphQL",     icon: "graphql"    },
  { name: "Vue.js",      icon: "vue"        },
  { name: "TailwindCSS", icon: "tailwind"   },
];

const ROW_TWO: Tech[] = [
  { name: "Vercel",      icon: "vercel"     },
  { name: "Figma",       icon: "figma"      },
  { name: "Docker",      icon: "docker"     },
  { name: "Kubernetes",  icon: "kubernetes" },
  { name: "AWS",         icon: "aws"        },
  { name: "GCP",         icon: "gcp"        },
  { name: "Git",         icon: "git"        },
  { name: "GitHub",      icon: "github"     },
  { name: "Postman",     icon: "postman"    },
  { name: "Firebase",    icon: "firebase"   },
  { name: "Linux",       icon: "linux"      },
  { name: "Flutter",     icon: "flutter"    },
  { name: "Swift",       icon: "swift"      },
  { name: "Kotlin",      icon: "kotlin"     },
  { name: "Rust",        icon: "rust"       },
  { name: "Go",          icon: "go"         },
];

/* ─────────────────────────────────────────
   Single tech item: big icon + label below
   Renders both dark and light icons via CSS classes (block/hidden)
   for instantaneous, zero-flicker theme switching!
───────────────────────────────────────── */
function TechItem({ tech }: { tech: Tech }) {
  const darkSrc = `https://skillicons.dev/icons?i=${tech.icon}&theme=dark`;
  const lightSrc = `https://skillicons.dev/icons?i=${tech.icon}&theme=light`;

  return (
    <div className="flex flex-col items-center gap-2.5 w-[72px] sm:w-[88px] shrink-0 group cursor-default select-none">
      {/* Icon with smooth hover lift and scale */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        {/* Dark mode icon (hidden in light mode) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={darkSrc}
          alt={tech.name}
          width={64}
          height={64}
          className="w-full h-full object-contain drop-shadow-sm hidden dark:block"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        {/* Light mode icon (hidden in dark mode) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lightSrc}
          alt={tech.name}
          width={64}
          height={64}
          className="w-full h-full object-contain drop-shadow-sm block dark:hidden"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>

      {/* Name label — high contrast in both themes */}
      <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight tracking-wide text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Infinite marquee row
───────────────────────────────────────── */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Tech[];
  reverse?: boolean;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const cls = reverse ? "tech-row-reverse" : "tech-row-forward";

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`${cls} flex items-end gap-6 sm:gap-10 w-max pl-6 sm:pl-10 py-2`}
      >
        {doubled.map((t, i) => (
          <TechItem key={`${t.icon}-${i}`} tech={t} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function TechStackSection() {
  const mask = "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)";

  return (
    <section
      id="technologies"
      className="relative w-full py-10 sm:py-14 overflow-hidden"
    >
      {/* ── CSS keyframes (self-contained) ── */}
      <style>{`
        @keyframes tech-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes tech-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .tech-row-forward {
          animation: tech-fwd 38s linear infinite;
          will-change: transform;
        }
        .tech-row-reverse {
          animation: tech-rev 42s linear infinite;
          will-change: transform;
        }
        /* Pause both rows when user hovers the marquee area */
        .tech-marquee-wrap:hover .tech-row-forward,
        .tech-marquee-wrap:hover .tech-row-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Header (using pure Tailwind for instant light/dark switching) ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-neutral-950 dark:text-white transition-colors duration-300">
              Technologies We Work With
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] max-w-lg leading-relaxed text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
              We use modern, industry-leading technologies to build scalable,
              secure and high-performance solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 select-none shrink-0 text-neutral-500 dark:text-neutral-400 transition-colors duration-300"
          >
            <span className="text-[11px] tracking-widest uppercase font-medium">
              Curated Production Stack
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* ── Two marquee rows — full viewport width with edge fade ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="tech-marquee-wrap flex flex-col gap-6 sm:gap-8"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {/* Row 1 — left → right */}
        <MarqueeRow items={ROW_ONE} />

        {/* Subtle divider between rows */}
        <div className="w-full h-px mx-auto bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent" />

        {/* Row 2 — right → left */}
        <MarqueeRow items={ROW_TWO} reverse />
      </motion.div>
    </section>
  );
}
