import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { About } from "@/components/sections/About";
import { Founder } from "@/components/sections/Founder";
import { Services } from "@/components/sections/Services";
import { B2B } from "@/components/sections/B2B";
import { Approach } from "@/components/sections/Approach";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Capabilities />
        <About />
        <Founder />
        <Services />
        <B2B />
        <Approach />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
