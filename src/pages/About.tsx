import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Users, Zap } from "lucide-react";
import hussainImage from "@/assets/hussain-founder.jpeg";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Hussain | Notivon - Systems for Visa Agencies</title>
        <meta
          name="description"
          content="Meet Hussain, founder of Notivon. Learn why he's building custom systems to help visa and travel agencies save time, reduce errors, and scale."
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
              <div className="relative order-1 lg:order-1">
                <div className="relative aspect-[3/4] w-64 sm:w-72 mx-auto lg:mx-0">
                  <img
                    src={hussainImage}
                    alt="Hussain - Founder of Notivon"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 border border-primary/20" />
                  <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary/40 -z-10" />
                </div>
              </div>

              <div className="order-2 lg:order-2">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                  Founder
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                  I'm Hussain
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  I built Notivon to solve a problem I kept seeing in the visa industry: 
                  <span className="text-foreground font-medium"> agencies losing time and money to preventable process failures.</span>
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
                    <span>Nigeria → Global</span>
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
                If you run a visa agency, you know the pain. Chasing clients for missing documents, 
                realizing a passport expired two weeks before submission, reformatting photos that 
                don't meet embassy requirements, manually tracking dozens of applications at different stages. 
                <span className="text-foreground"> It's exhausting, error-prone, and it costs you money.</span>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I saw agencies doing incredible work but held back by manual processes that should 
                have been automated years ago. That's where Notivon comes in.
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
                I've spent years in the automation space — building systems, workflows, and 
                AI-powered tools for businesses across the US, Australia, and Dubai. From 
                automated outreach to lead qualification to operations management, I've helped 
                companies eliminate manual bottlenecks and scale without adding headcount.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In 2025, I turned my focus to the visa and travel industry. I realized these 
                agencies had clear, solvable problems — document chaos, expiry tracking failures, 
                compliance errors — but no one was building purpose-made systems for them. So I did.
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
                Most agencies try to use generic CRMs or spreadsheets to manage visa applications. 
                <span className="text-primary font-semibold"> Notivon builds systems designed specifically for how visa agencies actually work.</span> From 
                visa-type-specific document checklists to automatic expiry alerts to client self-service 
                portals — everything is built around your real workflow, not forced into a template.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 border border-border bg-background">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Direct Access</h3>
                <p className="text-muted-foreground">
                  You work directly with me. No junior associates, no handoffs. I'm accountable for results.
                </p>
              </div>
              <div className="p-6 border border-border bg-background">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Most agencies are live within 2–4 weeks. You start seeing results immediately.
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
                in Nigeria, and I know I'm not the typical profile you'd expect. But that's exactly 
                why I'm hungry. I've spent years building skills, working with international clients, 
                and proving I can deliver results regardless of where I'm located.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I believe visa agencies do essential work — helping people travel, reunite with family, 
                start new careers abroad. If I can help you process applications faster and with fewer 
                errors, that's a win for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-primary/5 border-t border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Streamline Your Agency?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how a custom system can save your team hours every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all"
              >
                WhatsApp Us
              </a>
              <a
                href="tel:09014390149"
                className="px-8 py-4 border border-primary text-primary text-lg font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all"
              >
                Call Us
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
              Based in Nigeria | Serving agencies worldwide
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
