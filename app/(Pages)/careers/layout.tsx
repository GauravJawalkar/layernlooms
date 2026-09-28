import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join the LayerNLooms Team",
  description:
    "Explore career opportunities at LayerNLooms. Join our team of developers, UI/UX designers, and AI engineers building the future of software.",
  keywords: [
    "LayerNLooms careers",
    "software engineering jobs",
    "full stack developer jobs",
    "remote software engineer jobs",
    "UI UX designer careers",
  ],
  alternates: {
    canonical: "https://layernlooms.com/careers",
  },
  robots: {
    // The page currently renders a 105-word "Coming Soon" placeholder. A
    // placeholder in the index is thin content with no upside, so it stays
    // crawlable via the sitemap but out of the index until it is built out.
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/careers",
    title: "Careers at LayerNLooms",
    description:
      "Work on cutting-edge web, mobile, and AI applications. Join LayerNLooms and build what matters.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Careers at LayerNLooms Software Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at LayerNLooms",
    description:
      "Work on cutting-edge web, mobile, and AI applications. Join LayerNLooms and build what matters.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
