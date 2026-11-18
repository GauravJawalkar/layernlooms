"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/app/data/services";

export default function ServiceHero({ service }: { service: Service }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className=" rounded-2xl  relative isolate overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="absolute -right-40 -top-40 size-[min(75vw,52rem)] rounded-full bg-accent-current/10 blur-[130px]" />
        <div className="absolute -left-44 bottom-0 size-[min(45vw,30rem)] rounded-full bg-accent-current/5 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-8 sm:pb-20 sm:pt-8 lg:px-12 lg:pb-24">
        <Link
          href="/services"
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-accent-current/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current sm:mb-10"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          All services
        </Link>

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
           

            <h1 className="max-w-3xl text-3xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-6xl xl:text-7xl">
              {service.title}
            </h1>
            <p className="mt-3.5 max-w-2xl text-base font-medium leading-snug text-muted-foreground sm:mt-5 sm:text-xl lg:text-2xl">
              {service.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
              {service.description || service.longDescription}
            </p>

            {service.technologies.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {service.technologies.slice(0, 4).map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
                {service.technologies.length > 4 && (
                  <span className="rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground">
                    +{service.technologies.length - 4} more
                  </span>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                Discuss your project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                See our work
                <ArrowUpRight className="size-4 text-accent-current" />
              </Link>
            </div>
          </motion.div>

          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative isolate mx-auto aspect-[4/3] w-full max-w-[42rem] overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-2xl shadow-black/10 sm:rounded-[2rem] lg:aspect-[5/4]"
          >
            <Image
              src={service.image || "/services/01-custom-software.svg"}
              alt={`${service.title} illustration`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center grayscale contrast-110 invert transition-transform duration-1000 ease-out group-hover:scale-[1.03] dark:invert-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/5 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-current/10 via-transparent to-transparent mix-blend-multiply dark:mix-blend-screen" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full border border-foreground/15"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-accent-current shadow-[0_0_16px_var(--accent-current)]" />
            </motion.div>

            <div className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur-md sm:left-6 sm:top-6">
              LayerNLooms / Services
            </div>

            <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Designed around your goals
                </p>
                <p className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg">
                  {service.title}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border/70 bg-background/80 text-accent-current backdrop-blur-md">
                <ArrowUpRight className="size-4" />
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
