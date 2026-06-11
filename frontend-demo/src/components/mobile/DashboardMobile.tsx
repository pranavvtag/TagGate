"use client";

import Link from "next/link";
import { AlertCircle, Bell, CreditCard, Hexagon, Home, Plug, User, UserRoundCheck, Users, Wrench } from "lucide-react";
import { data, notifications } from "@/lib/data";
import { Badge } from "@/components/shared/ui";
import { MobileBottomNav, MobileTopBar } from "./NavigationMobile";
import styles from "./Mobile.module.css";

const actions = [
  { label: "Issues", icon: AlertCircle, href: "/management" },
  { label: "Payments", icon: CreditCard, href: "/management" },
  { label: "Visitors", icon: UserRoundCheck, href: "/management" },
  { label: "Staff", icon: User, href: "/management" },
  { label: "Amenities", icon: Hexagon, href: "/amenities" },
  { label: "Utilities", icon: Plug, href: "/management" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Maintenance", icon: Wrench, href: "/management" }
];

export function DashboardMobile() {
  return (
    <main className={styles.screen}>
      <MobileTopBar compact />
      <div className={styles.content}>
        <section className={styles.heroCard}>
          <h1 className="text-[25px] font-black">Good Morning, {data.community.resident} 👋</h1>
          <p className="mt-9 text-sm text-white/90">{data.community.name}</p>
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              {data.community.systemStatus}
            </span>
            <span>{data.community.weather} ☀</span>
          </div>
        </section>

        <section className="mt-9">
          <h2 className={styles.sectionTitle}>Actions</h2>
          <div className={styles.actionGrid}>
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href} className={styles.actionTile}>
                  <Icon />
                  <span>{action.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-9">
          <div className="mb-4 flex items-center justify-between">
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
              Latest Updates
            </h2>
            <Link href="/notifications" className="text-sm font-bold text-[#0f7780]">
              View All
            </Link>
          </div>
          <div className={styles.list}>
            {notifications.slice(0, 2).map((item) => (
              <Link href="/notifications" key={item.id} className={styles.softCard}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-3 text-sm text-[#6b7280]">
                      {item.date} <span className="px-2">•</span> {item.type}
                    </p>
                  </div>
                  <Badge tone={item.priority === "High" ? "danger" : "warning"}>{item.priority}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <MobileBottomNav />
    </main>
  );
}
