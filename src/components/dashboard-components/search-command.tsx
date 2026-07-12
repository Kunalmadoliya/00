"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, File, LayoutDashboard, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function SearchCommand() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 hover:bg-muted/80 transition-colors px-3 py-1.5 rounded-md border w-full md:w-64"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 overflow-hidden max-w-xl">
          <VisuallyHidden>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>Search through projects and settings.</DialogDescription>
          </VisuallyHidden>
          <div className="flex items-center px-3 border-b">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input 
              placeholder="Type a command or search..." 
              className="border-0 focus-visible:ring-0 shadow-none text-base h-14"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Suggestions
            </div>
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-2 px-2 py-2.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-left">
                <LayoutDashboard className="h-4 w-4" />
                <span>Go to Dashboard</span>
              </button>
              <button className="flex items-center gap-2 px-2 py-2.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-left">
                <File className="h-4 w-4" />
                <span>Create New Project</span>
              </button>
              <button className="flex items-center gap-2 px-2 py-2.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-left">
                <Settings className="h-4 w-4" />
                <span>Account Settings</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
