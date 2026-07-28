import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_NUMBER, EMAIL } from "@/lib/constants";
import { DARK, DARK_FG, DARK_MUT, DARK_LINE, SERIF, MONO } from "./theme";
import { Shell, Rule } from "./primitives";

/* Marketing footer — the dark navy base that grounds every page. */

const col = (title: string, links: { label: string; to: string }[]) => (
  <div>
    <p className="uppercase tracking-[0.16em] text-[11px] mb-4" style={{ color: DARK_MUT, fontFamily: MONO }}>{title}</p>
    <ul className="space-y-2.5 text-[14px]">
      {links.map((l) => (
        <li key={l.label}>
          <Link to={l.to} className="transition-colors hover:text-white" style={{ color: DARK_FG }}>{l.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const MarketingFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: DARK, color: DARK_FG }}>
      <Shell className="pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <span style={{ fontFamily: SERIF }} className="text-2xl font-medium">Notivon</span>
            <p className="mt-3 text-[14px] leading-[1.6] max-w-[26ch]" style={{ color: DARK_MUT }}>
              Consulting + building, together. We tell you where AI actually pays off — then build the
              systems that deliver it.
            </p>
          </div>

          {col("Services", [
            { label: "AI Readiness Audit", to: "/audit" },
            { label: "Free Opportunity Map", to: "/scorecard" },
            { label: "VisaGuard", to: "/products/visaguard" },
            { label: "ClearVoy", to: "/products/clearvoy" },
          ])}

          {col("Company", [
            { label: "About", to: "/about" },
            { label: "Contact", to: "/#contact" },
            { label: "FAQ", to: "/#faq" },
            { label: "Privacy Policy", to: "/privacy" },
            { label: "Terms of Service", to: "/terms" },
          ])}

          <div>
            <p className="uppercase tracking-[0.16em] text-[11px] mb-4" style={{ color: DARK_MUT, fontFamily: MONO }}>Connect</p>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 transition-colors hover:text-white w-fit" style={{ color: DARK_FG }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(237,239,243,0.06)" }}><Mail className="w-4 h-4" /></span>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 transition-colors hover:text-white w-fit" style={{ color: DARK_FG }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(237,239,243,0.06)" }}><MessageCircle className="w-4 h-4" /></span>
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_PRIMARY}`} className="group flex items-center gap-3 transition-colors hover:text-white w-fit" style={{ color: DARK_FG }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(237,239,243,0.06)" }}><Phone className="w-4 h-4" /></span>
                  {PHONE_PRIMARY}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_SECONDARY}`} className="group flex items-center gap-3 transition-colors hover:text-white w-fit" style={{ color: DARK_MUT }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(237,239,243,0.06)" }}><Phone className="w-4 h-4" /></span>
                  {PHONE_SECONDARY}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1" style={{ color: DARK_MUT }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(237,239,243,0.06)" }}><MapPin className="w-4 h-4" /></span>
                Nigeria → Global
              </li>
            </ul>
          </div>
        </div>

        <Rule dark />
        <div className="pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px]" style={{ color: DARK_MUT }}>© {year} Notivon. All rights reserved.</p>
          <div className="flex items-center gap-7">
            <Link to="/privacy" className="text-[13px] transition-colors hover:text-white" style={{ color: DARK_MUT }}>Privacy Policy</Link>
            <Link to="/terms" className="text-[13px] transition-colors hover:text-white" style={{ color: DARK_MUT }}>Terms of Service</Link>
          </div>
        </div>
      </Shell>
    </footer>
  );
};

export default MarketingFooter;
