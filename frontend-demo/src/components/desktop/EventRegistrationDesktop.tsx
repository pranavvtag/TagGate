"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, Minus, Plus, Users } from "lucide-react";
import { findEvent } from "@/lib/data";
import { Button, Card } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";

export function EventRegistrationDesktop({ eventId }: { eventId: string }) {
  const router = useRouter();
  const event = useMemo(() => findEvent(eventId), [eventId]);
  const [guests, setGuests] = useState(3);

  return (
    <DesktopShell title="Event Registration" subtitle="Confirm attendance for community activities.">
      <div className="grid max-w-5xl grid-cols-[1fr_360px] gap-4">
        <Card className="p-6">
          <h2 className="text-2xl font-black">{event.name}</h2>
          <div className="mt-6 grid gap-4 text-[#202737]">
            {[
              [CalendarDays, event.date],
              [Clock, event.time],
              [MapPin, event.location],
              [Users, `${event.attendees} people registered`]
            ].map(([Icon, value]) => {
              const Component = Icon as typeof CalendarDays;
              return (
                <div key={String(value)} className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#dff7f3] text-[#0f7780]">
                    <Component className="h-5 w-5" />
                  </span>
                  <span>{String(value)}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-6 rounded-lg bg-[#f8fafc] p-5 text-[#6b7280]">{event.description}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-black">Number of Guests</h2>
          <div className="mt-6 flex items-center justify-between">
            <Button variant="secondary" aria-label="Decrease guests" onClick={() => setGuests((value) => Math.max(1, value - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-4xl font-black">{guests}</span>
            <Button variant="secondary" aria-label="Increase guests" onClick={() => setGuests((value) => Math.min(8, value + 1))}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="mt-8 w-full" onClick={() => router.push("/community/success")}>
            Confirm Registration
          </Button>
        </Card>
      </div>
    </DesktopShell>
  );
}
