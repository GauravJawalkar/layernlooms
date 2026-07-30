import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Our Featured Work & Case Studies",
  description:
    "Explore LayerNLooms case studies — Web apps, Mobile apps, SaaS platforms, Developer tools, Privacy suites, and E-Commerce platforms built for high performance.",
  keywords: [
    "LayerNLooms portfolio",
    "software case studies",
    "web development portfolio",
    "mobile app showcase",
    "custom software projects",
    "SaaS analytics case study",
  ],
  alternates: {
    canonical: "https://layernlooms.com/portfolio",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/portfolio",
    title: "Portfolio & Case Studies | LayerNLooms",
    description:
      "Browse our portfolio of custom software engineering projects built for ambitious startups and enterprises.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNLooms Portfolio Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | LayerNLooms",
    description:
      "Browse our portfolio of custom software engineering projects built for ambitious startups and enterprises.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
