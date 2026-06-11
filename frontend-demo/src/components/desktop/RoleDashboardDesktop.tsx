"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { data } from "@/lib/data";
import { modulesForRole, roleMatrix } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import { Badge, Button, Card } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

export function RoleDashboardDesktop() {
  const { role, logout } = useSession();
  const modules = modulesForRole(role);
  const stats = [
    ["Total Residents", data.residents.length],
    ["Total Properties", data.properties.length],
    ["Active Tenants", data.tenants.filter((tenant) => tenant.approval === "Approved").length],
    ["Pending Complaints", data.complaints.filter((complaint) => complaint.status !== "Resolved").length],
    ["Today's Visitors", data.visitors.length],
    ["Service Requests", data.services.length],
    ["Utility Alerts", data.utilities.filter((utility) => utility.alert !== "Normal").length]
  ];

  return (
    <DesktopShell
      title={`${role} Dashboard`}
      subtitle="Role-based prototype experience generated from the SRS."
      actions={
        <Button variant="secondary" onClick={logout}>
          <LogOut className="h-4 w-4" />
          <Link href="/login">Switch role</Link>
        </Button>
      }
    >
      <div className={styles.grid}>
        <section className={styles.statsGrid}>
          {stats.map(([label, value]) => (
            <Card key={String(label)} className="p-5">
              <p className="text-sm font-semibold text-[#6b7280]">{label}</p>
              <p className="mt-2 text-3xl font-black">{value}</p>
            </Card>
          ))}
        </section>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className={styles.cardTitle}>Allowed Modules</h2>
            <Badge tone="info">{modules.length} modules</Badge>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link key={module.key} href={module.href} className="rounded-lg border border-[#e5e7eb] p-4 transition hover:border-[#0f7780] hover:bg-[#f7fffe]">
                  <Icon className="h-6 w-6 text-[#0f7780]" />
                  <h3 className="mt-4 font-black">{module.label}</h3>
                  <p className="mt-2 text-sm text-[#6b7280]">{module.description}</p>
                </Link>
              );
            })}
          </div>
        </Card>

        <section className={styles.twoColumn}>
          <Card className="p-5">
            <h2 className={styles.cardTitle}>Primary Workflows</h2>
            <div className="mt-4 grid gap-3">
              {modules.flatMap((module) => module.workflows.map((workflow) => `${module.label}: ${workflow}`)).slice(0, 10).map((workflow) => (
                <div key={workflow} className="rounded-lg border border-[#e5e7eb] p-3 text-sm font-semibold">
                  {workflow}
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className={styles.cardTitle}>Role Matrix Snapshot</h2>
            <div className="mt-4 grid gap-3">
              {Object.entries(roleMatrix).map(([matrixRole, labels]) => (
                <div key={matrixRole} className="rounded-lg bg-[#f8fafc] p-3">
                  <p className="font-bold">{matrixRole}</p>
                  <p className="mt-1 text-sm text-[#6b7280]">{labels.join(", ")}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </DesktopShell>
  );
}
