import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setServicesOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
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
          <div className="flex items-center justify-between h-14 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={scrollToTop}
                className="text-lg sm:text-2xl font-bold tracking-[-0.02em] text-foreground hover:text-primary transition-colors"
              >
                NOTIVON
              </button>
            </div>

            {/* Navigation Links - Visible on all screens */}
            <div className="flex items-center gap-3 sm:gap-6 lg:gap-12">
              <button
                onClick={scrollToTop}
                className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Home
              </button>
              
              {/* Services Dropdown - Desktop only */}
              <div className="hidden md:block relative">
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

              {/* Mobile-visible links */}
              <button
                onClick={() => scrollToSection("mandate")}
                className="md:hidden text-[11px] sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Services
              </button>

              <Link
                to="/about"
                className="text-[11px] sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                About
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[11px] sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Contact
              </button>
            </div>

            {/* CTA */}
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-primary text-primary-foreground text-[10px] sm:text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all glow-cyan-hover"
            >
              <span className="hidden sm:inline">Request Audit</span>
              <span className="sm:hidden">Audit</span>
            </a>
          </div>
        </div>
      </nav>


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
