import { Metadata } from "next";
import { projects, getProjectBySlug } from "@/app/data/portfolio";
import PortfolioDetailClient from "./PortfolioDetailClient";
import JsonLd, { getBreadcrumbSchema, getCreativeWorkSchema } from "@/app/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | LayerNLooms",
      description: "The requested portfolio case study was not found.",
    };
  }

  const title = `${project.title} — Case Study | LayerNLooms Portfolio`;
  const description = project.longDescription || project.description;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      "case study",
      ...(project.technologies || []),
      ...(project.services || []),
    ],
    alternates: {
      canonical: `https://layernlooms.com/portfolio/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://layernlooms.com/portfolio/${slug}`,
      title,
      description,
      images: [
        {
          url: project.image?.startsWith("http")
            ? project.image
            : `https://layernlooms.com${project.image || "/og-image.png"}`,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        project.image?.startsWith("http")
          ? project.image
          : `https://layernlooms.com${project.image || "/og-image.png"}`,
      ],
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const schemas: any[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Portfolio", url: "/portfolio" },
      { name: project ? project.title : slug, url: `/portfolio/${slug}` },
    ]),
  ];

  if (project) {
    schemas.push(getCreativeWorkSchema(project));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <PortfolioDetailClient slug={slug} initialProject={project as any} />
    </>
  );
}
