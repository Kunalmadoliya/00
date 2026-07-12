"use client";

import { usePathname } from "next/navigation";
import { SearchCommand } from "./search-command";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Header() {
  const pathname = usePathname();
  const title = pathname.split("/").pop() || "Overview";
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background/50 backdrop-blur-xl px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="-m-2.5 p-2.5 md:hidden" />}>
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Separator */}
      <div className="h-6 w-px bg-border md:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center flex-1">
          <h1 className="text-sm font-semibold text-foreground capitalize">
            {formattedTitle === "Dashboard" ? "Overview" : formattedTitle}
          </h1>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden sm:block">
            <SearchCommand />
          </div>
          
          <Button variant="ghost" size="icon" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </Button>
          
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
