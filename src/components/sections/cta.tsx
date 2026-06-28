"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48 flex justify-center items-center bg-[#0A0A0A]">
      {/* Spotlight Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      
      {/* Animated gradient mesh */}
      <motion.div 
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -z-20 opacity-20 bg-[radial-gradient(circle_800px_at_50%_50%,#3b82f6_0%,transparent_100%),radial-gradient(circle_800px_at_100%_100%,#8b5cf6_0%,transparent_100%)]" 
      />

      <div className="flex flex-col items-center text-center max-w-4xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
        >
          <Sparkles className="h-10 w-10 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-sm"
        >
          Build at the speed <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">of thought.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mb-12 text-xl text-zinc-400 max-w-2xl leading-relaxed"
        >
          Join elite engineering teams shipping production-ready interfaces in seconds, not hours. Stop writing boilerplate today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/sign-up" className="group relative w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-black transition-transform active:scale-95 hover:bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Start Architecting 
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link href="#docs" className="w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 text-base font-semibold text-white transition-all hover:bg-white/10 active:scale-95 backdrop-blur-md">
            Read Documentation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}