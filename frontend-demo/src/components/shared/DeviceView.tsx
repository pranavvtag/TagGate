"use client";

import { useEffect, useState } from "react";

type DeviceViewProps = {
  desktop: React.ReactNode;
  tablet?: React.ReactNode;
  mobile: React.ReactNode;
};

export function DeviceView({ desktop, tablet, mobile }: DeviceViewProps) {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (width === null) {
    return <div className="min-h-screen bg-[#f5f7fa]" aria-label="Loading layout" />;
  }

  if (width < 768) {
    return <>{mobile}</>;
  }

  if (width < 1024) {
    return <>{tablet ?? mobile}</>;
  }

  return <>{desktop}</>;
}
