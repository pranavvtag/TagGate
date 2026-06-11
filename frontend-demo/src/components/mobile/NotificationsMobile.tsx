"use client";

import { useMemo, useState } from "react";
import { notifications } from "@/lib/data";
import { Badge, EmptyState, SelectInput, TextInput } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

export function NotificationsMobile() {
  const [priority, setPriority] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      notifications.filter((item) => {
        const matchesPriority = priority === "All" || item.priority === priority;
        const matchesQuery = `${item.title} ${item.type} ${item.message}`.toLowerCase().includes(query.toLowerCase());
        return matchesPriority && matchesQuery;
      }),
    [priority, query]
  );

  return (
    <MobileScreen title="Notifications">
      <div className="mb-4 grid gap-3">
        <TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search updates" aria-label="Search notifications" />
        <SelectInput value={priority} onChange={(event) => setPriority(event.target.value)} aria-label="Filter by priority">
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </SelectInput>
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No notifications found" detail="Try a different search or priority filter." />
      ) : (
        <div className={styles.list}>
          {filtered.map((item) => (
            <article key={item.id} className={styles.softCard}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="mt-3 text-sm text-[#6b7280]">
                    {item.date} <span className="px-2">-</span> {item.type}
                  </p>
                  <p className="mt-2 text-sm text-[#6b7280]">{item.message}</p>
                </div>
                <Badge tone={item.priority === "High" ? "danger" : item.priority === "Medium" ? "warning" : "info"}>{item.priority}</Badge>
              </div>
            </article>
          ))}
        </div>
      )}
    </MobileScreen>
  );
}
