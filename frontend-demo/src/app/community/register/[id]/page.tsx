import { EventRegistrationDesktop } from "@/components/desktop/EventRegistrationDesktop";
import { EventRegistrationMobile } from "@/components/mobile/EventRegistrationMobile";
import { DeviceView } from "@/components/shared/DeviceView";

export default async function EventRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DeviceView desktop={<EventRegistrationDesktop eventId={id} />} tablet={<EventRegistrationDesktop eventId={id} />} mobile={<EventRegistrationMobile eventId={id} />} />;
}
