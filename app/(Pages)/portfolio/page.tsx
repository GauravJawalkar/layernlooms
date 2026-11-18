"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Layers3,
} from "lucide-react";
import { getAllProjectsFromDb, type AdminProject } from "../../lib/admin/portfolio";
import { projects as fallbackProjects } from "@/app/data/portfolio";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const projectsRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const fetchProjects = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getAllProjectsFromDb();
      const visible = data.filter((project) => project.visible !== false);
      if (visible.length > 0) {
        setProjects(visible);
      } else {
        setProjects(
          fallbackProjects.map((project, index) => ({
            id: `static-${index}`,
            ...project,
            visible: true,
          }))
        );
      }
    } catch (err: unknown) {
      console.warn("Falling back to static projects dataset:", err);
      if (fallbackProjects.length > 0) {
        setProjects(
          fallbackProjects.map((project, index) => ({
            id: `static-${index}`,
            ...project,
            visible: true,
          }))
        );
      } else {
        setLoadError("Failed to load portfolio items. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);
  const projectCount = loading ? "--" : String(projects.length).padStart(2, "0");
  const categoryCount = loading ? "--" : String(categories.length - 1).padStart(2, "0");

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Portfolio", url: "/portfolio" },
        ])}
      />

      <section className=" rounded-2xl relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
          <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              

              <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Ideas, made
                <span className="mt-1 block text-accent-current">real.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">
                Explore digital products shaped by clear thinking, considered
                design, and engineering built to last.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  aria-controls="work"
                  onClick={() =>
                    projectsRef.current?.scrollIntoView({
                      behavior: reduceMotion ? "auto" : "smooth",
                      block: "start",
                    })
                  }
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                >
                  Browse selected work
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                >
                  Have a project in mind?
                  <ArrowUpRight className="size-4 text-accent-current" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:mt-12">
                <span>Thoughtful design</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-accent-current/60" />
                <span>Purposeful technology</span>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
              className="relative mx-auto hidden aspect-square w-full max-w-[34rem] items-center justify-center lg:flex"
            >
              <div className="absolute inset-[12%] rounded-full bg-accent-current/10 blur-[70px]" />
              <motion.div
                className="absolute inset-[9%] rounded-full border border-border/80"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-[18%] top-[12%] size-2 rounded-full bg-accent-current shadow-[0_0_14px_var(--accent-current)]" />
              </motion.div>
              <motion.div
                className="absolute inset-[19%] rounded-full border border-dashed border-accent-current/30"
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[27%] rounded-full border border-border/70 bg-background/30 backdrop-blur-sm" />
              <motion.div
                className="absolute inset-[34%] rounded-full border border-accent-current/25"
                animate={reduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10 grid size-[30%] place-items-center rounded-[1.5rem] sm:rounded-[2rem] border border-accent-current/30 bg-card/90 shadow-[0_0_80px_rgba(127,127,127,0.12)] backdrop-blur-xl">
                <Layers3 className="size-7 text-accent-current sm:size-11" strokeWidth={1.4} />
              </div>

              <motion.div
                className="absolute right-0 top-[18%] w-32 rounded-xl sm:rounded-2xl border border-border/80 bg-card/90 p-2.5 shadow-xl backdrop-blur-xl sm:top-[22%] sm:w-48 sm:p-4"
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-foreground">
                  Project archive
                </p>
                <div className="mt-1.5 sm:mt-2 flex items-center justify-between gap-1">
                  <span className="text-xs sm:text-sm font-semibold truncate">Selected work</span>
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-accent-current shrink-0">{projectCount}</span>
                </div>
                <div className="mt-2 sm:mt-3 flex gap-1">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <span
                      key={item}
                      className={`h-1 flex-1 rounded-full ${
                        loading || item < Math.min(projects.length, 5)
                          ? "bg-accent-current/70"
                          : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-[16%] left-0 w-36 rounded-xl sm:rounded-2xl border border-border/80 bg-card/90 p-2.5 shadow-xl backdrop-blur-xl sm:bottom-[18%] sm:left-[2%] sm:w-52 sm:p-4"
                animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-foreground">
                  Explore by discipline
                </p>
                <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold">Categories</span>
                  <span className="ml-auto font-mono text-[11px] sm:text-xs font-bold text-accent-current">{categoryCount}</span>
                </div>
                <div className="mt-2 sm:mt-2.5 flex h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <span className="w-2/3 rounded-full bg-accent-current/80" />
                </div>
              </motion.div>

              <div className="absolute bottom-[4%] right-[8%] sm:bottom-[5%] sm:right-[14%] rounded-full border border-border/70 bg-background/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[7.5px] sm:text-[8px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground backdrop-blur">
                Design / Build / Evolve
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="work" ref={projectsRef} className="scroll-mt-24 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-accent-current" />
                The work, in focus
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Selected projects
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A closer look at the products, platforms, and experiences we&apos;ve helped shape.
              </p>
            </div>
            {!loading && !loadError && projects.length > 0 && (
              <p className="text-xs font-semibold text-muted-foreground">
                Showing{" "}
                <span className="text-foreground">{filteredProjects.length}</span>{" "}
                of <span className="text-foreground">{projects.length}</span> projects
              </p>
            )}
          </div>

          {!loadError && projects.length > 0 && (
            <div
              role="group"
              aria-label="Filter projects by category"
              className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-10 sm:flex-wrap"
            >
              {categories.map((category) => {
                const active = activeCategory === category;
                const count =
                  category === "All"
                    ? projects.length
                    : projects.filter((project) => project.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={active}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
                      active
                        ? "border-accent-current bg-accent-current text-accent-current-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-accent-current/35 hover:text-foreground"
                    }`}
                  >
                    {category}
                    <span
                      className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] ${
                        active ? "bg-accent-current-foreground/15" : "bg-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {loading ? (
            <div
              aria-label="Loading portfolio projects"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-3xl border border-border/70 bg-card ${
                    reduceMotion ? "" : "animate-pulse"
                  }`}
                >
                  <div className="aspect-[16/10] bg-secondary" />
                  <div className="space-y-3 p-5 sm:p-6">
                    <div className="h-3 w-1/4 rounded-full bg-secondary" />
                    <div className="h-5 w-2/3 rounded-full bg-secondary" />
                    <div className="h-3 w-full rounded-full bg-secondary" />
                    <div className="h-3 w-4/5 rounded-full bg-secondary" />
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center sm:p-10">
              <p role="alert" className="text-sm text-destructive">{loadError}</p>
              <button
                type="button"
                onClick={fetchProjects}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                Try again
                <ArrowRight className="size-4" />
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center sm:py-20">
              <p className="text-base font-semibold text-foreground">No projects in this category yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Choose another category to keep exploring.</p>
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-5 text-sm font-semibold text-accent-current underline-offset-4 hover:underline"
              >
                Show all projects
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id || project.slug}
                    layout
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.2) }}
                    className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-current/35 hover:shadow-xl"
                  >
                    <Link
                      href={`/portfolio/${project.slug}`}
                      aria-label={`View ${project.title} case study`}
                      className="relative block aspect-[18/10] overflow-hidden border-b border-border/70 bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current"
                    >
                      <Image
                        src={project.image || "/og-image.png"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        className="object-cover grayscale contrast-110 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-90" />
                     
                     
                      <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:bottom-5 sm:left-5">
                        Case study / {project.year}
                      </span>
                    </Link>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent-current">
                            {project.client}
                          </p>
                          <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-current sm:text-2xl">
                            {project.title}
                          </h3>
                        </div>
                        <span className="mt-1 shrink-0 font-mono text-[10px] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {project.description}
                      </p>

                     
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold text-foreground transition-colors hover:text-accent-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current"
                        >
                          Read case study
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-accent-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current"
                          >
                            Visit project
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-border bg-card px-5 py-10 sm:px-10 sm:py-16 lg:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-40 size-[30rem] rounded-full bg-accent-current/10 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_80%_30%,black,transparent_70%)]" />
          </div>
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="h-px w-8 bg-accent-current" />
                Your idea could be next
              </div>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Let&apos;s make something
                <span className="mt-1 block text-accent-current">worth exploring.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                Have a challenge in mind? Tell us what you&apos;re working toward and
                we&apos;ll help you shape the next step.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                Start a project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
