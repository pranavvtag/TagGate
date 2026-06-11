"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { canAccess, modules, type ModuleKey } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import { Button, Card } from "@/components/shared/ui";

export function ProtectedPage({ moduleKey, children }: { moduleKey: ModuleKey; children: React.ReactNode }) {
  const { role, isReady } = useSession();

  if (!isReady) {
    return <div className="min-h-screen bg-[#f5f7fa]" />;
  }

  if (!canAccess(role, moduleKey)) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f7fa] p-6">
        <Card className="max-w-lg p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-[#fee2e2] text-[#b91c1c]">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-black">Access blocked</h1>
          <p className="mt-3 text-[#6b7280]">
            {role} does not have permission to open {modules[moduleKey].label}. Choose a matching demo role or return to the dashboard.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary">
              <Link href="/login">Switch role</Link>
            </Button>
            <Button>
              <Link href="/">Dashboard</Link>
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return <>{children}</>;
}
