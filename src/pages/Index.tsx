import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ValueProposition from "@/components/landing/ValueProposition";
import MandateGrid from "@/components/landing/MandateGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import Roadmap from "@/components/landing/Roadmap";
import TrustSignals from "@/components/landing/TrustSignals";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import AnimatedBackground from "@/components/landing/AnimatedBackground";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Notivon | Custom Systems for Visa & Travel Agencies</title>
        <meta
          name="description"
          content="Custom-built systems that help visa and travel agencies save time, reduce errors, and process more applications. Document management, expiry tracking, and compliance automation."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://notivon.com" />
      </Helmet>

      <AnimatedBackground />

      <div className="min-h-screen relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ValueProposition />
          <MandateGrid />
          <HowItWorks />
          <Roadmap />
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
