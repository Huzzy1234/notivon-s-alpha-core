import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ValueProposition from "@/components/sections/ValueProposition";
import HowItWorks from "@/components/sections/HowItWorks";
import TrustSignals from "@/components/sections/TrustSignals";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/sections/AnimatedBackground";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Notivon | Custom Systems That Fix What's Costing Your Business</title>
        <meta
          name="description"
          content="Notivon builds custom operational systems around how your business actually works. Not off-the-shelf software. Not a template. We find the real bottleneck — then build only what solves it."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://notivon.com" />
      </Helmet>

      <AnimatedBackground />

      <div className="min-h-screen relative z-10">
        <Navbar />
        <main>
          <Hero />
          <WhatWeBuild />
          <ProductShowcase />
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