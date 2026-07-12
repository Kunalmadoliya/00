import { HeroSection } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Workflow } from "@/components/sections/workflow";
import { CtaSection } from "@/components/sections/cta";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";


export default function Home() {
  return (
    <>
       <Navbar/>
      <HeroSection />
      <TrustedBy />
      <BentoGrid />
      <Workflow />
      <CtaSection />
      <Footer/>
    </>
  );
}
