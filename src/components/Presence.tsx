"use client";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function Presence({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <main key={pathname} className="mt-8 relative">
        {children}
      </main>
    </AnimatePresence>
  );
}
