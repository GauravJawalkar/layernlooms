import { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/app/data/blogs";
import BlogPostClient from "./BlogPostClient";
import JsonLd, { getBreadcrumbSchema, getBlogPostingSchema } from "@/app/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | LayerNLooms Blog",
      description: "The requested blog post was not found.",
    };
  }

  const title = `${post.title} | LayerNLooms Tech Blog`;
  const description = post.excerpt;

  return {
    title,
    description,
    authors: [{ name: post.author || "LayerNLooms Team" }],
    keywords: [
      post.category,
      ...(post.tags || []),
      "LayerNLooms blog",
      "software engineering",
    ],
    alternates: {
      canonical: `https://layernlooms.com/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://layernlooms.com/blog/${slug}`,
      title,
      description,
      publishedTime: post.date,
      authors: [post.author || "LayerNLooms Team"],
      images: [
        {
          url: post.image?.startsWith("http")
            ? post.image
            : `https://layernlooms.com${post.image || "/og-image.png"}`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        post.image?.startsWith("http")
          ? post.image
          : `https://layernlooms.com${post.image || "/og-image.png"}`,
      ],
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const schemas: any[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post ? post.title : slug, url: `/blog/${slug}` },
    ]),
  ];

  if (post) {
    schemas.push(getBlogPostingSchema(post));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <BlogPostClient slug={slug} initialPost={post as any} />
    </>
  );
}
