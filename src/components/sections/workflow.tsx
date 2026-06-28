"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Layout, Download, ChevronRight, CheckCircle2, FileCode, Search, Code2 } from "lucide-react";

const steps = [
  { 
    id: "01", 
    title: "Declare", 
    description: "Write a high-level prompt detailing your desired application state.",
    icon: Terminal
  },
  { 
    id: "02", 
    title: "Compile", 
    description: "The engine translates natural language into abstract syntax trees.",
    icon: Cpu
  },
  { 
    id: "03", 
    title: "Render", 
    description: "Code is mapped to your UI library and visually rendered in milliseconds.",
    icon: Layout
  },
  { 
    id: "04", 
    title: "Export", 
    description: "Download a production-grade repository with strict typing.",
    icon: Download
  },
];

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 flex justify-center border-b border-white/10 bg-[#0A0A0A]">
      <div className="w-full max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">The compilation pipeline.</h2>
          <p className="text-lg text-zinc-400">From natural language to executable code in four stages.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Steps */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const Icon = step.icon;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`group relative flex items-start gap-5 rounded-2xl p-5 text-left transition-all duration-300 ${
                    isActive 
                      ? "bg-white/5 ring-1 ring-white/10 shadow-2xl backdrop-blur-md" 
                      : "hover:bg-white/[0.02] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
                    isActive 
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                      : "border-white/10 bg-white/5 text-zinc-500"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        {step.id}
                      </span>
                      <h3 className={`text-lg font-semibold tracking-tight transition-colors ${isActive ? "text-white" : "text-zinc-300"}`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed transition-all duration-500 ${
                      isActive ? "text-zinc-400 h-auto opacity-100 mt-2" : "text-zinc-600 h-0 opacity-0 overflow-hidden mt-0"
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visualization Window */}
          <div className="lg:col-span-7 relative h-[400px] md:h-[450px] w-full rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-2xl overflow-hidden flex items-center justify-center p-6">
            {/* Mac Window Chrome */}
            <div className="absolute top-0 left-0 w-full flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 h-12">
              <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                 <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                 <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 flex justify-center">
                 <div className="px-3 py-1 rounded bg-black/40 border border-white/5 text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                    <Code2 className="w-3 h-3" /> pipeline.ts
                 </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-2xl mt-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 text-sm text-zinc-400 mb-4 border-b border-white/10 pb-3">
                    <Terminal className="h-4 w-4" />
                    <span className="font-mono">prompt_interface</span>
                  </div>
                  <p className="text-sm font-mono text-zinc-300 leading-relaxed">
                    <span className="text-blue-500">❯</span> Generate a scalable authentication dashboard featuring Next.js Server Actions, Clerk integration, and Tailwind CSS.
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle" />
                  </p>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full pt-16 flex flex-col items-center justify-center relative"
                >
                  {/* Neural network / AST visualization abstract */}
                  <div className="flex items-center gap-6 z-10">
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="w-24 h-24 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 shadow-xl backdrop-blur-md"
                     >
                        <Search className="w-6 h-6 text-blue-400" />
                        <span className="text-[10px] font-mono text-zinc-500">Analyze</span>
                     </motion.div>
                     
                     <div className="flex items-center gap-2 text-zinc-600">
                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronRight className="w-4 h-4" /></motion.div>
                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}><ChevronRight className="w-4 h-4" /></motion.div>
                     </div>

                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                        className="w-28 h-28 rounded-2xl border border-purple-500/30 bg-purple-500/10 flex flex-col items-center justify-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-md relative"
                     >
                        <Cpu className="w-8 h-8 text-purple-400" />
                        <span className="text-[10px] font-mono text-purple-300 font-bold">Compile AST</span>
                        <div className="absolute -inset-1 rounded-2xl border border-purple-500/50 animate-pulse" />
                     </motion.div>
                     
                     <div className="flex items-center gap-2 text-zinc-600">
                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}><ChevronRight className="w-4 h-4" /></motion.div>
                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}><ChevronRight className="w-4 h-4" /></motion.div>
                     </div>

                     <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                        className="w-24 h-24 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 shadow-xl backdrop-blur-md"
                     >
                        <FileCode className="w-6 h-6 text-green-400" />
                        <span className="text-[10px] font-mono text-zinc-500">React code</span>
                     </motion.div>
                  </div>
                  
                  {/* Background connecting lines */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                     <svg width="400" height="200" className="absolute">
                        <motion.path 
                           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                           d="M 50 100 Q 200 10 350 100" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" 
                        />
                        <motion.path 
                           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                           d="M 50 100 Q 200 190 350 100" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" 
                        />
                     </svg>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-lg rounded-xl border border-white/10 bg-white p-6 shadow-2xl mt-8"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-6 w-32 bg-black rounded" />
                      <div className="h-8 w-8 bg-zinc-200 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="h-20 w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col justify-center">
                         <div className="h-2 w-16 bg-zinc-300 rounded mb-2" />
                         <div className="h-5 w-12 bg-black rounded" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="h-20 w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col justify-center">
                         <div className="h-2 w-16 bg-zinc-300 rounded mb-2" />
                         <div className="h-5 w-12 bg-black rounded" />
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
                      <div className="h-12 w-full bg-zinc-100 rounded-lg" />
                      <div className="h-12 w-full bg-zinc-100 rounded-lg" />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex flex-col items-center justify-center text-center mt-12"
                >
                  <div className="relative mb-6">
                     <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                     <div className="relative h-20 w-20 rounded-full border-2 border-green-500 bg-green-500/10 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                       <CheckCircle2 className="h-10 w-10" />
                     </div>
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">Ready for Production</h4>
                  <p className="text-sm text-zinc-400 mt-2 font-mono bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                     app-export.zip (24.2 MB)
                  </p>
                  <motion.button 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="mt-6 flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-zinc-200 transition-colors"
                  >
                     <Download className="w-4 h-4" /> Download Codebase
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}