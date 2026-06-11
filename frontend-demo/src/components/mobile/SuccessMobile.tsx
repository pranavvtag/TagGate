"use client";

import { Check } from "lucide-react";
import { MobileBottomNav, MobileTopBar } from "./NavigationMobile";
import styles from "./Mobile.module.css";

export function SuccessMobile({ title, detail, boxed = false }: { title: string; detail: string; boxed?: boolean }) {
  const content = (
    <div className="text-center">
      <div className={`${styles.check} mx-auto`}>
        <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-white">
          <Check className="h-8 w-8" />
        </span>
      </div>
      <h1 className="mt-7 text-[25px] font-black text-[#202737]">{title}</h1>
      <p className="mt-3 text-[#6b7280]">{detail}</p>
    </div>
  );

  return (
    <main className={styles.successScreen}>
      <MobileTopBar compact />
      <section className={styles.successBody}>{boxed ? <div className="w-full rounded-xl bg-white p-8 shadow-sm">{content}</div> : content}</section>
      <MobileBottomNav />
    </main>
  );
}
