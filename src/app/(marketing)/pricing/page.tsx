import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for teams of all sizes. Start building for free with 00.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | 00",
    description:
      "Simple, transparent pricing for teams of all sizes. Start building for free with 00.",
    url: "https://00.dev/pricing",
  },
  twitter: {
    title: "Pricing | 00",
    description:
      "Simple, transparent pricing for teams of all sizes. Start building for free with 00.",
  },
};

export default function PricingPage() {
  return (
    <>
      <section className="relative py-32 md:py-48 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
            Simple, transparent{" "}
            <span className="text-muted-foreground/50">pricing.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Start building for free. Scale as you grow. No hidden fees, no
            surprises.
          </p>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {/* Free tier */}
            <div className="rounded-2xl border border-border/50 bg-card p-8 flex flex-col">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Starter
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground mb-1">
                $0
              </div>
              <div className="text-sm text-muted-foreground mb-8">
                Free forever
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  5 projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Basic components
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Community support
                </li>
              </ul>
              <button className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5">
                Get Started
              </button>
            </div>

            {/* Pro tier */}
            <div className="rounded-2xl border border-primary/30 bg-card p-8 flex flex-col relative ring-1 ring-primary/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                Popular
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Pro
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground mb-1">
                $20
              </div>
              <div className="text-sm text-muted-foreground mb-8">
                per month
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Unlimited projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  All components
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Git integration
                </li>
              </ul>
              <button className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-colors hover:bg-foreground/90 shadow-lg">
                Start Building
              </button>
            </div>

            {/* Enterprise tier */}
            <div className="rounded-2xl border border-border/50 bg-card p-8 flex flex-col">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Enterprise
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground mb-1">
                Custom
              </div>
              <div className="text-sm text-muted-foreground mb-8">
                Tailored for you
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  SSO & SAML
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  Custom SLA
                </li>
              </ul>
              <button className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
