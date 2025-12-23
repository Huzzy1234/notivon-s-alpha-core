const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-20 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="text-2xl font-bold tracking-[-0.02em] text-foreground mb-4 block">
              NOTIVON
            </span>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              AI Transformation and Strategic Partner for mid-market Private
              Equity firms. Building the agentic infrastructure for autonomous
              deal origination.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#mandate"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Agentic Origination
                </a>
              </li>
              <li>
                <a
                  href="#mandate"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  LP Management
                </a>
              </li>
              <li>
                <a
                  href="#mandate"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Operational Alpha
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@notivon.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@notivon.com
                </a>
              </li>
              <li>
                <a
                  href="#audit"
                  className="text-primary hover:text-primary/80 transition-colors font-semibold"
                >
                  Request AI Maturity Audit →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Notivon. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
