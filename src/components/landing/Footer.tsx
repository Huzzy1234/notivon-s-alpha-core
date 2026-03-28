import { Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hussain@notivon.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  hussain@notivon.com
                </a>
              </li>
              <li>
                <a href="tel:09014390149" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  09014390149
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349014390149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  WhatsApp Us →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Document Management Systems</li>
              <li className="text-sm text-muted-foreground">Expiry Tracking & Alerts</li>
              <li className="text-sm text-muted-foreground">Client Portals</li>
              <li className="text-sm text-muted-foreground">Application Status Tracking</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Notivon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
