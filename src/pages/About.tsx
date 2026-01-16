import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Users, Target, Zap, Shield } from "lucide-react";
import hussainImage from "@/assets/hussain-founder.jpeg";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Hussain | Notivon - Search Fund Deal Sourcing</title>
        <meta
          name="description"
          content="Meet Hussain, founder of Notivon. Learn why he built an AI-powered deal sourcing system specifically for search fund entrepreneurs."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Back to Home</span>
              </Link>
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
              >
                NOTIVON
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative order-1 lg:order-1">
                <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                  <img
                    src={hussainImage}
                    alt="Hussain - Founder of Notivon"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 border border-primary/20" />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/40 -z-10" />
                </div>
              </div>

              {/* Intro */}
              <div className="order-2 lg:order-2">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                  Founder & CEO
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                  I'm Hussain
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  I built Notivon to solve one of the most painful parts of acquiring a small business: 
                  <span className="text-foreground font-medium"> finding quality deals.</span>
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hussain@notivon.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hussain@notivon.com</span>
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>Nigeria → North America</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 border-t border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              The Problem I Saw
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                If you're a search fund entrepreneur, you know the struggle. You spend months—sometimes 
                years—cold-calling business owners, scraping broker listings, and chasing leads that go 
                nowhere. It's exhausting, time-consuming, and takes you away from what actually matters: 
                <span className="text-foreground"> evaluating businesses and building relationships with sellers.</span>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I saw this problem clearly and thought: what if there was a system that did the heavy 
                lifting for you?
              </p>
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              My Background
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I've spent the past few years working in the online automation space—copywriting, 
                appointment setting, and building AI-powered systems for clients across the US, 
                Australia, and Dubai. I've helped businesses automate outreach, qualify leads, and 
                streamline operations.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In 2025, I started building Notivon. Originally, I was exploring solutions for private 
                equity firms, but I quickly realized search funds had a much clearer problem: they need 
                consistent, high-quality deal flow, but most are solo operators without the resources 
                to build in-house sourcing teams.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes This Different */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 border-t border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              What Makes This Different
            </h2>
            <div className="prose prose-lg prose-invert max-w-none mb-12">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most deal sourcing is reactive—you respond to broker listings, chase referrals, or 
                cold-call from directories. <span className="text-primary font-semibold">Notivon is proactive.</span> The 
                system monitors thousands of small businesses in your target geography and industry, 
                flags companies showing succession signals (owner retirement age, family transitions, 
                health issues), and reaches out on your behalf.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border border-border bg-background">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Proactive Monitoring</h3>
                <p className="text-muted-foreground">
                  We track succession signals across thousands of businesses in your target market.
                </p>
              </div>
              <div className="p-6 border border-border bg-background">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Warm Leads Only</h3>
                <p className="text-muted-foreground">
                  You get leads from owners who've already responded positively and want to talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why I Do This */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 bg-muted/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              Why I Do This
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Honestly? <span className="text-foreground font-medium">I want to win.</span> I'm based 
                in Nigeria, and I know I'm not the typical profile you'd expect for someone in this 
                space. But that's exactly why I'm hungry. I've spent years building skills, working 
                with international clients, and proving I can deliver results regardless of where I'm 
                located.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I also genuinely believe in what search funds are trying to do. You're not just buying 
                businesses to flip them—you're committing years of your life to grow and lead them. 
                That takes guts, and if I can help you find the right business faster, that's a win 
                for both of us.
              </p>
            </div>
          </div>
        </section>

        {/* How I Work */}
        <section className="py-16 px-4 sm:px-6 lg:px-12 border-t border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              How I Work
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 border border-border bg-background">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Max 10 Clients</h3>
                <p className="text-muted-foreground">
                  I keep my roster intentionally small so I can deliver high-touch, customized service.
                </p>
              </div>
              <div className="p-6 border border-border bg-background">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Direct Access</h3>
                <p className="text-muted-foreground">
                  You work directly with me. No junior associates, no handoffs. I'm accountable for results.
                </p>
              </div>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                If you're tired of cold outreach and want a system that continuously finds deals while 
                you focus on what you do best—evaluating and closing—let's talk.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-primary/5 border-t border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Deal Flow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how Notivon can help you find acquisition targets while you focus on 
              evaluation and closing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/hussainhussainakan/10min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all"
              >
                Schedule a Call
              </a>
              <a
                href="mailto:hussain@notivon.com"
                className="px-8 py-4 border border-primary text-primary text-lg font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all"
              >
                Email Me
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-12 border-t border-border">
          <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Notivon. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Based in Nigeria | Working with searchers across North America
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
