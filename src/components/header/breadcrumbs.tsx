"use client";
import { dashboardArray, pagesArray } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
const dashboardMap = dashboardArray.reduce(
  (acc, curr) => {
    acc[curr.path.replace("/", "")] = curr.name;
    return acc;
  },
  {} as Record<string, string>,
);

const pagesMap = pagesArray.reduce(
  (acc, curr) => {
    acc[curr.path.replace("/", "")] = curr.name;
    return acc;
  },
  {} as Record<string, string>,
);
export default function Breadcrumbs() {
  const path = usePathname();

  const segments = useMemo(() => {
    if (!path) {
      return [];
    }
    if (path === "/") {
      return ["Dashboards", "Default"];
    }
    return path
      .split("/")
      .filter(Boolean)
      .reduce((acc, seg) => {
        if (dashboardMap[seg]) {
          return [
            ...acc,
            "Dashboards",
            dashboardMap[seg].charAt(0).toUpperCase() +
              dashboardMap[seg].slice(1),
          ];
        }
        if (pagesMap[seg]) {
          return [
            ...acc,
            "Pages",
            pagesMap[seg].charAt(0).toUpperCase() + pagesMap[seg].slice(1),
          ];
        }

        return [...acc, seg.charAt(0).toUpperCase() + seg.slice(1)];
      }, [] as string[]);
  }, [path]);
  return (
    <p className="text-foreground/40 *:ml-2 hidden lg:block">
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span
            className={cn({
              "text-foreground": index === segments.length - 1,
            })}
          >
            {segment}
          </span>
          {index < segments.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
      {/* Dashboards <span>/</span>{" "}
			<span className="text-foreground">Default</span> */}
    </p>
  );
}
