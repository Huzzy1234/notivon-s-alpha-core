import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, MapPin, Star, Globe, MessageCircle, Phone, Check, Plus, FolderPlus, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import {
  Board,
  OPS_HEADERS,
  boardLabel,
  createBoard,
  fetchBoards,
  getLastBoard,
  setLastBoard,
  slugifyBoard,
} from "@/lib/boards";

interface Lead {
  name: string;
  address: string;
  phone: string;
  category: string;
  website: string;
  rating: number;
  reviewCount: number;
  source: string;
  savedId?: string;
  savedStatus?: string;
}

interface SearchMeta {
  provider: string;
  total: number;
  withPhone: number;
  phoneCoverage: number;
}

interface CampaignPreset {
  name: string;
  defaultScript: string;
  defaultLocation: string;
  // CRM board (sheet tab) this campaign's leads belong in.
  defaultBoard: string;
  categories: {
    label: string;
    options: string[];
  }[];
  queryMapping: Record<string, string>;
  suggestions: string[];
}

const CAMPAIGNS: Record<string, CampaignPreset> = {
  gmaps_bridge: {
    name: "🎯 Google Maps Bridge",
    defaultScript: `Hi {{businessName}} 👋\n\nCame across your profile on Google Maps — great reviews. Noticed you don't have a website linked though, which usually means people searching and ready to book end up going to a competitor who has one.\n\nI can put together a quick one-page site for you — logo, services, one tap to WhatsApp for bookings — linked straight to your Maps profile. Takes about 15-20 minutes once you say go.\n\nWant me to send a quick draft using your photos so you can see it first?`,
    defaultLocation: "Lekki, Lagos",
    defaultBoard: "spa-bridge",
    categories: [
      {
        label: "💅 Spas & Aesthetics",
        options: [
          "Spas & Beauty Clinics",
          "Dental & Eye Clinics",
          "Hair Salons & Nail Bars"
        ]
      }
    ],
    queryMapping: {
      "Spas & Beauty Clinics": "spa OR beauty clinic OR aesthetic clinic",
      "Dental & Eye Clinics": "dental clinic OR dentist OR eye clinic OR optometrist",
      "Hair Salons & Nail Bars": "hair salon OR nail salon OR nail bar"
    },
    suggestions: [
      "Lekki, Lagos",
      "Victoria Island, Lagos",
      "Ikoyi, Lagos",
      "Ikeja, Lagos",
      "Wuse II, Abuja",
      "Gwarinpa, Abuja",
      "Maitama, Abuja"
    ]
  },
  solar: {
    name: "☀️ Solar Installers",
    defaultScript: `Hi {{businessName}} 👋\n\nSaw your reviews for solar work around {{location}} — you're clearly getting steady enquiries.\n\nQuick question: when someone messages "how much for solar?", how long does it take to get them to an actual quote? Most buyers don't know their own kVA, Ah, or lithium vs tubular, so you end up walking each one through it manually — and while that's happening they're sitting with 2-3 of your competitors.\n\nI built a calculator that does that homework for them in about 30 seconds and hands you the enquiry already sized, with a real requirement attached. Warm lead instead of a cold "how much".\n\nWant me to send you the link so you can run your own numbers through it?`,
    defaultLocation: "Lekki, Lagos",
    defaultBoard: "solar",
    categories: [
      {
        label: "☀️ Solar & Power",
        options: [
          "Solar Installation Companies",
          "Solar Panel Suppliers",
          "Inverter & Battery Dealers",
          "Renewable Energy Consultants"
        ]
      }
    ],
    queryMapping: {
      "Solar Installation Companies": "solar installation OR solar installer OR solar energy company",
      "Solar Panel Suppliers": "solar panel supplier OR solar equipment store",
      "Inverter & Battery Dealers": "inverter dealer OR battery dealer OR power backup",
      "Renewable Energy Consultants": "renewable energy consultant OR solar consultant"
    },
    suggestions: [
      "Lekki, Lagos",
      "Ikeja, Lagos",
      "Victoria Island, Lagos",
      "Wuse II, Abuja",
      "Gwarinpa, Abuja",
      "Port Harcourt, Rivers",
      "Ibadan, Oyo"
    ]
  },
  cargo_automation: {
    name: "🚢 Cargo Automation",
    defaultScript: `Hi! I was looking at {{businessName}} and I like the scale of your operations. Quick question — are your agents still updating clients on cargo status manually via WhatsApp or calls? I build systems for clearing/freight businesses that automate status updates and document tracking, saving hours of manual follow-up every week. Happy to show you how it works for other agencies. Would that be useful to see?`,
    defaultLocation: "Apapa, Lagos",
    defaultBoard: "cargo",
    categories: [
      {
        label: "🚢 Logistics & Trade",
        options: [
          "Customs Clearing Agents",
          "Freight Forwarding",
          "Shipping Companies",
          "Import Export Companies",
          "Haulage Trucking Companies",
          "Warehouse Storage"
        ]
      },
      {
        label: "✈️ Travel & Immigration",
        options: [
          "Visa Agencies",
          "Travel Agencies",
          "Tour Operators",
          "Flight Booking Agencies"
        ]
      },
      {
        label: "🏢 Professional Services",
        options: [
          "Real Estate Agencies",
          "Law Firms",
          "Accounting Firms",
          "Consulting Firms"
        ]
      },
      {
        label: "🏪 Retail & Services",
        options: [
          "Supermarkets",
          "Pharmacies",
          "Auto Dealers",
          "Salons and Spas"
        ]
      }
    ],
    queryMapping: {},
    suggestions: [
      "Apapa, Lagos",
      "Ikeja, Lagos",
      "Surulere, Lagos",
      "Wuse, Abuja",
      "Garki, Abuja"
    ]
  }
};

const NIGERIAN_STATES_DISTRICTS: Record<string, string[]> = {
  "Lagos": ["Lekki", "Victoria Island", "Ikoyi", "Ikeja", "Apapa", "Surulere", "Yaba", "Maryland", "Epe", "Badagry"],
  "Abuja (FCT)": ["Wuse II", "Gwarinpa", "Maitama", "Garki", "Asokoro", "CBD", "Kubwa", "Lugbe"],
  "Rivers": ["Port Harcourt", "Obio-Akpor", "Bonny Island", "Eleme"],
  "Oyo": ["Ibadan", "Bodija", "Challenge", "Jericho", "Ring Road", "Ogbomosho"],
  "Kano": ["Kano", "Fagge", "Bompai", "Wudil"],
  "Kaduna": ["Kaduna", "Zaria", "Kafanchan", "Barnawa"],
  "Delta": ["Warri", "Effurun", "Asaba", "Sapele", "Ughelli", "Agbor"],
  "Anambra": ["Onitsha", "Awka", "Nnewi", "Ekwulobia"],
  "Enugu": ["Enugu", "Nsukka", "Oji River"],
  "Edo": ["Benin City", "Uromi", "Auchi", "Ekpoma"],
  "Ogun": ["Abeokuta", "Ota", "Sagamu", "Ijebu Ode"],
  "Abia": ["Aba", "Umuahia", "Ohafia"],
  "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron"],
  "Imo": ["Owerri", "Orlu", "Okigwe", "Mbaise"],
  "Kwara": ["Ilorin", "Offa", "Omu-Aran"],
  "Ondo": ["Akure", "Ondo City", "Owo"],
  "Osun": ["Osogbo", "Ile-Ife", "Ilesa", "Ede"],
  "Cross River": ["Calabar", "Ugep", "Ogoja", "Ikom"],
  "Plateau": ["Jos", "Bukuru", "Pankshin"],
  "Kogi": ["Lokoja", "Okene", "Idah", "Anyigba"],
  "Nasarawa": ["Lafia", "Karu", "Keffi"],
  "Benue": ["Makurdi", "Otukpo", "Gboko"],
  "Bauchi": ["Bauchi", "Azare", "Misau"],
  "Katsina": ["Katsina", "Daura", "Funtua"],
  "Borno": ["Maiduguri", "Biu"],
  "Sokoto": ["Sokoto", "Wurno"],
  "Adamawa": ["Yola", "Mubi", "Jimeta"],
  "Bayelsa": ["Yenagoa", "Ogbia", "Brass"],
  "Ebonyi": ["Abakaliki", "Afikpo"],
  "Ekiti": ["Ado-Ekiti", "Ikere-Ekiti", "Oye-Ekiti"],
  "Gombe": ["Gombe", "Kaltungo"],
  "Jigawa": ["Dutse", "Hadejia", "Birnin Kudu"],
  "Kebbi": ["Birnin Kebbi", "Argungu", "Yauri"],
  "Niger": ["Minna", "Bida", "Suleja", "Kontagora"],
  "Taraba": ["Jalingo", "Wukari"],
  "Yobe": ["Damaturu", "Potiskum", "Gashua"],
  "Zamfara": ["Gusau", "Kaura Namoda"]
};

type CampaignKey = keyof typeof CAMPAIGNS;

export default function Scout() {
  const [campaign, setCampaign] = useState<CampaignKey>("gmaps_bridge");

  // Which CRM board saves land in, and what duplicates are checked against.
  const [board, setBoard] = useState<string>(getLastBoard);
  const [boards, setBoards] = useState<Board[]>([]);

  const [niche, setNiche] = useState(CAMPAIGNS.gmaps_bridge.categories[0].options[0]);
  const [customNiche, setCustomNiche] = useState("");
  const [locationInput, setLocationInput] = useState(CAMPAIGNS.gmaps_bridge.defaultLocation);
  const [selectedState, setSelectedState] = useState<string>("Lagos");

  const [script, setScript] = useState(CAMPAIGNS.gmaps_bridge.defaultScript);
  const [isLoading, setIsLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<SearchMeta | null>(null);

  const [savingId, setSavingId] = useState<string | null>(null);
  const [hideSaved, setHideSaved] = useState(false);

  // API cost & usage state
  const [sessionQueries, setSessionQueries] = useState(0);
  const [monthlyQueries, setMonthlyQueries] = useState(0);

  // Dynamic filter states
  const [filterWebsite, setFilterWebsite] = useState<"no_website" | "with_website" | "any">("no_website");
  const [filterMinRating, setFilterMinRating] = useState<number>(4.0);
  const [filterMinReviews, setFilterMinReviews] = useState<number>(0);
  const [filterOperational, setFilterOperational] = useState<boolean>(true);
  const [filterPhotos, setFilterPhotos] = useState<boolean>(false);
  const [scanMode, setScanMode] = useState<"standard" | "grid">("grid");
  const [searchProvider, setSearchProvider] = useState<"google" | "tomtom">("google");
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);

  // Suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Check and initialize billing cycle reset for Google API limit tracking
  useEffect(() => {
    const currentMonth = new Date().toISOString().substring(0, 7); // "YYYY-MM"
    const lastResetMonth = localStorage.getItem("scout_usage_month");

    if (lastResetMonth !== currentMonth) {
      localStorage.setItem("scout_usage_month", currentMonth);
      localStorage.setItem("scout_usage_count", "0");
      setMonthlyQueries(0);
    } else {
      const count = parseInt(localStorage.getItem("scout_usage_count") || "0", 10);
      setMonthlyQueries(count);
    }
  }, []);

  // Load the board list once; a failure here is non-fatal, the selector just
  // falls back to whatever board is currently active.
  useEffect(() => {
    fetchBoards()
      .then(setBoards)
      .catch((err) => console.warn("Could not load boards:", err));
  }, []);

  const handleBoardChange = (next: string) => {
    const slug = slugifyBoard(next);
    setBoard(slug);
    setLastBoard(slug);
  };

  const handleCreateBoard = async () => {
    const raw = prompt("New board name (e.g. solar, dental, cargo):");
    if (!raw || !raw.trim()) return;
    const slug = slugifyBoard(raw);
    try {
      setBoards(await createBoard(slug));
      handleBoardChange(slug);
      toast.success(`Board "${boardLabel(slug)}" created`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create board");
    }
  };

  const incrementUsage = (queryCount: number) => {
    setSessionQueries(prev => prev + queryCount);
    setMonthlyQueries(prev => {
      const newCount = prev + queryCount;
      localStorage.setItem("scout_usage_count", newCount.toString());
      return newCount;
    });
  };

  // Load saved script from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem(`scout_script_${campaign}`);
    if (saved) {
      setScript(saved);
    } else {
      const oldSaved = localStorage.getItem("scout_script");
      if (oldSaved && campaign === "cargo_automation") {
        setScript(oldSaved);
      } else {
        setScript(CAMPAIGNS[campaign].defaultScript);
      }
    }
  }, [campaign]);

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setScript(val);
    localStorage.setItem(`scout_script_${campaign}`, val);
  };

  const handleCampaignChange = (newCamp: CampaignKey) => {
    setCampaign(newCamp);
    // Pipeline reads this to pick the right script when messaging a saved lead.
    localStorage.setItem("scout_active_campaign", newCamp);
    const config = CAMPAIGNS[newCamp];

    // Default location and niche for campaign
    setLocationInput(config.defaultLocation);
    setNiche(config.categories[0].options[0]);
    setCustomNiche("");
    handleBoardChange(config.defaultBoard);

    // Set campaign-specific filter defaults
    if (newCamp === "gmaps_bridge") {
      // Bridge pages are for businesses with nowhere to send Maps traffic.
      setFilterWebsite("no_website");
      setFilterMinRating(4.0);
      setFilterMinReviews(0);
      setFilterPhotos(false);
    } else if (newCamp === "solar") {
      // The calculator only helps installers already fielding enquiries, so
      // qualify on review volume rather than on having a website.
      setFilterWebsite("any");
      setFilterMinRating(0);
      setFilterMinReviews(25);
      setFilterPhotos(false);
    } else {
      setFilterWebsite("any");
      setFilterMinRating(0);
      setFilterMinReviews(0);
      setFilterPhotos(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = CAMPAIGNS[campaign];
    const finalNiche = niche === "Custom" ? customNiche : niche;
    const queryNiche = niche === "Custom" ? customNiche : (config.queryMapping[niche] || niche);

    if (!finalNiche) {
      toast.error("Please enter or select a niche");
      return;
    }
    if (!locationInput.trim()) {
      toast.error("Please enter a location to scan");
      return;
    }

    setIsLoading(true);
    setError("");
    setLeads([]);
    setMeta(null);
    setScanProgress(`Scanning all available leads in "${locationInput}"...`);

    try {
      const res = await fetch("/.netlify/functions/scout-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...OPS_HEADERS,
        },
        body: JSON.stringify({
          niche: queryNiche,
          location: locationInput,
          scanMode: scanMode,
          provider: searchProvider,
          board,
          filters: {
            website: filterWebsite,
            minRating: filterMinRating,
            minReviews: filterMinReviews,
            operationalOnly: filterOperational,
            mustHavePhotos: filterPhotos
          }
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to scan location");
      }

      const uniqueLeads = data.leads || [];

      // Sort: leads with phone numbers first, then unsaved first
      uniqueLeads.sort((a: Lead, b: Lead) => {
        if (a.phone && !b.phone) return -1;
        if (!a.phone && b.phone) return 1;
        if (!a.savedId && b.savedId) return -1;
        if (a.savedId && !b.savedId) return 1;
        return 0;
      });

      const withPhone = uniqueLeads.filter((l: Lead) => l.phone).length;

      setLeads(uniqueLeads);
      setMeta({
        provider: data.meta?.provider || "google",
        total: uniqueLeads.length,
        withPhone,
        phoneCoverage: uniqueLeads.length > 0 ? Math.round((withPhone / uniqueLeads.length) * 100) : 0
      });

      // Track API queries
      if (data.meta && data.meta.provider === "google" && typeof data.meta.apiCalls === "number") {
        incrementUsage(data.meta.apiCalls);
      }

      toast.success(`Scan complete! Found ${uniqueLeads.length} leads.`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during the scan.");
    } finally {
      setIsLoading(false);
      setScanProgress("");
    }
  };

  // Leads are matched by name+address, never by array index: the rendered list is
  // filtered (Hide saved) so its indices do not line up with the `leads` state array.
  const isSameLead = (a: Lead, b: Lead) =>
    a.name === b.name && a.address === b.address;

  const handleSaveToCRM = async (lead: Lead) => {
    setSavingId(`${lead.name}|${lead.address}`);
    try {
      const finalNiche = niche === "Custom" ? customNiche : niche;
      const payload = {
        name: lead.name,
        phone: lead.phone,
        address: lead.address,
        category: lead.category,
        website: lead.website,
        rating: lead.rating,
        reviewCount: lead.reviewCount,
        niche: finalNiche,
        location: locationInput,
        status: "New",
        whatsappLink: generateWhatsAppLink(lead) || ""
      };

      const res = await fetch("/.netlify/functions/scout-crm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...OPS_HEADERS,
        },
        body: JSON.stringify({ board, lead: payload }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save lead");

      // Update leads list status mapping
      setLeads(prev => prev.map(l => isSameLead(l, lead) ? { ...l, savedId: data.lead.id, savedStatus: "New" } : l));
      toast.success(`${lead.name} saved to Pipeline!`);
    } catch (err: any) {
      toast.error(err.message || "Could not save to CRM");
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveAllNew = async () => {
    const unsavedLeads = leads.filter(l => !l.savedId && l.phone);
    if (unsavedLeads.length === 0) {
      toast.error("No unsaved leads with phone numbers to save.");
      return;
    }

    if (!confirm(`Save all ${unsavedLeads.length} unsaved leads with phone numbers to CRM?`)) return;

    setIsLoading(true);
    setScanProgress(`Saving ${unsavedLeads.length} leads...`);

    const finalNiche = niche === "Custom" ? customNiche : niche;
    // One request for the whole batch. Sending them one at a time meant a scan
    // of 17 took minutes and stalled partway whenever a single call timed out.
    const payload = unsavedLeads.map(lead => ({
      name: lead.name,
      phone: lead.phone,
      address: lead.address,
      category: lead.category,
      website: lead.website,
      rating: lead.rating,
      reviewCount: lead.reviewCount,
      niche: finalNiche,
      location: locationInput,
      status: "New",
      whatsappLink: generateWhatsAppLink(lead) || ""
    }));

    try {
      const res = await fetch("/.netlify/functions/scout-crm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...OPS_HEADERS,
        },
        body: JSON.stringify({ board, leads: payload }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save leads");

      // Match results back by name+address; the sheet may have merged some of
      // them into existing rows rather than inserting.
      const byKey = new Map<string, any>(
        (data.leads || []).map((l: any) => [`${l.name}|${l.address}`, l])
      );
      setLeads(prev => prev.map(l => {
        const saved = byKey.get(`${l.name}|${l.address}`);
        return saved ? { ...l, savedId: saved.id, savedStatus: saved.status || "New" } : l;
      }));

      const merged = data.updated
        ? `, ${data.updated} already existed and were updated`
        : "";
      toast.success(`Saved ${data.inserted ?? payload.length} leads to ${boardLabel(board)}${merged}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save leads");
    } finally {
      setIsLoading(false);
      setScanProgress("");
    }
  };

  const generateWhatsAppLink = (lead: Lead) => {
    if (!lead.phone) return null;

    let cleanPhone = lead.phone.replace(/[\s\-\(\)]/g, "");
    if (cleanPhone.startsWith("+")) {
      cleanPhone = cleanPhone.substring(1);
    } else if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      cleanPhone = "234" + cleanPhone.substring(1);
    }

    const finalNiche = niche === "Custom" ? customNiche : niche;
    const personalizedMessage = script
      .replace(/\{\{businessName\}\}/g, lead.name)
      .replace(/\{\{location\}\}/g, locationInput)
      .replace(/\{\{niche\}\}/g, finalNiche);

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(personalizedMessage)}`;
  };
  const allNigerianDistricts = Object.entries(NIGERIAN_STATES_DISTRICTS).flatMap(([state, districts]) =>
    districts.map(dist => `${dist}, ${state}`)
  );

  const matchingSuggestions = allNigerianDistricts.filter(loc =>
    loc.toLowerCase().includes(locationInput.toLowerCase()) &&
    loc.toLowerCase() !== locationInput.toLowerCase()
  ).slice(0, 8);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">Lead Scout</h1>
          <p className="text-muted-foreground mt-1">Multi-location search engine for B2B leads in Nigeria.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Column: Script & Form Settings */}
        <div className="lg:col-span-1 space-y-6">

          {/* Active Campaign Presets */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2.5">Active Campaign Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(CAMPAIGNS).map(([key, value]) => {
                const isSelected = campaign === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCampaignChange(key as any)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all text-center flex flex-col items-center justify-center gap-1 ${isSelected
                        ? "bg-primary/10 border-primary text-primary shadow-sm"
                        : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/55 hover:text-foreground"
                      }`}
                  >
                    <span>{value.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Board = which sheet tab saves land in, and what dupes are checked against */}
            <div className="mt-3.5 pt-3.5 border-t border-border/60">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider">
                  Saving to Board
                </label>
                <button
                  type="button"
                  onClick={handleCreateBoard}
                  className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline font-medium"
                >
                  <Plus className="w-3 h-3" />
                  New
                </button>
              </div>
              <select
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={board}
                onChange={(e) => handleBoardChange(e.target.value)}
              >
                {/* Keep the active board selectable even before the list loads */}
                {!boards.some((b) => b.name === board) && (
                  <option value={board}>{boardLabel(board)}</option>
                )}
                {boards.map((b) => (
                  <option key={b.name} value={b.name}>
                    {boardLabel(b.name)} ({b.count})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                Duplicates are checked against this board only.
              </p>
            </div>
          </div>

          {/* Script Editor */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground text-sm">WhatsApp Script Template</h3>
              <div className="flex flex-wrap gap-1.5 justify-end max-w-[200px]">
                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-medium">
                  &#123;&#123;businessName&#125;&#125;
                </span>
                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-medium">
                  &#123;&#123;location&#125;&#125;
                </span>
                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-medium">
                  &#123;&#123;niche&#125;&#125;
                </span>
              </div>
            </div>
            <textarea
              className="w-full h-32 bg-muted/20 border border-input rounded-md p-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/80 resize-none font-sans"
              value={script}
              onChange={handleScriptChange}
              placeholder="Type your script here. Use {{businessName}} to inject the business name."
            />
            <p className="text-[11px] text-muted-foreground mt-2">
              Saves automatically. Instantly mapped to your WhatsApp links.
            </p>
          </div>

          {/* Scout Form */}
          <form onSubmit={handleSearch} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Target Niche</label>
              <select
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              >
                {CAMPAIGNS[campaign].categories.map((cat) => (
                  <optgroup key={cat.label} label={cat.label}>
                    {cat.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </optgroup>
                ))}
                <option value="Custom">Other (Custom)...</option>
              </select>

              {niche === "Custom" && (
                <input
                  type="text"
                  className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Solar Companies"
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value)}
                  required
                />
              )}
            </div>

            {/* Target Nigerian State */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Target Nigerian State</label>
              <select
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                value={selectedState}
                onChange={(e) => {
                  const newState = e.target.value;
                  setSelectedState(newState);
                  const firstDistrict = NIGERIAN_STATES_DISTRICTS[newState]?.[0];
                  if (firstDistrict) {
                    setLocationInput(`${firstDistrict}, ${newState}`);
                  }
                }}
              >
                {Object.keys(NIGERIAN_STATES_DISTRICTS).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Custom Location Input */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Location / Area</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-background border border-input rounded-md pl-9 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="e.g. Apapa, Lagos or Lekki"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  required
                />
                <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />

                {showSuggestions && matchingSuggestions.length > 0 && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {matchingSuggestions.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setLocationInput(loc);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-muted text-foreground transition-colors border-b border-border/30 last:border-0"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic District suggestion chips for selected state */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {NIGERIAN_STATES_DISTRICTS[selectedState]?.map((district) => {
                  const fullLoc = `${district}, ${selectedState}`;
                  const isSelected = locationInput.toLowerCase() === fullLoc.toLowerCase() || locationInput.toLowerCase() === district.toLowerCase();
                  return (
                    <button
                      key={district}
                      type="button"
                      onClick={() => {
                        setLocationInput(fullLoc);
                        setShowSuggestions(false);
                      }}
                      className={`text-[10px] px-2 py-0.5 rounded-full transition-colors border ${isSelected
                          ? "bg-primary/20 border-primary text-primary font-medium"
                          : "bg-muted/60 border-border/40 text-muted-foreground hover:bg-muted"
                        }`}
                    >
                      {district}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Engine & Precision Selector */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Search Provider */}
              <div className="bg-card border border-border rounded-xl p-3.5 space-y-2">
                <label className="block text-[9px] font-semibold text-foreground uppercase tracking-wider">Search Engine</label>
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-muted rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSearchProvider("google")}
                    className={`py-1 text-[9px] font-bold rounded transition-all ${searchProvider === "google"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/20"
                      }`}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchProvider("tomtom")}
                    className={`py-1 text-[9px] font-bold rounded transition-all ${searchProvider === "tomtom"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/20"
                      }`}
                  >
                    TomTom (Free)
                  </button>
                </div>
              </div>

              {/* Scan Mode */}
              <div className="bg-card border border-border rounded-xl p-3.5 space-y-2">
                <label className="block text-[9px] font-semibold text-foreground uppercase tracking-wider">Scan Density</label>
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-muted rounded-lg">
                  <button
                    type="button"
                    disabled={searchProvider === "tomtom"}
                    onClick={() => setScanMode("standard")}
                    className={`py-1 text-[9px] font-bold rounded transition-all ${searchProvider === "tomtom"
                        ? "opacity-30 cursor-not-allowed text-muted-foreground/40 bg-transparent"
                        : scanMode === "standard"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/20"
                      }`}
                  >
                    ⚡ Standard
                  </button>
                  <button
                    type="button"
                    disabled={searchProvider === "tomtom"}
                    onClick={() => setScanMode("grid")}
                    className={`py-1 text-[9px] font-bold rounded transition-all ${searchProvider === "tomtom"
                        ? "opacity-30 cursor-not-allowed text-muted-foreground/40 bg-transparent"
                        : scanMode === "grid"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/20"
                      }`}
                  >
                    🗺️ Deep Grid
                  </button>
                </div>
              </div>
            </div>

            {/* Collapsible Search Filters & Parameters */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-foreground uppercase tracking-wider hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                  <span>Search Filters</span>
                </div>
                {filtersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {filtersExpanded && (
                <div className="p-3.5 border-t border-border bg-muted/5 space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-foreground/80 mb-1">Website Filter</label>
                    <select
                      value={filterWebsite}
                      onChange={(e) => setFilterWebsite(e.target.value as any)}
                      className="w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="no_website">No Website / Social only</option>
                      <option value="with_website">With Website only</option>
                      <option value="any">Any Website Status (Show all)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-foreground/80 mb-1">Min Rating</label>
                    <select
                      value={filterMinRating}
                      onChange={(e) => setFilterMinRating(parseFloat(e.target.value))}
                      className="w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="0">Any Rating</option>
                      <option value="3">3.0+ stars</option>
                      <option value="4">4.0+ stars</option>
                      <option value="4.5">4.5+ stars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-foreground/80 mb-1">
                      Min Reviews <span className="text-muted-foreground">(enquiry volume)</span>
                    </label>
                    <select
                      value={filterMinReviews}
                      onChange={(e) => setFilterMinReviews(parseInt(e.target.value, 10))}
                      className="w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="0">Any</option>
                      <option value="10">10+ reviews</option>
                      <option value="25">25+ reviews</option>
                      <option value="50">50+ reviews</option>
                      <option value="100">100+ reviews</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground/80 select-none">
                      <input
                        type="checkbox"
                        checked={filterOperational}
                        onChange={(e) => setFilterOperational(e.target.checked)}
                        className="rounded border-input bg-background text-primary focus:ring-primary focus:ring-offset-0 w-3.5 h-3.5"
                      />
                      <span>Operational only</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground/80 select-none">
                      <input
                        type="checkbox"
                        checked={filterPhotos}
                        onChange={(e) => setFilterPhotos(e.target.checked)}
                        className="rounded border-input bg-background text-primary focus:ring-primary focus:ring-offset-0 w-3.5 h-3.5"
                      />
                      <span>Must have photos (Google only)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !locationInput.trim()}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-md hover:bg-primary/95 transition-colors disabled:opacity-50 text-xs mt-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {isLoading ? (scanProgress || "Searching...") : `Scan Area`}
            </button>
          </form>
        </div>

        {/* Right Column: Search Results */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm min-h-[500px] flex flex-col">

            {/* Header with Meta */}
            <div className="border-b border-border pb-3.5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground text-sm">Scouted Contacts</h3>
                {leads.length > 0 && (
                  <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-muted-foreground hover:text-foreground select-none">
                    <input
                      type="checkbox"
                      checked={hideSaved}
                      onChange={(e) => setHideSaved(e.target.checked)}
                      className="rounded border-input bg-background text-primary focus:ring-primary focus:ring-offset-0 w-3 h-3"
                    />
                    <span>Hide saved</span>
                  </label>
                )}
              </div>
              {meta && (
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded border capitalize ${meta.provider === "google"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}>
                    {meta.provider} engine
                  </span>
                  <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded">
                    {meta.total} Leads Found
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 ${meta.phoneCoverage >= 70
                      ? "bg-emerald-500/10 text-emerald-500"
                      : meta.phoneCoverage >= 40
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-red-500/10 text-red-500"
                    }`}>
                    <Phone className="w-2.5 h-2.5" />
                    {meta.withPhone}/{meta.total} Phones ({meta.phoneCoverage}%)
                  </span>

                  {leads.some(l => !l.savedId && l.phone) && (
                    <button
                      onClick={handleSaveAllNew}
                      className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-2 py-0.5 rounded font-medium transition-colors"
                    >
                      <FolderPlus className="w-3 h-3" />
                      Save All New to CRM
                    </button>
                  )}
                </div>
              )}
            </div>

            {meta && meta.provider === "tomtom" && (
              <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs mb-4 flex items-start gap-2.5 shadow-sm">
                <span className="text-base leading-none">⚠️</span>
                <p className="leading-normal">
                  <strong>Google API Quota Exhausted:</strong> We have automatically fallen back to the <strong>TomTom Search Engine</strong> to prevent search interruption today. Note that TomTom may yield fewer contact numbers than Google.
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs mb-4 flex items-start gap-2">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {!isLoading && leads.length === 0 && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-xs text-center py-20">
                <Search className="w-10 h-10 mb-3 opacity-20 text-primary" />
                <p className="font-semibold text-foreground/80 mb-0.5">No active scan results</p>
                <p className="max-w-[280px]">Select categories, check target locations, and hit Scan to source leads.</p>
              </div>
            )}

            {!isLoading && leads.length > 0 && hideSaved && leads.filter(l => !l.savedId).length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-xs text-center py-20">
                <Check className="w-10 h-10 mb-3 opacity-30 text-emerald-500" />
                <p className="font-semibold text-foreground/80 mb-0.5">All leads saved</p>
                <p className="max-w-[280px]">All {leads.length} scouted leads in this search are already stored in your CRM pipeline.</p>
              </div>
            )}

            {isLoading && leads.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-3 py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-xs font-semibold text-foreground/80 animate-pulse">{scanProgress || "Searching sub-locations..."}</p>
              </div>
            )}

            {/* Leads list */}
            <div className="space-y-2.5">
              {leads.filter(lead => !hideSaved || !lead.savedId).map((lead) => {
                const waLink = generateWhatsAppLink(lead);
                const leadKey = `${lead.name}|${lead.address}`;
                const isSaving = savingId === leadKey;

                return (
                  <div
                    key={leadKey}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border transition-all gap-4 ${lead.savedId
                        ? "bg-muted/5 border-border/40 opacity-75"
                        : "bg-muted/15 border-border/70 hover:border-primary/30"
                      }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2">
                        <h4 className="font-semibold text-foreground text-xs leading-snug">{lead.name}</h4>
                        {lead.savedId && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-medium uppercase tracking-wider">
                            <Check className="w-2.5 h-2.5" />
                            CRM: {lead.savedStatus || "Saved"}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-muted-foreground">
                        {lead.rating > 0 && (
                          <span className="flex items-center text-amber-500 font-semibold shrink-0">
                            <Star className="w-2.5 h-2.5 mr-0.5 fill-current" />
                            {lead.rating} ({lead.reviewCount})
                          </span>
                        )}
                        {lead.category && (
                          <span className="bg-muted px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono text-foreground/70 shrink-0">
                            {lead.category}
                          </span>
                        )}
                        <span className="flex items-center max-w-[200px] truncate">
                          <MapPin className="w-2.5 h-2.5 mr-0.5 shrink-0" />
                          <span className="truncate">{lead.address}</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <span className={`text-[11px] font-mono font-medium ${lead.phone ? "text-foreground/90" : "text-muted-foreground/30"}`}>
                          {lead.phone || "No phone listed"}
                        </span>
                        {lead.website && (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[11px] text-primary hover:underline"
                          >
                            <Globe className="w-2.5 h-2.5" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 sm:self-center">
                      {/* Save to CRM button */}
                      {!lead.savedId && (
                        <button
                          onClick={() => handleSaveToCRM(lead)}
                          disabled={isSaving}
                          className="inline-flex items-center justify-center p-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors"
                          title="Save to CRM"
                        >
                          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      )}

                      {/* Build Bridge Page button */}
                      <Link
                        to={`/ops/bridge-builder?name=${encodeURIComponent(lead.name)}&address=${encodeURIComponent(lead.address)}&phone=${encodeURIComponent(lead.phone || "")}&rating=${lead.rating}&reviews=${lead.reviewCount}&niche=${encodeURIComponent(niche)}&location=${encodeURIComponent(locationInput)}`}
                        className="inline-flex items-center justify-center p-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors"
                        title="Build Bridge Page"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </Link>

                      {waLink ? (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            // If not saved, automatically save it first
                            if (!lead.savedId) {
                              handleSaveToCRM(lead);
                            }
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-semibold text-[11px] rounded-md transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Send WhatsApp
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground font-medium text-[11px] rounded-md whitespace-nowrap opacity-40 cursor-not-allowed">
                          No Phone
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
