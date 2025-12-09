import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import RevealOnScroll from "../components/RevealOnScroll";
import LogoTicker from "../components/LogoTicker";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Security from "../components/Security";
import Workflow from "../components/Workflow";
import InteractiveAgent from "../components/InteractiveAgent";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-slate-800 selection:bg-orange-100 selection:text-orange-900">
      <Header />
      <main>
        <Hero />
        
        <RevealOnScroll delay={50}>
          <LogoTicker />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <Stats />
        </RevealOnScroll>
        
        <RevealOnScroll id="features">
          <Features />
        </RevealOnScroll>

        <RevealOnScroll id="security">
          <Security />
        </RevealOnScroll>
        
        <RevealOnScroll id="workflow">
          <Workflow />
        </RevealOnScroll>
        
        <RevealOnScroll id="agent">
          <InteractiveAgent />
        </RevealOnScroll>

        {/* <RevealOnScroll> */}
          {/* <Testimonials /> */}
        {/* </RevealOnScroll> */}

        <RevealOnScroll id="faq">
          <FAQ />
        </RevealOnScroll>
        
        <RevealOnScroll>
          <CTA />
        </RevealOnScroll>
      </main>

      <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-sm">© 2025 Aetheria Health Inc. All rights reserved.</div>
           <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
