"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllBlogPostsFromDb, AdminBlogPost } from "../../../lib/admin/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<AdminBlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBlogPostsFromDb();
        const found = data.find((p) => p.slug === slug);
        if (found) {
          setPost(found);
          setAllPosts(data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setNotFound(true);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline text-sm">
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 overflow-hidden bg-background">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-textMuted hover:text-foreground transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
          </div>

          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl border border-border mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-textMuted mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <article className="max-w-none">
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-foreground mt-14 mb-6 leading-tight">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-foreground mt-8 mb-3">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-bold text-foreground mt-6 mb-2">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-textMuted leading-relaxed mb-5">{children}</p>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">{children}</a>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 mb-6 list-disc pl-6">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-2 mb-6 list-decimal pl-6">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-textMuted leading-relaxed">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-5 italic text-textMuted my-6 py-2">{children}</blockquote>
                  ),
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-secondary border border-border px-1.5 py-0.5 rounded-md text-sm font-mono text-foreground" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <pre className="bg-secondary border border-border rounded-xl p-4 overflow-x-auto mb-6 text-sm">
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    );
                  },
                  pre: ({ children }) => (
                    <>{children}</>
                  ),
                  img: ({ src, alt }) => {
                    if (!src) return null;
                    return (
                      <img
                        src={src}
                        alt={alt || ""}
                        className="w-full rounded-xl border border-border my-8"
                      />
                    );
                  },
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-6 rounded-xl border border-border">
                      <table className="w-full text-sm">{children}</table>
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
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-foreground">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-textMuted">{children}</td>
                  ),
                  hr: () => (
                    <hr className="border-border my-10" />
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">{children}</strong>
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

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-textMuted" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary border border-border px-3 py-1.5 rounded-lg text-sm font-medium text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-secondary py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-10">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-background border border-border shadow-sm mb-4">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-textMuted mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {rp.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rp.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-background shadow-sm hover:opacity-90 transition-all duration-300"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
