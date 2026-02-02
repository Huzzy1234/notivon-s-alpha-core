import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="border-t border-border">
      {/* Footer Navigation Bar */}
      <div className="py-6 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
            >
              NOTIVON
            </button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6 sm:gap-8">
              <button
                onClick={scrollToTop}
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("mandate")}
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Services
              </button>
              <Link
                to="/about"
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                About
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Contact
              </button>
            </nav>

            {/* CTA */}
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
            {/* Brand */}
            <div className="sm:col-span-2">
              <span className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground mb-3 sm:mb-4 block">
                NOTIVON
              </span>
              <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
                AI Transformation and Strategic Partner for Search Fund
                entrepreneurs. Building the agentic infrastructure for autonomous
                deal sourcing and acquisition.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
                Services
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="#mandate"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Agentic Origination
                  </a>
                </li>
                <li>
                  <a
                    href="#mandate"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Investor Communication
                  </a>
                </li>
                <li>
                  <a
                    href="#mandate"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    Operational Excellence
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
                Contact
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="mailto:hussain@notivon.com"
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    hussain@notivon.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://calendly.com/hussainhussainakan/10min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    Get Started →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Notivon. All rights reserved.
            </p>
            <div className="flex items-center gap-6 sm:gap-8">
              <a
                href="#"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
