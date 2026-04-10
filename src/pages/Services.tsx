import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { FileText, Camera, Bell, Users, BarChart3, Globe, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "document-management",
      icon: FileText,
      title: "Intelligent Document Management",
      description: "Automated collection, organization, and validation of all client visa documents in one organized pipeline.",
      features: [
        "Per-visa-type requirements checklists",
        "Automated missing document chasing",
        "Centralized, searchable file storage",
        "Secure, encrypted cloud architecture"
      ]
    },
    {
      id: "expiry-tracking",
      icon: Bell,
      title: "Automated Expiry Tracking",
      description: "Monitor passport expiry dates, medical certificates, and police clearances with zero manual spreadsheet work.",
      features: [
        "Proactive 30/60/90 day warnings",
        "Compliance-blocking prevention",
        "Automated client renewal nudges",
        "Global team dashboard views"
      ]
    },
    {
      id: "client-portal",
      icon: Users,
      title: "Branded Client Portals",
      description: "Give every single client a professional, white-labeled portal to upload documents and track their application.",
      features: [
        "No-login magic link access",
        "Live status progress bars",
        "Mobile-first responsive upload experience",
        "Direct-to-agent secure messaging"
      ]
    },
    {
      id: "whatsapp-automation",
      icon: MessageCircle,
      title: "WhatsApp Automation",
      description: "Tap into the most popular messaging app in the world to keep your clients informed automatically.",
      features: [
        "Automated status update broadcasts",
        "Interview reminder drop sequences",
        "Missing document gentle nudges",
        "Two-way conversational history log"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Notivon</title>
        <meta name="description" content="Discover how Notivon's suite of specialized software solutions can help your travel and visa agency streamline operations and prevent costly tracking errors." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-20 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Our Capabilities
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Built for <span className="text-primary italic">Precision</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We design, build, and deploy specialized systems that completely eliminate manual touchpoints from your agency's daily workflow.
            </p>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                
                <div className={index % 2 !== 0 ? 'md:col-start-2' : ''}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm border border-primary/20">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-display font-semibold text-foreground mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`relative w-full aspect-square md:aspect-auto md:h-full min-h-[400px] rounded-3xl overflow-hidden glass border border-border/50 shadow-2xl bg-card flex items-center justify-center p-8 group ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                  <div className="absolute inset-0 bg-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Stylized Visual Mockup Base */}
                  <div className="w-full max-w-sm bg-background border border-border/60 rounded-xl shadow-2xl p-6 relative z-10 transform group-hover:scale-105 transition-transform duration-700">
                    <div className="h-4 w-1/3 bg-muted rounded-full mb-6"></div>
                    <div className="space-y-4">
                       <div className="h-12 w-full bg-primary/10 rounded-lg border border-primary/20 flex flex-col justify-center px-4">
                         <div className="h-2 w-2/3 bg-primary/40 rounded"></div>
                       </div>
                       <div className="h-12 w-full bg-accent/10 rounded-lg border border-accent/20 flex flex-col justify-center px-4 gap-2">
                         <div className="h-2 w-1/2 bg-accent/40 rounded"></div>
                       </div>
                       <div className="h-12 w-full bg-emerald-500/10 rounded-lg border border-emerald-500/20 flex flex-col justify-center px-4">
                         <div className="h-2 w-3/4 bg-emerald-500/40 rounded"></div>
                       </div>
                    </div>
                  </div>
                  
                </div>

              </div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mt-32 text-center">
             <div className="bg-card glass border border-border/60 rounded-3xl p-12 max-w-4xl mx-auto flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                <h3 className="text-3xl font-display font-semibold mb-6">Stop Working IN Your Agency.<br/>Start Working ON It.</h3>
                <Link to="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                  Book A Discovery Call <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Services;
