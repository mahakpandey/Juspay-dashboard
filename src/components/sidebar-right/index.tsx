import ActivitiesSection from "@/components/sidebar-right/activities-section";
import ContactsSection from "@/components/sidebar-right/contacts-section";
import NotificationsSection from "@/components/sidebar-right/notifications-section";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ESidebarNames } from "@/constants/global-constants";
import React from "react";

export default function SidebarRight() {
  return (
    <Sidebar name={ESidebarNames.RIGHT} side="right">
      <SidebarContent>
        <div className="scrollbar-custom | w-[280px] p-5 *:not-first:mt-6 border-l border-foreground/10 overflow-auto">
          <NotificationsSection />
          <ActivitiesSection />
          <ContactsSection />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
