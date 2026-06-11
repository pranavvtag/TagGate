import { RoleDashboardDesktop } from "@/components/desktop/RoleDashboardDesktop";
import { RoleDashboardMobile } from "@/components/mobile/RoleDashboardMobile";
import { ProtectedPage } from "@/components/shared/ProtectedPage";
import { DeviceView } from "@/components/shared/DeviceView";

export default function HomePage() {
  return (
    <ProtectedPage moduleKey="dashboard">
      <DeviceView desktop={<RoleDashboardDesktop />} tablet={<RoleDashboardDesktop />} mobile={<RoleDashboardMobile />} />
    </ProtectedPage>
  );
}
