"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  User,
  Building2,
  Wallet,
  FolderKanban,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { getAllContacts, markContactRead, deleteContact, ContactSubmission } from "../../../lib/admin/contacts";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function AdminContactsPage() {
  const { isSuperAdmin } = useAdminAuth();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [readState, setReadState] = useState<Record<string, boolean>>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllContacts();
      setContacts(data);
      const rs: Record<string, boolean> = {};
      data.forEach((c) => { rs[c.id] = c.read; });
      setReadState(rs);
    } catch (err: any) {
      console.error("Failed to load contacts:", err);
      setError(err?.message || "Failed to load contacts. Check Firestore rules.");
    }
    setLoading(false);
  }

  async function handleMarkRead(id: string) {
    try {
      await markContactRead(id);
      setReadState((prev) => ({ ...prev, [id]: true }));
    } catch {}
  }

  async function handleDelete(id: string) {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setReadState((prev) => { const { [id]: _, ...rest } = prev; return rest; });
    } catch (err) {
      console.error("Failed to delete contact:", err);
      return;
    }
    setDeleteId(null);
  }

  const unreadCount = Object.values(readState).filter((r) => !r).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Contact Inquiries</h1>
        <p className="text-sm text-textMuted mb-8">Messages submitted via the contact form</p>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <button
            onClick={loadContacts}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-foreground">Contact Inquiries</h1>
        {unreadCount > 0 && (
          <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {unreadCount} unread
          </span>
        )}
      </div>
      <p className="text-sm text-textMuted mb-8">Messages submitted via the contact form</p>

      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <MessageSquare className="w-8 h-8 text-textMuted mx-auto mb-3" />
          <p className="text-sm text-textMuted">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-2xl border transition-all ${
                readState[c.id]
                  ? "border-border bg-card"
                  : "border-primary/20 bg-primary/[0.03]"
              }`}
            >
              <button
                onClick={() => {
                  setExpanded(expanded === c.id ? null : c.id);
                  if (!readState[c.id]) handleMarkRead(c.id);
                }}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    readState[c.id] ? "bg-secondary text-textMuted" : "bg-primary/10 text-primary"
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium truncate ${
                        readState[c.id] ? "text-foreground" : "text-foreground font-semibold"
                      }`}>
                        {c.name}
                      </span>
                      {!readState[c.id] && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-textMuted truncate">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-textMuted whitespace-nowrap hidden sm:block">
                    {c.createdAt?.toDate?.()?.toLocaleDateString() ?? "—"}
                  </span>
                  {expanded === c.id ? (
                    <ChevronUp className="w-4 h-4 text-textMuted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-textMuted" />
                  )}
                </div>
              </button>

              {expanded === c.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 border-t border-border mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <InfoRow icon={User} label="Name" value={c.name} />
                      <InfoRow icon={Mail} label="Email" value={c.email} />
                      <InfoRow icon={Building2} label="Company" value={c.company || "—"} />
                      <InfoRow icon={FolderKanban} label="Project Type" value={c.projectType || "—"} />
                      <InfoRow icon={Wallet} label="Budget" value={c.budget || "—"} />
                      <InfoRow icon={Clock} label="Submitted" value={c.createdAt?.toDate?.()?.toLocaleString() ?? "—"} />
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-bold tracking-widest uppercase text-textMuted mb-2">Message</p>
                      <p className="text-sm text-foreground bg-secondary/50 rounded-xl p-4 whitespace-pre-wrap">{c.message || "—"}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      {!readState[c.id] && (
                        <button
                          onClick={() => handleMarkRead(c.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-textMuted hover:text-foreground transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark as read
                        </button>
                      )}
                      {isSuperAdmin && (
                        deleteId === c.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-textMuted">Delete?</span>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteId(null)}
                              className="px-2.5 py-1 rounded-lg bg-secondary text-textMuted text-xs font-medium hover:text-foreground transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteId(c.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-textMuted" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-widest uppercase text-textMuted">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
