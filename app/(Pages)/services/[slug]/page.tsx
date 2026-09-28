import { Metadata } from "next";
import { services, getServiceBySlug } from "@/app/data/services";
import ServiceDetailClient from "./ServiceDetailClient";
import JsonLd, { getBreadcrumbSchema, getServiceSchema, getFAQPageSchema } from "@/app/components/JsonLd";
import { pickMetaDescription } from "@/app/lib/seo";
import { site } from "@/app/lib/site";
import { getServiceContent } from "@/app/data/service-content";

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
  const description = pickMetaDescription(
    service.metaDescription,
    service.description,
    service.longDescription
  );

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
      canonical: `${site.url}/services/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${site.url}/services/${slug}`,
      title: `${service.title} | LayerNLooms`,
      description,
      images: [
        {
          url: service.image?.startsWith("http")
            ? service.image
            : `${site.url}${service.image || "/og-image.png"}`,
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
          : `${site.url}${service.image || "/og-image.png"}`,
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

  const schemas: Record<string, unknown>[] = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service ? service.title : slug, url: `/services/${slug}` },
    ]),
  ];

  if (service) {
    schemas.push(getServiceSchema(service));
    const faqs = collectFaqs(slug, service.faqs);
    if (faqs.length > 0) {
      schemas.push(getFAQPageSchema(faqs));
    }
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ServiceDetailClient slug={slug} initialService={service as any} />
    </>
  );
}
