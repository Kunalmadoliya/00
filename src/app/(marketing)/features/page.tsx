import type { Metadata } from "next";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Workflow } from "@/components/sections/workflow";
import { CtaSection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Features",
  description:
    "AI-powered architecture, instant deployments, responsive components, and native Git integration. See what 00 can do.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Features | 00",
    description:
      "AI-powered architecture, instant deployments, responsive components, and native Git integration. See what 00 can do.",
    url: "https://00.dev/features",
  },
  twitter: {
    title: "Features | 00",
    description:
      "AI-powered architecture, instant deployments, responsive components, and native Git integration. See what 00 can do.",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <BentoGrid />
      <Workflow />
      <CtaSection />
    </>
  );
}
