"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { modulesForRole } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import styles from "./Mobile.module.css";

export function MobileTopBar({ title, compact = false }: { title?: string; compact?: boolean }) {
  return (
    <header className={styles.topBar} style={{ minHeight: compact ? 53 : undefined }}>
      <div className={styles.brand}>TagGate</div>
      {title ? <h1 className={styles.title}>{title}</h1> : null}
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { role } = useSession();
  const items = modulesForRole(role);

  return (
    <nav className={styles.bottomNav} aria-label="Mobile primary">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={`${item.href}-${item.label}`} href={item.href} className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}>
            <Icon />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileScreen({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <main className={styles.screen}>
      <MobileTopBar title={title} />
      <div className={styles.content}>{children}</div>
      <MobileBottomNav />
    </main>
  );
}
