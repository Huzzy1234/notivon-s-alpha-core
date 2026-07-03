import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScorecardFlow from "@/components/scorecard/ScorecardFlow";

const Scorecard = () => (
  <>
    <Helmet>
      <title>Free AI Readiness Scorecard | Notivon</title>
      <meta
        name="description"
        content="Answer 8 quick questions about your business and get an instant, honest read on where AI and automation would actually help you — and where they wouldn't. Free, 2 minutes, no call."
      />
      <link rel="canonical" href="https://notivon.com/scorecard" />
    </Helmet>

    <div className="min-h-screen relative grain">
      <Navbar />
      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <header className="max-w-2xl mx-auto mb-12">
            <p className="tech-label mb-4">Free · 2 minutes · instant result</p>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              How ready is your business for AI?
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Eight questions about how your business actually runs. You'll get a
              readiness score and an honest read on where automation pays off for
              you — and where it doesn't.
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
