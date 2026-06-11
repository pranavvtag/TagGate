"use client";

import { useRouter } from "next/navigation";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { roles, type Role } from "@/lib/rbac";
import { useSession } from "@/components/shared/SessionProvider";
import { Field, TextInput } from "@/components/shared/ui";
import styles from "./Mobile.module.css";

export function LoginMobile() {
  const router = useRouter();
  const { login } = useSession();

  function demoLogin(role: Role) {
    login(role);
    router.push("/");
  }

  return (
    <main className={styles.screen} style={{ paddingBottom: 0 }}>
      <header className={styles.topBar}>
        <ShieldCheck className="h-8 w-8" />
        <h1 className={styles.title}>TagGate Login</h1>
      </header>
      <section className={styles.content}>
        <div className={styles.softCard}>
          <div className="flex items-center gap-2 font-black">
            <Phone className="h-5 w-5 text-[#0f7780]" />
            Mobile + OTP
          </div>
          <div className="mt-4 grid gap-3">
            <Field label="Mobile number">
              <TextInput placeholder="+91 98765 43210" />
            </Field>
            <button className={styles.primaryButton}>Send mock OTP</button>
          </div>
        </div>
        <div className={`${styles.softCard} mt-4`}>
          <div className="flex items-center gap-2 font-black">
            <Mail className="h-5 w-5 text-[#0f7780]" />
            Email + Password
          </div>
          <div className="mt-4 grid gap-3">
            <Field label="Email">
              <TextInput placeholder="admin@taggate.demo" />
            </Field>
            <Field label="Password">
              <TextInput type="password" placeholder="password" />
            </Field>
          </div>
        </div>
        <section className="mt-6">
          <h2 className={styles.sectionTitle}>Demo role access</h2>
          <div className={styles.list}>
            {roles.map((role) => (
              <button key={role} className={styles.primaryButton} onClick={() => demoLogin(role)}>
                Login as {role}
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
