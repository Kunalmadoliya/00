"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-background/60 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Command className="h-4 w-4" />
            </div>
            <span className="font-bold tracking-tight text-lg">00</span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? "text-foreground font-semibold"
                    : "hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="group hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground cursor-text">
              <Search className="h-3.5 w-3.5" />
              <span>Search documentation...</span>
              <kbd className="ml-2 rounded-md bg-white/10 px-1.5 py-0.5 font-sans text-[10px]">
                ⌘K
              </kbd>
            </div>
            <div className="w-[1px] h-4 bg-white/10 mx-1 hidden lg:block" />
            {user ? (
              <Link
                href={`/${user.username || user.fullName?.toLowerCase().replace(/\s+/g, '-') || user.id}`}
                className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Workspace
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Start Building
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                    <Command className="h-4 w-4" />
                  </div>
                  <span className="font-bold tracking-tight text-lg">00</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6 text-2xl font-semibold mb-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                <Link
                  href="/sign-in"
                  className="w-full rounded-xl border border-white/10 px-4 py-4 text-center text-lg font-medium transition-colors hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full rounded-xl bg-foreground px-4 py-4 text-center text-lg font-semibold text-background shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Building
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
