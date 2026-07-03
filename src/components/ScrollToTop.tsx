import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* On every route change, jump back to the top of the page. Skipped when the
   URL has a hash (e.g. "/#contact") so in-page section links keep their own
   smooth-scroll behaviour. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
