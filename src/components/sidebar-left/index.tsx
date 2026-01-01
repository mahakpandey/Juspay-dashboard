import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { dashboardArray } from "@/lib/constants";
import SidebarDropdown from "@/components/sidebar-left/sidebar-dropdown";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ESidebarNames } from "@/constants/global-constants";
import NavButton from "@/components/sidebar-left/nav-button";
import Link from "next/link";
import Image from "@/components/ui/image";

export function Point({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-block size-1.5 rounded-full bg-foreground/20",
        className,
      )}
      {...props}
    ></span>
  );
}

export default function SidebarLeft() {
  return (
    <Sidebar name={ESidebarNames.LEFT} side="left">
      <SidebarContent>
        <div className="scrollbar-custom | w-full px-4 py-5 *:not-first:mt-4 border-r border-foreground/10 overflow-auto">
          <section className="userProfile | p-1 flex items-center gap-2">
            <Image
              src="/female.png"
              alt="user-icon"
              className="size-6 rounded-full"
            />
            <p className="userName">ByeWind</p>
          </section>
          <section className="px-2">
            <div className="tabs | flex items-center gap-4">
              <button className="active | py-1 text-foreground/60">
                Favorites
              </button>
              <button className="py-1 text-foreground/20 hover:text-foreground/60 transition-colors">
                Recently
              </button>
            </div>
            <ul className="*:mt-1 grid gap-1 *:flex *:items-center *:gap-2">
              <li>
                <Link href="/user-profile/overview">
                  <Point /> Overview
                </Link>
              </li>
              <li>
                <Link href="/user-profile/projects">
                  <Point /> Projects
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="px-3 py-1 text-foreground/40">Dashboards</h2>
            <div className="mt-1">
              {/* <Link href="/">
								<button className="active themeSwitch | py-1 px-2 flex items-center gap-1 bg-foreground/[0.05] rounded-lg w-full relative | before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-accent before:w-1 before:h-4 before:rounded-full">
									<ChevronRight className="*:fill-none" />
									<ChartPieSlice /> Default
								</button>
							</Link> */}
              <ul className="mt-1 grid gap-1">
                {dashboardArray.map((option) => (
                  <NavButton key={option.name} props={option} />
                ))}
              </ul>
            </div>
          </section>
          <section>
            <h2 className="px-3 py-1 text-foreground/40">Pages</h2>
            <SidebarDropdown />
          </section>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
