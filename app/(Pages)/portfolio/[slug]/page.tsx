import { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "./PortfolioDetailClient";
import JsonLd, { getBreadcrumbSchema, getCreativeWorkSchema } from "@/app/components/JsonLd";
import { pickMetaDescription } from "@/app/lib/seo";
import { site } from "@/app/lib/site";
import {
  getPublishedProjectBySlug,
  getPublishedProjects,
  resolveLastModified,
} from "@/app/lib/firestore-content";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | LayerNLooms",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title} — Case Study | LayerNLooms Portfolio`;
  const description = pickMetaDescription(
    undefined,
    project.description,
    project.longDescription,
    project.result
  );
  const url = `${site.url}/portfolio/${project.slug}`;
  const image = project.image?.startsWith("http")
    ? project.image
    : `${site.url}${project.image || "/og-image.png"}`;
  const modified = resolveLastModified(project);

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      "case study",
      ...(project.technologies || []),
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      ...(modified ? { modifiedTime: modified.toISOString() } : {}),
      images: [{ url: image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) notFound();

  const schemas: Record<string, unknown>[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Portfolio", url: "/portfolio" },
      { name: project.title, url: `/portfolio/${project.slug}` },
    ]),
    getCreativeWorkSchema(project),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PortfolioDetailClient slug={project.slug} initialProject={project} />
    </>
  );
}
