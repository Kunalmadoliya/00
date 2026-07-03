"use client";

import { useState, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { createProject } from "@/features/projects/actions";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Sparkles, Image as ImageIcon, MessageSquare, LayoutTemplate, FolderOpen } from "lucide-react";

export default function BuilderHome() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleCreate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;
    
    startTransition(async () => {
      try {
        const res = await createProject(prompt);
        if (res?.username && res?.project?.name) {
          router.push(`/${res.username}/${res.project.name}`);
        }
      } catch (e) {
        console.error("Failed to create project", e);
      }
    });
  };

  const templates = [
    { title: "Landing Page", icon: LayoutTemplate },
    { title: "Dashboard", icon: FolderOpen },
    { title: "Portfolio", icon: ImageIcon },
    { title: "API Backend", icon: Code2 }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-y-auto">
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-3xl mx-auto w-full px-6 transition-all duration-500 ease-in-out mt-10">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 tracking-tight text-center">
          What do you want to create?
        </h1>
        
        {/* Prompt Input */}
        <div className="w-full relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-border to-border rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <form 
            onSubmit={handleCreate}
            className="relative flex items-center bg-card border border-border rounded-2xl overflow-hidden shadow-2xl transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask the builder to generate something..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground px-6 py-5 outline-none resize-none min-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCreate();
                }
              }}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button 
                type="submit" 
                disabled={!prompt.trim() || isPending}
                size="icon"
                className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 transition-all"
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary-foreground" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Templates */}
        <div className="w-full mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {templates.map((t) => (
              <button 
                key={t.title}
                onClick={() => setPrompt(`Create a ${t.title.toLowerCase()}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary hover:bg-secondary/80 text-sm text-muted-foreground hover:text-foreground transition-all"
              >
                <t.icon className="h-4 w-4 shrink-0" />
                {t.title}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Sections */}
      <div className="max-w-4xl mx-auto w-full px-6 pb-20 space-y-12 opacity-80">
        
        {/* Recent Conversations */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Recent Conversations
          </h3>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "1", title: "Greeting", time: "2 hours ago" },
              { id: "2", title: "AI Communication OS", time: "Yesterday" }
            ].map(chat => (
              <div key={chat.id} className="p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors cursor-pointer flex justify-between items-center group">
                <span className="text-sm text-foreground font-medium truncate">{chat.title}</span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{chat.time}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Recent Projects */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <FolderOpen className="h-4 w-4" /> Recent Projects
          </h3>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: "1", title: "Marketing Landing Page", status: "Active" },
              { id: "2", title: "E-commerce Storefront", status: "Draft" },
              { id: "3", title: "Portfolio V2", status: "Active" }
            ].map(proj => (
              <div key={proj.id} className="p-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors cursor-pointer group flex flex-col gap-2">
                <span className="text-sm text-foreground font-medium truncate">{proj.title}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{proj.status}</span>
              </div>
            ))}
          </div> */}
        </div>

      </div>
    </div>
  );
}
