import { CommunityDesktop } from "@/components/desktop/CommunityDesktop";
import { CommunityMobile } from "@/components/mobile/CommunityMobile";
import { DeviceView } from "@/components/shared/DeviceView";
import { ProtectedPage } from "@/components/shared/ProtectedPage";

export default function CommunityPage() {
  return (
    <ProtectedPage moduleKey="notices">
      <DeviceView desktop={<CommunityDesktop />} tablet={<CommunityDesktop />} mobile={<CommunityMobile />} />
    </ProtectedPage>
  );
}
