import type { Metadata } from "next";
import Link from "next/link";
import { FileCode, BookOpen, Code2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Complete documentation for the 00 AI application builder. Guides, API reference, and examples.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "Documentation | 00",
    description:
      "Complete documentation for the 00 AI application builder. Guides, API reference, and examples.",
    url: "https://00.dev/docs",
  },
  twitter: {
    title: "Documentation | 00",
    description:
      "Complete documentation for the 00 AI application builder. Guides, API reference, and examples.",
  },
};

const docSections = [
  {
    title: "Getting Started",
    description:
      "Learn the fundamentals. Set up your first project and generate your first app in minutes.",
    icon: BookOpen,
    href: "/docs",
  },
  {
    title: "API Reference",
    description:
      "Complete API documentation for programmatic access to the 00 engine.",
    icon: Code2,
    href: "/docs",
  },
  {
    title: "Component Library",
    description:
      "Browse the full library of generated components, patterns, and templates.",
    icon: FileCode,
    href: "/docs",
  },
];

export default function DocsPage() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
            Documentation
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build with 00. From quick-start guides to
            advanced API reference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-2xl border border-border/50 bg-card p-8 flex flex-col transition-colors hover:border-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/50 bg-background shadow-sm text-foreground mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Read more{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
