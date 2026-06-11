"use client";

import { useMemo, useState } from "react";
import { Bell, Search } from "lucide-react";
import { notifications } from "@/lib/data";
import { Badge, Button, Card, EmptyState, SelectInput, TextInput } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

export function NotificationsDesktop() {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");

  const filtered = useMemo(
    () =>
      notifications.filter((item) => {
        const matchesQuery = `${item.title} ${item.type} ${item.message}`.toLowerCase().includes(query.toLowerCase());
        const matchesPriority = priority === "All" || item.priority === priority;
        return matchesQuery && matchesPriority;
      }),
    [priority, query]
  );

  return (
    <DesktopShell
      title="Notifications"
      subtitle="Community notices, announcements, reminders, and security updates."
      actions={
        <>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#94a3b8]" />
            <TextInput aria-label="Search notifications" className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search updates" />
          </div>
          <SelectInput aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </SelectInput>
        </>
      }
    >
      <Card className="p-5">
        {filtered.length === 0 ? (
          <EmptyState title="No notifications found" detail="Try a different keyword or priority filter." />
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Update</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#dff7f3] text-[#0f7780]">
                          <Bell className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-bold">{item.title}</p>
                          <p className="text-sm text-[#6b7280]">{item.message}</p>
                        </div>
                      </div>
                    </td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>
                      <Badge tone={item.priority === "High" ? "danger" : item.priority === "Medium" ? "warning" : "info"}>{item.priority}</Badge>
                    </td>
                    <td>
                      <Button variant="secondary">Mark read</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DesktopShell>
  );
}
