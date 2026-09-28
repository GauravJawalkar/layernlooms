"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Check, Sparkles, Code2, ChevronRight, ListChecks, Route, Users2 } from "lucide-react";
import { getAllServices, Service } from "@/app/data/services";
import { getServiceContent } from "@/app/data/service-content";
import ServiceHero from "../../../components/services/ServiceHero";

const sectionHeader = (title: string) => (
  <div className="flex items-center gap-3 mb-6 sm:mb-8">
    <div className="w-8 h-px bg-border" />
    <h2 className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-muted-foreground">{title}</h2>
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
    <div className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground">
      <ServiceHero service={service} />

      {/* Main Content */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-16 sm:space-y-24">

              {/* Overview */}
              <div>
                {sectionHeader("Overview")}
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                  {service.longDescription}
                </p>
              </div>

              {/* Deliverables */}
              {content?.deliverables && content.deliverables.length > 0 && (
                <div>
                  {sectionHeader("What You Get")}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.deliverables.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-card">
                        <ListChecks className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* How we work */}
              {content?.process && content.process.length > 0 && (
                <div>
                  {sectionHeader("Execution Methodology")}
                  <div className="space-y-4">
                    {content.process.map((step, index) => (
                      <div key={step.title} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 rounded-2xl border border-border bg-card group hover:bg-accent/50 transition-colors">
                        <div className="shrink-0 w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center group-hover:border-accent-current transition-colors">
                          <span className="text-xs font-bold text-foreground">{String(index + 1).padStart(2, "0")}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-8">
                {service.features && service.features.length > 0 && (
                  <div>
                    {sectionHeader("Core Features")}
                    <div className="space-y-3">
                      {service.features.map((feature: string) => (
                        <div
                          key={feature}
                          className="group flex items-start gap-3 p-4 rounded-2xl border border-border bg-card hover:border-accent-current transition-all duration-300"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Check className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors pt-1 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    {sectionHeader("Business Impact")}
                    <div className="space-y-3">
                      {service.benefits.map((benefit: string) => (
                        <div
                          key={benefit}
                          className="group flex items-start gap-3 p-4 rounded-2xl border border-border bg-card hover:border-accent-current transition-all duration-300"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors pt-1 font-medium">{benefit}</span>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.stackRationale.map((entry) => (
                      <div
                        key={entry.tech}
                        className="rounded-2xl border border-border bg-card p-5 sm:p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Code2 className="w-4 h-4 text-muted-foreground" />
                          <h3 className="text-sm font-bold text-foreground">{entry.tech}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{entry.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal For */}
              {content?.idealFor && content.idealFor.length > 0 && (
                <div>
                  {sectionHeader("Ideal Profile")}
                  <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Users2 className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-bold text-foreground">
                        This solution is perfectly suited for organizations that are:
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {content.idealFor.map((item: string) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
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
                        className="group rounded-2xl border border-border bg-card overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-sm font-bold text-foreground hover:bg-accent/50 transition-colors">
                          {faq.question}
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="px-5 pb-5 pt-2">
                          <p className="text-sm text-muted-foreground leading-relaxed font-medium">{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Contact Card */}
                <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-current/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent-current/20 transition-colors duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-accent-current/10 border border-accent-current/20 flex items-center justify-center mb-6">
                      <Sparkles className="w-5 h-5 text-accent-current" />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-3">Architect a Solution</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      Engage with our engineering team to outline a robust, scalable architecture tailored to your specific parameters.
                    </p>
                    <Link
                      href="/contact"
                      className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-sm font-bold shadow-lg hover:scale-105 transition-all"
                    >
                      Initialize Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8">
                  {sectionHeader("Parameters")}
                  <div className="space-y-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Estimated Timeline</span>
                      <span className="text-sm font-bold text-foreground">
                        {content?.timeline ?? "Determined post-discovery"}
                      </span>
                    </div>
                    <div className="w-full h-px bg-border" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Maintenance & Support</span>
                      <span className="text-sm font-bold text-foreground">
                        {content?.support ?? "Available SLA contracts"}
                      </span>
                    </div>
                    
                    {service.technologies && service.technologies.length > 0 && (
                      <>
                        <div className="w-full h-px bg-border" />
                        <div className="flex flex-col gap-3">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Core Technologies</span>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
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
        <section className="border-t border-border bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-2">Adjacent Capabilities</h2>
                <p className="text-sm text-muted-foreground">Explore integrated solutions across our ecosystem.</p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-accent/50 transition-colors shrink-0"
              >
                View Directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.slice(0, 3).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <div className="group rounded-[2rem] border border-border bg-card p-6 sm:p-8 hover:border-accent-current hover:bg-accent/50 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent-current transition-colors">{s.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium mb-6">{s.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-foreground group-hover:translate-x-2 transition-transform">
                      Explore Capability <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
