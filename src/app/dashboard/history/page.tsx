"use client";

import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Settings, 
  UserPlus, 
  Zap,
  Globe,
  FileCode,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activityData = [
  {
    date: "Today",
    items: [
      {
        id: "1",
        type: "generation",
        title: "Generated Marketing Landing Page",
        description: "Created a new project using Gemini 3.1 Pro.",
        time: "10:24 AM",
        icon: Zap,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        link: "/dashboard/projects"
      },
      {
        id: "2",
        type: "commit",
        title: "Deployed to Vercel",
        description: "Production deployment triggered for E-commerce Storefront.",
        time: "9:15 AM",
        icon: Globe,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        link: "#"
      }
    ]
  },
  {
    date: "Yesterday",
    items: [
      {
        id: "3",
        type: "chat",
        title: "Chat session: Database Schema Design",
        description: "Discussed Prisma models and relations.",
        time: "4:30 PM",
        icon: MessageSquare,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        link: "/dashboard/chat"
      },
      {
        id: "4",
        type: "settings",
        title: "Updated Workspace Settings",
        description: "Changed default model to Claude 3.5 Sonnet.",
        time: "2:00 PM",
        icon: Settings,
        color: "text-zinc-500",
        bgColor: "bg-zinc-500/10",
        link: "/dashboard/settings"
      }
    ]
  },
  {
    date: "May 24, 2026",
    items: [
      {
        id: "5",
        type: "team",
        title: "Invited John Doe",
        description: "Added as Developer to Acme Inc workspace.",
        time: "11:20 AM",
        icon: UserPlus,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        link: "#"
      },
      {
        id: "6",
        type: "code",
        title: "Exported Codebase",
        description: "Downloaded ZIP for Portfolio V2.",
        time: "9:45 AM",
        icon: FileCode,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        link: "#"
      }
    ]
  }
];

export default function HistoryPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Activity History</h1>
        <p className="text-muted-foreground mt-1">Review your recent actions, generations, and deployments across all workspaces.</p>
      </div>

      <div className="space-y-8">
        {activityData.map((group, groupIndex) => (
          <div key={group.date} className="relative">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 sticky top-16 bg-background/90 backdrop-blur-sm py-2 z-10 border-b border-transparent shadow-[0_1px_0_0_transparent]">
              {group.date}
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent">
              {group.items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (groupIndex * 0.1) + (index * 0.05) }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background bg-muted/80 backdrop-blur-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bgColor}`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                  </div>
                  
                  <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] shadow-sm hover:shadow-md transition-shadow border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group/card cursor-pointer">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-semibold truncate group-hover/card:text-primary transition-colors">{item.title}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {item.description}
                      </p>
                      {item.link !== "#" && (
                        <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover/card:opacity-100 transition-opacity translate-y-2 group-hover/card:translate-y-0 duration-200">
                          View details <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-8 border-t">
        <Button variant="outline" className="w-full sm:w-auto bg-transparent backdrop-blur-sm border-dashed">
          Load More History
        </Button>
      </div>
    </div>
  );
}
