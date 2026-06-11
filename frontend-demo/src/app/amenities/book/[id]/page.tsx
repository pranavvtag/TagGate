import { BookAmenityDesktop } from "@/components/desktop/BookAmenityDesktop";
import { BookAmenityMobile } from "@/components/mobile/BookAmenityMobile";
import { DeviceView } from "@/components/shared/DeviceView";

export default async function BookAmenityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DeviceView desktop={<BookAmenityDesktop amenityId={id} />} tablet={<BookAmenityDesktop amenityId={id} />} mobile={<BookAmenityMobile amenityId={id} />} />;
}
