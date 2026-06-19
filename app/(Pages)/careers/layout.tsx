import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the LayerNLooms team. We're building the future of software — one line of code at a time.",
  openGraph: {
    title: "Careers | LayerNLooms",
    description:
      "Explore career opportunities at LayerNLooms and help us build the future of software.",
  },
  twitter: {
    title: "Careers | LayerNLooms",
    description:
      "Explore career opportunities at LayerNLooms and help us build the future of software.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
