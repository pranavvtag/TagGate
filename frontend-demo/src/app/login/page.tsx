import { LoginDesktop } from "@/components/desktop/LoginDesktop";
import { LoginMobile } from "@/components/mobile/LoginMobile";
import { DeviceView } from "@/components/shared/DeviceView";

export default function LoginPage() {
  return <DeviceView desktop={<LoginDesktop />} tablet={<LoginDesktop />} mobile={<LoginMobile />} />;
}
