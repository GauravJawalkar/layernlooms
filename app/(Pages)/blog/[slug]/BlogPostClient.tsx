"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllBlogPostsFromDb, AdminBlogPost } from "../../../lib/admin/blog";
import { blogPosts as fallbackBlogPosts } from "@/app/data/blogs";
import { getBlogCoverImage, hasBrandedBlogCover } from "@/app/lib/blog-covers";

interface BlogPostClientProps {
  slug: string;
  initialPost?: AdminBlogPost | null;
  initialRelatedPosts?: AdminBlogPost[];
}

export default function BlogPostClient({
  slug,
  initialPost,
  initialRelatedPosts,
}: BlogPostClientProps) {
  const [post, setPost] = useState<AdminBlogPost | null>(initialPost || null);
  const [allPosts, setAllPosts] = useState<AdminBlogPost[]>(initialRelatedPosts || []);
  const [loading, setLoading] = useState(!initialPost);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialPost && initialRelatedPosts !== undefined) return;
    let active = true;
    (async () => {
      try {
        const data = await getAllBlogPostsFromDb();
        if (!active) return;
        const found = data.find((p) => p.slug === slug && p.visible !== false);
        if (found) {
          setPost(found);
          setAllPosts(data);
        } else {
          const fallbackFound = fallbackBlogPosts.find((p) => p.slug === slug);
          if (fallbackFound) {
            setPost({ id: fallbackFound.slug, ...fallbackFound, visible: true });
          } else if (!initialPost) {
            setNotFound(true);
          }
          setAllPosts(data.length > 0 ? data : fallbackBlogPosts.map((p) => ({ id: p.slug, ...p, visible: true })));
        }
      } catch (err) {
        console.warn("Falling back to static blog posts dataset:", err);
        if (!active) return;
        const fallbackFound = fallbackBlogPosts.find((p) => p.slug === slug);
        if (fallbackFound) {
          setPost({ id: fallbackFound.slug, ...fallbackFound, visible: true });
        } else if (!initialPost) {
          setNotFound(true);
        }
        setAllPosts(fallbackBlogPosts.map((p) => ({ id: p.slug, ...p, visible: true })));
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug, initialPost, initialRelatedPosts]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-accent-current" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
          The journal
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Article not found</h1>
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent-current/40 hover:text-accent-current"
        >
          <ArrowLeft className="size-4" />
          Back to the journal
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className=" rounded-2xl relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
          <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-20 lg:pt-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-accent-current"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to the journal
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="min-w-0">
              <span className="inline-flex items-center rounded-full border border-accent-current/20 bg-accent-current/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-accent-current">
                {post.category}
              </span>
              <h1 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.055em] sm:mt-5 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/70 pt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:text-[11px]">
                <span className="inline-flex items-center gap-2">
                  <User className="size-3.5 text-accent-current" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="size-3.5 text-accent-current" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-3.5 text-accent-current" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xl shadow-foreground/5">
              <Image
                src={getBlogCoverImage(post.slug, post.image)}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={`object-cover grayscale contrast-110 ${
                  hasBrandedBlogCover(post.slug) ? "invert dark:invert-0" : ""
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 py-6 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <article className="px-1 py-4 shadow-sm sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mt-12 mb-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-12 mb-4 text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-9 mb-3 text-xl font-semibold tracking-tight text-foreground">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mt-7 mb-2 text-lg font-semibold text-foreground">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-[15px] leading-8 text-muted-foreground sm:text-base sm:leading-8">{children}</p>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="font-semibold text-accent-current underline decoration-accent-current/30 underline-offset-4 transition-colors hover:decoration-accent-current" target="_blank" rel="noopener noreferrer">{children}</a>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-7 list-disc space-y-3 pl-6 marker:text-accent-current">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-7 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-accent-current">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="pl-1 leading-7 text-muted-foreground">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 rounded-r-2xl border-l-2 border-accent-current bg-accent-current/[0.06] px-5 py-4 text-muted-foreground [&>p:last-child]:mb-0">{children}</blockquote>
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="break-words rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.88em] text-foreground" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <pre className="mb-7 overflow-x-auto rounded-2xl border border-border bg-secondary p-3.5 text-xs leading-6 sm:p-5 sm:text-sm sm:leading-7">
                        <code className={`${className || ""} font-mono`} {...props}>{children}</code>
                      </pre>
                    );
                  },
                  pre: ({ children }) => (
                    <>{children}</>
                  ),
                  img: ({ src, alt }) => {
                    if (!src) return null;
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt={alt || ""}
                        className="my-9 w-full rounded-2xl border border-border"
                      />
                    );
                  },
                  table: ({ children }) => (
                    <div className="mb-8 overflow-x-auto rounded-2xl border border-border">
                      <table className="w-full min-w-[32rem] text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-secondary">{children}</thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-border">{children}</tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="divide-x divide-border">{children}</tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-foreground">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 leading-6 text-muted-foreground">{children}</td>
                  ),
                  hr: () => (
                    <hr className="my-10 border-border/80" />
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground">{children}</em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          <div className="mt-8 border-t border-border/70 pt-7">
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <Tag className="mr-1 size-4 text-accent-current" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/80 bg-card px-3 py-1.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:border-accent-current/30 hover:text-accent-current"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Contextual Services Link for SEO & Internal Linking */}
            <div className="relative isolate overflow-hidden rounded-3xl border border-accent-current/20 bg-accent-current/[0.06] p-6 sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 -z-10 size-56 rounded-full bg-accent-current/10 blur-3xl" />
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent-current">
                Build what comes next
              </p>
              <h3 className="mb-2 mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Need engineering support for your product?
              </h3>
              <p className="mb-5 text-sm leading-7 text-muted-foreground">
                Our Pune-based engineering team specializes in architecting production web apps, mobile solutions, and custom AI systems for startups and enterprises worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/services/web-development"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 text-[10px] font-bold text-foreground transition-colors hover:border-accent-current/30 hover:bg-accent-current hover:text-accent-current-foreground"
                >
                  Web Development →
                </Link>
                <Link
                  href="/services/cloud-infrastructure"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 text-[10px] font-bold text-foreground transition-colors hover:border-accent-current/30 hover:bg-accent-current hover:text-accent-current-foreground"
                >
                  Cloud & DevOps →
                </Link>
                <Link
                  href="/services/ai-ml-solutions"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 text-[10px] font-bold text-foreground transition-colors hover:border-accent-current/30 hover:bg-accent-current hover:text-accent-current-foreground"
                >
                  AI Solutions →
                </Link>
                <Link
                  href="/services/mobile-app-development"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 text-[10px] font-bold text-foreground transition-colors hover:border-accent-current/30 hover:bg-accent-current hover:text-accent-current-foreground"
                >
                  Mobile Apps →
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-[10px] font-bold text-muted-foreground transition-colors hover:border-accent-current/30 hover:text-accent-current"
                >
                  All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border/70 bg-card/40 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
                  Keep exploring
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                  Related articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-2 text-xs font-bold text-muted-foreground transition-colors hover:text-accent-current sm:inline-flex"
              >
                All articles <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-current/35 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <Image
                      src={getBlogCoverImage(rp.slug, rp.image)}
                      alt={rp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover grayscale contrast-110 ${
                        hasBrandedBlogCover(rp.slug)
                          ? "invert dark:invert-0"
                          : ""
                      } transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                    />
                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                      {rp.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3 text-accent-current" />
                        {rp.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3 text-accent-current" />
                        {rp.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent-current">
                      {rp.title}
                    </h3>
                    <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      <span>Read article</span>
                      <ArrowRight className="size-3.5 text-accent-current transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-xs font-bold text-foreground transition-colors hover:border-accent-current/40 hover:text-accent-current"
              >
                View all articles
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
