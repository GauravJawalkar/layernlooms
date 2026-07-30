import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Start Your Software Project",
  description:
    "Get in touch with LayerNLooms. Contact our software engineering experts to discuss web development, mobile apps, AI solutions, or request a custom proposal.",
  keywords: [
    "contact LayerNLooms",
    "hire software agency",
    "custom web development quote",
    "AI software consultation",
    "contact web development team",
  ],
  alternates: {
    canonical: "https://layernlooms.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/contact",
    title: "Contact LayerNLooms",
    description:
      "Have a vision? We have the engineering expertise to bring it to life. Reach out today for a consultation or quote.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact LayerNLooms Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LayerNLooms",
    description:
      "Have a vision? We have the engineering expertise to bring it to life. Reach out today for a consultation or quote.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
