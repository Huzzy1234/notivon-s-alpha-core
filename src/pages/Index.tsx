import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TwoPaths from "@/components/sections/TwoPaths";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ValueProposition from "@/components/sections/ValueProposition";
import HowItWorks from "@/components/sections/HowItWorks";
import TrustSignals from "@/components/sections/TrustSignals";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Notivon | We tell you where AI actually pays off — then build it</title>
        <meta
          name="description"
          content="Notivon is consulting + building, together. The AI Readiness Audit tells you honestly where AI and automation help your business — and where they don't. Then we build the systems that deliver it."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://notivon.com" />
      </Helmet>

      <div className="min-h-screen relative grain">
        <Navbar />
        <main>
          <Hero />
          <TwoPaths />
          <ProductShowcase />
          <WhatWeBuild />
          <ValueProposition />
          <HowItWorks />
          <TrustSignals />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
