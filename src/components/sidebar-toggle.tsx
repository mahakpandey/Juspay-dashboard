"use client";
import { SidebarIcon } from "@/assets/svgs";
import { useSidebar } from "@/components/ui/sidebar";
import { ESidebarNames } from "@/constants/global-constants";
import React from "react";

export default function SidebarToggle({
  side = ESidebarNames.LEFT,
}: {
  side?: ESidebarNames;
}) {
  const { toggle } = useSidebar(side);
  return (
    <button onClick={toggle}>
      <SidebarIcon />
    </button>
  );
}
