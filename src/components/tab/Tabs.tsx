"use client";
import { tabs } from "@/lib/constants";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Tabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(pathname.slice(1) || "crypto-cash");
  function handleClick(slug: string) {
    setActive(slug);

    router.replace(`/${slug}`);
  }
  return (
    <div className="flex items-center  bg-secondary rounded-full">
      {tabs.map((tab) => (
        <Button
          key={tab.val}
          onClick={() => handleClick(tab.val)}
          className={cn(
            "text-sm font-medium py-2! px-4! cursor-pointer rounded-full",
            active === tab.val
              ? "text-white bg-primary "
              : "text-grey bg-transparent hover:bg-primary/5"
          )}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
}
