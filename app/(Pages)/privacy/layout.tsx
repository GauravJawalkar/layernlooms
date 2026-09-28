import type { Metadata } from "next";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LayerNLooms collects, uses and protects personal data submitted through layernlooms.com.",
  alternates: {
    canonical: `${site.url}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "article",
    url: `${site.url}/privacy`,
    title: "Privacy Policy | LayerNLooms",
    description:
      "How LayerNLooms collects, uses and protects personal data submitted through layernlooms.com.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | LayerNLooms",
    description:
      "How LayerNLooms collects, uses and protects personal data submitted through layernlooms.com.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

