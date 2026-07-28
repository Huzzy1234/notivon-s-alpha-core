import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { EMAIL } from "@/lib/constants";
import MarketingNav from "@/marketing/MarketingNav";
import MarketingFooter from "@/marketing/MarketingFooter";

const LAST_UPDATED = "June 21, 2026";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Notivon</title>
        <meta
          name="description"
          content="The terms that govern your use of the Notivon website and services."
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
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="space-y-10">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  These terms govern your use of the Notivon website and any services we
                  provide. By using this site or engaging us, you agree to them. The specific
                  scope, deliverables, timelines, and pricing of any build are set out
                  separately in a written proposal or agreement.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Our Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notivon designs and builds custom systems for businesses. Anything shown on
                  this website — including past builds and demos — is illustrative. The actual
                  work we do for you is defined in the proposal we agree on together.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. Proposals & Payment
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Each engagement is scoped in a written proposal that states deliverables,
                  timelines, and fees. Payment terms are agreed in that proposal before work
                  begins.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ownership of the systems we build for you transfers as set out in your
                  agreement. Notivon retains rights to its own underlying tools, methods, and
                  reusable components.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Acceptable Use
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to use this website or any system we provide for unlawful
                  purposes or in any way that could damage, disable, or impair it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. Disclaimer & Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website is provided "as is." To the fullest extent permitted by law,
                  Notivon is not liable for any indirect or consequential loss arising from
                  your use of the site. Nothing here limits liability that cannot be limited
                  under applicable law.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Changes
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update these terms from time to time. The "last updated" date above
                  reflects the most recent version.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  7. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about these terms? Email us at{" "}
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

export default Terms;
