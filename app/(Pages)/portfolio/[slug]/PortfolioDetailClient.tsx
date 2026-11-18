"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllProjectsFromDb, type AdminProject } from "../../../lib/admin/portfolio";
import { projects as fallbackProjects } from "@/app/data/portfolio";

interface PortfolioDetailClientProps {
  slug: string;
  initialProject?: AdminProject | null;
}

export default function PortfolioDetailClient({
  slug,
  initialProject,
}: PortfolioDetailClientProps) {
  const [project, setProject] = useState<AdminProject | null>(initialProject || null);
  const [loading, setLoading] = useState(!initialProject);
  const [notFound, setNotFound] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (initialProject) return;
    let active = true;
    (async () => {
      try {
        const data = await getAllProjectsFromDb();
        const found = data.find((item) => item.slug === slug && item.visible !== false);
        if (!active) return;
        if (found) {
          setProject(found);
        } else {
          const fallbackFound = fallbackProjects.find((item) => item.slug === slug);
          if (fallbackFound) {
            setProject({ id: fallbackFound.slug, ...fallbackFound, visible: true });
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        console.warn("Falling back to static project data:", err);
        if (!active) return;
        const fallbackFound = fallbackProjects.find((item) => item.slug === slug);
        if (fallbackFound) {
          setProject({ id: fallbackFound.slug, ...fallbackFound, visible: true });
        } else {
          setNotFound(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug, initialProject]);

  if (loading) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-background px-6 text-foreground">
        <div role="status" className="flex items-center gap-3 text-sm text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-5 animate-spin rounded-full border-2 border-border border-t-accent-current"
          />
          Loading case study
        </div>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-background px-6 text-foreground">
        <div className="max-w-lg text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
            LayerNLooms / Portfolio
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            This project isn&apos;t available.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            It may have moved or is no longer published. Explore the rest of our selected work.
          </p>
          <Link
            href="/portfolio"
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
          >
            <ArrowLeft className="size-4" />
            Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className=" rounded-2xl relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
          <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:px-12 lg:pb-24">
          <Link
            href="/portfolio"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-accent-current/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>

          <div className="mt-7 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <p className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-current">
                <span>Case study</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-accent-current/60" />
                <span className="text-muted-foreground">{project.category}</span>
              </p>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.04] tracking-[-0.06em] sm:mt-5 sm:text-5xl lg:text-6xl xl:text-7xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-full border border-border/80 bg-card/70 px-3.5 py-2 text-xs font-semibold text-foreground">
                  {project.client}
                </span>
                <span className="rounded-full border border-border/80 bg-card/70 px-3.5 py-2 font-mono text-xs font-semibold text-muted-foreground">
                  {project.year}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                >
                  Start a project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                  >
                    Visit website
                    <ArrowUpRight className="size-4 text-accent-current" />
                  </a>
                )}
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
              className="group relative isolate mx-auto aspect-[4/3] w-full max-w-[42rem] overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-2xl shadow-black/10 sm:rounded-[2rem]"
            >
              <Image
                src={project.image || "/og-image.png"}
                alt={`${project.title} project preview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain grayscale contrast-110 transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-current/10 via-transparent to-transparent mix-blend-multiply dark:mix-blend-screen" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur-md sm:left-6 sm:top-6">
                Project preview
              </div>
              <figcaption className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                    Case study / {project.year}
                  </p>
                  <p className="mt-1 truncate text-base font-semibold text-white sm:text-lg">
                    {project.title}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md"
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 lg:px-12 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
            01 / The project
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            The thinking behind the work.
          </h2>
          <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {project.longDescription}
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-border/80 bg-card/70 p-5 sm:mt-12 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent-current/20 bg-accent-current/10 text-accent-current">
                <Check className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  The result
                </p>
                <p className="mt-2 sm:mt-3 text-base font-medium leading-7 text-foreground sm:text-xl sm:leading-8">
                  {project.result}
                </p>
              </div>
            </div>
          </div>

          {project.testimonial && (
            <blockquote className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-border/80 bg-secondary/60 p-6 sm:mt-12 sm:p-8">
              <Quote
                aria-hidden="true"
                className="absolute right-6 top-6 size-8 text-accent-current/20 sm:right-8 sm:top-8 sm:size-10"
              />
              <p className="pr-10 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-current">
                Client perspective
              </p>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-7 text-foreground sm:text-xl sm:leading-8">
                &ldquo;{project.testimonial.text}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-border bg-card font-mono text-xs font-bold text-accent-current">
                  {project.testimonial.author.trim().slice(0, 2).toUpperCase() || "LL"}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {project.testimonial.author}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {project.testimonial.role}
                  </span>
                </span>
              </footer>
            </blockquote>
          )}
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 lg:sticky lg:top-28 lg:self-start"
        >
          <div className="rounded-[1.5rem] border border-border/80 bg-card/70 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-accent-current/20 bg-accent-current/10 text-accent-current">
                <Layers3 className="size-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Project details
                </p>
                <h2 className="mt-0.5 text-base font-semibold">At a glance</h2>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-border/70">
              <div className="py-4 first:pt-0">
                <dt className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Client
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{project.client}</dd>
              </div>
              <div className="py-4">
                <dt className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Category
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{project.category}</dd>
              </div>
              <div className="py-4 last:pb-0">
                <dt className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Year
                </dt>
                <dd className="mt-1.5 font-mono text-sm font-medium text-foreground">{project.year}</dd>
              </div>
            </dl>

            {project.technologies.length > 0 && (
              <div className="mt-5 border-t border-border/70 pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Technology
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-border/80 bg-background px-3 py-1.5 text-[11px] font-medium text-foreground/80"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-bold text-foreground transition-colors hover:border-accent-current/40 hover:text-accent-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
              >
                <Globe2 className="size-4" />
                Visit live project
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>

          <div className="rounded-[1.5rem] border border-accent-current/20 bg-accent-current/[0.07] p-6 sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-current">
              Have a similar challenge?
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight">
              Let&apos;s make your next idea real.
            </h2>
            <Link
              href="/contact"
              className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 text-xs font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
            >
              Talk to our team
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.aside>
      </section>

      <section className="rounded-2xl bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-8 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
              Keep exploring
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              More thoughtful work, one click away.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
