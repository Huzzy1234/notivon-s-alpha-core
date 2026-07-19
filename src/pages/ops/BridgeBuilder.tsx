import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { 
  ArrowLeft, Laptop, Smartphone, Download, 
  Globe, Palette as PaletteIcon, HelpCircle, 
  Sparkles, RefreshCw, Eye, Check, Loader2 
} from "lucide-react";

interface Service {
  name: string;
  desc: string;
  price: string;
  imageUrl?: string;
}

const PALETTES = {
  rose: { accent: "#d15a7c", rgb: "209, 90, 124", name: "Rose (Beauty/Nails)" },
  plum: { accent: "#7c3aed", rgb: "124, 58, 237", name: "Plum (Aesthetics/Hair)" },
  teal: { accent: "#0f766e", rgb: "15, 118, 110", name: "Teal (Dental/Health)" },
  indigo: { accent: "#4f46e5", rgb: "79, 70, 229", name: "Indigo (Optics/Clinics)" },
  emerald: { accent: "#059669", rgb: "5, 150, 105", name: "Emerald (Wellness)" },
  gold: { accent: "#c27803", rgb: "194, 120, 3", name: "Gold (Luxury)" },
  slate: { accent: "#475569", rgb: "71, 85, 105", name: "Slate (Minimal)" },
};

interface Preset {
  tagline: string;
  accentPalette: keyof typeof PALETTES;
  faviconEmoji: string;
  services: Service[];
}

const NICHE_PRESETS: Record<string, Preset> = {
  spa: {
    tagline: "Premium Day Spa & Wellness",
    accentPalette: "rose",
    faviconEmoji: "🌿",
    services: [
      { name: "Swedish Massage", desc: "A relaxing full body massage using premium aromatherapy oils for complete tension relief.", price: "₦20,000" },
      { name: "Luxury Deep Tissue Facial", desc: "Rejuvenating facial skin treatment including deep cleansing, exfoliation, and hydration mask.", price: "₦18,000" },
      { name: "Signature Pedicure", desc: "Essential foot therapy including hot stones, massage, nail shaping, and premium polish.", price: "₦12,000" },
    ],
  },
  dental: {
    tagline: "Modern & Gentle Dental Care",
    accentPalette: "teal",
    faviconEmoji: "🦷",
    services: [
      { name: "Teeth Cleaning & Polish", desc: "Comprehensive scale, clean, stain removal, and dental checkup by our experts.", price: "₦25,000" },
      { name: "Laser Teeth Whitening", desc: "Premium whitening system that brightens teeth up to 8 shades in a single session.", price: "₦45,000" },
      { name: "Composite Aesthetic Fillings", desc: "Invisible tooth-colored aesthetic fillings to restore cavities and prevent decay.", price: "₦15,000" },
    ],
  },
  salon: {
    tagline: "Elite Hair & Beauty Lounge",
    accentPalette: "plum",
    faviconEmoji: "💇‍♀️",
    services: [
      { name: "Wash & Silk Press", desc: "Therapeutic hair wash, deep conditioning steam treatment, and professional blowout & flat iron.", price: "₦15,000" },
      { name: "Luxury Gel Manicure", desc: "Nail shaping, cuticle grooming, gel polish application, and moisturizing hand massage.", price: "₦10,000" },
      { name: "Full Balayage Coloring", desc: "Custom hand-painted hair highlights and toner application for a seamless, sun-kissed look.", price: "₦35,000" },
    ],
  },
  nail: {
    tagline: "Aesthetic Nail Artistry",
    accentPalette: "rose",
    faviconEmoji: "💅",
    services: [
      { name: "Acrylic Full Set", desc: "Premium tips extension with custom acrylic sculpting, hand shaping, and gel overlay.", price: "₦22,000" },
      { name: "Luxury Pedicure & Gel", desc: "Relaxing foot soak, scrub, nail grooming, and durable gel polish application.", price: "₦14,000" },
      { name: "Custom Nail Art (Set)", desc: "Unique hand-painted designs, chrome powder, foils, or gems customized for you.", price: "₦8,000" },
    ],
  },
  clinic: {
    tagline: "Dedicated Family Health Services",
    accentPalette: "indigo",
    faviconEmoji: "🏥",
    services: [
      { name: "General Medical Consult", desc: "One-on-one consultation with a licensed physician for diagnosis and wellness checks.", price: "₦15,000" },
      { name: "Comprehensive Health Screen", desc: "Full screening panel including blood pressure, glucose, lipids, and doctor analysis.", price: "₦35,000" },
      { name: "Physiotherapy Session", desc: "Targeted exercise, manual therapy, and rehabilitation plans for pain relief.", price: "₦20,000" },
    ],
  },
};

export default function BridgeBuilder() {
  const [searchParams] = useSearchParams();
  const leadName = searchParams.get("name") || "";
  const leadAddress = searchParams.get("address") || "";
  const leadPhone = searchParams.get("phone") || "";
  const leadRating = searchParams.get("rating") || "4.8";
  const leadReviews = searchParams.get("reviews") || "12";
  const leadNiche = searchParams.get("niche") || "spa";
  const leadLocation = searchParams.get("location") || "Lekki, Lagos";

  // Form states
  const [businessName, setBusinessName] = useState(leadName || "Zaza Day Spa");
  const [location, setLocation] = useState(leadLocation || "Lekki, Lagos");
  const [niche, setNiche] = useState(leadNiche.toLowerCase().includes("dent") ? "dental" : leadNiche.toLowerCase().includes("salon") ? "salon" : leadNiche.toLowerCase().includes("nail") ? "nail" : leadNiche.toLowerCase().includes("clinic") ? "clinic" : "spa");
  const [accentPalette, setAccentPalette] = useState<keyof typeof PALETTES>("rose");
  const [tagline, setTagline] = useState("Premium Day Spa & Wellness");
  const [faviconEmoji, setFaviconEmoji] = useState("🌿");
  const [whatsappNumber, setWhatsappNumber] = useState(leadPhone || "08012345678");
  const [rating, setRating] = useState(leadRating);
  const [reviewCount, setReviewCount] = useState(leadReviews);
  const [address, setAddress] = useState(leadAddress || "12 Admiralty Way, Lekki Phase 1, Lagos");
  const [hours, setHours] = useState("Mon – Sat: 9:00 AM – 7:00 PM\nSunday: 11:00 AM – 5:00 PM");
  const [heroImageUrl, setHeroImageUrl] = useState("");

  const [service1, setService1] = useState<Service>({ name: "", desc: "", price: "", imageUrl: "" });
  const [service2, setService2] = useState<Service>({ name: "", desc: "", price: "", imageUrl: "" });
  const [service3, setService3] = useState<Service>({ name: "", desc: "", price: "", imageUrl: "" });

  // Preview / layout states
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const [templateHtml, setTemplateHtml] = useState("");
  const [compiledHtml, setCompiledHtml] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load the template HTML file
  useEffect(() => {
    fetch("/bridge-template.html")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load template file");
        return res.text();
      })
      .then((html) => setTemplateHtml(html))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load master template file from /public folder.");
      });
  }, []);

  // Apply niche preset changes
  useEffect(() => {
    const preset = NICHE_PRESETS[niche];
    if (preset) {
      setTagline(preset.tagline);
      setAccentPalette(preset.accentPalette);
      setFaviconEmoji(preset.faviconEmoji);
      setService1(preset.services[0]);
      setService2(preset.services[1]);
      setService3(preset.services[2]);
    }
  }, [niche]);

  // Compile placeholders and inject into IFrame
  useEffect(() => {
    if (!templateHtml) return;

    const palette = PALETTES[accentPalette];
    const firstLetter = (businessName || "B").trim().charAt(0).toUpperCase();
    const cleanPhone = whatsappNumber.replace(/[\s\-\(\)]/g, "");
    let normalPhone = cleanPhone;
    if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      normalPhone = "234" + cleanPhone.substring(1);
    }
    const waLink = `https://wa.me/${normalPhone}?text=${encodeURIComponent(
      `Hi ${businessName} 👋 I'd like to book an appointment. Please let me know your availability.`
    )}`;
    
    // Calculate star rating width percentage
    const numericRating = parseFloat(rating) || 4.5;
    const starPercent = Math.max(0, Math.min(100, Math.round(numericRating * 20)));

    // Choose font family
    const fontHeading = niche === "dental" || niche === "clinic" ? "Outfit" : "Playfair Display";
    const cssVariables = `
      --accent: ${palette.accent};
      --accent-rgb: ${palette.rgb};
      --accent-light: rgba(${palette.rgb}, 0.05);
      --accent-darker: ${niche === "dental" || niche === "clinic" ? "#064e3b" : "#4c0519"};
      --font-heading: '${fontHeading}', var(--font-fallback-serif);
    `;

    const metaTitle = `${businessName} — ${location}`;
    const metaDesc = `Book your appointment at ${businessName} in ${location}. ${niche} services. WhatsApp booking available.`;

    let html = templateHtml;

    // Replace all placeholders
    const replacements: Record<string, string> = {
      "{{META_TITLE}}": metaTitle,
      "{{META_DESCRIPTION}}": metaDesc,
      "{{ACCENT_COLOR}}": palette.accent,
      "{{CSS_VARIABLES}}": cssVariables,
      "{{FAVICON_EMOJI}}": faviconEmoji,
      "{{FIRST_LETTER}}": firstLetter,
      "{{TAGLINE}}": tagline,
      "{{BUSINESS_NAME}}": businessName,
      "{{LOCATION}}": location,
      "{{WHATSAPP_LINK}}": waLink,
      "{{RATING}}": String(numericRating),
      "{{REVIEW_COUNT}}": String(reviewCount),
      "{{STAR_FILL_PERCENT}}": String(starPercent),
      "{{SERVICE_1_NAME}}": service1.name || "Service 1",
      "{{SERVICE_1_DESC}}": service1.desc || "",
      "{{SERVICE_1_PRICE}}": service1.price || "",
      "{{SERVICE_1_IMAGE_URL}}": service1.imageUrl || "",
      "{{SERVICE_1_IMAGE_DISPLAY}}": service1.imageUrl ? "block" : "none",
      "{{SERVICE_2_NAME}}": service2.name || "Service 2",
      "{{SERVICE_2_DESC}}": service2.desc || "",
      "{{SERVICE_2_PRICE}}": service2.price || "",
      "{{SERVICE_2_IMAGE_URL}}": service2.imageUrl || "",
      "{{SERVICE_2_IMAGE_DISPLAY}}": service2.imageUrl ? "block" : "none",
      "{{SERVICE_3_NAME}}": service3.name || "Service 3",
      "{{SERVICE_3_DESC}}": service3.desc || "",
      "{{SERVICE_3_PRICE}}": service3.price || "",
      "{{SERVICE_3_IMAGE_URL}}": service3.imageUrl || "",
      "{{SERVICE_3_IMAGE_DISPLAY}}": service3.imageUrl ? "block" : "none",
      "{{HERO_IMAGE_URL}}": heroImageUrl || "",
      "{{HERO_IMAGE_DISPLAY}}": heroImageUrl ? "block" : "none",
      "{{HOURS}}": hours.replace(/\n/g, "<br>"),
      "{{ADDRESS}}": address || "",
      "{{CURRENT_YEAR}}": String(new Date().getFullYear()),
    };

    for (const [placeholder, value] of Object.entries(replacements)) {
      html = html.split(placeholder).join(value);
    }

    setCompiledHtml(html);

    // Update iframe contents
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }, [
    templateHtml, businessName, location, niche, accentPalette, tagline, 
    faviconEmoji, whatsappNumber, rating, reviewCount, address, hours, 
    heroImageUrl, service1, service2, service3
  ]);

  // Download raw HTML file
  const handleDownload = () => {
    const blob = new Blob([compiledHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const fileSlug = businessName.toLowerCase().replace(/[^a-z0-9\-]/g, "-").replace(/-+/g, "-");
    a.download = `${fileSlug || "index"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded index.html successfully!");
  };

  // Deploy directly to Netlify (if token is configured on backend)
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployedUrl("");

    const fileSlug = businessName.toLowerCase().replace(/[^a-z0-9\-]/g, "-").replace(/-+/g, "-");

    try {
      const res = await fetch("/.netlify/functions/deploy-bridge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Ops-Auth": "notivon-internal-2026",
        },
        body: JSON.stringify({
          slug: fileSlug,
          html: compiledHtml,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.code === "NO_TOKEN") {
          toast.error("Netlify Token not configured on server.");
          return;
        }
        throw new Error(data.error || "Deployment failed");
      }

      setDeployedUrl(data.url);
      toast.success("Bridge Page deployed successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to deploy site to Netlify");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link to="/ops/scout" className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-semibold tracking-tight text-foreground">Bridge Builder</h1>
            <p className="text-xs text-muted-foreground">Draft and compile a customized one-page landing page instantly.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form - Left 5 cols */}
        <div className="lg:col-span-5 space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
          {/* Niche selector & details */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              1. Base Preset
            </h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-foreground">Niche Preset</label>
              <select
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              >
                <option value="spa">🌸 Day Spa / Wellness / Massage</option>
                <option value="dental">🦷 Dental Clinic</option>
                <option value="salon">💇‍♀️ Hair / Nail / Beauty Salon</option>
                <option value="nail">💅 Nail Bar</option>
                <option value="clinic">🏥 Health Clinic</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Branding Palette</label>
                <select
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={accentPalette}
                  onChange={(e) => setAccentPalette(e.target.value as any)}
                >
                  {Object.entries(PALETTES).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Favicon Emoji</label>
                <input
                  type="text"
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={faviconEmoji}
                  onChange={(e) => setFaviconEmoji(e.target.value)}
                  placeholder="e.g. 🌿"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-primary" />
              2. Client Profile
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Business Name</label>
                <input
                  type="text"
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Custom Tagline</label>
                <input
                  type="text"
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Location Area</label>
                  <input
                    type="text"
                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Google Maps Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Reviews Count</label>
                  <input
                    type="number"
                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    value={reviewCount}
                    onChange={(e) => setReviewCount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Street Address</label>
                <input
                  type="text"
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Hours of Operation</label>
                <textarea
                  className="w-full h-20 bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Hero Background Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... or similar"
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Featured Services */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <PaletteIcon className="w-3.5 h-3.5 text-primary" />
              3. Featured Services
            </h3>

            {/* Service 1 */}
            <div className="border-b border-border/50 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Service 1</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="col-span-2 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={service1.name}
                  onChange={(e) => setService1({ ...service1, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Price"
                  className="col-span-1 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={service1.price}
                  onChange={(e) => setService1({ ...service1, price: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full h-14 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                value={service1.desc}
                onChange={(e) => setService1({ ...service1, desc: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL (Optional)"
                className="w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={service1.imageUrl || ""}
                onChange={(e) => setService1({ ...service1, imageUrl: e.target.value })}
              />
            </div>

            {/* Service 2 */}
            <div className="border-b border-border/50 pb-4 space-y-3">
              <span className="text-xs font-bold text-foreground">Service 2</span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="col-span-2 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={service2.name}
                  onChange={(e) => setService2({ ...service2, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Price"
                  className="col-span-1 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={service2.price}
                  onChange={(e) => setService2({ ...service2, price: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full h-14 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                value={service2.desc}
                onChange={(e) => setService2({ ...service2, desc: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL (Optional)"
                className="w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={service2.imageUrl || ""}
                onChange={(e) => setService2({ ...service2, imageUrl: e.target.value })}
              />
            </div>

            {/* Service 3 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-foreground">Service 3</span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="col-span-2 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={service3.name}
                  onChange={(e) => setService3({ ...service3, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Price"
                  className="col-span-1 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={service3.price}
                  onChange={(e) => setService3({ ...service3, price: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                className="w-full h-14 bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                value={service3.desc}
                onChange={(e) => setService3({ ...service3, desc: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL (Optional)"
                className="w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={service3.imageUrl || ""}
                onChange={(e) => setService3({ ...service3, imageUrl: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Preview Frame - Right 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl shadow-sm">
            {/* Viewport switcher */}
            <div className="flex items-center gap-1.5 bg-muted p-1 rounded-md">
              <button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`p-1.5 rounded transition-all text-xs font-semibold flex items-center gap-1 ${
                  previewMode === "mobile" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile View
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`p-1.5 rounded transition-all text-xs font-semibold flex items-center gap-1 ${
                  previewMode === "desktop" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                Desktop
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 text-xs bg-muted hover:bg-muted/70 text-foreground border border-border px-3 py-1.5 rounded-lg font-semibold transition-colors"
                title="Download static HTML file for drag-and-drop hosting"
              >
                <Download className="w-3.5 h-3.5" />
                Download HTML
              </button>

              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="inline-flex items-center gap-1.5 text-xs bg-primary hover:bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-55"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    Publish to Netlify
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success deployed block */}
          {deployedUrl && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <p>
                  <strong>Live on Netlify!</strong> Your bridge page is active at:{" "}
                  <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-80">
                    {deployedUrl}
                  </a>
                </p>
              </div>
              <a
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-emerald-950 font-bold px-3 py-1 rounded hover:bg-emerald-400 transition-colors shrink-0"
              >
                Open Site
              </a>
            </div>
          )}

          {/* Simulator Viewport */}
          <div className="flex justify-center bg-muted/40 border border-border/80 rounded-2xl p-6 min-h-[600px] items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            {previewMode === "mobile" ? (
              /* Phone wrapper mockup */
              <div className="relative mx-auto w-[360px] h-[720px] bg-[#1C1917] rounded-[48px] p-3.5 shadow-2xl border-[6px] border-[#292524] flex flex-col">
                {/* Speaker pill */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-[#292524] rounded-full z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-[#1C1917] rounded-full"></div>
                </div>
                {/* Screen frame */}
                <div className="flex-1 w-full h-full bg-background rounded-[36px] overflow-hidden relative z-10 border border-[#292524]">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0 bg-background"
                    title="Mobile Bridge Page Preview"
                  />
                </div>
              </div>
            ) : (
              /* Desktop browser mockup */
              <div className="w-full h-[650px] bg-background border border-border/80 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                {/* Browser bar */}
                <div className="bg-muted p-2 flex items-center gap-2 border-b border-border">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-background text-[10px] text-muted-foreground rounded border border-border px-3 py-1 flex items-center justify-between max-w-md mx-auto">
                    <span>https://{businessName.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}.netlify.app</span>
                  </div>
                </div>
                {/* Screen */}
                <div className="flex-1 w-full bg-background">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0 bg-background"
                    title="Desktop Bridge Page Preview"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
