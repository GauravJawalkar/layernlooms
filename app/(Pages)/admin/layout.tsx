"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FolderKanban,
  Briefcase,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import { AdminAuthProvider, useAdminAuth } from "../../context/AdminAuthContext";

const adminNav = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Services", icon: FolderKanban, href: "/admin/services" },
  { name: "Portfolio", icon: Briefcase, href: "/admin/portfolio" },
  { name: "Contacts", icon: MessageSquare, href: "/admin/contacts" },
  { name: "Users", icon: Users, href: "/admin/users" },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading, isSuperAdmin, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [loading, user, pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-textMuted">Connecting...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 hidden md:flex flex-col">
        <Link href="/admin" className="flex justify-center mb-8">
          <Logo className="w-auto h-17" />
        </Link>

        <nav className="flex-1 space-y-1">
          {adminNav.map((item) => {
            if (item.href === "/admin/users" && !isSuperAdmin) return null;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-textMuted hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4 mt-4">
          <div className="px-3 mb-4 flex flex-col gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate" title={user.email}>{user.email}</p>
              <p className="text-xs text-textMuted capitalize">{user.role}</p>
            </div>
            <div className="flex justify-start">
              <ThemeToggle />
            </div>
          </div>
          <button
            onClick={async () => { await logout(); router.push("/admin/login"); }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-textMuted hover:text-foreground hover:bg-secondary transition-all mt-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <Link href="/admin">
            <Logo className="w-auto h-7" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={async () => { await logout(); router.push("/admin/login"); }}
              className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
          {adminNav.map((item) => {
            if (item.href === "/admin/users" && !isSuperAdmin) return null;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-textMuted"
                }`}
              >
                <item.icon className="w-5 h-5 mb-0.5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
