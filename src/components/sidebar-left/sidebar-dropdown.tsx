"use client";
import { ChevronRight } from "@/assets/svgs";
import { dropdownOptions, pagesArray } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

export default function SidebarDropdown() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <ul className="mt-1 grid gap-1">
      {pagesArray.map((option, i) => (
        <li key={i}>
          <button
            onClick={() => (active === i ? setActive(null) : setActive(i))}
            className={cn(
              active === i && "bg-foreground/[0.05]",
              "py-1 px-2 flex items-center gap-1 rounded-lg w-full hover:bg-foreground/[0.05] transition-colors duration-100",
            )}
          >
            <ChevronRight className="*:fill-foreground/60" />
            {option.icon} {option.name}
          </button>
          <div
            className={`gridWrapper | grid transition-[grid-template-rows] ${
              active === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <ul className="overflow-hidden *:mt-1">
              {dropdownOptions.map((opt, idx) => (
                <li key={idx}>
                  <Link
                    href={`${option.path}/${opt.toLowerCase()}`}
                    className={cn("flex items-center gap-1 rounded-lg w-full ")}
                  >
                    <ChevronRight className="*:fill-none invisible opacity-0" />
                    <ChevronRight className="*:fill-none invisible opacity-0" />

                    <p className="py-1 px-2 rounded-lg hover:underline ~hover:bg-foreground/[0.05] transition-colors duration-100">
                      {opt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
