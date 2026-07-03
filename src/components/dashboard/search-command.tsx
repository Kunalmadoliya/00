"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, File, Home, Settings, MessageSquare, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { createProject } from "@/features/projects/actions";
import { useTransition } from "react";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const baseUrl = params?.username ? `/${params.username}` : "";
  const [isPending, startTransition] = useTransition();

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

  const handleAction = (action: () => void) => {
    setOpen(false);
    action();
  };

  const handleNewChat = () => {
    handleAction(() => {
      startTransition(async () => {
        try {
          const res = await createProject("New Chat");
          if (res?.username && res?.project?.name) {
            router.push(`/${res.username}/${res.project.name}`);
          }
        } catch (e) {
          console.error("Failed to create new chat", e);
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 overflow-hidden max-w-xl bg-background border-border text-foreground">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">Search through projects and settings.</DialogDescription>
        <div className="flex items-center px-3 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <Input 
            placeholder="Type a command or search..." 
            className="border-0 focus-visible:ring-0 shadow-none text-base h-14 bg-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </div>
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => handleAction(() => router.push(`${baseUrl}`))}
              className="flex items-center gap-2 px-2 py-2.5 text-sm rounded-md hover:bg-accent text-muted-foreground hover:text-foreground text-left transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Go to Builder Home</span>
            </button>
            <button 
              onClick={handleNewChat}
              disabled={isPending}
              className="flex items-center gap-2 px-2 py-2.5 text-sm rounded-md hover:bg-accent text-muted-foreground hover:text-foreground text-left transition-colors"
            >
              <File className="h-4 w-4" />
              <span>{isPending ? "Creating..." : "Create New Project"}</span>
            </button>
            <button 
              onClick={() => handleAction(() => {
                // Settings dialog is now controlled in sidebar, but for global command we might need an event or context.
                // For now we will rely on a generic event to open settings
                document.dispatchEvent(new CustomEvent('open-settings'));
              })}
              className="flex items-center gap-2 px-2 py-2.5 text-sm rounded-md hover:bg-accent text-muted-foreground hover:text-foreground text-left transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
