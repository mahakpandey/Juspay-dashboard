import { Bell, ClockIcon, SearchIcon, StarIcon } from "@/assets/svgs";
import Breadcrumbs from "@/components/header/breadcrumbs";
import SidebarToggle from "@/components/sidebar-toggle";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ESidebarNames } from "@/constants/global-constants";
import React from "react";

export default function Header() {
  return (
    <header className="sticky w-full top-0 bg-background py-5 px-7 border-b border-foreground/10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <StarIcon />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex bg-foreground/5 rounded-lg px-2 py-1 items-center gap-1 | after:content-['⌘/'] after:text-foreground/20">
          <SearchIcon />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="focus-visible:outline-none caret-foreground/20 text-foreground/50 placeholder:text-foreground/20"
          />
        </div>
        <ModeToggle />
        <ClockIcon />
        <Bell />
        <SidebarToggle side={ESidebarNames.RIGHT} />
      </div>
    </header>
  );
}
