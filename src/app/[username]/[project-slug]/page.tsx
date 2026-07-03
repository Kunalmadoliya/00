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
