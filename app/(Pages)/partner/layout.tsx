import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Programme | 10% Referral Commission",
  description:
    "Join the LayerNLooms Partner Programme. Earn a transparent 10% referral commission introducing clients for custom software development, web applications, mobile apps, and enterprise AI engineering. Featuring direct commission calculation, two flexible payout models, and 90-day lead protection.",
  keywords: [
    "LayerNLooms partner programme",
    "software referral partner",
    "software development affiliate",
    "AI agency partner",
    "10% software commission",
    "tech consultancy partner",
    "software referral commission",
    "LayerNLooms partners",
  ],
  alternates: {
    canonical: "https://layernlooms.com/partner",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/partner",
    title: "Partner Programme | 10% Referral Commission | LayerNLooms",
    description:
      "Earn 10% referral commission on custom software and AI projects. Direct commission calculation, turnkey & milestone payouts, and 90-day lead protection.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNLooms Partner Programme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Programme | 10% Referral Commission | LayerNLooms",
    description:
      "Introduce high-ticket software and AI projects to LayerNLooms and earn 10% referral commission with 90-day lead protection.",
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
