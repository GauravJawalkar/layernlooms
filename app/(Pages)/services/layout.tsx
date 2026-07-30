import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Custom Software & AI Development",
  description:
    "Explore software development services by LayerNLooms — Web Development, Mobile Apps, AI/ML Solutions, Cloud Infrastructure, UI/UX Design, Digital Marketing, and SaaS Analytics.",
  keywords: [
    "custom software development services",
    "web application development agency",
    "mobile app development company",
    "AI software solutions",
    "cloud infrastructure DevOps",
    "UI UX design services",
    "SaaS analytics platform",
  ],
  alternates: {
    canonical: "https://layernlooms.com/services",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/services",
    title: "Our Services | LayerNLooms",
    description:
      "End-to-end software development services. Web, Mobile, AI, Cloud, UI/UX — engineered for high growth and enterprise performance.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNLooms Software Engineering Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | LayerNLooms",
    description:
      "End-to-end software development services. Web, Mobile, AI, Cloud, UI/UX — engineered for high growth and enterprise performance.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
