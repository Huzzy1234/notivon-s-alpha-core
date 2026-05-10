import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProductShowcase from "@/components/landing/ProductShowcase";
import ValueProposition from "@/components/landing/ValueProposition";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustSignals from "@/components/landing/TrustSignals";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import AnimatedBackground from "@/components/landing/AnimatedBackground";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Notivon | Operational Software for Nigerian Trade & Compliance</title>
        <meta
          name="description"
          content="Notivon builds purpose-made operational software for Nigerian trade and compliance businesses. From visa agencies to customs clearing agents — automate your workflow, reduce errors, and scale faster."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://notivon.com" />
      </Helmet>

      <AnimatedBackground />

      <div className="min-h-screen relative z-10">
        <Navbar />
        <main>
          <Hero />
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