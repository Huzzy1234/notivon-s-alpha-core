import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, MapPin, Users, Zap } from "lucide-react";
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_NUMBER, EMAIL } from "@/lib/constants";
import hussainImage from "@/assets/hussain-founder.jpeg";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Hussain | Notivon — Custom Systems Builder</title>
        <meta
          name="description"
          content="Meet Hussain, founder of Notivon. He finds what's actually costing a business money or time, then builds the custom system that fixes it."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 flex-1">
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
                  I built Notivon around one idea: find what's actually costing a business money or time —
                  <span className="text-foreground font-medium"> then build the custom system that fixes it.</span>
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{EMAIL}</span>
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
                A visa agency chasing clients for documents and catching an expired passport two weeks
                before submission. A clearing agent tracking shipments across WhatsApp groups and losing
                hours to paperwork. A sales team copy-pasting leads between spreadsheets.
                <span className="text-foreground"> Different industries, same pattern: manual processes, costly errors, and wasted time.</span>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I kept seeing businesses doing incredible work but held back by tools that weren't built
                for them. Generic CRMs, spreadsheets, and WhatsApp groups patched together — none of it
                designed for how they actually operate. That's where Notivon comes in.
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
                AI-powered tools for businesses across the US, Australia, Dubai, and Nigeria. From
                automated outreach (Saydieko) to deal-sourcing engines (Dealflow) to operations
                management, I've helped companies eliminate manual bottlenecks and scale without adding headcount.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In 2025, I launched Notivon with a focus on Nigerian trade and compliance businesses —
                visa agencies and customs clearing agents. VisaGuard and ClearVoy are the first systems
                built under that banner. But the mandate is broader: any business where the right custom
                system would change how they operate.
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
                Most businesses try to force generic CRMs or spreadsheets onto workflows they were never built for.
                <span className="text-primary font-semibold"> Notivon builds systems designed specifically for how your business actually works.</span> From
                document checklists to shipment tracking to lead-gen and outreach engines — everything is built
                around your real workflow, not forced into a template.
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
                  Most businesses are live within 2–4 weeks. You start seeing results immediately.
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
                Most businesses are doing great work but held back by tools that weren't built for them —
                generic CRMs, spreadsheets, WhatsApp groups patched together. None of it was designed
                for how they actually operate.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <span className="text-foreground font-medium">My mission is simple:</span> find the real
                bottleneck in how you work, scope only what solves it, and build a system that makes
                your team faster and your business more profitable.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-12 bg-primary/5 border-t border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Streamline Your Operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how a custom system can save your team hours every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="px-8 py-4 border border-primary text-primary text-lg font-semibold uppercase tracking-wider hover:bg-primary/10 transition-all"
              >
                {PHONE_PRIMARY}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
