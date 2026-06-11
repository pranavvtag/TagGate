"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { findAmenity } from "@/lib/data";
import { Badge, Button, Card, Field, TextInput } from "@/components/shared/ui";
import { DesktopShell } from "./NavigationDesktop";
import styles from "./Desktop.module.css";

export function BookAmenityDesktop({ amenityId }: { amenityId: string }) {
  const router = useRouter();
  const amenity = useMemo(() => findAmenity(amenityId), [amenityId]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("8:00 AM - 9:00 AM");
  const [error, setError] = useState("");

  function submit() {
    if (!date) {
      setError("Select a booking date.");
      return;
    }
    if (!slot) {
      setError("Select an available time slot.");
      return;
    }
    router.push("/amenities/confirmed");
  }

  return (
    <DesktopShell title={`Book ${amenity.name}`} subtitle="Select a date and available time slot before confirming payment.">
      <div className={styles.twoColumn}>
        <Card className="p-6">
          <div className="grid gap-6">
            <Field label="Select Date" error={error && !date ? error : undefined}>
              <TextInput type="date" value={date} onChange={(event) => setDate(event.target.value)} min="2026-06-11" />
            </Field>
            <div>
              <h2 className="mb-4 text-lg font-black">Select Time Slot</h2>
              <div className="grid grid-cols-2 gap-3">
                {amenity.slots.map((item) => {
                  const disabled = amenity.disabledSlots.includes(item);
                  const active = slot === item;
                  return (
                    <button
                      key={item}
                      disabled={disabled}
                      onClick={() => setSlot(item)}
                      className={`flex min-h-16 items-center justify-center gap-3 rounded-lg border px-4 text-center font-bold transition ${
                        active ? "border-[#0f7780] bg-[#dff7f3] text-[#202737]" : "border-[#d1d5db] bg-white"
                      } disabled:bg-[#f8fafc] disabled:text-[#cbd5e1]`}
                    >
                      <Clock className="h-4 w-4" />
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className={styles.cardTitle}>Booking Summary</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Amenity</span>
              <strong>{amenity.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Date</span>
              <strong>{date || "Not selected"}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Time</span>
              <strong>{slot || "Not selected"}</strong>
            </div>
            <div className="flex justify-between border-t border-[#e5e7eb] pt-4">
              <span className="font-bold">Total</span>
              <strong className="text-2xl text-[#0f7780]">₹{amenity.fee}</strong>
            </div>
          </div>
          <Badge tone="info">
            <CalendarDays className="mr-1 h-3 w-3" />
            Local payment simulation
          </Badge>
          <Button className="mt-6 w-full" onClick={submit}>
            Confirm Booking & Pay ₹{amenity.fee}
          </Button>
        </Card>
      </div>
    </DesktopShell>
  );
}
