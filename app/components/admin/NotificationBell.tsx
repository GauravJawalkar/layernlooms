"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MessageSquare, Users, Loader2 } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Notification {
  id: string;
  type: "contact" | "user";
  title: string;
  description: string;
  href: string;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const [contactsSnap, usersSnap] = await Promise.all([
          getDocs(collection(db, "contacts")),
          getDocs(collection(db, "users")),
        ]);
        const list: Notification[] = [];
        contactsSnap.docs.forEach((d) => {
          const c = d.data();
          if (c.read) return;
          list.push({
            id: `contact-${d.id}`,
            type: "contact",
            title: c.name || "Unknown",
            description: (c.message || "").slice(0, 60) + ((c.message || "").length > 60 ? "..." : ""),
            href: "/admin/contacts",
          });
        });
        usersSnap.docs.forEach((d) => {
          const u = d.data();
          if (u.status !== "pending") return;
          list.push({
            id: `user-${d.id}`,
            type: "user",
            title: u.displayName || (u.email || "").split("@")[0] || "Unknown",
            description: "Pending approval",
            href: "/admin/users",
          });
        });
        setNotifications(list.slice(0, 10));
      } catch {}
      setLoading(false);
    }
    fetch();
    const interval = setInterval(fetch, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const count = notifications.length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="relative p-2 rounded-xl text-textMuted hover:text-foreground hover:bg-secondary transition-all"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-[9px] font-bold text-background flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Notifications</p>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8 text-textMuted">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span className="text-xs">Loading...</span>
                </div>
              ) : count === 0 ? (
                <div className="py-8 text-center text-textMuted">
                  <Bell className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">No new notifications</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-0"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      n.type === "contact"
                        ? "bg-indigo-500/10 text-indigo-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {n.type === "contact" ? (
                        <MessageSquare className="w-3.5 h-3.5" />
                      ) : (
                        <Users className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{n.title}</p>
                      <p className="text-xs text-textMuted truncate">{n.description}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
            {count > 0 && (
              <Link
                href="/admin/contacts"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-center text-xs font-medium text-primary hover:bg-secondary transition-colors border-t border-border"
              >
                View all notifications
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
