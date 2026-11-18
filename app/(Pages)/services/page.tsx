"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { getAllServices } from "@/app/data/services";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";
import ServiceCard from "../../components/services/ServiceCard";

const approach = [
  {
    number: "01",
    icon: Workflow,
    title: "Start with the why",
    description:
      "We align on your users, goals, and constraints before choosing a direction.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Build with intention",
    description:
      "Design and engineering work together to create a cohesive, useful product.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Keep it moving",
    description:
      "We help your product stay reliable, adaptable, and ready to grow.",
  },
];

export default function ServicesPage() {
  const services = getAllServices();
  const coreServiceCount = services.filter((service) => service.isCoreService).length;
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />

      <section className="relative isolate overflow-hidden rounded-2xl ">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="absolute -right-36 -top-32 size-[min(80vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
          <div className="absolute -left-48 top-1/2 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12 lg:pb-10 lg:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              

              <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Make your next
                <span className="mt-1 block text-accent-current">move matter.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">
                From first sketch to launch and beyond, we bring strategy, design,
                and engineering together to build digital experiences with purpose.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#services"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                >
                  Explore our services
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/50 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                >
                  Tell us what you&apos;re building
                  <ArrowUpRight className="size-4 text-accent-current" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:mt-12">
                <span>Strategy</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-accent-current/60" />
                <span>Design</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-accent-current/60" />
                <span>Engineering</span>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
              className="relative mx-auto hidden aspect-square w-full max-w-[34rem] items-center justify-center lg:flex"
            >
              <div className="absolute inset-[8%] rounded-full bg-accent-current/10 blur-[70px]" />
              <motion.div
                className="absolute inset-[10%] rounded-full border border-border/80"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-[18%] top-[12%] size-2 rounded-full bg-accent-current shadow-[0_0_14px_var(--accent-current)]" />
              </motion.div>
              <motion.div
                className="absolute inset-[18%] rounded-full border border-dashed border-accent-current/30"
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[25%] rounded-full border border-border/60 bg-background/30 backdrop-blur-sm" />
              <motion.div
                className="absolute inset-[31%] rounded-full border border-accent-current/20"
                animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 grid size-[30%] place-items-center rounded-[1.5rem] sm:rounded-[2rem] border border-accent-current/30 bg-card/90 shadow-[0_0_80px_rgba(127,127,127,0.12)] backdrop-blur-xl">
                <Layers3 className="size-7 text-accent-current sm:size-11" strokeWidth={1.4} />
              </div>

              <motion.div
                className="absolute right-0 top-[18%] w-32 rounded-xl sm:rounded-2xl border border-border/80 bg-card/90 p-2.5 shadow-xl backdrop-blur-xl sm:top-[23%] sm:w-48 sm:p-4"
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-foreground">
                    Capabilities
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-accent-current">
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-2 sm:mt-3 flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <span
                      key={item}
                      className={`h-1 flex-1 rounded-full ${
                        item < 4 ? "bg-accent-current/70" : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-[16%] left-0 w-36 rounded-xl sm:rounded-2xl border border-border/80 bg-card/90 p-2.5 shadow-xl backdrop-blur-xl sm:bottom-[19%] sm:left-[2%] sm:w-52 sm:p-4"
                animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-foreground">
                  From idea to impact
                </span>
                <div className="mt-2 sm:mt-2.5 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent-current" />
                  <span className="h-px flex-1 bg-gradient-to-r from-accent-current/70 to-border" />
                  <ArrowUpRight className="size-3.5 text-accent-current" />
                </div>
              </motion.div>

              <div className="absolute bottom-[4%] right-[8%] sm:bottom-[5%] sm:right-[15%] rounded-full border border-border/70 bg-background/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[7.5px] sm:text-[8px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground backdrop-blur">
                One connected team
              </div>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-2 border-t border-border/70 pt-5 sm:mt-12 sm:grid-cols-4 sm:pt-6">
            <div className="border-r border-border/70 pr-4 sm:px-5">
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {String(services.length).padStart(2, "0")}
                <span className="ml-1 text-accent-current">+</span>
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                Service disciplines
              </p>
            </div>
            <div className="pl-4 sm:border-r sm:border-border/70 sm:px-5">
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                {String(coreServiceCount).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                Core capabilities
              </p>
            </div>
            <div className="mt-5 border-r border-border/70 pr-4 sm:mt-0 sm:px-5">
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">01</p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                Connected team
              </p>
            </div>
            <div className="mt-5 pl-4 sm:mt-0 sm:px-5">
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">∞</p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                Room to evolve
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-accent-current" />
                What we bring to the table
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                The right skills for
                <span className="text-accent-current"> what comes next.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Explore our capabilities, then combine the right pieces around the
              challenge you&apos;re solving.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
              No services available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative border-y border-border/70 bg-card/40 py-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--accent-current)_9%,transparent),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-accent-current" />
              Built to work together
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Good work is a process,
              <span className="text-accent-current"> not a handoff.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {approach.map(({ number, icon: Icon, title, description }) => (
              <motion.article
                key={number}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Number(number) * 0.06 }}
                className="group rounded-2xl border border-border/80 bg-background/70 p-6 transition-colors hover:border-accent-current/30 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{number}</span>
                  <div className="grid size-10 place-items-center rounded-xl bg-accent-current/10 text-accent-current transition-colors group-hover:bg-accent-current group-hover:text-accent-current-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-7 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-border bg-card px-5 py-10 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -right-20 -top-40 size-[30rem] rounded-full bg-accent-current/10 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_80%_30%,black,transparent_70%)]" />
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-accent-current" />
                Your next chapter starts here
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Have a challenge in mind?
                <span className="mt-1 block text-accent-current">Let&apos;s shape it.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                Tell us where you want to go. We&apos;ll help you find a thoughtful
                path from the first conversation to what comes next.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                Start a conversation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                Explore our work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
