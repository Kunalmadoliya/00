"use client";

import { motion } from "framer-motion";
import { SiGithub, SiVercel, SiSupabase, SiClerk, SiStripe } from "@icons-pack/react-simple-icons";
import { Sparkles } from "lucide-react";

// Only using verified exports from @icons-pack/react-simple-icons v13.13.0:
// SiGithub ✅, SiVercel ✅, SiSupabase ✅, SiClerk ✅, SiStripe ✅, SiX ✅
// SiLinkedin ❌ not exported, SiOpenai ❌ not exported → using lucide fallbacks
const integrations = [
  { name: "GitHub", icon: <SiGithub className="h-6 w-6" />, color: "hover:text-white" },
  { name: "Vercel", icon: <SiVercel className="h-6 w-6" />, color: "hover:text-white" },
  { name: "Supabase", icon: <SiSupabase className="h-6 w-6" />, color: "hover:text-green-400" },
  { name: "Clerk", icon: <SiClerk className="h-6 w-6" />, color: "hover:text-blue-500" },
  { name: "Stripe", icon: <SiStripe className="h-6 w-6" />, color: "hover:text-indigo-400" },
  { name: "OpenAI", icon: <Sparkles className="h-6 w-6" />, color: "hover:text-emerald-400" },
];

export function TrustedBy() {
  return (
    <section className="py-24 border-y border-white/10 bg-[#050505] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-12 text-center"
        >
          Natively integrated with modern stack
        </motion.p>
        
        {/* Infinite Marquee */}
        <div className="relative w-full max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex w-max gap-12 md:gap-24 pl-12 md:pl-24"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...integrations, ...integrations, ...integrations].map((company, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 text-zinc-600 transition-all duration-300 cursor-default opacity-60 hover:opacity-100 ${company.color} hover:scale-105`}
              >
                {company.icon}
                <span className="font-semibold tracking-tighter text-xl">{company.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}