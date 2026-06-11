import type { Metadata } from "next";
import { SessionProvider } from "@/components/shared/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TagGate Frontend Demo",
  description: "Smart community and property management prototype"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
