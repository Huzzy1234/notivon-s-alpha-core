import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Shield, Ship, Compass, ArrowRight, MessageCircle } from "lucide-react";
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from "@/lib/constants";
import { PAGE, INK, MUT, LINE, ACCENT, ACCENT_DEEP, CARD, SERIF } from "./theme";

/* Marketing navigation — light language.
   Preserves the funnel-critical bits from the old Navbar: the products
   dropdown, mobile menu, the "Free Opportunity Map" CTA and the sticky
   WhatsApp button. Transparent at the top, frosted white once scrolled. */

const MarketingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goSection = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(246,247,249,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${LINE}` : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-[70px]">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ fontFamily: SERIF, color: INK }}
              className="text-xl sm:text-2xl font-medium tracking-[-0.01em]"
            >
              Notivon
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/audit" className="text-[13px] uppercase tracking-[0.12em] transition-colors hover:text-[#0B1220]" style={{ color: MUT }}>
                The Audit
              </Link>

              <div className="relative group">
                <button className="text-[13px] uppercase tracking-[0.12em] py-2 flex items-center gap-1 transition-colors hover:text-[#0B1220]" style={{ color: MUT }}>
                  What we build
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <div className="absolute top-full left-0 w-72 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top -translate-y-2 group-hover:translate-y-0">
                  <div className="rounded-xl p-2 flex flex-col gap-1" style={{ background: CARD, border: `1px solid ${LINE}`, boxShadow: "0 24px 60px -30px rgba(11,18,32,0.4)" }}>
                    <Link to="/products/visaguard" className="px-4 py-3 rounded-lg transition-colors hover:bg-[#0B1220]/[0.04] flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(46,107,255,0.10)", color: ACCENT_DEEP }}><Shield className="w-4 h-4" /></span>
                      <span>
                        <span className="block font-semibold text-[14px]" style={{ color: INK }}>VisaGuard</span>
                        <span className="block text-[12px]" style={{ color: MUT }}>For Visa &amp; Travel Agencies</span>
                      </span>
                    </Link>
                    <Link to="/products/clearvoy" className="px-4 py-3 rounded-lg transition-colors hover:bg-[#0B1220]/[0.04] flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(46,107,255,0.10)", color: ACCENT_DEEP }}><Ship className="w-4 h-4" /></span>
                      <span>
                        <span className="block font-semibold text-[14px]" style={{ color: INK }}>ClearVoy</span>
                        <span className="block text-[12px]" style={{ color: MUT }}>For Customs Clearing Agents</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/about" className="text-[13px] uppercase tracking-[0.12em] transition-colors hover:text-[#0B1220]" style={{ color: MUT }}>
                About
              </Link>
              <button onClick={() => goSection("contact")} className="text-[13px] uppercase tracking-[0.12em] transition-colors hover:text-[#0B1220]" style={{ color: MUT }}>
                Contact
              </button>

              <Link
                to="/scorecard"
                className="inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full transition-transform hover:-translate-y-0.5"
                style={{ background: ACCENT, color: "#FFFFFF" }}
              >
                Free Opportunity Map
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2.5">
              <Link to="/scorecard" className="px-3.5 py-2 text-[12px] font-semibold rounded-full" style={{ background: ACCENT, color: "#FFFFFF" }}>
                Free Map
              </Link>
              <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2" style={{ color: INK }}>
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "30rem" : "0",
            background: "rgba(246,247,249,0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: open ? `1px solid ${LINE}` : "none",
          }}
        >
          <div className="mx-auto max-w-[1200px] px-5 py-4 flex flex-col">
            <Link to="/audit" onClick={() => setOpen(false)} className="py-3 flex items-center gap-3 text-[15px] font-medium" style={{ color: INK }}>
              <Compass className="w-4 h-4" style={{ color: ACCENT_DEEP }} /> The AI Readiness Audit
            </Link>
            <p className="uppercase tracking-[0.16em] text-[11px] pt-3 pb-1" style={{ color: MUT }}>What we build</p>
            <Link to="/products/visaguard" onClick={() => setOpen(false)} className="py-3 pl-4 flex items-center gap-3 text-[15px]" style={{ color: MUT }}>
              <Shield className="w-4 h-4" style={{ color: ACCENT_DEEP }} /> VisaGuard
            </Link>
            <Link to="/products/clearvoy" onClick={() => setOpen(false)} className="py-3 pl-4 flex items-center gap-3 text-[15px]" style={{ color: MUT }}>
              <Ship className="w-4 h-4" style={{ color: ACCENT_DEEP }} /> ClearVoy
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-3 text-[15px] font-medium" style={{ color: INK }}>About</Link>
            <button onClick={() => goSection("contact")} className="py-3 text-left text-[15px] font-medium" style={{ color: INK }}>Contact</button>
            <a href={`tel:${PHONE_PRIMARY}`} className="py-3 flex items-center gap-2 text-[15px] font-medium" style={{ color: ACCENT_DEEP }}>
              <Phone className="w-3.5 h-3.5" /> {PHONE_PRIMARY}
            </a>
          </div>
        </div>
      </nav>

      {/* Sticky WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          scrolled ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        style={{ background: ACCENT, color: "#FFFFFF", boxShadow: "0 12px 30px -8px rgba(46,107,255,0.5)" }}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
};

export default MarketingNav;
