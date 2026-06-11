"use client";

import Link from "next/link";
import { Check, Home } from "lucide-react";
import { Button, Card } from "@/components/shared/ui";
import styles from "./Desktop.module.css";

export function SuccessDesktop({ title, detail }: { title: string; detail: string }) {
  return (
    <main className={styles.successPanel}>
      <Card className="w-full max-w-lg p-10 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#0f7780] text-white">
          <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-white">
            <Check className="h-8 w-8" />
          </span>
        </div>
        <h1 className="mt-8 text-3xl font-black">{title}</h1>
        <p className="mt-3 text-[#6b7280]">{detail}</p>
        <Button className="mt-8">
          <Home className="h-4 w-4" />
          <Link href="/">Back to dashboard</Link>
        </Button>
      </Card>
    </main>
  );
}
