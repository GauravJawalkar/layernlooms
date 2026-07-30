import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Insights on Software Development & AI",
  description:
    "Insights, tutorials, and engineering articles from the LayerNLooms team on web development, React, Next.js, microservices, cloud migration, and AI integration.",
  keywords: [
    "LayerNLooms blog",
    "software engineering blog",
    "web development tutorials",
    "AI development articles",
    "Next.js best practices",
    "microservices guide",
  ],
  alternates: {
    canonical: "https://layernlooms.com/blog",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/blog",
    title: "Blog & Technical Insights | LayerNLooms",
    description:
      "Deep dives into software architecture, AI engineering, modern frontend frameworks, and cloud infrastructure.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNLooms Blog & Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Technical Insights | LayerNLooms",
    description:
      "Deep dives into software architecture, AI engineering, modern frontend frameworks, and cloud infrastructure.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
