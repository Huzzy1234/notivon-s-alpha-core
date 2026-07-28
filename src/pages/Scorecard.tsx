import { Helmet } from "react-helmet-async";
import ScorecardFlow from "@/components/scorecard/ScorecardFlow";
import { PAGE, INK, MUT, SERIF, ACCENT } from "@/marketing/theme";
import { Shell, Kicker } from "@/marketing/primitives";
import MarketingNav from "@/marketing/MarketingNav";
import MarketingFooter from "@/marketing/MarketingFooter";

/* The ScorecardFlow component is entirely token-driven, so wrapping the
   funnel in `.theme-light` re-themes it to the light palette with no
   changes to its logic or markup — the live funnel is untouched. */

const Scorecard = () => (
  <div className="theme-light" style={{ background: PAGE, color: INK, fontFamily: "'Instrument Sans', sans-serif" }}>
    <Helmet>
      <title>Free AI Opportunity Map — 3 specific ideas for your business | Notivon</title>
      <meta
        name="description"
        content="Answer a few questions, describe your business in your own words, and get an AI Opportunity Map written for you on the spot: three specific automation ideas, one honest 'don't automate this', and what waiting is costing you. Free, no call."
      />
      <link rel="canonical" href="https://notivon.com/scorecard" />
    </Helmet>

    <div className="min-h-screen antialiased overflow-x-hidden selection:bg-[#2E6BFF] selection:text-white">
      <MarketingNav />
      <main className="pt-28 sm:pt-32 pb-24">
        <Shell>
          <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
            <Kicker>Free · 3 minutes · written for your business</Kicker>
            <h1 style={{ fontFamily: SERIF, lineHeight: 1.05 }} className="font-medium tracking-[-0.02em] text-[clamp(2rem,5.5vw,3.4rem)] mt-4 mb-4">
              Get your AI <span style={{ fontStyle: "italic", color: ACCENT }}>Opportunity Map.</span>
            </h1>
            <p className="text-[16px] sm:text-[17px] leading-[1.6]" style={{ color: MUT }}>
              Answer a few questions, then describe your business in your own words. You'll get a
              readiness score — and a map written for you on the spot: three specific ideas worth money,
              one honest "don't automate this yet", and what waiting is costing you.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ScorecardFlow />
          </div>
        </Shell>
      </main>
      <MarketingFooter />
    </div>
  </div>
);

export default Scorecard;
