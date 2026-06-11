"use client";

import Link from "next/link";
import { Coffee, Dumbbell, Trophy, Users, Waves } from "lucide-react";
import { amenities, data } from "@/lib/data";
import { Badge, Card } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

const iconMap = {
  waves: Waves,
  dumbbell: Dumbbell,
  users: Users,
  trophy: Trophy,
  coffee: Coffee
};

export function AmenitiesDesktop() {
  return (
    <DesktopShell title="Amenities" subtitle="Book shared facilities and track resident reservations.">
      <div className={styles.grid}>
        <Card className="p-5">
          <h2 className={styles.cardTitle}>My Bookings</h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {data.bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg bg-[#0f7780] p-4 text-white">
                <p className="text-lg font-bold">{booking.amenity}</p>
                <p className="mt-2 text-sm text-white/85">
                  {booking.date} · {booking.time}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className={styles.cardTitle}>Available Amenities</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {amenities.map((amenity) => {
              const Icon = iconMap[amenity.icon as keyof typeof iconMap] ?? Waves;
              const available = amenity.status === "Available";
              return (
                <article key={amenity.id} className="rounded-lg border border-[#e5e7eb] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-lg bg-[#dff7f3] text-[#0f7780]">
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <p className="text-lg font-black">{amenity.name}</p>
                        <p className="text-sm text-[#6b7280]">{amenity.hours}</p>
                      </div>
                    </div>
                    <Badge tone={available ? "success" : "danger"}>{amenity.status}</Badge>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#6b7280]">{amenity.fee ? `Fee ₹${amenity.fee}` : "No booking fee"}</p>
                    {available ? (
                      <Link className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0f7780] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d6670]" href={`/amenities/book/${amenity.id}`}>
                        Book Now
                      </Link>
                    ) : (
                      <button disabled className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-lg bg-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#94a3b8]">
                        Booked
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
      </div>
    </DesktopShell>
  );
}
