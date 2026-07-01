"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Code, 
  Layout, 
  Zap,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const recentProjects = [
  { id: 1, name: "Marketing Landing Page", status: "Active", time: "2 hours ago", icon: Layout },
  { id: 2, name: "SaaS Dashboard App", status: "Active", time: "5 hours ago", icon: Code },
  { id: 3, name: "E-commerce Storefront", status: "Completed", time: "1 day ago", icon: Zap },
];

export default function DashboardHome() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12">
      {/* Welcome Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4"
      >
        <h1 className="text-3xl font-semibold tracking-tight">Good morning, User</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Here&apos;s what&apos;s happening with your projects today. Start a new generation or continue where you left off.
        </p>
      </motion.section>

      {/* Suggested Actions / Templates */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card className="bg-primary/5 border-primary/20 cursor-pointer hover:border-primary/50 transition-colors shadow-none overflow-hidden group">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Create New App</CardTitle>
            <CardDescription>Start building a new full-stack application with AI.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="p-0 group-hover:text-primary group-hover:translate-x-1 transition-all h-auto">
              Start building <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:border-foreground/20 transition-colors shadow-none overflow-hidden group">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
              <Layout className="h-5 w-5" />
            </div>
            <CardTitle>Explore Templates</CardTitle>
            <CardDescription>Browse our collection of premium application templates.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="p-0 group-hover:text-foreground group-hover:translate-x-1 transition-all h-auto text-muted-foreground">
              Browse library <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="cursor-pointer hover:border-foreground/20 transition-colors shadow-none overflow-hidden group hidden lg:block">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
              <Code className="h-5 w-5" />
            </div>
            <CardTitle>Import Repository</CardTitle>
            <CardDescription>Connect your GitHub account to analyze an existing codebase.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" className="p-0 group-hover:text-foreground group-hover:translate-x-1 transition-all h-auto text-muted-foreground">
              Connect GitHub <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.section>

      {/* Continue Working */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Continue Working</h2>
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 group cursor-pointer relative bg-card/50 backdrop-blur-sm">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-32 bg-muted/30 border-b relative overflow-hidden flex items-center justify-center">
                  {/* Decorative blur blob */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                  <project.icon className="h-8 w-8 text-muted-foreground/50 z-10" />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.time}</span>
                  </div>
                  <CardTitle className="text-base truncate">{project.name}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
