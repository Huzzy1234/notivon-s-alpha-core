import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // scroll and offset heading
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="pt-20 pb-10 bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          
          <div className="col-span-2 md:col-span-1">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-1 group mb-4 inline-block">
              <span className="text-3xl font-display font-bold tracking-tight text-foreground">Notivon</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs">
              Custom-built systems that help visa and travel agencies process more applications with zero headaches.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs font-bold text-foreground mb-6 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Document Management</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Expiry Tracking</button></li>
              <li><button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Client Portals</button></li>
              <li><button onClick={() => scrollToSection("how-it-works")} className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</button></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs font-bold text-foreground mb-6 uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><button onClick={() => scrollToSection("contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</button></li>
              <li><button onClick={() => scrollToSection("faq")} className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</button></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold text-foreground mb-6 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hussain@notivon.com" className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Mail className="w-4 h-4" /></div>
                  hussain@notivon.com
                </a>
              </li>
              <li>
                <a href="tel:09014390149" className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Phone className="w-4 h-4" /></div>
                  09014390149
                </a>
              </li>
              <li>
                <div className="group flex items-center gap-3 text-sm text-muted-foreground w-fit">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                  Nigeria → Global
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {currentYear} Notivon. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
