import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import MandateGrid from "@/components/landing/MandateGrid";
import Roadmap from "@/components/landing/Roadmap";
import DossierPreview from "@/components/landing/DossierPreview";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Notivon | AI Transformation Partner for Private Equity</title>
        <meta
          name="description"
          content="Proprietary deal flow and AI transformation for mid-market Private Equity firms. Build agentic infrastructure for autonomous origination and operational alpha."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://notivon.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <MandateGrid />
          <Roadmap />
          <DossierPreview />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
