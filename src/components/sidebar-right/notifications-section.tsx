"use client";
import { BroadcastIconCustom, Bug, UserIconCustom } from "@/assets/svgs";
import { TooltipComponent } from "@/components/ui/tooltip";
import { Notification } from "@/lib/constants";
import { getRandomNotifications } from "@/lib/random";
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { JSX, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

const notificationTypeToIcon: Record<Notification["type"], JSX.Element> = {
  bug: <Bug />,
  user: <UserIconCustom />,
  subscription: <BroadcastIconCustom />,
};

export default function NotificationsSection() {
  const parentRef = React.useRef(null);

  const notifications = useMemo(() => getRandomNotifications(), []);
  const rowVirtualizer = useVirtualizer({
    count: notifications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 3,
  });
  return (
    <section className="not-first:mt-2">
      <h2 className="font-semibold py-2 px-1">Notifications</h2>
      <div
        ref={parentRef}
        className="scrollbar-custom | h-[220px] overflow-y-auto"
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
            const notification =
              notifications[virtualItem.index % notifications.length];
            return (
              <div
                key={virtualItem.key}
                className="mt-2 flex items-start p-1 gap-2"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div
                  className={cn(
                    "grid place-items-center p-1 rounded-lg bg-secondary-purple-custom",
                    {
                      "bg-secondary-custom": notification.type === "bug",
                    },
                  )}
                >
                  {notificationTypeToIcon[notification.type]}
                </div>
                <div className="grid">
                  <TooltipComponent tooltip={notification.message}>
                    <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {notification.message}
                    </p>
                  </TooltipComponent>
                  <p className="text-foreground/40">
                    {formatDistanceToNow(notification.time)} ago
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
