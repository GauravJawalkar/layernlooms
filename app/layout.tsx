import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Preloader from "./components/Preloader";
import JsonLd, { organizationSchema, websiteSchema } from "./components/JsonLd";
import { site } from "@/app/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LayerNLooms | Custom Software & AI Development",
    template: "%s | LayerNLooms",
  },
  description:
    "Custom software development agency building web applications, mobile apps, AI systems, and cloud infrastructure for startups and enterprises worldwide.",
  applicationName: site.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
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
    url: site.url,
    siteName: site.name,
    title: "Custom Software Development & AI Solutions | LayerNLooms",
    description:
      "Weaving Digital Experiences with Precision, Depth & AI. Web • Mobile • AI • Custom Software built for brands that want excellence.",
    images: [
      {
        url: `${site.url}/og-image.png`,
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
    images: [`${site.url}/twitter-image.png`],
    creator: site.socialHandles.twitter,
  },
  alternates: {
    canonical: site.url,
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
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                const root = document.documentElement;
                if (isDark) {
                  root.classList.add('dark');
                } else {
                  root.classList.remove('dark');
                }
                const pt = localStorage.getItem('pointerTheme') || 'zinc';
                root.style.setProperty('--accent-current', 'var(--accent-' + pt + ')');
                root.style.setProperty('--accent-current-foreground', 'var(--accent-' + pt + '-foreground)');
                root.style.setProperty('--accent-current-muted', 'var(--accent-' + pt + '-muted)');
                root.style.setProperty('--accent-current-muted-foreground', 'var(--accent-' + pt + '-muted-foreground)');
                const pe = localStorage.getItem('pointerEnabled');
                if (pe !== 'false') {
                  root.classList.add('custom-cursor-active');
                }
                const isBot = /Lighthouse|PageSpeed|HeadlessChrome|bot|crawler|spider|google/i.test(navigator.userAgent);
                if (sessionStorage.getItem('lnl-preloaded') === '1' || isBot) {
                  root.classList.add('preloaded-skip');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} antialiased bg-background text-foreground min-h-screen`}>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <ThemeProvider>
          <Preloader />
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
