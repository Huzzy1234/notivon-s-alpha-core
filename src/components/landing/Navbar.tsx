import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Phone, Calendar } from "lucide-react";

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
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground flex items-center gap-1 group"
            >
              Notivon
            </Link>

            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-8 mr-8">
                <button onClick={scrollToTop} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </button>
                
                <div className="relative group">
                  <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-1 group">
                    Services
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6"/></svg>
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-2 overflow-hidden flex flex-col gap-1">
                      <Link to="/services#document-management" className="text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                        Document Management
                      </Link>
                      <Link to="/services#expiry-tracking" className="text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center text-accent"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4"/><path d="m21 15-1.51-1.51a3.5 3.5 0 0 0-4.95 0L13.04 15"/><path d="M22 21H2"/><path d="M12 21V6"/><path d="M10 6h4"/><path d="M4 15v6"/><path d="M20 15v6"/></svg></div>
                        Expiry Tracking
                      </Link>
                      <Link to="/services#whatsapp-automation" className="text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg></div>
                        WhatsApp Automation
                      </Link>
                    </div>
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
                href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-lg hover:border-primary/50 hover:text-primary transition-all inline-flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Demo
              </a>
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
