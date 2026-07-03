import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Shield, Ship, Compass, ArrowRight } from "lucide-react";
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from "@/lib/constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link
              to="/"
              onClick={scrollToTop}
              className="font-display font-semibold text-2xl tracking-tight text-foreground"
            >
              Notivon
            </Link>

            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-8 mr-8">
                <Link
                  to="/audit"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Readiness Audit
                </Link>

                {/* Products Dropdown */}
                <div className="relative group">
                  <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-1">
                    What we build
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6"/></svg>
                  </button>

                  <div className="absolute top-full left-0 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                    <div className="bg-card border border-border rounded-lg shadow-xl p-2 overflow-hidden flex flex-col gap-1">
                      <Link to="/products/visaguard" className="hover:bg-muted/60 px-4 py-3 rounded-md transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-primary">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">VisaGuard</p>
                          <p className="text-xs text-muted-foreground">For Visa & Travel Agencies</p>
                        </div>
                      </Link>
                      <Link to="/products/clearvoy" className="hover:bg-muted/60 px-4 py-3 rounded-md transition-colors text-left flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-emerald-500">
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

              <Link
                to="/scorecard"
                className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Free Scorecard
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <Link
                to="/scorecard"
                className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:bg-primary/90 transition-colors"
              >
                Free Scorecard
              </Link>
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
            mobileMenuOpen ? "max-h-[28rem] border-b border-border" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link to="/audit" onClick={() => setMobileMenuOpen(false)} className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-3 flex items-center gap-3">
              <Compass className="w-4 h-4 text-primary" />
              AI Readiness Audit
            </Link>

            <p className="tech-label pt-3 pb-1">What we build</p>
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
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-card border border-border text-primary rounded-full shadow-lg flex items-center justify-center hover:border-primary/50 transition-all duration-300 ${
          scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <Phone className="w-5 h-5" />
      </a>
    </>
  );
};

export default Navbar;
