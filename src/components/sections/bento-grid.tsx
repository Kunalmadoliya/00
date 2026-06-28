"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  GitBranch, Zap, CheckCircle2, Smartphone, GitMerge, 
  FileCode2, FolderTree, Sparkles, ArrowRight, Activity 
} from "lucide-react";
import React, { useEffect, useState } from "react";

// --- 1. Component Architecture ---
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

const AnimatedCodeEditor = () => {
  const code = `import { Card } from "@/components/ui/card";
import { AreaChart } from "./charts";

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Total Revenue" value="$45k" />
      <Card title="Active Users" value="+2350" />
      <div className="col-span-2">
        <AreaChart data={revenueData} />
      </div>
    </div>
  );
}`;

  const lines = code.split('\n');
  const [visibleLines, setVisibleLines] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setVisibleLines(v => {
        if (v >= lines.length) {
          clearInterval(interval);
          timeout = setTimeout(() => {
             setVisibleLines(0);
             setKey(k => k + 1);
          }, 3000);
          return v;
        }
        return v + 1;
      });
    }, 150);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [key, lines.length]);

  return (
    <div className="flex font-mono text-[11px] md:text-xs leading-relaxed">
      <div className="w-8 shrink-0 text-zinc-600 flex flex-col items-end pr-3 select-none">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 text-zinc-300 whitespace-pre">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CodeLine line={line} />
          </motion.div>
        ))}
        {visibleLines < lines.length && (
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

const ComponentArchitectureVisual = () => {
  return (
    <div className="absolute inset-0 m-2 rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex flex-col md:flex-row font-sans shadow-2xl">
      {/* Sidebar */}
      <div className="w-[180px] border-r border-white/10 bg-[#111111] p-3 hidden md:flex flex-col gap-4 z-10">
        <div className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider mb-1">Explorer</div>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2 text-zinc-300 bg-white/5 px-2 py-1.5 rounded cursor-default">
            <FolderTree className="w-3.5 h-3.5 text-blue-400" />
            <span>src</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 pl-4 px-2 py-1 cursor-default hover:text-zinc-200 transition-colors">
            <FolderTree className="w-3.5 h-3.5 text-blue-400" />
            <span>app</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-200 bg-blue-500/10 pl-8 px-2 py-1.5 border border-blue-500/20 rounded cursor-default">
            <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
            <span>page.tsx</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 pl-4 px-2 py-1 mt-1 cursor-default hover:text-zinc-200 transition-colors">
            <FolderTree className="w-3.5 h-3.5 text-purple-400" />
            <span>components</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 pl-8 px-2 py-1 cursor-default hover:text-zinc-200 transition-colors">
            <FileCode2 className="w-3.5 h-3.5 text-purple-400" />
            <span>ui.tsx</span>
          </div>
        </div>
      </div>
      
      {/* Editor */}
      <div className="flex-1 flex flex-col relative bg-[#0A0A0A]">
        {/* Editor Tabs */}
        <div className="flex border-b border-white/10 bg-[#0A0A0A] overflow-hidden text-xs">
          <div className="px-4 py-2.5 bg-[#111111] border-r border-white/10 text-zinc-300 flex items-center gap-2 border-t border-t-blue-500/50">
            <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
            page.tsx
          </div>
          <div className="px-4 py-2.5 border-r border-white/10 text-zinc-500 flex items-center gap-2 hover:bg-white/5 transition-colors cursor-default">
            <FileCode2 className="w-3.5 h-3.5 text-purple-400" />
            charts.tsx
          </div>
        </div>
        
        {/* Code Area */}
        <div className="flex-1 p-4 overflow-hidden relative">
           <AnimatedCodeEditor />
        </div>

        {/* Floating AI Prompt */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[320px] bg-[#111111] border border-white/10 rounded-xl p-2.5 shadow-2xl flex items-center gap-3 z-20"
        >
          <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-zinc-300 text-xs flex-1 truncate font-medium">
            Generate a dashboard layout...
          </div>
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>
        
        {/* Soft bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

// --- 2. Production Ready ---
const StepItem = ({ active, completed, text }: { active: boolean, completed: boolean, text: string }) => {
  return (
    <div className="flex items-center gap-3">
       <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
          {completed ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : active ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-zinc-200" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          )}
       </div>
       <span className={`text-xs ${active || completed ? 'text-zinc-200' : 'text-zinc-600'}`}>{text}</span>
    </div>
  )
}

const ProductionReadyVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 m-2 rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex items-center justify-center p-4">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px]" />
      
      <div className="w-full max-w-[240px] bg-[#111111] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col relative z-10">
        <div className="p-2.5 border-b border-white/10 flex items-center gap-2 bg-white/[0.02]">
          <Activity className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[11px] font-medium text-zinc-300">Deployment Status</span>
        </div>
        <div className="p-4 flex flex-col gap-3.5 relative min-h-[140px] justify-center">
           <div className="flex flex-col gap-3">
              <StepItem active={step === 0} completed={step > 0} text="Building application" />
              <StepItem active={step === 1} completed={step > 1} text="Running checks" />
              <StepItem active={step === 2} completed={step > 2} text="Assigning domains" />
           </div>

           <AnimatePresence>
             {step >= 3 && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="absolute inset-0 bg-[#111111]/90 backdrop-blur-sm flex items-center justify-center p-4"
               >
                 <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-xl flex flex-col items-center gap-1.5 text-center w-full shadow-lg">
                    <CheckCircle2 className="w-6 h-6 mb-1" />
                    <div className="text-xs font-semibold text-green-400">Deployed Successfully</div>
                    <div className="text-[10px] opacity-80 font-mono text-green-500/80">app.bento.com</div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// --- 3. Live Preview ---
const LivePreviewVisual = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsMobile(m => !m);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 m-2 rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 opacity-50" />
      
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`bg-[#111111] border border-white/10 shadow-2xl rounded-lg flex flex-col overflow-hidden relative z-10 ${isMobile ? 'w-[130px] h-[250px]' : 'w-full max-w-[280px] h-[190px]'}`}
      >
        <div className="h-7 border-b border-white/10 flex items-center px-2.5 gap-2 bg-white/5 shrink-0">
           <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
             <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
             <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
           </div>
           <motion.div layout className="flex-1 mx-2 h-3.5 bg-black/40 rounded-sm flex items-center justify-center">
             <div className="w-12 h-1 bg-white/10 rounded-full" />
           </motion.div>
        </div>

        <div className="flex-1 p-2.5 flex gap-2.5 overflow-hidden bg-[#0A0A0A]">
           {!isMobile && (
             <motion.div layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="w-10 border-r border-white/5 flex flex-col gap-2 pr-2.5 shrink-0">
                <div className="w-full h-3 bg-white/10 rounded-sm" />
                <div className="w-full h-3 bg-white/5 rounded-sm" />
                <div className="w-full h-3 bg-white/5 rounded-sm" />
             </motion.div>
           )}

           <motion.div layout className="flex-1 flex flex-col gap-2 min-w-0">
              <motion.div layout className="h-5 w-full bg-white/5 rounded-sm flex items-center px-2 justify-between shrink-0">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                <div className="w-4 h-1.5 bg-white/10 rounded-full" />
              </motion.div>

              <div className={`flex gap-2 shrink-0 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <motion.div layout className="flex-1 h-10 bg-blue-500/10 border border-blue-500/20 rounded flex flex-col justify-center p-2 gap-1.5">
                   <div className="w-8 h-1 bg-blue-500/40 rounded-full" />
                   <div className="w-12 h-2 bg-blue-500/60 rounded-full" />
                </motion.div>
                <motion.div layout className="flex-1 h-10 bg-purple-500/10 border border-purple-500/20 rounded flex flex-col justify-center p-2 gap-1.5">
                   <div className="w-8 h-1 bg-purple-500/40 rounded-full" />
                   <div className="w-12 h-2 bg-purple-500/60 rounded-full" />
                </motion.div>
              </div>

              <motion.div layout className="flex-1 bg-white/5 rounded border border-white/5 relative overflow-hidden mt-0.5">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end gap-1 px-1.5 pb-1.5">
                   {[40, 70, 30, 80, 50, 90, 60, 40, 80].slice(0, isMobile ? 5 : 9).map((h, i) => (
                     <motion.div layout key={i} className="flex-1 bg-white/20 rounded-t-[1px]" style={{ height: `${h}%` }} />
                   ))}
                </div>
              </motion.div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// --- 4. Native Git Export ---
// Delays computed once at module load — never inside render (avoids react-hooks/purity violation)
const COMMIT_DELAYS = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.08, 0.18, 0.12];

interface CommitNodeProps {
  x: string;
  y: string;
  text: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  isFeature?: boolean;
  isMerge?: boolean;
  glowing?: boolean;
  delayIndex?: number;
}

const CommitNode = ({ x, y, text, avatar, icon, isFeature, isMerge, glowing, delayIndex = 0 }: CommitNodeProps) => {
  const delay = COMMIT_DELAYS[delayIndex % COMMIT_DELAYS.length];
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", delay }}
      className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div className={`text-[10px] whitespace-nowrap px-2 py-1 rounded-md border bg-[#111111] shadow-xl absolute -top-9 transition-transform hover:scale-105 cursor-default ${isFeature ? 'border-blue-500/30 text-blue-300' : 'border-white/10 text-zinc-300'}`}>
        {text}
      </div>
      <div className={`w-7 h-7 rounded-full border-4 border-[#0A0A0A] flex items-center justify-center text-[10px] font-bold shadow-2xl z-10 ${
        isMerge ? 'bg-purple-500 text-white' :
        isFeature ? 'bg-blue-500 text-white' :
        glowing ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
        'bg-zinc-700 text-white'
      }`}>
        {icon ? icon : isMerge ? <GitMerge className="w-3.5 h-3.5" /> : avatar}
      </div>
      {glowing && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-500/20 rounded-full blur-md -z-10 animate-pulse" />
      )}
    </motion.div>
  )
}

const GitExportVisual = () => {
  return (
    <div className="absolute inset-0 m-2 rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative w-full max-w-2xl h-[120px] flex items-center">
        {/* Main Branch Line */}
        <motion.div 
          initial={{ scaleX: 0 }} 
          whileInView={{ scaleX: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1 }}
          className="absolute left-0 right-0 h-0.5 bg-zinc-800 top-1/2 -translate-y-1/2 origin-left" 
        />
        
        {/* Feature Branch Line */}
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
           <motion.path 
             initial={{ pathLength: 0 }} 
             whileInView={{ pathLength: 1 }} 
             viewport={{ once: true }} 
             transition={{ duration: 1, delay: 0.5 }}
             d="M 100 50 C 200 50, 200 20, 300 20 L 550 20 C 650 20, 650 50, 750 50" 
             fill="none" 
             stroke="#3b82f6" 
             strokeWidth="2" 
             strokeDasharray="4 4" 
             className="opacity-50" 
             vectorEffect="non-scaling-stroke"
           />
        </svg>

        {/* Nodes */}
        <CommitNode x="10%" y="50%" text="init project" avatar="U" delayIndex={0} />
        <CommitNode x="30%" y="20%" text="feat: add dashboard ui" avatar={<Sparkles className="w-3.5 h-3.5" />} isFeature delayIndex={1} />
        <CommitNode x="55%" y="20%" text="fix: layout shift" avatar={<Sparkles className="w-3.5 h-3.5" />} isFeature delayIndex={2} />
        <CommitNode x="75%" y="50%" text="Merge PR #42" isMerge delayIndex={3} />
        <CommitNode x="90%" y="50%" text="Deploying..." icon={<Zap className="w-3.5 h-3.5" />} glowing delayIndex={4} />
      </div>
    </div>
  )
}

// --- Main Grid ---
const features = [
  {
    title: "AI-Powered Architecture",
    description: "From prompt to production-ready React components with full TypeScript support.",
    icon: <Sparkles className="h-5 w-5" />,
    visual: <ComponentArchitectureVisual />,
    className: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "Instant Deployments",
    description: "Global edge network deployment with zero configuration.",
    icon: <Zap className="h-5 w-5" />,
    visual: <ProductionReadyVisual />,
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Responsive by Default",
    description: "Every generated component is optimized for all screen sizes.",
    icon: <Smartphone className="h-5 w-5" />,
    visual: <LivePreviewVisual />,
    className: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Native Git Integration",
    description: "Commit history, branch management, and automated PRs built-in.",
    icon: <GitBranch className="h-5 w-5" />,
    visual: <GitExportVisual />,
    className: "col-span-1 md:col-span-3 row-span-1",
  }
];

export function BentoGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Engineered for builders.</h2>
          <p className="text-lg text-muted-foreground">Stop writing boilerplate. Start architecting. Every component is generated with clean, production-ready code.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[340px] gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-colors ${feature.className}`}
            >
              <div className="absolute inset-0 mb-[120px] overflow-hidden flex items-center justify-center">
                 {feature.visual}
              </div>
              
              <div className="relative z-20 flex flex-col justify-center p-6 bg-card/90 backdrop-blur-md border-t border-border/50 mt-auto h-[120px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background shadow-sm text-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold tracking-tight text-foreground text-lg">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-primary/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}