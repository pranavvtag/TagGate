import { SuccessDesktop } from "@/components/desktop/SuccessDesktop";
import { SuccessMobile } from "@/components/mobile/SuccessMobile";
import { DeviceView } from "@/components/shared/DeviceView";

export default function BookingConfirmedPage() {
  return <DeviceView desktop={<SuccessDesktop title="Booking Confirmed" detail="Your amenity has been reserved" />} tablet={<SuccessDesktop title="Booking Confirmed" detail="Your amenity has been reserved" />} mobile={<SuccessMobile boxed title="Booking Confirmed" detail="Your amenity has been reserved" />} />;
}
