import { HeroSection } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Workflow } from "@/components/sections/workflow";
import { CtaSection } from "@/components/sections/cta";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  
  if (user) {
    const username = user.username || user.fullName?.toLowerCase().replace(/\s+/g, '-') || user.id;
    redirect(`/${username}`);
  }

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
