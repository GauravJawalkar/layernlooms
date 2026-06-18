import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import ThemeCustomizer from "./components/ThemeCustomizer";

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
  ],
  authors: [{ name: "LayerNLooms" }],
  creator: "LayerNLooms",
  publisher: "LayerNLooms",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
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
        alt: "LayerNLooms - Software Development Agency",
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
      <head />
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} antialiased`}>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
            <Navbar />
            <main className="mt-4">
              {children}
            </main>
          </div>
          <Footer />
          <CustomCursor />
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
