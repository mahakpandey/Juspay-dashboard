"use client";
import Image from "@/components/ui/image";
import { getRandomContacts } from "@/lib/random";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useMemo } from "react";

export default function ContactsSection() {
  const parentRef = React.useRef(null);
  const contacts = useMemo(() => getRandomContacts(), []);
  const rowVirtualizer = useVirtualizer({
    count: contacts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 3,
  });
  return (
    <section className="not-first:mt-2">
      <h2 className="font-semibold py-2 px-1">Contacts</h2>
      <div
        ref={parentRef}
        className="scrollbar-custom | h-[192px] overflow-y-auto"
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
            const contact = contacts[virtualItem.index % contacts.length];
            const randomImg = `/user_${(virtualItem.index % 11) + 1}.png`;
            return (
              <div
                key={virtualItem.index}
                className="p-1 flex items-center gap-2"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Image
                  src={randomImg}
                  alt={`${contact.firstName} ${contact.lastName}`}
                  className="size-6 rounded-full "
                />
                {contact.firstName} {contact.lastName}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
