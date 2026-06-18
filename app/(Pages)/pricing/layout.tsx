import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore LayerNLooms flexible pricing plans — fixed project, hourly, and dedicated team models tailored to your needs.",
  openGraph: {
    title: "Pricing | LayerNLooms",
    description:
      "Transparent pricing for custom software development. Fixed project, hourly, or dedicated team — choose what fits.",
  },
  twitter: {
    title: "Pricing | LayerNLooms",
    description:
      "Transparent pricing for custom software development. Fixed project, hourly, or dedicated team — choose what fits.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
