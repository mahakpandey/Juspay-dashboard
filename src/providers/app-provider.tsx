import Header from "@/components/header";
import SidebarLeft from "@/components/sidebar-left";
import SidebarRight from "@/components/sidebar-right";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ESidebarNames } from "@/constants/global-constants";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";

export default function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider
            sidebarNames={[ESidebarNames.LEFT, ESidebarNames.RIGHT]}
          >
            <SidebarLeft />
            <main className="grid grid-rows-[auto_1fr]">
              <Header />
              {children}
            </main>
            <SidebarRight />
          </SidebarProvider>
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}
