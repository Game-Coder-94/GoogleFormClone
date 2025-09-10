import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { ThemeProvider } from "./ThemeProvider";

export function DashboardLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="creative-forms-theme">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-surface">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}