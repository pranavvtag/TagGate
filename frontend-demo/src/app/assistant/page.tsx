import { AssistantDesktop } from "@/components/desktop/AssistantDesktop";
import { AssistantMobile } from "@/components/mobile/AssistantMobile";
import { DeviceView } from "@/components/shared/DeviceView";
import { ProtectedPage } from "@/components/shared/ProtectedPage";

export default function AssistantPage() {
  return (
    <ProtectedPage moduleKey="assistant">
      <DeviceView desktop={<AssistantDesktop />} tablet={<AssistantDesktop />} mobile={<AssistantMobile />} />
    </ProtectedPage>
  );
}
