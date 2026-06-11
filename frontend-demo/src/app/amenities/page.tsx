import { AmenitiesDesktop } from "@/components/desktop/AmenitiesDesktop";
import { AmenitiesMobile } from "@/components/mobile/AmenitiesMobile";
import { DeviceView } from "@/components/shared/DeviceView";
import { ProtectedPage } from "@/components/shared/ProtectedPage";

export default function AmenitiesPage() {
  return (
    <ProtectedPage moduleKey="services">
      <DeviceView desktop={<AmenitiesDesktop />} tablet={<AmenitiesDesktop />} mobile={<AmenitiesMobile />} />
    </ProtectedPage>
  );
}
