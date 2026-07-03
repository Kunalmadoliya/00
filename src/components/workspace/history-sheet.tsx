"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Settings, 
  UserPlus, 
  Zap,
  Globe,
  FileCode,
  ArrowRight,
  Clock
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activityData = [
  {
    date: "Today",
    items: [
      {
        id: "1",
        title: "Database Schema Design",
        time: "4:30 PM",
        icon: MessageSquare,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      },
      {
        id: "2",
        title: "Marketing Landing Page",
        time: "10:24 AM",
        icon: MessageSquare,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      }
    ]
  },
  {
    date: "Yesterday",
    items: [
      {
        id: "3",
        title: "E-commerce Storefront",
        time: "9:15 AM",
        icon: MessageSquare,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      }
    ]
  }
];

interface HistorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistorySheet({ open, onOpenChange }: HistorySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[320px] sm:w-[400px] p-0 border-r bg-background/95 backdrop-blur-xl flex flex-col">
        <SheetHeader className="p-6 border-b text-left">
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Conversation History
          </SheetTitle>
          <SheetDescription>
            Resume your recent conversations and projects.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {activityData.map((group, groupIndex) => (
            <div key={group.date}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                {group.date}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, index) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start h-auto py-3 px-3 gap-3 rounded-xl hover:bg-accent/50 group"
                  >
                    <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${item.bgColor}`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div className="flex flex-col items-start overflow-hidden w-full gap-1">
                      <span className="text-sm font-medium truncate w-full text-left group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.time}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <Button variant="outline" className="w-full text-xs">
            View All History
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
