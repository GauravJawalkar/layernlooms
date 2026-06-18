import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our portfolio of custom software projects — web apps, mobile apps, AI solutions, and more built by LayerNLooms.",
  openGraph: {
    title: "Portfolio | LayerNLooms",
    description:
      "Explore our work. From web and mobile apps to AI-powered platforms — see what we've built.",
  },
  twitter: {
    title: "Portfolio | LayerNLooms",
    description:
      "Explore our work. From web and mobile apps to AI-powered platforms — see what we've built.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
