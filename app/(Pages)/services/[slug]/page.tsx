import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import JsonLd, { getBreadcrumbSchema, getServiceSchema, getFAQPageSchema } from "@/app/components/JsonLd";
import { pickMetaDescription } from "@/app/lib/seo";
import { site } from "@/app/lib/site";
import { getServiceContent } from "@/app/data/service-content";
import {
  getPublishedServiceBySlug,
  getPublishedServices,
} from "@/app/lib/firestore-content";

export const revalidate = 3600;

type Faq = { question: string; answer: string };

/**
 * Editorial FAQs from the static content module are richer than anything in
 * the CMS, but an editor may still have added their own. Merge both, keyed on
 * the question text, so FAQPage schema covers the full set without repeating.
 */
function collectFaqs(slug: string, cmsFaqs?: Faq[]): Faq[] {
  const combined: Faq[] = [...(getServiceContent(slug)?.faqs ?? [])];

  for (const faq of cmsFaqs ?? []) {
    const alreadyAnswered = combined.some(
      (existing) => existing.question.trim().toLowerCase() === faq.question.trim().toLowerCase()
    );
    if (!alreadyAnswered) combined.push(faq);
  }

  return combined;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | LayerNLooms",
      robots: { index: false, follow: false },
    };
  }

  const title = `${service.title} | LayerNLooms Custom Software Services`;
  const description = pickMetaDescription(undefined, service.description, service.longDescription);
  const url = `${site.url}/services/${service.slug}`;
  const image = service.image?.startsWith("http")
    ? service.image
    : `${site.url}${service.image || "/og-image.png"}`;

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
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${service.title} | LayerNLooms`,
      description,
      images: [{ url: image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | LayerNLooms`,
      description,
      images: [image],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);

  if (!service) notFound();

  const faqs = collectFaqs(service.slug, service.faqs);

  const schemas: Record<string, unknown>[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${service.slug}` },
    ]),
    getServiceSchema(service),
  ];

  if (faqs.length > 0) {
    schemas.push(getFAQPageSchema(faqs));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ServiceDetailClient slug={service.slug} initialService={service} />
    </>
  );
}
