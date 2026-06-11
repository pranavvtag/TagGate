import { NotificationsDesktop } from "@/components/desktop/NotificationsDesktop";
import { NotificationsMobile } from "@/components/mobile/NotificationsMobile";
import { DeviceView } from "@/components/shared/DeviceView";
import { ProtectedPage } from "@/components/shared/ProtectedPage";

export default function NotificationsPage() {
  return (
    <ProtectedPage moduleKey="notices">
      <DeviceView desktop={<NotificationsDesktop />} tablet={<NotificationsDesktop />} mobile={<NotificationsMobile />} />
    </ProtectedPage>
  );
}
