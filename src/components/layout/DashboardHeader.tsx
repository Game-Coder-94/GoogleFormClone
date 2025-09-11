import { useState } from "react";
import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "./ThemeProvider";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const [notifications] = useState(3);

  return (
    <header className="h-16 border-b border-card-border bg-card px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        
        {/* Search */}
        <div className="relative w-96 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search forms, responses..."
            className="pl-10 bg-input border-input-border focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="border-input-border hover:bg-secondary"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications */}
        <Button
          variant="outline"
          size="sm"
          className="border-input-border hover:bg-secondary relative"
        >
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {notifications}
            </Badge>
          )}
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-card-border">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">U</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}