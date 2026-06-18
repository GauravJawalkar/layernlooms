import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LayerNLooms. Have a project in mind? Let's build something great together.",
  openGraph: {
    title: "Contact LayerNLooms",
    description:
      "Have a vision? We have the engineering expertise to bring it to life. Contact us today.",
  },
  twitter: {
    title: "Contact LayerNLooms",
    description:
      "Have a vision? We have the engineering expertise to bring it to life. Contact us today.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
