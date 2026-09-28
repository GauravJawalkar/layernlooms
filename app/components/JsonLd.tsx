import React from "react";
import { site, team, type TeamMember } from "@/app/lib/site";
import { services } from "@/app/data/services";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const logo = `${site.url}/og-image.png`;

/**
 * The 4 core service clusters. Services that are no longer standalone pillars
 * are still surfaced through the catalog so we keep the entity associations
 * without claiming seven separate areas of top-level expertise.
 */
const catalogServices = services.filter((s) => s.isCoreService);

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.streetAddress,
  addressLocality: site.address.addressLocality,
  addressRegion: site.address.addressRegion,
  addressCountry: site.address.addressCountry,
};

const organizationId = `${site.url}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": organizationId,
      name: site.name,
      alternateName: site.alternateName,
      legalName: site.legalName,
      url: site.url,
      logo,
      image: logo,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phone,
      foundingDate: site.foundingDate,
      priceRange: site.priceRange,
      currenciesAccepted: "USD, INR",
      address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      areaServed: [
        { "@type": "Country", name: "Worldwide" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      knowsLanguage: ["en"],
      sameAs: site.sameAs,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: site.phone,
          email: site.email,
          contactType: "sales",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          email: site.email,
          contactType: "customer support",
          availableLanguage: ["English"],
        },
      ],
      employee: team.map((m) => ({
        "@type": "Person",
        "@id": `${site.url}/about#${m.slug}`,
        name: m.name,
        jobTitle: m.jobTitle,
        worksFor: { "@id": organizationId },
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom Software Development Services",
        itemListElement: catalogServices.map((service, index) => ({
          "@type": "Offer",
          position: index + 1,
          url: `${site.url}/services/${service.slug}`,
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            serviceType: service.title,
            url: `${site.url}/services/${service.slug}`,
            provider: { "@id": organizationId },
            areaServed: "Worldwide",
            audience: {
              "@type": "BusinessAudience",
              audienceType: "startups and enterprises",
            },
          },
        })),
      },
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      alternateName: site.alternateName,
      url: site.url,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: `${site.name} | Custom Software Development, Web & Mobile Apps, AI Solutions`,
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": organizationId },
      inLanguage: "en",
    },
  ],
};

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${site.url}${item.url}`,
    })),
  };
}

export function getServiceSchema(service: {
  title: string;
  description: string;
  subtitle?: string;
  slug: string;
  image?: string;
  pricing?: { starter?: string; professional?: string; enterprise?: string };
}) {
  const url = `${site.url}/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: service.title,
    name: service.title,
    description: service.description,
    url,
    image: service.image?.startsWith("http")
      ? service.image
      : `${site.url}${service.image || "/og-image.png"}`,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Worldwide" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "startups and enterprises",
    },
    ...(service.pricing
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: (service.pricing.starter ?? "0").replace(/[^0-9.]/g, "") || "0",
            highPrice: (service.pricing.professional ?? "0").replace(/[^0-9.]/g, "") || "0",
            offerCount: Object.keys(service.pricing).length,
          },
        }
      : {}),
  };
}

export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
  category?: string;
  tags?: string[];
}) {
  const url = `${site.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@id": url },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: post.author || "LayerNLooms Team",
      worksFor: { "@id": organizationId },
    },
    publisher: {
      "@id": organizationId,
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: logo },
    },
    image: post.image?.startsWith("http")
      ? post.image
      : `${site.url}${post.image || "/og-image.png"}`,
    ...(post.category ? { articleSection: post.category } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
  };
}

export function getCreativeWorkSchema(project: {
  title: string;
  description: string;
  slug: string;
  client: string;
  year: string;
  image?: string;
  url?: string;
  technologies?: string[];
  services?: string[];
  result?: string;
}) {
  const url = project.url || `${site.url}/portfolio/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/portfolio/${project.slug}#work`,
    name: project.title,
    headline: project.title,
    description: project.result || project.description,
    url,
    abstract: project.description,
    creator: { "@id": organizationId },
    dateCreated: project.year,
    inLanguage: "en",
    ...(project.technologies?.length
      ? { keywords: project.technologies.join(", ") }
      : {}),
    ...(project.services?.length ? { about: project.services.join(", ") } : {}),
    image: project.image?.startsWith("http")
      ? project.image
      : `${site.url}${project.image || "/og-image.png"}`,
  };
}

export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getPersonSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/about#${member.slug}`,
    name: member.name,
    jobTitle: member.jobTitle,
    description: member.description,
    url: member.url,
    ...(member.sameAs?.length ? { sameAs: member.sameAs } : {}),
    ...(member.knowsAbout?.length ? { knowsAbout: member.knowsAbout } : {}),
    worksFor: {
      "@id": organizationId,
      "@type": "Organization",
      name: site.name,
    },
  };
}

export function getProfilePageSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/about#${member.slug}-profile`,
    url: member.url,
    name: `${member.name} — ${member.jobTitle} at ${site.name}`,
    description: member.description,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@id": `${site.url}/about#${member.slug}` },
    about: { "@id": organizationId },
    inLanguage: "en",
  };
}

export { site, team };
