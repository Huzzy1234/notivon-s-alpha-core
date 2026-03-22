import { Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 lg:py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-10 sm:mb-16">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
                Contact
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="mailto:hussain@notivon.com" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all">
                    hussain@notivon.com
                  </a>
                </li>
                <li>
                  <a href="tel:09014390149" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    09014390149
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/2349014390149"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    WhatsApp Us →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground mb-4 sm:mb-6">
                Services
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li className="text-sm sm:text-base text-muted-foreground">Document Management Systems</li>
                <li className="text-sm sm:text-base text-muted-foreground">Expiry Tracking & Alerts</li>
                <li className="text-sm sm:text-base text-muted-foreground">Client Portals</li>
                <li className="text-sm sm:text-base text-muted-foreground">Application Status Tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Notivon. All rights reserved.
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;