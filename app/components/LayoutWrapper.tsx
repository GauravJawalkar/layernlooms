"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const ThemeCustomizer = dynamic(() => import("./ThemeCustomizer"), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-transparent text-foreground overflow-x-clip">
      {/* <StarBackground /> */}
      <div className="max-w-[86rem] mx-auto px-3 sm:px-6 lg:px-4 pt-3 sm:pt-4 pb-10 sm:pb-12 relative z-10">
        <Navbar />
        <main className="mt-3 sm:mt-4">{children}</main>
        <Footer />
      </div>
      <CustomCursor />
      <ThemeCustomizer />
    </div>
  );
}
