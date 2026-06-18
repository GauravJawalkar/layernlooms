import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LayerNLooms — a custom software development agency specializing in web, mobile, and AI solutions.",
  openGraph: {
    title: "About LayerNLooms",
    description:
      "Weaving Digital Experiences with Precision, Depth & AI. Discover our mission, vision, and the team behind LayerNLooms.",
  },
  twitter: {
    title: "About LayerNLooms",
    description:
      "Weaving Digital Experiences with Precision, Depth & AI. Discover our mission, vision, and the team behind LayerNLooms.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
