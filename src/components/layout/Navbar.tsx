import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Phone, Calendar, Shield, Ship } from "lucide-react";
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from "@/lib/constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
                <Link to="/" onClick={scrollToTop} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                
                {/* Products Dropdown */}
                <div className="relative group">
                  <button className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-1 group">
                    Products
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  
                  <div className="absolute top-full left-0 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-2 overflow-hidden flex flex-col gap-1">
                      <Link to="/products/visaguard" className="text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">VisaGuard</p>
                          <p className="text-xs text-muted-foreground">For Visa & Travel Agencies</p>
                        </div>
                      </Link>
                      <Link to="/products/clearvoy" className="text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-3 rounded-lg transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                          <Ship className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">ClearVoy</p>
                          <p className="text-xs text-muted-foreground">For Customs Clearing Agents</p>
                        </div>
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
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
            mobileMenuOpen ? "max-h-96 border-b border-border" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              Home
            </Link>
            
            {/* Mobile Products */}
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pt-3 pb-1">Products</p>
            <Link to="/products/visaguard" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 pl-4 flex items-center gap-3">
              <Shield className="w-4 h-4 text-primary" />
              VisaGuard
            </Link>
            <Link to="/products/clearvoy" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3 pl-4 flex items-center gap-3">
              <Ship className="w-4 h-4 text-emerald-500" />
              ClearVoy
            </Link>

            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              About
            </Link>
            <button onClick={() => scrollToSection("contact")} className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3">
              Contact
            </button>
            <a href={`tel:${PHONE_PRIMARY}`} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-3 inline-flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              {PHONE_PRIMARY}
            </a>
          </div>
        </div>
      </nav>

      {/* Sticky WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
