"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events } from "@/lib/data";
import { Badge, Button, Card } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

export function CommunityDesktop() {
  const upcoming = events.filter((event) => event.status === "Upcoming");
  const past = events.filter((event) => event.status === "Past");

  return (
    <DesktopShell title="Community Events" subtitle="Resident events, announcements, registrations, and archives.">
      <div className={styles.grid}>
        <section className="grid grid-cols-2 gap-4">
          {upcoming.map((event) => (
            <Card key={event.id} className="p-5">
              <Badge tone="info">{event.category}</Badge>
              <h2 className="mt-4 text-xl font-black">{event.name}</h2>
              <div className="mt-5 grid gap-3 text-sm text-[#6b7280]">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#0f7780]" />
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#0f7780]" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0f7780]" />
                  {event.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#0f7780]" />
                  {event.attendees} attending
                </span>
              </div>
              <Button className="mt-6 w-full">
                <Link href={`/community/register/${event.id}`}>Register for Event</Link>
              </Button>
            </Card>
          ))}
        </section>

        <Card className="p-5">
          <h2 className={styles.cardTitle}>Past Events</h2>
          <div className="mt-4 grid gap-3">
            {past.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-lg border border-[#e5e7eb] p-4">
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p className="text-sm text-[#6b7280]">{event.date}</p>
                </div>
                <p className="text-sm text-[#6b7280]">{event.attendees} attended</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DesktopShell>
  );
}
