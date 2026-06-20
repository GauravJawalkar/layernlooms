"use client";

import { useState, useEffect } from "react";
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
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import { ToastProvider } from "../../components/admin/Toast";
import NotificationBell from "../../components/admin/NotificationBell";
import { AdminAuthProvider, useAdminAuth } from "../../context/AdminAuthContext";

const adminNav = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Services", icon: FolderKanban, href: "/admin/services" },
  { name: "Portfolio", icon: Briefcase, href: "/admin/portfolio" },
  { name: "Blog", icon: FileText, href: "/admin/blog" },
  { name: "Contacts", icon: MessageSquare, href: "/admin/contacts" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading, isSuperAdmin, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [loading, user, pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

  const currentNav = adminNav.find((n) => n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)) || adminNav[0];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card py-6 hidden md:flex flex-col">
        <div className="px-5 mb-6 flex flex-col gap-4">
          <div className="flex justify-center items-center">
          <Link href="/admin">
            <Logo className="w-auto h-17" />
          </Link>
          </div>
          <div className="mb-5"></div>
              
          <p className="text-xs font-bold tracking-wider uppercase text-textMuted">Navigation</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
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
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile sidebar drawer */}
      <aside className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border p-6 transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin">
            <Logo className="w-auto h-7" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-textMuted hover:text-foreground hover:bg-secondary transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-1">
          {adminNav.map((item) => {
            if (item.href === "/admin/users" && !isSuperAdmin) return null;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-primary/10 text-primary" : "text-textMuted hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border pt-4 mt-4">
          <div className="px-3 mb-4">
            <p className="text-sm font-medium text-foreground truncate">{user.displayName || user.email}</p>
            <p className="text-xs text-textMuted capitalize">{user.role}</p>
          </div>
          <button
            onClick={async () => { await logout(); router.push("/admin/login"); }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-textMuted hover:text-foreground hover:bg-secondary transition-all mt-1">
            <ChevronLeft className="w-4 h-4" /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Desktop top navbar */}
        <header className="hidden md:flex items-center justify-between px-6 py-3 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{currentNav.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <ThemeToggle />
            <div className="h-5 w-px bg-border" />
            <div className="text-right min-w-0">
              <p className="text-sm font-medium text-foreground truncate max-w-[160px]" title={user.displayName || user.email}>{user.displayName || user.email}</p>
              <p className="text-xs text-textMuted capitalize">{user.role}</p>
            </div>
            <button
              onClick={async () => { await logout(); router.push("/admin/login"); }}
              className="p-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
              title="Back to Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-lg text-textMuted hover:text-foreground hover:bg-secondary transition-all">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-foreground">{currentNav.name}</span>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <ThemeToggle />
            <button
              onClick={async () => { await logout(); router.push("/admin/login"); }}
              className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="p-1.5 rounded-lg text-textMuted hover:text-foreground hover:bg-secondary transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-6 py-4 shrink-0">
          <div className="flex items-center justify-between text-xs text-textMuted">
            <p>&copy; {new Date().getFullYear()} LayerNLooms. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-foreground transition-colors">Visit Site</Link>
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </ToastProvider>
    </AdminAuthProvider>
  );
}
