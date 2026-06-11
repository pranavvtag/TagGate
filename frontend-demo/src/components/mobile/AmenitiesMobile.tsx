"use client";

import Link from "next/link";
import { Coffee, Dumbbell, Trophy, Users, Waves } from "lucide-react";
import { amenities, data } from "@/lib/data";
import { Badge } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

const iconMap = {
  waves: Waves,
  dumbbell: Dumbbell,
  users: Users,
  trophy: Trophy,
  coffee: Coffee
};

export function AmenitiesMobile() {
  return (
    <MobileScreen title="Amenities">
      <section>
        <h2 className={styles.sectionTitle}>My Bookings</h2>
        {data.bookings.map((booking) => (
          <article key={booking.id} className="rounded-[14px] bg-[#0f7780] p-4 text-white">
            <p className="text-lg font-black">{booking.amenity}</p>
            <p className="mt-2 text-sm text-white/90">{booking.date} • {booking.time}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <h2 className={styles.sectionTitle}>Available Amenities</h2>
        <div className={styles.list}>
          {amenities.map((amenity) => {
            const Icon = iconMap[amenity.icon as keyof typeof iconMap] ?? Waves;
            const available = amenity.status === "Available";
            return (
              <article key={amenity.id} className={styles.softCard}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className={styles.amenityIcon}>
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-black">{amenity.name}</p>
                      <p className="mt-1 text-sm text-[#6b7280]">{amenity.hours}</p>
                    </div>
                  </div>
                  <Badge tone={available ? "success" : "danger"}>{amenity.status}</Badge>
                </div>
                {available ? (
                  <Link href={`/amenities/book/${amenity.id}`} className={`${styles.primaryButton} mt-4 flex items-center justify-center`}>
                    Book Now
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </MobileScreen>
  );
}
