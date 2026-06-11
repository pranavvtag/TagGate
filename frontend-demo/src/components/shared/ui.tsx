"use client";

import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-[#0f7780] text-white hover:bg-[#0d6670]",
    secondary: "bg-[#e5f6f4] text-[#0f7780] hover:bg-[#d6f0ed]",
    ghost: "bg-transparent text-[#0f7780] hover:bg-[#effafa]",
    danger: "bg-[#fee2e2] text-[#b91c1c] hover:bg-[#fecaca]"
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <section className={`rounded-lg border border-[#e5e7eb] bg-white shadow-sm ${className}`}>{children}</section>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "success" | "warning" | "danger" | "info" | "neutral" }) {
  const tones = {
    success: "bg-[#dcfce7] text-[#16a34a]",
    warning: "bg-[#fef3c7] text-[#d97706]",
    danger: "bg-[#fee2e2] text-[#ef4444]",
    info: "bg-[#dff7f3] text-[#0f7780]",
    neutral: "bg-[#f3f4f6] text-[#4b5563]"
  };

  return <span className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#202737]">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-medium text-[#dc2626]">{error}</span> : null}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="min-h-11 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#0f7780] focus:ring-2 focus:ring-[#bcebe7]"
      {...props}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="min-h-11 rounded-lg border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#0f7780] focus:ring-2 focus:ring-[#bcebe7]"
      {...props}
    />
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[#cbd5e1] bg-white p-8 text-center">
      <p className="text-base font-bold text-[#202737]">{title}</p>
      <p className="mt-2 text-sm text-[#6b7280]">{detail}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center gap-2 text-[#0f7780]">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="font-semibold">Loading demo data</span>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#fecaca] bg-[#fff1f2] p-4 text-[#b91c1c]">
      <AlertCircle className="h-5 w-5" />
      <span className="text-sm font-semibold">{message}</span>
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-[#0f7780] px-4 py-3 text-sm font-semibold text-white shadow-xl">
      <CheckCircle2 className="h-5 w-5" />
      <span>{message}</span>
      <button aria-label="Dismiss" onClick={onClose}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Modal({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/35 p-4">
      <section className="w-full max-w-xl rounded-lg bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#202737]">{title}</h2>
          <button aria-label="Close dialog" className="rounded-lg p-2 text-[#6b7280] hover:bg-[#f3f4f6]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="secondary" disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-semibold text-[#6b7280]">
        Page {page} of {totalPages}
      </span>
      <Button variant="secondary" disabled={page === totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
