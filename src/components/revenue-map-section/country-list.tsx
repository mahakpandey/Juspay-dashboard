"use client";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipComponent } from "@/components/ui/tooltip";
import useRevenueMap from "@/hooks/query/use-revenue-map";
import { trim } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export default function CountryList() {
  const { data, isLoading } = useRevenueMap();
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.markers.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 38,
    overscan: 3,
  });

  if (isLoading) {
    return (
      <div className="size-full ~aspect-square my-2">
        <Skeleton className="size-full bg-foreground/10 duration-100" />
      </div>
    );
  }
  if (!data?.data) {
    return null;
  }
  return (
    <div
      ref={parentRef}
      className="scrollbar-custom | h-[128px] overflow-y-auto"
    >
      <div
        className=""
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const location =
            data.markers[virtualItem.index % data.markers.length];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <p className="text-sm flex items-center justify-between">
                <TooltipComponent tooltip={location.countryName} side="left">
                  <span>{trim(location.countryName)}</span>
                </TooltipComponent>
                <span>{Math.round(location.randomStat / 1000)}k</span>
              </p>
              <Progress
                value={location.randomStat / 1000}
                className="h-0.5 bg-[#e6eef5] dark:bg-[#444c53] *:bg-secondary-cyan-custom"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
