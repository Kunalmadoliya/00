"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/dashboard-components/project-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dummyProjects = [
  {
    id: "1",
    name: "Marketing Landing Page",
    description:
      "High-conversion landing page with dark mode and Framer Motion animations.",
    status: "active" as const,
    visibility: "public" as const,
    updatedAt: "2 hours ago",
    favorite: true,
    tags: ["next.js", "tailwind", "framer-motion"],
  },
  {
    id: "2",
    name: "SaaS Dashboard App",
    description:
      "Internal dashboard with charts, data tables, and user management.",
    status: "active" as const,
    visibility: "private" as const,
    updatedAt: "5 hours ago",
    favorite: false,
    tags: ["react", "shadcn", "recharts"],
  },
  {
    id: "3",
    name: "E-commerce Storefront",
    description: "Headless Shopify storefront with Next.js App Router.",
    status: "draft" as const,
    visibility: "private" as const,
    updatedAt: "1 day ago",
    favorite: true,
    tags: ["next.js", "shopify", "stripe"],
  },
  {
    id: "4",
    name: "Blog with CMS",
    description: "Content management system integration with markdown support.",
    status: "archived" as const,
    visibility: "public" as const,
    updatedAt: "1 week ago",
    favorite: false,
    tags: ["next.js", "contentlayer", "mdx"],
  },
  {
    id: "5",
    name: "AI Code Assistant",
    description: "Workspace for AI code generation using Claude API.",
    status: "active" as const,
    visibility: "private" as const,
    updatedAt: "Just now",
    favorite: true,
    tags: ["next.js", "ai", "github"],
  },
  {
    id: "6",
    name: "Portfolio V2",
    description: "Personal developer portfolio with interactive 3D elements.",
    status: "draft" as const,
    visibility: "public" as const,
    updatedAt: "3 days ago",
    favorite: false,
    tags: ["three.js", "framer-motion"],
  },
];

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your AI generated applications.
          </p>
        </div>
        <Button className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background/50 backdrop-blur-xl p-2 rounded-lg border sticky top-16 z-30">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9 bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 border-dashed border-border/60"
                />
              }
            >
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              Status
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Drafts</DropdownMenuItem>
              <DropdownMenuItem>Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 border-dashed border-border/60"
                />
              }
            >
              <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
              Sort
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last updated</DropdownMenuItem>
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-4 w-px bg-border mx-1 hidden sm:block" />

          <div className="flex items-center p-1 bg-muted/50 rounded-md border border-border/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("grid")}
              className={
                view === "grid"
                  ? "bg-background shadow-sm h-7 w-7"
                  : "h-7 w-7 text-muted-foreground"
              }
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("list")}
              className={
                view === "list"
                  ? "bg-background shadow-sm h-7 w-7"
                  : "h-7 w-7 text-muted-foreground"
              }
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-4 text-center text-muted-foreground py-12">
            <List className="h-8 w-8 mx-auto mb-3 opacity-20" />
            <p>List view is under construction for this demo.</p>
            <Button
              variant="link"
              onClick={() => setView("grid")}
              className="mt-2"
            >
              Switch back to grid
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
