"use client";
import { TooltipComponent } from "@/components/ui/tooltip";
import { getRandomActivities } from "@/lib/random";
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "@/components/ui/image";

export default function ActivitiesSection() {
  const parentRef = React.useRef(null);

  const activities = useMemo(() => getRandomActivities(), []);
  const rowVirtualizer = useVirtualizer({
    count: activities.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 3,
  });
  return (
    <section className="not-first:mt-2">
      <h2 className="font-semibold py-2 px-1">Activities</h2>
      <div
        ref={parentRef}
        className="scrollbar-custom | h-[276px] overflow-y-auto"
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
            const activity = activities[virtualItem.index % activities.length];
            const randomImg = `/user_${(virtualItem.index % 11) + 1}.png`;
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
                className="mt-2 grid grid-cols-[auto_1fr] items-start p-1 gap-2"
              >
                <div
                  className={cn(
                    "relative | before:absolute before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:translate-y-[150%] before:w-[1px] before:h-[14px] before:bg-foreground/10",
                  )}
                >
                  <Image
                    src={randomImg}
                    alt={activity.description}
                    className="size-6 rounded-full"
                  />
                </div>
                <div className="grid">
                  <TooltipComponent tooltip={activity.description}>
                    <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {activity.description}
                    </p>
                  </TooltipComponent>
                  <p className="text-foreground/40">
                    {formatDistanceToNow(activity.time)} ago
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
