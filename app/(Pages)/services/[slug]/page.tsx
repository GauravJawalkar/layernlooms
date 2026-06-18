import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Check, Sparkles, Code2, Layers, Zap, ChevronRight } from "lucide-react";
import { getAllServices, getServiceBySlug, Service } from "@/app/data/services";
import ServiceHero from "../../../components/services/ServiceHero";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://layernlooms.com/services/${slug}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

const sectionHeader = (title: string) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-6 h-px bg-border" />
    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-textMuted">{title}</h2>
  </div>
);

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allServices = getAllServices().filter(s => s.slug !== slug);

  return (
    <>
      <ServiceHero service={service} />

      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12 sm:space-y-16">

              {/* Overview */}
              <div>
                {sectionHeader("Overview")}
                <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                  {service.longDescription}
                </p>
              </div>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  {sectionHeader("Key Features")}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-300">
                          <Check className="w-4 h-4 text-primary group-hover:text-background transition-colors" />
                        </div>
                        <span className="text-sm text-textMuted group-hover:text-foreground transition-colors pt-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  {sectionHeader("Benefits")}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <span className="text-sm text-textMuted group-hover:text-foreground transition-colors pt-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {service.technologies && service.technologies.length > 0 && (
                <div>
                  {sectionHeader("Technologies We Use")}
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3.5 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                      >
                        <Code2 className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  {sectionHeader("FAQs")}
                  <div className="space-y-3">
                    {service.faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group rounded-xl border border-border bg-card overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none text-sm font-semibold text-foreground hover:bg-secondary/50 transition-colors">
                          {faq.question}
                          <ChevronRight className="w-4 h-4 text-textMuted shrink-0 transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-sm text-textMuted leading-relaxed">{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Contact Card */}
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-3xl -mr-8 -mt-8" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Need a Custom Solution?</h3>
                    <p className="mt-2 text-sm text-textMuted leading-relaxed">
                      Let&apos;s discuss your specific requirements and create a tailored solution for your business.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity group"
                    >
                      Contact Our Experts
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-2xl border border-border bg-card/50 p-6">
                  {sectionHeader("Quick Stats")}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-textMuted">Delivery Time</span>
                      <span className="text-sm font-bold text-foreground">2-6 weeks</span>
                    </div>
                    <div className="w-full h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-textMuted">Support</span>
                      <span className="text-sm font-bold text-foreground">24/7</span>
                    </div>
                    <div className="w-full h-px bg-border" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-textMuted">Technologies</span>
                      <span className="text-sm font-bold text-foreground">{service.technologies?.length || 0}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {allServices.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Explore Other Services</h2>
              <p className="mt-3 text-sm sm:text-base text-textMuted">Discover how we can help you with other business needs</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {allServices.slice(0, 3).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <div className="group rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="mt-1.5 text-xs text-textMuted line-clamp-2">{s.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-all duration-300"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
