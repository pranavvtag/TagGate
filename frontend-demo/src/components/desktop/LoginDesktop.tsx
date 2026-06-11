"use client";

import { useRouter } from "next/navigation";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { roles, type Role } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import { Button, Card, Field, TextInput } from "@/components/shared/ui";

export function LoginDesktop() {
  const router = useRouter();
  const { login } = useSession();

  function demoLogin(role: Role) {
    login(role);
    router.push("/");
  }

  return (
    <main className="grid min-h-screen grid-cols-[minmax(380px,0.85fr)_minmax(0,1.15fr)] bg-[#f5f7fa]">
      <section className="flex flex-col justify-between bg-[#0f7780] p-10 text-white">
        <div className="flex items-center gap-3 text-2xl font-black">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/15">
            <ShieldCheck className="h-7 w-7" />
          </span>
          TagGate
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">Smart Community Platform</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">One prototype for every stakeholder workflow.</h1>
          <p className="mt-5 max-w-lg text-white/78">Use a demo role to preview RBAC menus, dashboards, CRUD modules, reports, and mock assistant flows.</p>
        </div>
        <p className="text-sm text-white/65">AIRA Smart Villas · Prototype session only</p>
      </section>
      <section className="grid place-items-center p-8">
        <Card className="w-full max-w-3xl p-7">
          <h2 className="text-2xl font-black">Login</h2>
          <p className="mt-2 text-sm text-[#6b7280]">Authentication is simulated. Pick a role to start.</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 font-black">
                <Phone className="h-5 w-5 text-[#0f7780]" />
                Mobile + OTP
              </div>
              <div className="mt-4 grid gap-3">
                <Field label="Mobile number">
                  <TextInput placeholder="+91 98765 43210" />
                </Field>
                <Button variant="secondary">Send mock OTP</Button>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 font-black">
                <Mail className="h-5 w-5 text-[#0f7780]" />
                Email + Password
              </div>
              <div className="mt-4 grid gap-3">
                <Field label="Email">
                  <TextInput placeholder="admin@taggate.demo" />
                </Field>
                <Field label="Password">
                  <TextInput type="password" placeholder="••••••••" />
                </Field>
              </div>
            </Card>
          </div>

          <h3 className="mt-7 text-lg font-black">Demo role access</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {roles.map((role) => (
              <Button key={role} onClick={() => demoLogin(role)}>{`Login as ${role}`}</Button>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
