"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import StarBackground from "./StarBackground";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const ThemeCustomizer = dynamic(() => import("./ThemeCustomizer"), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <StarBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative z-10">
        <Navbar />
        <main className="mt-4">{children}</main>
        <Footer />
      </div>
      <CustomCursor />
      <ThemeCustomizer />
    </div>
  );
}

