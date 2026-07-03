"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { createProject } from "@/features/projects/actions";
import { SettingsDialog } from "@/components/workspace/settings-dialog";
import { SearchCommand } from "@/components/dashboard/search-command";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  FolderOpen,
  Settings,
  ChevronDown,
  ChevronsUpDown,
  CircleDashed,
  Plus,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

const recentChats = [
  { id: "1", name: "Greeting" },
  { id: "2", name: "Hello" },
  { id: "3", name: "AI Communication OS" },
  { id: "4", name: "Spamurai app build" },
  { id: "5", name: "Spamurai email calendar" }
];

interface SidebarProps {
  defaultExpanded?: boolean;
}

export function Sidebar({ defaultExpanded = true }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const baseUrl = params?.username ? `/${params.username}` : "";
  const [showSettings, setShowSettings] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    const handleOpenSettings = () => setShowSettings(true);
    document.addEventListener('open-settings', handleOpenSettings);
    return () => document.removeEventListener('open-settings', handleOpenSettings);
  }, []);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    document.cookie = `sidebar_expanded=${newState}; path=/; max-age=31536000`;
  };

  const handleNewChat = () => {
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
  };

  const navItems = [
    { name: "Search", icon: Search, action: () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true })) },
    { name: "Home", href: `${baseUrl}`, icon: Home },
    { name: "Projects", href: `${baseUrl}/projects`, icon: FolderOpen },
    { name: "Settings", icon: Settings, action: () => setShowSettings(true) },
  ];

  return (
    <>
      <motion.div 
        initial={false}
        animate={{ width: isExpanded ? 260 : 64 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden md:flex flex-col shrink-0 border-r border-border bg-background text-foreground h-full overflow-hidden select-none"
      >
        
        {/* Workspace Selector */}
        <div className="flex items-center justify-between p-3 shrink-0">
          <AnimatePresence mode="popLayout">
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex items-center w-full justify-between"
              >
                <Button variant="ghost" className="h-8 px-2 flex items-center gap-2 hover:bg-accent text-foreground">
                  <div className="w-5 h-5 rounded-md bg-green-500/20 text-green-500 flex items-center justify-center font-bold text-xs border border-green-500/30">
                    {params?.username?.[0]?.toUpperCase() || "P"}
                  </div>
                  <span className="text-sm font-medium">Personal</span>
                  <ChevronsUpDown className="h-3 w-3 opacity-50 ml-1" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-7 w-7 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground">
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="mx-auto"
              >
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground">
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* New Chat Button */}
        <div className="px-3 pb-4 shrink-0 flex justify-center">
          <Button 
            onClick={handleNewChat}
            disabled={isPending}
            className={cn(
              "justify-center h-9 bg-accent hover:bg-accent/80 text-foreground border border-border shadow-sm transition-all",
              isExpanded ? "w-full justify-between" : "w-10 px-0"
            )}
          >
            {isExpanded ? (
              <>
                <span className="text-sm font-medium">New Chat</span>
                {isPending ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-muted-foreground" /> : <ChevronDown className="h-4 w-4 opacity-50" />}
              </>
            ) : (
              <>
                {isPending ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-muted-foreground shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pb-4 custom-scrollbar">
          {/* Main Nav */}
          <div className="px-2 space-y-0.5">
            {navItems.map((item) => {
              const isActive = item.href && pathname === item.href;
              const content = (
                <Button
                  variant="ghost"
                  onClick={item.action}
                  className={cn(
                    "h-8 rounded-md text-sm font-normal transition-colors",
                    isExpanded ? "w-full justify-start px-2 gap-2.5" : "w-10 mx-auto justify-center px-0",
                    isActive ? "bg-accent/80 text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {isExpanded && <span className="truncate">{item.name}</span>}
                </Button>
              );

              return item.href ? (
                <Link key={item.name} href={item.href} className="block w-full">{content}</Link>
              ) : (
                <div key={item.name} className={cn("w-full", !isExpanded && "flex justify-center")}>{content}</div>
              );
            })}
          </div>

          {isExpanded && (
            <>
              <div className="mt-6 mb-2 px-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>Favorites</span>
                <ChevronDown className="h-3 w-3 -rotate-90" />
              </div>

              <div className="mt-4 mb-1 px-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>Recent Chats</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              
              <div className="px-2 space-y-0.5">
                {recentChats.map((chat) => (
                  <Link key={chat.id} href={`${baseUrl}/${chat.id}`} className="block w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-8 px-2 gap-2.5 rounded-md text-sm font-normal text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      <CircleDashed className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.5} />
                      <span className="truncate">{chat.name}</span>
                    </Button>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start h-8 px-2 gap-2.5 rounded-md text-sm font-normal text-muted-foreground hover:bg-accent hover:text-foreground transition-colors mt-1"
                >
                  <span className="flex w-4 items-center justify-center tracking-widest leading-none font-bold">...</span>
                  <span className="truncate">More</span>
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Profile */}
        <div className="flex-shrink-0 flex items-center justify-between p-3 mt-auto border-t border-border">
          <div className={cn("flex items-center gap-2 hover:bg-accent p-1.5 rounded-md transition-colors cursor-pointer", isExpanded ? "w-full" : "mx-auto justify-center")}>
            <div className="shrink-0">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-6 w-6 rounded-md",
                    userButtonPopoverCard: "shadow-xl border border-border bg-popover text-popover-foreground"
                  }
                }}
              />
            </div>
            {isExpanded && (
              <span className="text-sm font-medium text-foreground truncate">{params?.username || "kunalmadoliya"}</span>
            )}
          </div>
        </div>
      </motion.div>
      
      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
      <SearchCommand />
    </>
  );
}
