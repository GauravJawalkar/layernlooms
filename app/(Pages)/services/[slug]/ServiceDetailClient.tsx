"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Check, Sparkles, Code2, ChevronRight, ListChecks, Users2 } from "lucide-react";
import Image from "next/image";
import { getAllServices, type Service } from "@/app/data/services";
import { getServiceContent } from "@/app/data/service-content";
import ServiceHero from "../../../components/services/ServiceHero";

const sectionHeader = (title: string) => (
  <div className="mb-5 flex items-center gap-3 sm:mb-6">
    <span className="h-px w-8 bg-accent-current" />
    <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
      {title}
    </h2>
  </div>
);

interface ServiceDetailClientProps {
  slug: string;
  initialService?: Service | null;
}

export default function ServiceDetailClient({ slug, initialService }: ServiceDetailClientProps) {
  const allServices = getAllServices();
  const service = initialService ?? allServices.find((s) => s.slug === slug) ?? null;

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested digital solution doesn&apos;t exist.</p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:scale-105 transition-transform"
        >
          View Capabilities
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const relatedServices = allServices.filter((s) => s.slug !== slug);
  const content = getServiceContent(slug);

  // Editorial FAQs first, then any the CMS adds, de-duplicated on the question.
  const faqs = [
    ...(content?.faqs ?? []),
    ...(service.faqs ?? []).filter(
      (cms: { question: string }) =>
        !content?.faqs.some(
          (staticFaq) => staticFaq.question.toLowerCase() === cms.question.toLowerCase()
        )
    ),
  ];

  return (
    <main className="bg-background text-foreground ">
      <ServiceHero service={service} />

      {/* Main Content */}
      <section className="relative overflow-hidden bg-background py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-40 top-0 size-[min(60vw,36rem)] rounded-full  blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
            {/* Left Column */}
            <div className="space-y-12 sm:space-y-16 lg:col-span-2">

              {/* Overview */}
              <div>
                {sectionHeader("Overview")}
                <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:p-8 lg:p-9">
                  <div className="absolute bottom-0 left-0 top-0 w-1 bg-accent-current/70" />
                  <p className="text-sm font-medium leading-7 text-muted-foreground sm:text-lg sm:leading-9">
                    {service.longDescription}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              {content?.deliverables && content.deliverables.length > 0 && (
                <div>
                  {sectionHeader("What You Get")}
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {content.deliverables.map((item: string) => (
                      <li key={item} className="group flex items-start gap-3 rounded-2xl border border-border/80 bg-card/80 p-4 transition-colors hover:border-accent-current/30">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-current/10 text-accent-current">
                          <ListChecks className="size-4" />
                        </span>
                        <span className="pt-1 text-sm leading-relaxed text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How we work */}
              {content?.process && content.process.length > 0 && (
                <div>
                  {sectionHeader("Execution Methodology")}
                  <div className="space-y-3">
                    {content.process.map((step, index) => (
                      <div key={step.title} className="group flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-5 transition-all hover:border-accent-current/35 sm:flex-row sm:gap-5 sm:p-6">
                        <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent-current/20 bg-accent-current/10 transition-colors group-hover:bg-accent-current">
                          <span className="font-mono text-xs font-bold text-accent-current group-hover:text-accent-current-foreground">{String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <div>
                          <h3 className="mb-2 text-base font-bold text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-7 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features & Benefits */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6">
                {service.features && service.features.length > 0 && (
                  <div>
                    {sectionHeader("Core Features")}
                    <div className="space-y-2.5">
                      {service.features.map((feature: string) => (
                        <div
                          key={feature}
                          className="group flex items-start gap-3 rounded-2xl border border-border/80 bg-card/80 p-3.5 transition-all duration-300 hover:border-accent-current/35 hover:bg-card sm:p-4"
                        >
                          <div className="grid size-8 shrink-0 place-items-center rounded-full border border-accent-current/20 bg-accent-current/10 text-accent-current transition-all duration-300 group-hover:bg-accent-current group-hover:text-accent-current-foreground">
                            <Check className="size-4" />
                          </div>
                          <span className="pt-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    {sectionHeader("Business Impact")}
                    <div className="space-y-2.5">
                      {service.benefits.map((benefit: string) => (
                        <div
                          key={benefit}
                          className="group flex items-start gap-3 rounded-2xl border border-border/80 bg-card/80 p-3.5 transition-all duration-300 hover:border-accent-current/35 hover:bg-card sm:p-4"
                        >
                          <div className="grid size-8 shrink-0 place-items-center rounded-full border border-accent-current/20 bg-accent-current/10 text-accent-current transition-all duration-300 group-hover:bg-accent-current group-hover:text-accent-current-foreground">
                            <CheckCircle2 className="size-4" />
                          </div>
                          <span className="pt-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Why this stack */}
              {content?.stackRationale && content.stackRationale.length > 0 && (
                <div>
                  {sectionHeader("Technology Stack Rationale")}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {content.stackRationale.map((entry) => (
                      <div
                        key={entry.tech}
                        className="group rounded-2xl border border-border/80 bg-card p-5 transition-colors hover:border-accent-current/30 sm:p-6"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <span className="grid size-8 place-items-center rounded-lg bg-accent-current/10 text-accent-current">
                            <Code2 className="size-4" />
                          </span>
                          <h3 className="text-sm font-bold text-foreground">{entry.tech}</h3>
                        </div>
                        <p className="text-sm leading-7 text-muted-foreground">{entry.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal For */}
              {content?.idealFor && content.idealFor.length > 0 && (
                <div>
                  {sectionHeader("Ideal Profile")}
                  <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-xl bg-accent-current/10 text-accent-current">
                        <Users2 className="size-4" />
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        This solution is perfectly suited for organizations that are:
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {content.idealFor.map((item: string) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="mt-1 size-4 shrink-0 text-accent-current" />
                          <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {faqs.length > 0 && (
                <div>
                  {sectionHeader("Frequently Asked Questions")}
                  <div className="space-y-3">
                    {faqs.map((faq: { question: string; answer: string }, index: number) => (
                      <details
                        key={index}
                        className="group overflow-hidden rounded-2xl border border-border/80 bg-card transition-colors open:border-accent-current/30"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-bold text-foreground transition-colors hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-current">
                          <span>{faq.question}</span>
                          <ChevronRight className="size-4 shrink-0 text-accent-current transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="px-5 pb-5">
                          <p className="border-t border-border/70 pt-4 text-sm font-medium leading-7 text-muted-foreground">{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar */}
            <div className="mt-4 lg:col-span-1 lg:mt-0">
              <div className="space-y-5 lg:sticky lg:top-28">
                {/* Contact Card */}
                <div className="group relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card p-6 shadow-sm sm:p-7">
                  <div className="absolute -right-12 -top-14 size-40 rounded-full bg-accent-current/10 blur-3xl transition-colors duration-500 group-hover:bg-accent-current/20" />
                  <div className="relative">
                    <div className="mb-5 grid size-11 place-items-center rounded-2xl border border-accent-current/20 bg-accent-current/10 text-accent-current">
                      <Sparkles className="size-5" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">Let&apos;s make a plan</h3>
                    <p className="mb-7 text-sm leading-7 text-muted-foreground">
                      Share the challenge you&apos;re working through. We&apos;ll help you shape a practical next step.
                    </p>
                    <Link
                      href="/contact"
                      className="group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-bold text-background transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                    >
                      Talk to our team
                      <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-[1.75rem] border border-border/80 bg-card p-6 sm:p-7">
                  {sectionHeader("Project details")}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Estimated timeline</span>
                      <span className="text-sm font-semibold leading-relaxed text-foreground">
                        {content?.timeline ?? "Determined post-discovery"}
                      </span>
                    </div>
                    <div className="h-px w-full bg-border/80" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Maintenance & support</span>
                      <span className="text-sm font-semibold leading-relaxed text-foreground">
                        {content?.support ?? "Available SLA contracts"}
                      </span>
                    </div>
                    
                    {service.technologies && service.technologies.length > 0 && (
                      <>
                        <div className="h-px w-full bg-border/80" />
                        <div className="flex flex-col gap-3">
                          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Core technologies</span>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="inline-flex items-center rounded-full border border-border/80 bg-secondary/70 px-3 py-1.5 text-[10px] font-semibold text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className=" bg-card/30 py-14 sm:py-20 lg:py-24 rounded-2xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 flex flex-col gap-5 sm:mb-11 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="h-px w-8 bg-accent-current" />
                  Keep exploring
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Related capabilities</h2>
                <p className="mt-2 text-sm text-muted-foreground">Explore services that can work alongside {service.title}.</p>
              </div>
              <Link
                href="/services"
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-xs font-bold text-foreground transition-colors hover:border-accent-current/35 hover:bg-accent-current/5 sm:w-auto sm:text-sm"
              >
                View all services
                <ArrowRight className="size-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.slice(0, 3).map((related, index) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                >
                  <article className="h-full overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent-current/35 group-hover:shadow-xl">
                    <div className="relative aspect-[16/8] overflow-hidden border-b border-border/70 bg-secondary/60">
                      <Image
                        src={related.image || "/services/01-custom-software.svg"}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover grayscale contrast-110 invert transition-transform duration-700 group-hover:scale-105 dark:invert-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 font-mono text-[9px] font-bold text-accent-current backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-accent-current">{related.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{related.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-muted-foreground transition-colors group-hover:text-accent-current">
                        Explore service
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
