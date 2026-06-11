"use client";

import Link from "next/link";
import { data } from "@/lib/data";
import { modulesForRole } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import { Badge } from "@/components/shared/ui";
import { MobileBottomNav, MobileTopBar } from "./NavigationMobile";
import styles from "./Mobile.module.css";

export function RoleDashboardMobile() {
  const { role } = useSession();
  const modules = modulesForRole(role);
  const stats = [
    ["Residents", data.residents.length],
    ["Properties", data.properties.length],
    ["Tenants", data.tenants.length],
    ["Visitors", data.visitors.length],
    ["Complaints", data.complaints.length],
    ["Services", data.services.length]
  ];

  return (
    <main className={styles.screen}>
      <MobileTopBar compact />
      <div className={styles.content}>
        <section className={styles.heroCard}>
          <p className="text-sm text-white/80">AIRA Smart Villas</p>
          <h1 className="mt-3 text-[25px] font-black">{role} Dashboard</h1>
          <p className="mt-5 text-sm text-white/85">{data.community.systemStatus} · {data.community.weather}</p>
        </section>
        <section className="mt-6 grid grid-cols-2 gap-3">
          {stats.map(([label, value]) => (
            <article key={String(label)} className={styles.softCard}>
              <p className="text-2xl font-black text-[#0f7780]">{value}</p>
              <p className="mt-1 text-sm font-bold text-[#6b7280]">{label}</p>
            </article>
          ))}
        </section>
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Modules</h2>
            <Badge tone="info">{modules.length}</Badge>
          </div>
          <div className={styles.list}>
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link key={module.key} href={module.href} className={styles.softCard}>
                  <div className="flex items-start gap-4">
                    <span className={styles.amenityIcon}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-black">{module.label}</h3>
                      <p className="mt-1 text-sm text-[#6b7280]">{module.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
      <MobileBottomNav />
    </main>
  );
}
