import { ManagementDesktop } from "@/components/desktop/ManagementDesktop";
import { ManagementMobile } from "@/components/mobile/ManagementMobile";
import { DeviceView } from "@/components/shared/DeviceView";
import { ProtectedPage } from "@/components/shared/ProtectedPage";

export default function ManagementPage() {
  return (
    <ProtectedPage moduleKey="residents">
      <DeviceView desktop={<ManagementDesktop />} tablet={<ManagementDesktop />} mobile={<ManagementMobile />} />
    </ProtectedPage>
  );
}
