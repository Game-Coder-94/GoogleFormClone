import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  MessageSquare,
  Settings,
  User,
  LogOut,
  Plus,
  Bot,
  PieChart,
  Home,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Forms", url: "/forms", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Responses", url: "/responses", icon: PieChart },
  { title: "Messages", url: "/messages", icon: MessageSquare },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  const getNavClasses = (path: string) => {
    return isActive(path)
      ? "bg-primary text-primary-foreground font-medium shadow-md"
      : "hover:bg-secondary hover:text-secondary-foreground transition-smooth";
  };

  return (
    <Sidebar
      className="border-r border-card-border bg-card transition-smooth"
      collapsible="icon"
    >
      <SidebarContent className="custom-scrollbar">
        {/* Logo/Brand Section */}
        <div className="p-4 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-foreground">Forms Hub</h2>
                <p className="text-xs text-muted-foreground">Create & Analyze</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4">
            <Button className="w-full gradient-primary text-white border-0 hover:opacity-90 transition-smooth" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Form
            </Button>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${getNavClasses(item.url)} rounded-lg mx-2`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4" />

        {/* AI Assistant */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!isCollapsed && "AI Assistant"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/chatbot"
                    className={`${getNavClasses("/chatbot")} rounded-lg mx-2`}
                  >
                    <Bot className="w-4 h-4" />
                    {!isCollapsed && <span>Chat Assistant</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4" />

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!isCollapsed && "Account"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`${getNavClasses(item.url)} rounded-lg mx-2`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-card-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-destructive-light hover:text-destructive transition-smooth">
                <LogOut className="w-4 h-4" />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}