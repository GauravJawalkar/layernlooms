import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "../../../data/blogs";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://layernlooms.com/blog/${slug}`,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function formatContent(content: string) {
  return content.split("\n\n").map((block, index) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-bold text-foreground mt-12 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("- **")) {
      const items = block.split("\n").map((item, i) => {
        const cleaned = item.replace(/^- \*\*/, "").replace(/\*\*:/, ":");
        if (cleaned.startsWith("- ")) {
          return <li key={i} className="text-textMuted leading-relaxed">{cleaned.replace("- ", "")}</li>;
        }
        return <li key={i} className="text-textMuted leading-relaxed">{cleaned}</li>;
      });
      return <ul key={index} className="space-y-2 mb-6 list-disc pl-5">{items}</ul>;
    }
    if (block.startsWith("```")) {
      const lines = block.split("\n");
      const code = lines.slice(1, -1).join("\n");
      return (
        <pre key={index} className="bg-secondary border border-border rounded-xl p-4 overflow-x-auto mb-6 text-sm">
          <code>{code}</code>
        </pre>
      );
    }
    if (block.startsWith("1. **")) {
      const items = block.split("\n").map((item, i) => {
        const cleaned = item.replace(/^\d+\. \*\*/, "").replace(/\*\*/g, "");
        const colonIdx = cleaned.indexOf(": ");
        if (colonIdx > 0) {
          const title = cleaned.substring(0, colonIdx);
          const desc = cleaned.substring(colonIdx + 2);
          return (
            <li key={i} className="text-textMuted leading-relaxed">
              <strong className="text-foreground">{title}:</strong> {desc}
            </li>
          );
        }
        return <li key={i} className="text-textMuted leading-relaxed">{cleaned}</li>;
      });
      return <ol key={index} className="space-y-2 mb-6 list-decimal pl-5">{items}</ol>;
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl font-bold text-foreground mt-8 mb-3">
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((item, i) => (
        <li key={i} className="text-textMuted leading-relaxed">{item.replace("- ", "")}</li>
      ));
      return <ul key={index} className="space-y-2 mb-6 list-disc pl-5">{items}</ul>;
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-textMuted my-6">
          {block.replace(/^> /gm, "").replace(/^>/gm, "")}
        </blockquote>
      );
    }
    return (
      <p key={index} className="text-textMuted leading-relaxed mb-4">
        {block}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 overflow-hidden bg-background">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-textMuted hover:text-foreground transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl border border-border mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Meta */}
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
          <article className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </article>

          {/* Tags */}
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
