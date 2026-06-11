"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { findAmenity } from "@/lib/data";
import { Field, TextInput } from "@/components/shared/ui";
import { MobileScreen } from "./NavigationMobile";
import styles from "./Mobile.module.css";

export function BookAmenityMobile({ amenityId }: { amenityId: string }) {
  const router = useRouter();
  const amenity = useMemo(() => findAmenity(amenityId), [amenityId]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("8:00 AM - 9:00 AM");
  const [error, setError] = useState("");

  function submit() {
    if (!date) {
      setError("Select a date");
      return;
    }
    router.push("/amenities/confirmed");
  }

  return (
    <MobileScreen title={`Book ${amenity.name}`}>
      <section className={styles.softCard}>
        <Field label="Select Date" error={error}>
          <TextInput type="date" value={date} onChange={(event) => setDate(event.target.value)} min="2026-06-11" />
        </Field>
      </section>

      <section className={`${styles.softCard} mt-6`}>
        <h2 className="mb-4 text-lg font-black">Select Time Slot</h2>
        <div className={styles.slotGrid}>
          {amenity.slots.map((item) => {
            const disabled = amenity.disabledSlots.includes(item);
            return (
              <button key={item} disabled={disabled} onClick={() => setSlot(item)} className={`${styles.slot} ${slot === item ? styles.slotActive : ""}`}>
                <span className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={`${styles.softCard} mt-6`}>
        <h2 className="mb-5 text-lg font-black">Booking Summary</h2>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Amenity</span>
            <strong>{amenity.name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6b7280]">Booking Fee</span>
            <strong>₹{amenity.fee}</strong>
          </div>
          <div className="flex justify-between border-t border-[#e5e7eb] pt-3">
            <span className="font-bold">Total</span>
            <strong className="text-2xl text-[#0f7780]">₹{amenity.fee}</strong>
          </div>
        </div>
      </section>

      <button className={`${styles.primaryButton} mt-6`} onClick={submit}>
        Confirm Booking & Pay ₹{amenity.fee}
      </button>
    </MobileScreen>
  );
}
