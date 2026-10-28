"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getAllBlogPostsFromDb, AdminBlogPost } from "../../lib/admin/blog";
import { blogPosts as staticBlogPosts } from "@/app/data/blogs";

function getPostTimestamp(p: AdminBlogPost): number {
  if (p.createdAt && typeof (p.createdAt as { toMillis?: () => number }).toMillis === "function") {
    return (p.createdAt as { toMillis: () => number }).toMillis();
  }
  return new Date(p.date).getTime() || 0;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogSection() {
  const { accentColor } = useTheme();
  const activeColor = accentColor;
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBlogPostsFromDb();
        const valid = data.filter((p) => p.visible !== false);
        const resolved = valid.length > 0 ? valid : (staticBlogPosts as unknown as AdminBlogPost[]);
        setPosts(
          resolved.sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a))
        );
      } catch {
        setPosts(staticBlogPosts as unknown as AdminBlogPost[]);
      }
      setLoading(false);
    })();
  }, []);

  const recentPosts = posts.slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Latest{" "}
            <span
              className="transition-all duration-500 font-extrabold"
              style={{
                color: activeColor,
              }}
            >
              Insights
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and stories from our team on building great software.
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Loading posts...</span>
          </div>
        ) : recentPosts.length === 0 ? (
          <div className="mt-16 text-center py-16 text-muted-foreground">
            <p className="text-sm">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {recentPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                className="group rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-xl overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 transition-colors group-hover:text-accent-current line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read More <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-sm hover:opacity-90 transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

