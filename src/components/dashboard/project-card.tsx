"use client";

import { motion } from "framer-motion";
import { 
  Folder, 
  MoreVertical, 
  Star, 
  Clock, 
  Eye, 
  Copy, 
  Trash2,
  Globe,
  Lock,
  GitBranch
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: "active" | "archived" | "draft";
    visibility: "public" | "private";
    updatedAt: string;
    favorite: boolean;
    tags: string[];
    thumbnail?: string;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden relative hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border cursor-pointer h-full flex flex-col bg-card/50 backdrop-blur-sm">
        {/* Thumbnail area */}
        <div className="h-40 bg-muted/30 relative border-b overflow-hidden group-hover:bg-muted/50 transition-colors flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          
          {project.thumbnail ? (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-105 duration-700 ease-out" 
              style={{ backgroundImage: `url(${project.thumbnail})` }} 
            />
          ) : (
            <Folder className="h-12 w-12 text-muted-foreground/30 z-0 group-hover:scale-110 transition-transform duration-500 ease-out" />
          )}

          {/* Top Actions overlay */}
          <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background">
              <Star className={cn("h-4 w-4", project.favorite ? "fill-yellow-500 text-yellow-500" : "")} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background" />}>
                  <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" /> Open Project
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={cn(
              "px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md backdrop-blur-md",
              project.status === 'active' ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20" :
              project.status === 'draft' ? "bg-amber-500/20 text-amber-500 border border-amber-500/20" :
              "bg-muted text-muted-foreground border border-border"
            )}>
              {project.status}
            </span>
          </div>
        </div>

        <CardContent className="p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {project.visibility === 'public' ? (
                <Globe className="h-3 w-3" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
              <span className="capitalize">{project.visibility}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {project.updatedAt}
            </div>
          </div>
          <h3 className="font-semibold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground text-[10px] font-medium flex items-center gap-1"
              >
                {tag === 'github' && <GitBranch className="h-3 w-3" />}
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
