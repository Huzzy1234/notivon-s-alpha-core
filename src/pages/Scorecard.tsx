import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScorecardFlow from "@/components/scorecard/ScorecardFlow";

const Scorecard = () => (
  <>
    <Helmet>
      <title>Free AI Opportunity Map — 3 specific ideas for your business | Notivon</title>
      <meta
        name="description"
        content="Answer a few questions, describe your business in your own words, and get an AI Opportunity Map written for you on the spot: three specific automation ideas, one honest 'don't automate this', and what waiting is costing you. Free, no call."
      />
      <link rel="canonical" href="https://notivon.com/scorecard" />
    </Helmet>

    <div className="min-h-screen relative grain">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <header className="max-w-2xl mx-auto mb-12">
            <p className="tech-label mb-4">Free · 3 minutes · written for your business</p>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Get your AI Opportunity Map.
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Answer a few questions, then describe your business in your own
              words. You'll get a readiness score — and a map written for you on
              the spot: three specific ideas worth money, one honest
              "don't automate this yet", and what waiting is costing you.
            </p>
          </header>
          <ScorecardFlow />
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default Scorecard;
