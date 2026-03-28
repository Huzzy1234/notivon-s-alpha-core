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
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <button
              onClick={scrollToTop}
              className="text-xl sm:text-2xl font-display text-foreground hover:text-primary transition-colors"
            >
              Notivon
            </button>

            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-8 mr-8">
                <button onClick={scrollToTop} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <div
                    onMouseLeave={() => setServicesOpen(false)}
                    className={`absolute top-full left-0 mt-2 w-52 bg-card border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                      servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Document Management
                    </button>
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Expiry Tracking
                    </button>
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Client Portals
                    </button>
                    <button onClick={() => scrollToSection("services")} className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                      Application Tracking
                    </button>
                  </div>
                </div>

                <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <button onClick={() => scrollToSection("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </button>
              </div>

              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <a
                href="https://wa.me/2349014390149"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-1.5"
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

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-card/95 backdrop-blur-md ${
            mobileMenuOpen ? "max-h-80 border-b border-border" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <button onClick={scrollToTop} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              Services
            </button>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              About
            </Link>
            <button onClick={() => scrollToSection("contact")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              Contact
            </button>
            <a href="tel:09014390149" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-3 inline-flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              09014390149
            </a>
          </div>
        </div>
      </nav>

      {/* Sticky WhatsApp button */}
      <a
        href="https://wa.me/2349014390149"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 ${
          scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <Phone className="w-5 h-5" />
      </a>
    </>
  );
};

export default Navbar;
