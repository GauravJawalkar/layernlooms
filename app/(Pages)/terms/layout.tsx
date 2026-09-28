import type { Metadata } from "next";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing use of layernlooms.com and the software development services provided by LayerNLooms.",
  alternates: {
    canonical: `${site.url}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "article",
    url: `${site.url}/terms`,
    title: "Terms & Conditions | LayerNLooms",
    description:
      "The terms governing use of layernlooms.com and the software development services provided by LayerNLooms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | LayerNLooms",
    description:
      "The terms governing use of layernlooms.com and the software development services provided by LayerNLooms.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
