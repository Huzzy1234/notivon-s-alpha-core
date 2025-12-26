import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import MandateGrid from "@/components/landing/MandateGrid";
import Roadmap from "@/components/landing/Roadmap";
import TrustSignals from "@/components/landing/TrustSignals";
import Footer from "@/components/landing/Footer";
import AnimatedBackground from "@/components/landing/AnimatedBackground";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Notivon | AI Transformation Partner for Search Funds</title>
        <meta
          name="description"
          content="Proprietary deal flow and AI transformation for Search Fund entrepreneurs. Build agentic infrastructure for autonomous deal sourcing and operational excellence."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://notivon.com" />
      </Helmet>

      {/* Unified animated background */}
      <AnimatedBackground />

      <div className="min-h-screen relative z-10">
        <Navbar />
        <main>
          <Hero />
          <MandateGrid />
          <Roadmap />
          <TrustSignals />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
