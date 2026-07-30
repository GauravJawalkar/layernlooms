import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Flexible Software Development Plans",
  description:
    "Explore transparent LayerNLooms pricing options — Fixed Project Scope, Hourly Engagement, and Dedicated Engineering Team models designed to match your budget and scale.",
  keywords: [
    "software development pricing",
    "custom web app cost",
    "dedicated development team pricing",
    "hourly developer rates",
    "software agency pricing models",
  ],
  alternates: {
    canonical: "https://layernlooms.com/pricing",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/pricing",
    title: "Pricing Plans | LayerNLooms",
    description:
      "Transparent, flexible pricing models for web, mobile, and AI software engineering projects.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNLooms Pricing & Engagement Models",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans | LayerNLooms",
    description:
      "Transparent, flexible pricing models for web, mobile, and AI software engineering projects.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
