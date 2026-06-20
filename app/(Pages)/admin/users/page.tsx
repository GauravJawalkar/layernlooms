"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Users,
  CheckCircle,
  XCircle,
  Shield,
  Loader2,
  Mail,
  Clock,
  AlertCircle,
  Ban,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useToast } from "../../../components/admin/Toast";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  getAllUsers,
  getPendingUsers,
  approveUser,
  rejectUser,
  blockUser,
  unblockUser,
  deleteUserDoc,
  AdminUser,
} from "../../../lib/admin/auth";

export default function AdminUsersPage() {
  const { success, error } = useToast();
  const { user: currentUser, isSuperAdmin, loading: authLoading } = useAdminAuth();
  const router = useRouter();
  const [users, setUsers] = useState<(AdminUser & { id: string })[]>([]);
  const [pending, setPending] = useState<(AdminUser & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<"suspend" | "unsuspend" | "delete" | null>(null);

  useEffect(() => {
    if (!authLoading && !isSuperAdmin) {
      router.push("/admin");
      return;
    }
    loadData();
  }, [authLoading, isSuperAdmin]);

  async function loadData() {
    setLoading(true);
    try {
      const [all, pend] = await Promise.all([
        getAllUsers(),
        getPendingUsers(),
      ]);
      setUsers(all as (AdminUser & { id: string })[]);
      setPending(pend);
    } catch {}
    setLoading(false);
  }

  async function handleApprove(uid: string) {
    setActionLoading(uid);
    try {
      await approveUser(uid);
      success("User approved");
      await loadData();
    } catch { error("Failed to approve"); }
    setActionLoading(null);
  }

  async function handleReject(uid: string) {
    setActionLoading(uid);
    try {
      await rejectUser(uid);
      success("User rejected");
      await loadData();
    } catch { error("Failed to reject"); }
    setActionLoading(null);
  }

  async function handleBlock(uid: string) {
    setActionLoading(uid);
    try {
      await blockUser(uid);
      success("User suspended");
      await loadData();
    } catch { error("Failed to suspend"); }
    setActionLoading(null);
    setConfirmId(null);
    setConfirmAction(null);
  }

  async function handleUnblock(uid: string) {
    setActionLoading(uid);
    try {
      await unblockUser(uid);
      success("User reactivated");
      await loadData();
    } catch { error("Failed to reactivate"); }
    setActionLoading(null);
    setConfirmId(null);
    setConfirmAction(null);
  }

  async function handleDelete(uid: string) {
    setActionLoading(uid);
    try {
      await deleteUserDoc(uid);
      success("User deleted");
      await loadData();
    } catch { error("Failed to delete"); }
    setActionLoading(null);
    setConfirmId(null);
    setConfirmAction(null);
  }

  function requestConfirm(id: string, action: "suspend" | "unsuspend" | "delete") {
    setConfirmId(id);
    setConfirmAction(action);
  }

  function cancelConfirm() {
    setConfirmId(null);
    setConfirmAction(null);
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">User Management</h1>
      <p className="text-sm text-textMuted mb-8">Manage admin accounts and approvals</p>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            Pending Approvals
            <span className="text-xs font-medium bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
              {pending.length}
            </span>
          </h2>
          <div className="space-y-3">
            {pending.map((u) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{u.displayName || u.email}</p>
                    <p className="text-xs text-textMuted">{u.displayName ? u.email : "Requesting admin access"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApprove(u.id)}
                    disabled={actionLoading === u.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === u.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(u.id)}
                    disabled={actionLoading === u.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {pending.length === 0 && (
        <div className="mb-10 rounded-2xl border border-border bg-card p-6 text-center">
          <Shield className="w-8 h-8 text-textMuted mx-auto mb-2" />
          <p className="text-sm text-textMuted">No pending approval requests</p>
        </div>
      )}

      {/* All Users */}
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Users className="w-4 h-4" />
        All Admins
        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {users.length}
        </span>
      </h2>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-5 py-3 font-medium text-textMuted">Email</th>
                <th className="text-left px-5 py-3 font-medium text-textMuted">Role</th>
                <th className="text-left px-5 py-3 font-medium text-textMuted">Status</th>
                <th className="text-right px-5 py-3 font-medium text-textMuted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = currentUser?.uid === u.id;
                const isSuper = u.role === "superadmin";
                const canAct = isSuperAdmin && !isSelf && !isSuper;

                return (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-textMuted shrink-0" />
                        <div className="min-w-0">
                          <p className="text-foreground font-medium truncate">{u.displayName || u.email}</p>
                          {u.displayName && <p className="text-xs text-textMuted truncate">{u.email}</p>}
                        </div>
                        {isSelf && (
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">You</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                        u.role === "superadmin"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-textMuted"
                      }`}>
                        <Shield className="w-3 h-3" />
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                        u.status === "active"
                          ? "text-emerald-500"
                          : u.status === "pending"
                          ? "text-amber-500"
                          : "text-red-500"
                      }`}>
                        {u.status === "active" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {confirmId === u.id && confirmAction ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-textMuted mr-1">
                            {confirmAction === "suspend" ? "Suspend?" : confirmAction === "unsuspend" ? "Reactivate?" : "Delete?"}
                          </span>
                          <button
                            onClick={confirmAction === "suspend" ? () => handleBlock(u.id) : confirmAction === "unsuspend" ? () => handleUnblock(u.id) : () => handleDelete(u.id)}
                            disabled={actionLoading === u.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === u.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            Yes
                          </button>
                          <button
                            onClick={cancelConfirm}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-textMuted text-xs font-medium hover:text-foreground transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : canAct ? (
                        <div className="flex items-center justify-end gap-1">
                          {u.status === "suspended" || u.status === "rejected" ? (
                            <button
                              onClick={() => requestConfirm(u.id, "unsuspend")}
                              disabled={actionLoading === u.id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-medium hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Reactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => requestConfirm(u.id, "suspend")}
                              disabled={actionLoading === u.id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-medium hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                            >
                              <Ban className="w-3 h-3" />
                              Suspend
                            </button>
                          )}
                          <button
                            onClick={() => requestConfirm(u.id, "delete")}
                            disabled={actionLoading === u.id}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-textMuted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
