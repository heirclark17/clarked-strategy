import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <TrustBar />
        <Stats />
        <Services />
        <Work />
        <Process />
        <About />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
