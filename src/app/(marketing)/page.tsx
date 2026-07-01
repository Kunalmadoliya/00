import { HeroSection } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Workflow } from "@/components/sections/workflow";
import { CtaSection } from "@/components/sections/cta";
import { UserAvatar, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>

      <HeroSection />
      <TrustedBy />
      <BentoGrid />
      <Workflow />
      <CtaSection />
    </>
  );
}
