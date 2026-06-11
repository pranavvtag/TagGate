"use client";

import Link from "next/link";
import { AlertTriangle, Bell, Bot, Car, Droplets, FileText, Home, IndianRupee, Plug, ShieldCheck, ShoppingBasket, UserCheck, Users, Wrench } from "lucide-react";
import { data, notifications } from "@/lib/data";
import { Badge, Button, Card } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

const modules = [
  { label: "Residents", value: "248", icon: Users, detail: "4 pending approvals" },
  { label: "Properties", value: "128", icon: Home, detail: "12 vacant homes" },
  { label: "Visitors Today", value: "36", icon: UserCheck, detail: "2 waiting at gate" },
  { label: "Open Issues", value: "18", icon: AlertTriangle, detail: "5 high priority" }
];

const actions = [
  { label: "Issues", icon: AlertTriangle, href: "/management" },
  { label: "Payments", icon: IndianRupee, href: "/management" },
  { label: "Visitors", icon: Car, href: "/management" },
  { label: "Staff", icon: Users, href: "/management" },
  { label: "Amenities", icon: ShieldCheck, href: "/amenities" },
  { label: "Utilities", icon: Plug, href: "/management" },
  { label: "Community", icon: Bell, href: "/community" },
  { label: "Maintenance", icon: Wrench, href: "/management" }
];

export function DashboardDesktop() {
  return (
    <DesktopShell title={`Good Morning, ${data.community.resident}`} subtitle={`${data.community.name} · ${data.community.systemStatus}`}>
      <div className={styles.grid}>
        <section className={styles.statsGrid}>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.label} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#6b7280]">{module.label}</p>
                    <p className="mt-2 text-3xl font-black text-[#202737]">{module.value}</p>
                    <p className="mt-2 text-sm text-[#6b7280]">{module.detail}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#dff7f3] text-[#0f7780]">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
              </Card>
            );
          })}
        </section>

        <section className={styles.twoColumn}>
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className={styles.cardTitle}>Resident Actions</h2>
              <Badge tone="success">{data.community.weather} Sunny</Badge>
            </div>
            <div className={styles.moduleGrid}>
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href} className="rounded-lg border border-[#e5e7eb] p-4 transition hover:border-[#0f7780] hover:bg-[#f7fffe]">
                    <Icon className="mb-4 h-7 w-7 text-[#0f7780]" />
                    <p className="font-bold text-[#202737]">{action.label}</p>
                  </Link>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className={styles.cardTitle}>Latest Updates</h2>
              <Link className="text-sm font-bold text-[#0f7780]" href="/notifications">
                View all
              </Link>
            </div>
            <div className="grid gap-3">
              {notifications.slice(0, 4).map((item) => (
                <div key={item.id} className="rounded-lg border border-[#e5e7eb] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold">{item.title}</p>
                    <Badge tone={item.priority === "High" ? "danger" : item.priority === "Medium" ? "warning" : "info"}>{item.priority}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-[#6b7280]">
                    {item.date} · {item.type}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className={styles.twoColumn}>
          <Card className="p-5">
            <h2 className={styles.cardTitle}>Utility Monitoring</h2>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {data.utilities.map((utility) => (
                <div key={utility.id} className="rounded-lg bg-[#f8fafc] p-4">
                  <Droplets className="mb-3 h-5 w-5 text-[#0f7780]" />
                  <p className="font-bold">{utility.name}</p>
                  <p className="mt-2 text-sm text-[#6b7280]">Daily: {utility.daily}</p>
                  <p className="text-sm text-[#6b7280]">Monthly: {utility.monthly}</p>
                  <p className="mt-2 text-xs font-bold text-[#0f7780]">{utility.alert}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className={styles.cardTitle}>Assistant</h2>
            <div className="mt-4 grid gap-3">
              {data.assistantSuggestions.map((suggestion) => (
                <button key={suggestion} className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] p-3 text-left text-sm font-semibold hover:border-[#0f7780]">
                  <Bot className="h-5 w-5 text-[#0f7780]" />
                  {suggestion}
                </button>
              ))}
              <Button className="mt-1">
                <FileText className="h-4 w-4" />
                Generate local ticket
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </DesktopShell>
  );
}
