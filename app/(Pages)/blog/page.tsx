"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
} from "lucide-react";
import { getAllBlogPostsFromDb, type AdminBlogPost } from "../../lib/admin/blog";
import { blogPosts as fallbackBlogPosts } from "@/app/data/blogs";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";
import { getBlogCoverImage, hasBrandedBlogCover } from "@/app/lib/blog-covers";

function getPostTimestamp(post: AdminBlogPost): number {
  if (post.createdAt instanceof Date) return post.createdAt.getTime();
  if (post.createdAt && typeof post.createdAt.toMillis === "function") {
    return post.createdAt.toMillis();
  }
  const parsedDate = Date.parse(post.date);
  return Number.isNaN(parsedDate) ? 0 : parsedDate;
}

function toFallbackPosts(): AdminBlogPost[] {
  return fallbackBlogPosts.map((post, index) => ({
    id: `static-${index}`,
    ...post,
    visible: true,
  }));
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await getAllBlogPostsFromDb();
        const visiblePosts = data
          .filter((post) => post.visible !== false)
          .sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a));
        if (active) setPosts(visiblePosts.length > 0 ? visiblePosts : toFallbackPosts());
      } catch (error) {
        console.warn("Falling back to static blog posts dataset:", error);
        if (active) setPosts(toFallbackPosts());
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);
  const [featuredPost, ...otherPosts] = filteredPosts;

  return (
    <main className="overflow-hidden bg-background text-foreground ">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      <section className=" rounded-2xl relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden "
        >
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
          <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
          <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-8 sm:pb-16 sm:pt-16 lg:px-12 lg:pb-16 lg:pt-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
                <BookOpen className="size-3.5" />
                Notes from the studio
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:mt-5 sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Ideas to move
                <span className="mt-1 block text-accent-current">your work forward.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">
                Perspectives, practical guides, and lessons from building thoughtful digital
                products — shared by the people doing the work.
              </p>
              <Link
                href="#articles"
                className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current sm:mt-8 sm:w-auto"
              >
                Explore the articles
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>

            <div className="hidden min-w-52 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-xl backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  The journal
                </span>
                <BookOpen className="size-4 text-accent-current" />
              </div>
              <p className="mt-5 font-mono text-4xl font-semibold tracking-tight">
                {loading ? "--" : String(posts.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                ideas, guides &amp; perspectives
              </p>
              <div className="mt-5 flex gap-1">
                {[0, 1, 2, 3, 4].map((item) => (
                  <span
                    key={item}
                    className={`h-1 flex-1 rounded-full ${
                      loading || item < Math.min(posts.length, 5)
                        ? "bg-accent-current/70"
                        : "bg-foreground/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="articles" className="pt-8 sm:pt-10 mx-auto max-w-7xl scroll-mt-24 px-4 pb-12 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="flex flex-col gap-5 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
              Read, learn, apply
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              The latest thinking
            </h2>
          </div>
          {!loading && posts.length > 0 && (
            <p aria-live="polite" className="text-xs text-muted-foreground">
              {filteredPosts.length === posts.length
                ? `${posts.length} ${posts.length === 1 ? "article" : "articles"}`
                : `Showing ${filteredPosts.length} of ${posts.length} articles`}
            </p>
          )}
        </div>

        {!loading && categories.length > 1 && (
          <div
            role="group"
            aria-label="Filter articles by category"
            className="flex gap-2 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const count =
                category === "All"
                  ? posts.length
                  : posts.filter((post) => post.category === category).length;
              const selected = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card/60 text-muted-foreground hover:border-accent-current/40 hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className={selected ? "font-mono text-background/65" : "font-mono text-muted-foreground/70"}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div
            aria-label="Loading blog articles"
            className="grid grid-cols-1 gap-5 pt-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-3xl border border-border/70 bg-card ${
                  reduceMotion ? "" : "animate-pulse"
                }`}
              >
                <div className="aspect-[16/10] bg-secondary" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/3 rounded-full bg-secondary" />
                  <div className="h-5 w-4/5 rounded-full bg-secondary" />
                  <div className="h-3 w-full rounded-full bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center sm:py-20">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-border bg-background text-accent-current">
              <FileText className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">No articles in this category yet.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose another topic to keep exploring the journal.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="mt-5 text-sm font-semibold text-accent-current underline-offset-4 hover:underline"
            >
              Show all articles
            </button>
          </div>
        ) : (
          <div className="pt-5">
            {featuredPost && (
              <motion.article
                key={`featured-${featuredPost.slug}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-accent-current/35 hover:shadow-xl"
              >
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  aria-label={`Read ${featuredPost.title}`}
                  className="grid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current lg:grid-cols-[1.1fr_0.9fr]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[25rem]">
                    <Image
                      src={getBlogCoverImage(featuredPost.slug, featuredPost.image)}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className={`object-cover grayscale contrast-110 ${
                        hasBrandedBlogCover(featuredPost.slug) ? "invert dark:invert-0" : ""
                      } transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/10" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-6 sm:top-6">
                      Featured article
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1.5 text-[10px] font-semibold text-foreground backdrop-blur-md sm:bottom-6 sm:left-6">
                      {featuredPost.category}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5 text-accent-current" />
                        {featuredPost.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-3.5 text-accent-current" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em] transition-colors group-hover:text-accent-current sm:text-3xl lg:text-4xl">
                      {featuredPost.title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-foreground">
                      Read the article
                      <span className="grid size-8 place-items-center rounded-full border border-border text-accent-current transition-all group-hover:border-accent-current/40 group-hover:bg-accent-current/10">
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )}

            {otherPosts.length > 0 && (
              <div className="mt-10">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">More to explore</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(otherPosts.length).padStart(2, "0")} ARTICLES
                  </span>
                </div>
                <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  <AnimatePresence mode="popLayout">
                    {otherPosts.map((post, index) => (
                      <motion.article
                        key={post.slug}
                        layout
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                        transition={{
                          duration: 0.35,
                          delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16),
                        }}
                        className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-current/35 hover:shadow-xl"
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          aria-label={`Read ${post.title}`}
                          className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                            <Image
                              src={getBlogCoverImage(post.slug, post.image)}
                              alt={post.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className={`object-cover grayscale contrast-110 ${
                                hasBrandedBlogCover(post.slug) ? "invert dark:invert-0" : ""
                              } transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                              {post.category}
                            </span>
                          </div>

                          <div className="p-5 sm:p-6">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="size-3 text-accent-current" />
                                {post.date}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <Clock3 className="size-3 text-accent-current" />
                                {post.readTime}
                              </span>
                            </div>
                            <h4 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent-current">
                              {post.title}
                            </h4>
                            <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">
                              {post.excerpt}
                            </p>
                            <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                              <span>Read article</span>
                              <ArrowRight className="size-3.5 text-accent-current transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mx-auto mb-10 max-w-7xl px-4 sm:px-8 lg:mb-20 lg:px-12">
        <div className="relative isolate overflow-hidden rounded-3xl border border-border/80 bg-card px-5 py-10 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-32 -z-10 size-96 rounded-full bg-accent-current/10 blur-[100px]"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
              Put good ideas to work
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Have a challenge worth solving?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Tell us what you&apos;re working on. We&apos;ll bring the right people and ideas to
              help you move it forward.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
            >
              Start a conversation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
