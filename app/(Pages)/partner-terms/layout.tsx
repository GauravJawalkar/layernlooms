import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Programme Terms & Conditions",
  description:
    "Official Referral & Strategic Partner Programme Terms & Conditions for LayerNlooms. Review our minimum 10% commission model (scalable with project scale and scope), statutory 18% GST calculation, turnkey and milestone payout timelines, and 90-day lead protection.",
  keywords: [
    "LayerNlooms partner terms",
    "partner programme agreement",
    "referral commission terms",
    "minimum 10% software commission",
    "scalable partner terms",
    "agency referral policy",
  ],
  alternates: {
    canonical: "https://layernlooms.com/partner-terms",
  },
  openGraph: {
    type: "website",
    url: "https://layernlooms.com/partner-terms",
    title: "Partner Programme Terms & Conditions | LayerNlooms",
    description:
      "Review the commercial terms, commission calculation, payout models, and lead protection governing the LayerNlooms Partner Programme.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNlooms Partner Terms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Programme Terms & Conditions | LayerNlooms",
    description:
      "Review the commercial terms, commission calculation, and lead protection for the LayerNlooms Partner Programme.",
    images: ["https://layernlooms.com/twitter-image.png"],
  },
};

export default function PartnerTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
