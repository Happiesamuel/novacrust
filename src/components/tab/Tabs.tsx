"use client";

import { tabs } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Tabs() {
  const pathname = usePathname();
  const router = useRouter();
  const active = pathname.slice(1) || "crypto-cash";

  function handleClick(slug: string) {
    router.replace(`/${slug}`);
  }

  return (
    <LayoutGroup>
      <div className="relative flex items-center bg-secondary rounded-full ">
        {tabs.map((tab) => {
          const isActive = active === tab.val;

          return (
            <button
              key={tab.val}
              onClick={() => handleClick(tab.val)}
              className={cn(
                "relative z-10 sm:text-sm text-xs font-medium cursor-pointer py-2 sm:py-2 px-2 sm:px-4 rounded-full transition-colors",
                isActive ? "text-white" : "text-grey"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
