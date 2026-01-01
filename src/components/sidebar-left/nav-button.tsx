"use client";
import { ChevronRight } from "@/assets/svgs";
import { dashboardArray } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

export default function NavButton({
  props,
}: {
  props: (typeof dashboardArray)[number];
}) {
  const path = usePathname();
  const isActive = useMemo(() => {
    return path === props.path;
  }, [path, props.path]);
  return (
    <Link href={props.path}>
      <button
        className={cn(
          "active themeSwitch | py-1 px-2 flex items-center gap-1 rounded-lg w-full relative | before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-accent before:w-1 before:h-4 before:rounded-full",
          {
            ["before:hidden"]: !isActive,
            ["bg-foreground/[0.05]"]: isActive,
          },
        )}
      >
        <ChevronRight className={cn({ "*:fill-none": !props.showDropdown })} />
        {props.icon} {props.name}
      </button>
    </Link>
  );
}

{
  /* <li key={option.name}>
                    <Link href="/orders">
                      <button className="py-1 px-2 flex items-center gap-1 rounded-lg w-full hover:bg-foreground/[0.05] transition-colors duration-100">
                        <ChevronRight className="*:fill-foreground/60" />
                        {option.icon} {option.name}
                      </button>
                    </Link>
                  </li> */
}
