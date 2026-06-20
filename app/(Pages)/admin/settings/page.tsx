"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useToast } from "../../../components/admin/Toast";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  updateUserProfile,
  reauthenticateUser,
  changeUserPassword,
} from "../../../lib/admin/auth";

export default function AdminSettingsPage() {
  const { success, error } = useToast();
  const { user } = useAdminAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user?.displayName]);

  async function handleSaveProfile() {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { displayName: displayName || "" });
      success("Profile updated");
    } catch (err: any) {
      error(err?.message || "Failed to update profile");
    }
    setSaving(false);
  }

  async function handleChangePassword() {
    if (!newPassword || newPassword.length < 6) {
      error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      error("Passwords do not match");
      return;
    }
    setChangingPw(true);
    try {
      await reauthenticateUser(currentPassword);
      await changeUserPassword(newPassword);
      success("Password changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      error(err?.message || "Failed to change password");
    }
    setChangingPw(false);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
      <p className="text-sm text-textMuted mb-8">Manage your profile and account security</p>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 text-sm text-textMuted">
              <Mail className="w-4 h-4" />
              {user?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Role</label>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium capitalize">{user?.role}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>

      {/* Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full border border-border rounded-xl px-4 py-2.5 pr-10 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-foreground transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
            <input
              type={showPw ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Confirm New Password</label>
            <input
              type={showPw ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleChangePassword}
              disabled={changingPw || !currentPassword || !newPassword || !confirmPassword}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-background text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {changingPw ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              Update Password
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
