import { SuccessDesktop } from "@/components/desktop/SuccessDesktop";
import { SuccessMobile } from "@/components/mobile/SuccessMobile";
import { DeviceView } from "@/components/shared/DeviceView";

export default function CommunitySuccessPage() {
  return <DeviceView desktop={<SuccessDesktop title="Successfully Registered" detail="See you at the event :D" />} tablet={<SuccessDesktop title="Successfully Registered" detail="See you at the event :D" />} mobile={<SuccessMobile title="Successfully Registered" detail="See you at the event :D" />} />;
}
