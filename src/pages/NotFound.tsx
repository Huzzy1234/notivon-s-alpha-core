import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PAGE, INK, MUT, ACCENT, SERIF, MONO } from "@/marketing/theme";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ background: PAGE, color: INK, fontFamily: "'Instrument Sans', sans-serif" }}>
      <div className="text-center">
        <p className="uppercase tracking-[0.2em] text-[12px] mb-6" style={{ color: MUT, fontFamily: MONO }}>Error 404</p>
        <h1 style={{ fontFamily: SERIF, lineHeight: 1.0 }} className="font-medium tracking-[-0.02em] text-[clamp(3rem,12vw,6rem)] mb-4">
          Page not <span style={{ fontStyle: "italic", color: ACCENT }}>found.</span>
        </h1>
        <p className="text-[16px] mb-8" style={{ color: MUT }}>That page doesn't exist — or it moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-[15px] font-semibold px-7 py-4 rounded-full transition-transform hover:-translate-y-0.5" style={{ background: ACCENT, color: "#FFFFFF" }}>
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
