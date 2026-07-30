import React from "react";

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

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LayerNLooms",
  "alternateName": "Layer N Looms",
  "url": "https://layernlooms.com",
  "logo": "https://layernlooms.com/og-image.png",
  "description": "Premium software development agency specializing in custom web applications, mobile app development, AI integration, and enterprise software solutions.",
  "sameAs": [
    "https://twitter.com/layernlooms",
    "https://linkedin.com/company/layernlooms",
    "https://github.com/layernlooms"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer support",
    "email": "contact@layernlooms.com",
    "availableLanguage": ["English"]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LayerNLooms",
  "url": "https://layernlooms.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://layernlooms.com/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `https://layernlooms.com${item.url}`
    }))
  };
}

export function getServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "name": service.title,
    "description": service.description,
    "url": `https://layernlooms.com/services/${service.slug}`,
    "provider": {
      "@type": "Organization",
      "name": "LayerNLooms",
      "url": "https://layernlooms.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Custom Software Development Services"
    }
  };
}

export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://layernlooms.com/blog/${post.slug}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "LayerNLooms Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LayerNLooms",
      "logo": {
        "@type": "ImageObject",
        "url": "https://layernlooms.com/og-image.png"
      }
    },
    "image": post.image?.startsWith("http")
      ? post.image
      : `https://layernlooms.com${post.image || "/og-image.png"}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://layernlooms.com/blog/${post.slug}`
    }
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": project.url || `https://layernlooms.com/portfolio/${project.slug}`,
    "author": {
      "@type": "Organization",
      "name": "LayerNLooms"
    },
    "image": project.image?.startsWith("http")
      ? project.image
      : `https://layernlooms.com${project.image || "/og-image.png"}`
  };
}

export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
