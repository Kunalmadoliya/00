import Link from "next/link";
import { Command, ArrowRight } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <Command className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight text-xl">00</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-xs mb-6 leading-relaxed">
              The standard for AI-assisted interface engineering and code generation. Build production-ready React apps in seconds.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="X (Twitter)">
                <SiX className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-5 text-white">Product</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/features" className="hover:text-white transition-colors">Engine v2</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Components</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-5 text-white">Resources</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Templates</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-5 text-white">Subscribe to updates</h4>
            <p className="text-sm text-zinc-400 mb-4">Stay informed about the latest features and releases from 00.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-mono">
          <p>© 2024 00 Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
              All systems operational
            </span>
            <Link href="/docs" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}