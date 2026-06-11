"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { modulesForRole } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import styles from "./Desktop.module.css";

export function DesktopShell({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, logout } = useSession();
  const items = modulesForRole(role);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <ShieldCheck className="h-6 w-6" />
          </span>
          <span>TagGate</span>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 rounded-lg bg-white/10 p-4 text-sm text-white/80">
          <p className="font-bold text-white">AIRA Smart Villas</p>
          <p className="mt-1">Role: {role}</p>
          <Link className="mt-3 inline-flex font-bold text-white" href="/login" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Switch role
          </Link>
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {actions ? <div className={styles.toolbar}>{actions}</div> : null}
        </header>
        {children}
      </main>
    </div>
  );
}
