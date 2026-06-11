"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultRole, type Role } from "@/lib/rbac";

type SessionContextValue = {
  role: Role;
  isReady: boolean;
  login: (role: Role) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);
const storageKey = "taggate-demo-role";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(defaultRole);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Role | null;
    if (stored) {
      setRole(stored);
    }
    setIsReady(true);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      role,
      isReady,
      login(nextRole) {
        window.localStorage.setItem(storageKey, nextRole);
        setRole(nextRole);
      },
      logout() {
        window.localStorage.removeItem(storageKey);
        setRole(defaultRole);
      }
    }),
    [isReady, role]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return context;
}
