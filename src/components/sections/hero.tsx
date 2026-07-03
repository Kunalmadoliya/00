"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Sparkles, Folder, FileCode, CheckCircle2, ChevronRight, Loader2, MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// --- Helpers ---
const CodeLine = ({ line }: { line: string }) => {
  let escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  escaped = escaped
    .replace(/\b(import|from|export|default|function|return)\b/g, '<span class="text-[#ff7b72]">$1</span>')
    .replace(/\b(const|let|var)\b/g, '<span class="text-[#79c0ff]">$1</span>')
    .replace(/(&quot;.*?&quot;|&#39;.*?&#39;|".*?"|'.*?')/g, '<span class="text-[#a5d6ff]">$1</span>')
    .replace(/&lt;([A-Z][a-zA-Z0-9]*)/g, '&lt;<span class="text-[#7ee787]">$1</span>')
    .replace(/&lt;\/([A-Z][a-zA-Z0-9]*)/g, '&lt;/<span class="text-[#7ee787]">$1</span>')
    .replace(/&lt;([a-z]+)/g, '&lt;<span class="text-[#79c0ff]">$1</span>')
    .replace(/&lt;\/([a-z]+)/g, '&lt;/<span class="text-[#79c0ff]">$1</span>')
    .replace(/([a-zA-Z-]+)=/g, '<span class="text-[#79c0ff]">$1</span>=');

  return <span dangerouslySetInnerHTML={{ __html: escaped || ' ' }} />;
}

// --- Typing Code Component ---
const TypingCode = ({ step }: { step: number }) => {
  const code = `import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export default function Dashboard() {
  const [tasks] = useState(124);
  const [completed] = useState(82);

  return (
    <div className="p-8 bg-zinc-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <Avatar src="/user.png" />
      </header>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card title="Total Tasks" value={tasks} />
        <Card title="Completed" value={completed} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <div className="flex flex-col gap-3">
          <ActivityItem status="success" />
          <ActivityItem status="pending" />
          <ActivityItem status="success" />
        </div>
      </div>
    </div>
  );
}`;
  
  const lines = code.split('\n');
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step >= 2) {
      interval = setInterval(() => {
        setVisibleLines(v => {
          if (v >= lines.length) {
            clearInterval(interval);
            return v;
          }
          return v + 1;
        });
      }, 80);
    } else {
      // Reset when step goes below 2 — safe to reset in a scheduler callback
      const timer = setTimeout(() => setVisibleLines(0), 0);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [step, lines.length]);

  return (
    <div className="flex font-mono text-[11px] md:text-xs leading-relaxed h-full overflow-hidden">
      <div className="w-8 shrink-0 text-zinc-700 flex flex-col items-end pr-3 select-none">
        {step < 2 ? (
          <div>1</div>
        ) : (
          lines.slice(0, visibleLines + 1).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))
        )}
      </div>
      <div className="flex-1 text-zinc-300 whitespace-pre">
        {step < 2 && <div className="text-zinc-600 italic">{"// Waiting for generation..."}</div>}
        {step >= 2 && lines.slice(0, visibleLines).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CodeLine line={line} />
          </motion.div>
        ))}
        {step >= 2 && visibleLines < lines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-3.5 bg-blue-400 ml-1 align-middle translate-y-[-1px]"
          />
        )}
      </div>
    </div>
  )
}

// --- Main IDE Preview Component ---
const IDEPreview = () => {
  const [step, setStep] = useState(0);
  
  const isReset = step === 0;

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => setStep(3), 6000);
    const timer4 = setTimeout(() => setStep(4), 7000);
    const timer5 = setTimeout(() => setStep(0), 12000);
    
    return () => {
       clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); clearTimeout(timer5);
    }
  }, [isReset]);
  
  return (
    <div className="w-full rounded-2xl border border-border/50 bg-[#0A0A0A] shadow-2xl overflow-hidden font-sans flex flex-col h-[600px] text-left">
       {/* Window Controls */}
       <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-white/[0.02]">
           <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
           </div>
           <div className="flex text-xs text-zinc-500 gap-4 font-mono font-semibold">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> 00 workspace</span>
           </div>
           <div className="w-16" /> {/* spacer */}
       </div>
       
       <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex w-[260px] border-r border-white/10 bg-[#0c0c0c] flex-col h-full shrink-0">
             {/* File Tree */}
             <div className="h-1/2 border-b border-white/10 flex flex-col">
                <div className="px-4 py-3 text-[10px] font-bold text-zinc-500 tracking-wider uppercase">Explorer</div>
                <div className="flex-1 overflow-auto p-2 flex flex-col gap-1 text-xs">
                   <div className="flex items-center gap-2 text-zinc-300 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer">
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 rotate-90" />
                      <Folder className="w-4 h-4 text-blue-400" />
                      <span>app</span>
                   </div>
                   <div className="flex items-center gap-2 text-zinc-200 bg-blue-500/10 px-2 py-1.5 ml-4 rounded border border-blue-500/20 cursor-pointer">
                      <FileCode className="w-4 h-4 text-blue-400" />
                      <span>page.tsx</span>
                   </div>
                   <div className="flex items-center gap-2 text-zinc-400 px-2 py-1.5 ml-4 rounded hover:bg-white/5 cursor-pointer transition-colors">
                      <FileCode className="w-4 h-4 text-blue-400" />
                      <span>layout.tsx</span>
                   </div>
                   <div className="flex items-center gap-2 text-zinc-300 px-2 py-1.5 rounded mt-2 hover:bg-white/5 cursor-pointer transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 rotate-90" />
                      <Folder className="w-4 h-4 text-purple-400" />
                      <span>components</span>
                   </div>
                   <AnimatePresence>
                     {step >= 1 && (
                       <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-zinc-300 px-2 py-1.5 ml-4 rounded hover:bg-white/5 cursor-pointer transition-colors">
                          <FileCode className="w-4 h-4 text-purple-400" />
                          <span>card.tsx</span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             </div>
             
             {/* Chat History */}
             <div className="h-1/2 flex flex-col bg-[#0A0A0A]">
                <div className="px-4 py-3 text-[10px] font-bold text-zinc-500 tracking-wider uppercase border-b border-white/5">00 Agent</div>
                <div className="flex-1 p-4 flex flex-col gap-5 overflow-auto relative">
                   <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                         <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="text-xs text-zinc-300 leading-relaxed">
                         I&apos;m building a <span className="text-white font-semibold">Task Management Dashboard</span> with Next.js &amp; Tailwind.
                      </div>
                   </div>
                   
                   <AnimatePresence>
                     {step >= 1 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                          <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                             <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          </div>
                          <div className="text-xs text-zinc-400 leading-relaxed">
                             Scaffolded project files and installed dependencies.
                          </div>
                       </motion.div>
                     )}
                     {step >= 2 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                             <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                          </div>
                          <div className="text-xs text-zinc-400 leading-relaxed">
                             Generating React components for dashboard view...
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>

                   {/* Gradient fade at bottom */}
                   <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
                </div>
             </div>
          </div>

          {/* Editor + Terminal */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
             <div className="h-10 border-b border-white/5 flex items-center bg-[#0c0c0c]">
                <div className="px-4 h-full border-r border-white/5 flex items-center gap-2 bg-[#0A0A0A] border-t border-t-blue-500/50 text-xs text-zinc-300 shadow-[0_-1px_0_0_rgba(59,130,246,0.1)]">
                   <FileCode className="w-4 h-4 text-blue-400" />
                   page.tsx
                </div>
             </div>
             
             {/* Code Editor */}
             <div className="flex-1 p-4 relative font-mono text-xs overflow-hidden">
                <TypingCode step={step} />

                {/* AI Cursor hovering */}
                <AnimatePresence>
                  {step >= 2 && step < 4 && (
                    <motion.div 
                       initial={{ opacity: 0, x: 100, y: 150 }}
                       animate={{ 
                         opacity: 1, 
                         x: [100, 200, 150, 300, 350], 
                         y: [150, 250, 200, 300, 350] 
                       }}
                       transition={{ duration: 4, ease: "linear" }}
                       className="absolute pointer-events-none z-50 flex flex-col gap-1 items-start drop-shadow-2xl"
                    >
                       <MousePointer2 className="w-5 h-5 text-blue-500 fill-blue-500 -rotate-12" />
                       <div className="bg-blue-500 text-white text-[10px] px-2.5 py-1 rounded-full shadow-lg font-sans font-semibold tracking-wide ml-3">
                          00 Agent
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             {/* Terminal */}
             <div className="h-[140px] border-t border-white/10 bg-[#0c0c0c] flex flex-col shrink-0">
                <div className="h-8 border-b border-white/5 flex items-center px-4 gap-6 bg-white/[0.01]">
                   <span className="text-[10px] text-zinc-300 uppercase tracking-wider font-bold">Terminal</span>
                   <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-semibold hover:text-zinc-400 cursor-pointer transition-colors">Problems</span>
                   <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-semibold hover:text-zinc-400 cursor-pointer transition-colors">Output</span>
                </div>
                <div className="flex-1 p-3 overflow-hidden font-mono text-[11px] flex flex-col gap-1.5 bg-[#0A0A0A]">
                   <div className="text-zinc-500"><span className="text-green-500">➜</span>  ~ pnpm run dev</div>
                   <div className="text-green-400">ready - started server on 0.0.0.0:3000, url: http://localhost:3000</div>
                   <AnimatePresence>
                     {step >= 1 && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-400">event - compiled client and server successfully in 1250 ms (154 modules)</motion.div>}
                     {step >= 2 && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-zinc-400">wait  - compiling /page (client and server)...</motion.div>}
                     {step >= 3 && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 font-semibold">event - compiled client and server successfully in 345 ms (155 modules)</motion.div>}
                   </AnimatePresence>
                </div>
             </div>
          </div>

          {/* Preview Panel */}
          <div className="hidden lg:flex w-[400px] border-l border-white/10 bg-white flex-col relative shrink-0">
             <div className="h-10 border-b border-black/5 flex items-center px-3 bg-zinc-50 gap-2 shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 cursor-pointer text-zinc-400 transition-colors">
                   <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
                <div className="flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 cursor-pointer text-zinc-400 transition-colors">
                   <ChevronRight className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-white border border-black/10 rounded-md h-7 flex items-center justify-center text-xs text-zinc-500 font-medium shadow-sm">
                   localhost:3000
                </div>
             </div>
             
             {/* The App Preview Render */}
             <div className="flex-1 p-6 relative bg-zinc-50/50">
                {step < 4 ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 transition-opacity duration-500">
                     <Loader2 className="w-6 h-6 animate-spin text-primary mb-3" />
                     <div className="text-sm text-zinc-600 font-medium">Compiling UI...</div>
                     <div className="text-xs text-zinc-400 mt-1">Building React server components</div>
                  </div>
                ) : null}

                {/* Real-looking UI */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 20 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }} className="flex flex-col gap-6 h-full">
                   <div className="flex justify-between items-center">
                      <div className="font-bold text-xl text-zinc-900 tracking-tight">Dashboard</div>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-inner border-2 border-white" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-black/5 rounded-2xl shadow-sm bg-white flex flex-col gap-1 transition-transform hover:scale-[1.02] cursor-default">
                         <div className="text-xs font-medium text-zinc-500">Total Tasks</div>
                         <div className="text-3xl font-bold text-zinc-900">124</div>
                      </div>
                      <div className="p-4 border border-black/5 rounded-2xl shadow-sm bg-white flex flex-col gap-1 transition-transform hover:scale-[1.02] cursor-default">
                         <div className="text-xs font-medium text-zinc-500">Completed</div>
                         <div className="text-3xl font-bold text-zinc-900">82</div>
                      </div>
                   </div>
                   <div className="flex-1 border border-black/5 rounded-2xl shadow-sm bg-white p-5 flex flex-col gap-5">
                      <div className="font-semibold text-zinc-900">Recent Activity</div>
                      <div className="flex flex-col gap-4">
                         {[1,2,3].map((i) => (
                           <div key={i} className="flex items-center gap-3">
                              <div className={`w-2.5 h-2.5 rounded-full ${i === 2 ? 'bg-zinc-300' : 'bg-green-500'} ring-4 ${i === 2 ? 'ring-zinc-100' : 'ring-green-50'}`} />
                              <div className="flex flex-col gap-1.5 flex-1">
                                <div className={`h-2.5 w-full max-w-[${i === 1 ? '160px' : i === 2 ? '120px' : '180px'}] bg-zinc-200 rounded-full`} />
                                <div className={`h-2 w-full max-w-[${i === 2 ? '80px' : '100px'}] bg-zinc-100 rounded-full`} />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>
       </div>
    </div>
  )
}

// --- Prompt Input Component ---
const HeroPrompt = () => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const text = "Build a minimal task management dashboard...";
  const [typed, setTyped] = useState("");
  
  useEffect(() => {
    if (isFocused) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, i));
      i++;
      if (i > text.length + 10) {
         clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPrompt = input.trim() || typed;
    if (!finalPrompt) return;
    
    sessionStorage.setItem("pending_prompt", finalPrompt);
    
    if (isSignedIn) {
      // Logic for logged in users: the interceptor will pick it up
      // but to force it, we can reload or redirect
      window.location.reload();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="group relative flex items-center rounded-2xl border border-border/50 bg-background/50 p-2 shadow-2xl backdrop-blur-xl transition-all hover:shadow-primary/5 hover:border-primary/30 w-full max-w-2xl mx-auto ring-1 ring-white/10 mt-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 ml-1">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="w-full bg-transparent px-4 text-base md:text-lg outline-none flex items-center text-foreground font-medium relative">
         {!isFocused && !input && (
           <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground/70">
             <span>{typed}</span>
             <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 h-6 bg-primary ml-1" />
           </div>
         )}
         <input 
           type="text"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
           className="w-full bg-transparent outline-none h-12 z-10"
           placeholder={isFocused ? "Describe your application..." : ""}
         />
      </div>
      <button type="submit" className="flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shrink-0 shadow-md z-10 relative">
        Generate <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}

// --- Main Section ---
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-4xl relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary backdrop-blur-md shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Engine v2.0 is now available</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-sans text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl"
        >
          From prompt <br className="hidden sm:block" />
          <span className="text-muted-foreground/50">to production.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl font-medium"
        >
          Describe your application in plain English. Watch a production-ready, full-stack React application assemble instantly in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="w-full"
        >
          <HeroPrompt />
        </motion.div>
      </div>

      {/* Interface Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="mt-24 w-full max-w-[1200px] z-10 px-4 md:px-6"
      >
        <IDEPreview />
      </motion.div>
    </section>
  );
}