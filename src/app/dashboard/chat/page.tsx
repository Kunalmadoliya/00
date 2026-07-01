"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  User, 
  Send, 
  Paperclip, 
  Sparkles,
  ChevronDown,
  Terminal,
  MoreVertical,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Dummy conversation data
const conversation = [
  {
    id: 1,
    role: "user",
    content: "Build a hero section for a SaaS product with a dark theme.",
    timestamp: "10:23 AM"
  },
  {
    id: 2,
    role: "assistant",
    content: "I'll create a dark-themed hero section with a modern, glassmorphic aesthetic. It will include a bold headline, a supportive subheadline, primary/secondary CTAs, and a subtle gradient background.",
    isCode: false,
    timestamp: "10:23 AM"
  },
  {
    id: 3,
    role: "assistant",
    content: `export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Build Faster With AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          The most advanced platform for creating modern web applications without writing boilerplate code.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition">
            Get Started
          </button>
          <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-medium hover:bg-secondary/80 transition">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  )
}`,
    isCode: true,
    timestamp: "10:24 AM"
  },
  {
    id: 4,
    role: "user",
    content: "Can you make the glow effect a bit more purple?",
    timestamp: "10:25 AM"
  }
];

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Chat History Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-muted/20">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-sm font-medium">Chat History</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="text-xs font-medium text-muted-foreground px-2 py-1 mt-2">Today</div>
          <Button variant="ghost" className="w-full justify-start text-sm bg-accent/50 truncate h-10 px-3">
            <Sparkles className="h-4 w-4 mr-2 text-primary shrink-0" />
            <span className="truncate">SaaS Hero Section</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground truncate h-10 px-3">
            <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">Pricing Table Component</span>
          </Button>
          
          <div className="text-xs font-medium text-muted-foreground px-2 py-1 mt-4">Yesterday</div>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal text-muted-foreground hover:text-foreground truncate h-10 px-3">
            <MessageSquare className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate">Database Schema Design</span>
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-background">
        
        {/* Model Selector Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="rounded-full shadow-sm" />}>
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Gemini 3.1 Pro
                <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="font-medium">Gemini 3.1 Pro <span className="ml-auto text-xs text-muted-foreground">Advanced</span></DropdownMenuItem>
              <DropdownMenuItem>Gemini 3.1 Flash <span className="ml-auto text-xs text-muted-foreground">Fast</span></DropdownMenuItem>
              <DropdownMenuItem>Claude 3.5 Sonnet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 pt-20 pb-32">
          <div className="max-w-3xl mx-auto space-y-8">
            {conversation.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={cn(
                  "flex flex-col gap-1 max-w-[85%]",
                  msg.role === "user" ? "items-end" : "items-start"
                )}>
                  {msg.isCode ? (
                    <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm w-full bg-[#0d1117]">
                      <div className="flex items-center justify-between px-4 py-2 bg-muted/10 border-b border-border/20">
                        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                          <Terminal className="h-3 w-3" />
                          hero.tsx
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-xs hover:bg-white/10 text-muted-foreground hover:text-white">
                          Copy
                        </Button>
                      </div>
                      <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                        <code>{msg.content}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className={cn(
                      "px-4 py-3 rounded-2xl",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted/50 rounded-tl-sm border"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  )}
                  <span className="text-[10px] text-muted-foreground px-1">{msg.timestamp}</span>
                </div>

                {msg.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Thinking state placeholder */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 justify-start"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="bg-muted/30 px-4 py-3 rounded-2xl rounded-tl-sm border border-border/50 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Thinking</span>
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-10">
          <div className="max-w-3xl mx-auto">
            {/* Suggestions */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
              <Button variant="secondary" size="sm" className="rounded-full text-xs h-8 bg-background border shadow-sm hover:bg-muted shrink-0">
                Make it darker
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full text-xs h-8 bg-background border shadow-sm hover:bg-muted shrink-0">
                Add animations
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full text-xs h-8 bg-background border shadow-sm hover:bg-muted shrink-0">
                Convert to Tailwind
              </Button>
            </div>

            <div className="relative group rounded-2xl border bg-background/50 backdrop-blur-xl shadow-lg shadow-black/5 focus-within:shadow-xl focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything or describe what you want to build..."
                className="w-full bg-transparent resize-none border-0 focus:ring-0 p-4 min-h-[60px] max-h-[200px] text-sm outline-none"
                rows={1}
              />
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  className={cn(
                    "rounded-full h-8 px-3 transition-all",
                    inputValue.length > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span className="sr-only">Send</span>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-muted-foreground">AI can make mistakes. Consider verifying important information.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Temporary icon fix since it wasn't imported at top
function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
