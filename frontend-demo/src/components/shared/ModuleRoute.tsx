import { ModuleWorkspaceDesktop } from "@/components/desktop/ModuleWorkspaceDesktop";
import { ModuleWorkspaceMobile } from "@/components/mobile/ModuleWorkspaceMobile";
import { DeviceView } from "@/components/shared/DeviceView";
import { ProtectedPage } from "@/components/shared/ProtectedPage";
import type { ModuleKey } from "@/lib/rbac";

export function ModuleRoute({ moduleKey }: { moduleKey: ModuleKey }) {
  return (
    <ProtectedPage moduleKey={moduleKey}>
      <DeviceView desktop={<ModuleWorkspaceDesktop moduleKey={moduleKey} />} tablet={<ModuleWorkspaceDesktop moduleKey={moduleKey} />} mobile={<ModuleWorkspaceMobile moduleKey={moduleKey} />} />
    </ProtectedPage>
  );
}
