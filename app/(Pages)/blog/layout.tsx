import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tutorials, and updates from the LayerNLooms team on web development, AI, design, and technology.",
  openGraph: {
    title: "Blog | LayerNLooms",
    description:
      "Insights and tutorials from the LayerNLooms team on web development, AI, design, and technology.",
  },
  twitter: {
    title: "Blog | LayerNLooms",
    description:
      "Insights and tutorials from the LayerNLooms team on web development, AI, design, and technology.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
