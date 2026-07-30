import { Metadata } from "next";
import { services, getServiceBySlug } from "@/app/data/services";
import ServiceDetailClient from "./ServiceDetailClient";
import JsonLd, { getBreadcrumbSchema, getServiceSchema, getFAQPageSchema } from "@/app/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | LayerNLooms",
      description: "The requested software service was not found.",
    };
  }

  const title = `${service.title} | LayerNLooms Custom Software Services`;
  const description = service.longDescription || service.description;

  return {
    title,
    description,
    keywords: [
      service.title,
      "custom software development",
      ...(service.technologies || []),
      ...(service.features || []),
    ],
    alternates: {
      canonical: `https://layernlooms.com/services/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://layernlooms.com/services/${slug}`,
      title: `${service.title} | LayerNLooms`,
      description,
      images: [
        {
          url: service.image?.startsWith("http")
            ? service.image
            : `https://layernlooms.com${service.image || "/og-image.png"}`,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | LayerNLooms`,
      description,
      images: [
        service.image?.startsWith("http")
          ? service.image
          : `https://layernlooms.com${service.image || "/og-image.png"}`,
      ],
    },
  };
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const schemas: any[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service ? service.title : slug, url: `/services/${slug}` },
    ]),
  ];

  if (service) {
    schemas.push(getServiceSchema(service));
    if (service.faqs && service.faqs.length > 0) {
      schemas.push(getFAQPageSchema(service.faqs));
    }
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ServiceDetailClient slug={slug} initialService={service as any} />
    </>
  );
}
