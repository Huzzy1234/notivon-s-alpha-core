import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={scrollToTop}
                className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
              >
                NOTIVON
              </button>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <button
                onClick={scrollToTop}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Home
              </button>
              
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* Dropdown Menu */}
                <div
                  onMouseLeave={() => setServicesOpen(false)}
                  className={`absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                    servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <button
                    onClick={() => scrollToSection("mandate")}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Mandate Grid
                  </button>
                  <button
                    onClick={() => scrollToSection("roadmap")}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Implementation Roadmap
                  </button>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("dossier")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Case Studies
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Contact
              </button>
            </div>

            {/* CTA - Desktop */}
            <div className="hidden md:block">
              <a
                href="https://calendly.com/hussainhussainakan/10min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 lg:px-6 py-2.5 lg:py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all glow-cyan-hover"
              >
                Request Audit
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-md transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          <button
            onClick={scrollToTop}
            className="text-2xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Home
          </button>
          
          {/* Mobile Services Accordion */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-2 text-2xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              Services
              <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`flex flex-col items-center gap-3 overflow-hidden transition-all duration-300 ${
                servicesOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <button
                onClick={() => scrollToSection("mandate")}
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                Mandate Grid
              </button>
              <button
                onClick={() => scrollToSection("roadmap")}
                className="text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                Implementation Roadmap
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("dossier")}
            className="text-2xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Case Studies
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-2xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Contact
          </button>
          <a
            href="https://calendly.com/hussainhussainakan/10min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all glow-cyan"
          >
            Request Audit
          </a>
        </div>
      </div>

      {/* Sticky CTA Button - appears after scrolling */}
      <a
        href="https://calendly.com/hussainhussainakan/10min"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all duration-300 glow-cyan ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        Book a Maturity Audit
      </a>
    </>
  );
};

export default Navbar;
