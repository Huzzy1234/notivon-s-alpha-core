import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold tracking-[-0.02em] text-foreground">
              NOTIVON
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
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

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all glow-cyan-hover"
            >
              Request Audit
            </a>
          </div>

          {/* Mobile menu indicator */}
          <div className="md:hidden">
            <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
            <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
            <div className="w-4 h-0.5 bg-foreground"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
