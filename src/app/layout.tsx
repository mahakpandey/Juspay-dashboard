import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app-provider";
import React from "react";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ByeWind",
  description: "This is an assignment for UI Engineer position at Juspay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="wrapper | text-sm bg-background text-foreground max-w-[2560px] mx-auto h-dvh grid xl:grid-cols-[auto_1fr_auto] grid-rows-[100%] ~*:m-1 ~*:mt-0 ~gap-1 ~*:bg-red-200/50">
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}
