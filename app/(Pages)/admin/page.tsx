"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Clock,
  Activity,
  FolderKanban,
  Briefcase,
  FileText,
} from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { getAllUsers, getPendingUsers, AdminUser } from "../../lib/admin/auth";
import { getAllBlogPostsFromDb } from "../../lib/admin/blog";
import { getAllServicesFromDb } from "../../lib/admin/services";
import { getAllProjectsFromDb } from "../../lib/admin/portfolio";

export default function AdminDashboardPage() {
  const { user, isSuperAdmin } = useAdminAuth();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    services: 0,
    projects: 0,
    blogPosts: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const [all, pending, services, projects, blogPosts] = await Promise.all([
          getAllUsers(),
          getPendingUsers(),
          getAllServicesFromDb(),
          getAllProjectsFromDb(),
          getAllBlogPostsFromDb(),
        ]);
        setStats({
          total: all.length,
          active: all.filter((u) => u.status === "active").length,
          pending: pending.length,
          services: services.length,
          projects: projects.length,
          blogPosts: blogPosts.length,
        });
      } catch {}
    })();
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const cards = [
    { icon: Users, label: "Total Users", value: stats.total, color: "text-blue-500 bg-blue-500/10" },
    { icon: ShieldCheck, label: "Active Admins", value: stats.active, color: "text-emerald-500 bg-emerald-500/10" },
    { icon: Clock, label: "Pending Approval", value: stats.pending, color: "text-amber-500 bg-amber-500/10" },
    { icon: Activity, label: "Your Role", value: user?.role ?? "-", color: "text-primary bg-primary/10" },
    { icon: FolderKanban, label: "Services", value: stats.services, color: "text-purple-500 bg-purple-500/10" },
    { icon: Briefcase, label: "Portfolio Projects", value: stats.projects, color: "text-cyan-500 bg-cyan-500/10" },
    { icon: FileText, label: "Blog Posts", value: stats.blogPosts, color: "text-rose-500 bg-rose-500/10" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-textMuted">Overview of your admin panel</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-b from-primary/5 to-primary/4 border border-primary/20 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-foreground">
          {greeting()}, {user?.displayName || user?.email?.split("@")[0] || "Admin"} 👋
        </h2>
        <p className="text-sm text-textMuted mt-1">
          Welcome back to the <span className="font-semibold text-foreground">LayerNLooms</span> admin panel.
          {isSuperAdmin
            ? " You have full control over the system."
            : " You have access to the dashboard."}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Activity className="w-3 h-3" />
            {user?.role === "superadmin" ? "Super Admin" : "Admin"}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
            <ShieldCheck className="w-3 h-3" />
            Active
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className={`inline-flex w-10 h-10 rounded-xl items-center justify-center ${card.color} mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-textMuted mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {isSuperAdmin && stats.pending > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5"
        >
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Pending Approvals</h3>
              <p className="text-sm text-textMuted mt-1">
                {stats.pending} user{stats.pending > 1 ? "s" : ""} pending your approval.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
