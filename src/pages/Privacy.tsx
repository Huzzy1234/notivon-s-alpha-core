import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { EMAIL } from "@/lib/constants";
import MarketingNav from "@/marketing/MarketingNav";
import MarketingFooter from "@/marketing/MarketingFooter";

const LAST_UPDATED = "June 21, 2026";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Notivon</title>
        <meta
          name="description"
          content="How Notivon collects, uses, and protects the information you share with us."
        />
      </Helmet>

      <div className="theme-light min-h-screen bg-background flex flex-col font-sans">
        <MarketingNav />

        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 flex-1">
          <div className="container mx-auto max-w-3xl">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="space-y-10">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  Notivon ("we", "us", "our") builds custom systems for businesses. This
                  policy explains what information we collect when you use our website or
                  contact us, how we use it, and the choices you have. We keep this
                  deliberately simple — we only collect what we need to respond to you and
                  improve our work.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Information We Collect
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                  <li>
                    <span className="text-foreground font-medium">Information you give us</span> —
                    your name, email, phone number, and anything you share when you book a
                    call, send a message on WhatsApp, or email us.
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Usage information</span> —
                    basic, anonymous data about how visitors use the site (pages viewed,
                    device type) collected through standard analytics.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                  <li>To respond to your enquiries and schedule discovery calls.</li>
                  <li>To scope, build, and support the systems we agree to deliver.</li>
                  <li>To improve our website and the services we offer.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We do not sell your personal information to anyone.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We only share information with trusted third-party tools we use to run our
                  business — for example, scheduling (Calendly) and messaging (WhatsApp).
                  These providers process your data on our behalf and under their own privacy
                  terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Cookies & Analytics
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our site may use cookies and similar technologies to understand how visitors
                  interact with it. You can disable cookies in your browser settings; the site
                  will still work.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. Data Retention & Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We keep your information only as long as needed to serve you or as required
                  by law, and we take reasonable measures to protect it from loss or misuse.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can ask us to access, correct, or delete the personal information we hold
                  about you at any time. Just reach out using the contact below.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  7. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about this policy? Email us at{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {EMAIL}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <MarketingFooter />
      </div>
    </>
  );
};

export default Privacy;
