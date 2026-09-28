import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import JsonLd, { getBreadcrumbSchema, getBlogPostingSchema } from "@/app/components/JsonLd";
import { pickMetaDescription } from "@/app/lib/seo";
import { site } from "@/app/lib/site";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  resolveLastModified,
} from "@/app/lib/firestore-content";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | LayerNLooms Blog",
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | LayerNLooms Tech Blog`;
  const description = pickMetaDescription(undefined, post.excerpt);
  const url = `${site.url}/blog/${post.slug}`;
  const image = post.image?.startsWith("http")
    ? post.image
    : `${site.url}${post.image || "/og-image.png"}`;
  const modified = resolveLastModified(post);

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
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.date,
      ...(modified ? { modifiedTime: modified.toISOString() } : {}),
      authors: [post.author || "LayerNLooms Team"],
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const modified = resolveLastModified(post);

  const schemas: Record<string, unknown>[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
    getBlogPostingSchema({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      date: post.date,
      author: post.author,
      image: post.image,
      category: post.category,
      tags: post.tags,
      ...(modified ? { dateModified: modified.toISOString().slice(0, 10) } : {}),
    }),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <BlogPostClient slug={post.slug} initialPost={post} />
    </>
  );
}
