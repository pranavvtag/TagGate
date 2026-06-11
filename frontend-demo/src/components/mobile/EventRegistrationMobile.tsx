"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, Minus, Plus, Users } from "lucide-react";
import { findEvent } from "@/lib/data";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

export function EventRegistrationMobile({ eventId }: { eventId: string }) {
  const router = useRouter();
  const event = useMemo(() => findEvent(eventId), [eventId]);
  const [guests, setGuests] = useState(3);

  return (
    <MobileScreen title="Event Registration">
      <section className={`${styles.softCard} p-5`}>
        <h2 className="text-[21px] font-black">{event.name}</h2>
        <div className="mt-6 grid gap-4">
          {[
            [CalendarDays, event.date],
            [Clock, event.time],
            [MapPin, event.location],
            [Users, `${event.attendees} people registered`]
          ].map(([Icon, value]) => {
            const Component = Icon as typeof CalendarDays;
            return (
              <div key={String(value)} className="flex items-center gap-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#dff7f3] text-[#0f7780]">
                  <Component className="h-5 w-5" />
                </span>
                <span className="text-sm">{String(value)}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-5 rounded-lg bg-[#f8fafc] p-4 text-sm leading-6 text-[#6b7280]">{event.description}</p>
      </section>

      <section className={`${styles.softCard} mt-6 p-5`}>
        <h2 className="text-lg font-black">Number of Guests</h2>
        <div className="mt-6 flex items-center justify-between">
          <button className="grid h-12 w-12 place-items-center rounded-lg bg-[#f8fafc] font-black" onClick={() => setGuests((value) => Math.max(1, value - 1))} aria-label="Decrease guests">
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-2xl font-black">{guests}</span>
          <button className="grid h-12 w-12 place-items-center rounded-lg bg-[#f8fafc] font-black" onClick={() => setGuests((value) => Math.min(8, value + 1))} aria-label="Increase guests">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </section>

      <button className={`${styles.primaryButton} mt-6`} onClick={() => router.push("/community/success")}>
        Confirm Registration
      </button>
    </MobileScreen>
  );
}
