"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  MessageSquare,
  FolderOpen,
  History,
  Settings,
  CreditCard,
  ChevronDown,
  Plus,
  Hexagon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "History", href: "/dashboard/history", icon: History },
];

const bottomNavItems = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background/50 backdrop-blur-xl md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-accent/50 rounded-lg h-auto" />}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Hexagon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold tracking-tight">Acme Inc</span>
                    <span className="text-xs text-muted-foreground">Free Plan</span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Hexagon className="mr-2 h-4 w-4 text-primary" />
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Hexagon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Personal</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-2 flex-grow flex flex-col px-3 gap-1">
          <div className="text-xs font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col gap-1 p-3 border-t bg-background/50">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
        
        <div className="mt-4 px-2 py-2 flex items-center gap-3">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
                userButtonPopoverCard: "shadow-xl border border-border"
              }
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Account</span>
            <span className="text-xs text-muted-foreground">Manage profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
