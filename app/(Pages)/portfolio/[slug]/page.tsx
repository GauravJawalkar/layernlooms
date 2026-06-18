import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { projects, getProjectBySlug } from "../../../data/portfolio";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://layernlooms.com/portfolio/${slug}`,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Matching ServiceHero Style */}
      <section className="relative pt-10 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] [mask-image:linear-gradient(0deg,transparent,white)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-textMuted hover:text-foreground transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground mb-6">
                Featured Case Study
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 text-xl text-foreground font-medium">
                {project.category} — {project.year}
              </p>
              <p className="mt-6 text-lg leading-8 text-textMuted">
                {project.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-background shadow-sm hover:opacity-90 transition-colors"
                >
                  Start Similar Project
                </Link>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-card border border-border px-6 py-3 text-base font-semibold text-foreground hover:bg-secondary transition-colors inline-flex items-center gap-2"
                  >
                    Visit Website
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative aspect-[4/2.5] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain transition-all duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Challenge */}
              <div className="prose prose-lg max-w-none ">
                <h2 className="text-3xl font-bold text-foreground mb-6">About </h2>
                <p className="text-textMuted leading-relaxed mb-12">
                  {project.longDescription}
                </p>

                <h2 className="text-3xl font-bold text-foreground mb-6">The Result</h2>
                <div className="bg-secondary rounded-2xl p-8 mb-12 border border-border flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <p className="text-xl text-foreground font-medium italic">
                    "{project.result}"
                  </p>
                </div>
              </div>

              {/* Testimonial if exists */}
              {project.testimonial && (
                <div className="mt-16 pt-16 border-t border-border">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-textMuted mb-8">Client Feedback</h3>
                  <p className="text-2xl font-light text-foreground italic mb-8">
                    "{project.testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-secondary" />
                    <div>
                      <p className="font-bold text-foreground">{project.testimonial.author}</p>
                      <p className="text-sm text-textMuted">{project.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* Meta Info */}
                <div className="bg-secondary rounded-2xl p-8 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-6">Project Info</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-textMuted mb-1">Client</p>
                      <p className="text-foreground font-medium">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-textMuted mb-1">Year</p>
                      <p className="text-foreground font-medium">{project.year}</p>
                    </div>
                    {project.url && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-textMuted mb-1">Website</p>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          Visit Project
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-textMuted mb-1">Tech Stack</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="bg-background border border-border px-3 py-1 rounded-lg text-sm font-medium text-foreground/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-primary rounded-2xl p-8 text-background shadow-2xl shadow-primary/20">
                  <h3 className="text-xl font-bold mb-2">Want results like this?</h3>
                  <p className="opacity-80 text-sm mb-6">
                    Let's discuss how we can apply these strategies to your business.
                  </p>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-background px-6 py-3 text-sm font-bold text-foreground hover:bg-background/90 transition-colors"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Projects CTA */}
      <section className="bg-secondary py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Explore More Work
          </h2>
          <p className="mt-4 text-lg text-textMuted">
            See how we've helped other clients achieve their digital goals.
          </p>
          <div className="mt-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-background shadow-sm hover:opacity-90 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
