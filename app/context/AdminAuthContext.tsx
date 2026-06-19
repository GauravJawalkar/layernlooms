"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getUserRole, signOut as adminSignOut, AdminUser } from "../lib/admin/auth";

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isSuperAdmin: boolean;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  isSuperAdmin: false,
  logout: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = useCallback(async (uid: string): Promise<AdminUser | null> => {
    for (let i = 0; i < 5; i++) {
      try {
        const roleData = await getUserRole(uid);
        if (roleData) return roleData;
      } catch {}
      if (i < 4) await new Promise((r) => setTimeout(r, 1000));
    }
    return null;
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const roleData = await fetchRole(firebaseUser.uid);
        setUser(roleData && roleData.status === "active" ? roleData : null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [fetchRole]);

  const logout = async () => {
    await adminSignOut();
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ user, loading, isSuperAdmin: user?.role === "superadmin", logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
