import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Programme | Min. 10% Referral Commission (Scalable)",
  description:
    "Join the LayerNlooms Partner Programme. Earn a guaranteed minimum 10% referral commission (scalable upward with project scope and scale) introducing clients for custom software development, web applications, mobile apps, and enterprise AI engineering. Featuring two flexible payout models and 90-day lead protection.",
  keywords: [
    "LayerNlooms partner programme",
    "software referral partner",
    "software development affiliate",
    "AI agency partner",
    "minimum 10% software commission",
    "tech consultancy partner",
    "software referral commission",
    "LayerNlooms partners",
  ],
  alternates: {
    canonical: "https://layernlooms.com/partner",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/partner",
    title: "Partner Programme | Min. 10% Referral Commission | LayerNlooms",
    description:
      "Earn a minimum 10% referral commission (scalable based on project scale & scope) on custom software and AI projects. Turnkey & milestone payouts with 90-day lead protection.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNlooms Partner Programme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Programme | Min. 10% Referral Commission | LayerNlooms",
    description:
      "Introduce high-ticket software and AI projects to LayerNlooms and earn a minimum 10% commission (scalable with scope) with 90-day lead protection.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
