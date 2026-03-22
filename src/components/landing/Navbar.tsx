import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
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
            <button
              onClick={scrollToTop}
              className="text-lg sm:text-2xl font-bold tracking-[-0.02em] text-foreground hover:text-primary transition-colors flex-shrink-0"
            >
              NOTIVON
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-6 lg:gap-12 mr-6 lg:mr-10">
                <button onClick={scrollToTop} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                  Home
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <div
                    onMouseLeave={() => setServicesOpen(false)}
                    className={`absolute top-full left-0 mt-2 w-52 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                      servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Document Management
                    </button>
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Expiry Tracking
                    </button>
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Client Portals
                    </button>
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Application Tracking
                    </button>
                  </div>
                </div>

                <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                  About
                </Link>
                <button onClick={() => scrollToSection("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                  Contact
                </button>
              </div>

              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 lg:px-6 py-2.5 lg:py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all glow-cyan-hover inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all inline-flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3" />
                WhatsApp
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-80 border-b border-border" : "max-h-0"
          } ${scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background/90 backdrop-blur-sm"}`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <button onClick={scrollToTop} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider py-2">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider py-2">
              Services
            </button>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider py-2">
              About
            </Link>
            <button onClick={() => scrollToSection("contact")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider py-2">
              Contact
            </button>
            <a href="tel:09014390149" className="text-left text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2 inline-flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              09014390149
            </a>
          </div>
        </div>
      </nav>

      {/* Sticky WhatsApp CTA */}
      <a
        href="https://wa.me/2349014390149"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider shadow-lg hover:bg-primary/90 transition-all duration-300 glow-cyan inline-flex items-center gap-2 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Phone className="w-4 h-4" />
        WhatsApp Us
      </a>
    </>
  );
};

export default Navbar;