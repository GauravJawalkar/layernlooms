"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      <Navbar />
      <main className="mt-4">{children}</main>
      <Footer />
    </div>
  );
}
