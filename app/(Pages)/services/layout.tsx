import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive software development services by LayerNLooms — web development, mobile apps, AI/ML, cloud infrastructure, and more.",
  openGraph: {
    title: "Our Services | LayerNLooms",
    description:
      "End-to-end software development services. Web, Mobile, AI, Cloud — we deliver excellence across the stack.",
  },
  twitter: {
    title: "Our Services | LayerNLooms",
    description:
      "End-to-end software development services. Web, Mobile, AI, Cloud — we deliver excellence across the stack.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
