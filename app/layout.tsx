import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { ThemeProvider } from "./context/ThemeContext";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Preloader from "./components/Preloader";
import JsonLd, { organizationSchema, websiteSchema } from "./components/JsonLd";
import { site } from "@/app/lib/site";

const THEME_INIT_SCRIPT = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('theme')||'system';if(t!=='light'&&t!=='dark'&&t!=='system')t='system';var isDark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(isDark){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.colorScheme=isDark?'dark':'light';var valid={zinc:1,purple:1,green:1,cyan:1,amber:1,pink:1};var pt=localStorage.getItem('pointerTheme')||'zinc';if(!valid[pt])pt='zinc';var st=localStorage.getItem('scrollbarTheme')||'zinc';if(!valid[st])st='zinc';r.style.setProperty('--accent-current','var(--accent-'+pt+')');r.style.setProperty('--accent-current-foreground','var(--accent-'+pt+'-foreground)');r.style.setProperty('--accent-current-muted','var(--accent-'+pt+'-muted)');r.style.setProperty('--accent-current-muted-foreground','var(--accent-'+pt+'-muted-foreground)');var sb={zinc:['#52525b','#a1a1aa','#27272a','#f4f4f5'],purple:['#8b5cf6','#a78bfa','#7c3aed','#c084fc'],green:['#059669','#34d399','#047857','#6ee7b7'],cyan:['#0891b2','#22d3ee','#0e7490','#67e8f9'],amber:['#ea580c','#fb923c','#c2410c','#fdba74'],pink:['#db2777','#f472b6','#be185d','#f9a8d4']}[st];r.style.setProperty('--scrollbar-thumb-color',isDark?sb[1]:sb[0]);r.style.setProperty('--scrollbar-thumb-hover',isDark?sb[3]:sb[2]);r.style.setProperty('--scrollbar-track-border',isDark?'#1f1f22':'#f3f4f6');var pc={zinc:['#171717','#fafafa','rgba(23,23,23,0.15)','rgba(250,250,250,0.15)'],purple:['#8b5cf6','#a78bfa','rgba(139,92,246,0.2)','rgba(167,139,250,0.2)'],green:['#059669','#34d399','rgba(5,150,105,0.2)','rgba(52,211,153,0.2)'],cyan:['#0891b2','#22d3ee','rgba(8,145,178,0.2)','rgba(34,211,238,0.2)'],amber:['#ea580c','#fb923c','rgba(234,88,12,0.2)','rgba(251,146,60,0.2)'],pink:['#db2777','#f472b6','rgba(219,39,119,0.2)','rgba(244,114,182,0.2)']}[pt];r.style.setProperty('--cursor-color',isDark?pc[1]:pc[0]);r.style.setProperty('--cursor-glow-color',isDark?pc[3]:pc[2]);if(localStorage.getItem('pointerEnabled')==='true'){r.classList.add('custom-cursor-active');}else{r.classList.remove('custom-cursor-active');}if(sessionStorage.getItem('lnl-preloaded')==='1'){r.classList.add('preloaded-skip');}}catch(e){}})();`;

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
    site: site.socialHandles.twitter,
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
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
