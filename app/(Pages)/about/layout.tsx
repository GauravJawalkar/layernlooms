import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Custom Software Development Agency",
  description:
    "Discover LayerNLooms — a custom software development agency dedicated to weaving precision engineering, high-performance design, and advanced AI integration into modern digital experiences.",
  keywords: [
    "about LayerNLooms",
    "software agency team",
    "custom software development company",
    "web development team",
    "AI software development agency",
  ],
  alternates: {
    canonical: "https://layernlooms.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/about",
    title: "About Us | LayerNLooms",
    description:
      "Weaving Digital Experiences with Precision, Depth & AI. Discover our mission, values, and software engineering capabilities.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About LayerNLooms Software Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | LayerNLooms",
    description:
      "Weaving Digital Experiences with Precision, Depth & AI. Discover our mission, values, and engineering expertise.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
