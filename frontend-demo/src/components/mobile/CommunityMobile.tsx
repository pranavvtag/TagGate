"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events } from "@/lib/data";
import { Badge } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

export function CommunityMobile() {
  const upcoming = events.filter((event) => event.status === "Upcoming");
  const past = events.filter((event) => event.status === "Past");

  return (
    <MobileScreen title="Community Events">
      <section>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <div className={styles.list}>
          {upcoming.map((event) => (
            <article key={event.id} className={`${styles.softCard} p-5`}>
              <Badge tone="info">{event.category}</Badge>
              <h3 className="mt-4 text-xl font-black">{event.name}</h3>
              <div className="mt-6 grid gap-3 text-sm text-[#6b7280]">
                <span className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-[#0f7780]" />
                  {event.date}
                </span>
                <span className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#0f7780]" />
                  {event.time}
                </span>
                <span className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#0f7780]" />
                  {event.location}
                </span>
                <span className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-[#0f7780]" />
                  {event.attendees} attending
                </span>
              </div>
              <Link href={`/community/register/${event.id}`} className={`${styles.primaryButton} mt-5 flex items-center justify-center gap-2`}>
                Register for Event <ArrowRight className="h-5 w-5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className={styles.sectionTitle}>Past Events</h2>
        {past.map((event) => (
          <article key={event.id} className={styles.softCard}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{event.name}</p>
                <p className="mt-1 text-sm text-[#6b7280]">{event.date}</p>
              </div>
              <p className="text-sm text-[#8a93a3]">{event.attendees} attended</p>
            </div>
          </article>
        ))}
      </section>
    </MobileScreen>
  );
}
