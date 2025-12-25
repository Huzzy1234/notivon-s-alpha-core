import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
              <span className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground">
                NOTIVON
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <button
                onClick={() => scrollToSection("mandate")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("roadmap")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Roadmap
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
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <button
            onClick={() => scrollToSection("mandate")}
            className="text-2xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("roadmap")}
            className="text-2xl font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Roadmap
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
    </>
  );
};

export default Navbar;
