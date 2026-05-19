"use client";

import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <div className="mx-auto max-w-[430px] min-h-screen relative overflow-y-auto pb-20">
        {children}
      </div>
    </div>
  );
}
