import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import ThemeCustomizer from "./components/ThemeCustomizer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import JsonLd, { organizationSchema, websiteSchema } from "./components/JsonLd";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://layernlooms.com"),
  title: {
    default: "LayerNLooms | Custom Software Development, Web & Mobile Apps, AI Solutions",
    template: "%s | LayerNLooms",
  },
  description:
    "Premium software development agency specializing in custom web applications, mobile app development, AI integration, and enterprise software solutions for brands that demand excellence.",
  keywords: [
    "custom software development",
    "web application development",
    "mobile app development",
    "AI software solutions",
    "enterprise software development",
    "software development agency",
    "full-stack development",
    "AI integration services",
    "digital transformation",
    "custom web development",
    "iOS Android app development",
    "machine learning solutions",
    "Next.js agency",
    "React Native development",
    "cloud infrastructure services",
  ],
  authors: [{ name: "LayerNLooms", url: "https://layernlooms.com" }],
  creator: "LayerNLooms",
  publisher: "LayerNLooms",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://layernlooms.com",
    siteName: "LayerNLooms",
    title: "Custom Software Development & AI Solutions | LayerNLooms",
    description:
      "Weaving Digital Experiences with Precision, Depth & AI. Web • Mobile • AI • Custom Software built for brands that want excellence.",
    images: [
      {
        url: "https://layernlooms.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LayerNLooms - Custom Software Development & AI Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development & AI Solutions | LayerNLooms",
    description:
      "Web • Mobile • AI • Custom Software — Built exclusively for brands that want excellence.",
    images: ["https://layernlooms.com/twitter-image.png"],
    creator: "@layernlooms",
  },
  alternates: {
    canonical: "https://layernlooms.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <CustomCursor />
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
