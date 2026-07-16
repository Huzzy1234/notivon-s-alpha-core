import { useState } from "react";
import { Calculator, BarChart3, Clock, DollarSign, ArrowRight, ShieldCheck, Download, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function CostCalculator() {
  // Client Inputs
  const [leadsNeeded, setLeadsNeeded] = useState<number>(1000);
  const [convRate, setConvRate] = useState<number>(2); // percent
  const [aov, setAov] = useState<number>(150000); // NGN
  const [manualHours, setManualHours] = useState<number>(15); // hours/week
  const [hourlyRate, setHourlyRate] = useState<number>(2500); // NGN/hour
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");

  // Notivon Configs
  const notivonMonthlyFee = currency === "NGN" ? 45000 : 75; // 45k NGN or $75 USD
  const usdToNgnRate = 1600; // Exchange rate indicator

  // Convert for calculations if currency is USD
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : "USD",
      maximumFractionDigits: 0,
    }).format(val).replace("NGN", "₦");
  };

  // Google Maps API Estimator (9-zone scan model)
  // 1 initial geocode + 9 zones = 10 queries per search
  const queriesPerSearch = 10;
  const estimatedSearchesPerMonth = Math.ceil(leadsNeeded / 100); // assume 100 leads per search average
  const totalEstimatedQueries = estimatedSearchesPerMonth * queriesPerSearch;
  
  // Google Places API Pricing: $32 per 1,000 queries ($0.032/query)
  // Google gives $200 free credit monthly (6,250 queries free)
  const freeTierLimit = 6250;
  const apiCostUSD = totalEstimatedQueries <= freeTierLimit 
    ? 0 
    : (totalEstimatedQueries - freeTierLimit) * 0.032;
  const apiCost = currency === "NGN" ? apiCostUSD * usdToNgnRate : apiCostUSD;

  // Sourcing Hours cost (Manual vs Automated)
  const manualMonthlyCost = manualHours * hourlyRate * 4.33; // 4.33 weeks per month
  const notivonTotalMonthlyCost = notivonMonthlyFee + apiCost;

  // Savings and revenue lift
  const laborSavings = Math.max(0, manualMonthlyCost - notivonTotalMonthlyCost);
  const potentialDeals = Math.round(leadsNeeded * (convRate / 100));
  const potentialRevenue = potentialDeals * aov;
  const netBusinessValue = potentialRevenue + laborSavings;
  const roiMultiplier = notivonTotalMonthlyCost > 0 ? (netBusinessValue / notivonTotalMonthlyCost) : 0;

  // Custom copy script generator for sales pitches
  const handleCopyPitch = () => {
    const pitchText = `🚀 Notivon Value Proposition Summary

Target Client Monthly Metrics:
- Leads Required: ${leadsNeeded.toLocaleString()} leads/mo
- Est. Conversion Rate: ${convRate}%
- Avg. Deal Value: ${formatCurrency(aov)}

Manual vs. Automated Sourcing Comparison:
- Current Manual Labor Cost: ${formatCurrency(manualMonthlyCost)}/mo (${manualHours} hrs/week @ ${formatCurrency(hourlyRate)}/hr)
- Notivon Managed Solution Cost: ${formatCurrency(notivonTotalMonthlyCost)}/mo (Subscription + Est. Google API Billing)
- Direct Labor Cost Savings: ${formatCurrency(laborSavings)}/mo (Saved ${Math.round(manualHours * 4.33)} Sourcing Hours/mo)

Revenue Lift & Strategic Growth:
- Projected New Closed Deals: ${potentialDeals} deals/mo
- Projected Monthly Revenue Lift: ${formatCurrency(potentialRevenue)}/mo
- Total Net Monthly Business Value: ${formatCurrency(netBusinessValue)}/mo
- Estimated First-Month ROI: ${roiMultiplier.toFixed(1)}x

Google API Free-Tier Health Indicator:
- Monthly Searches: ${estimatedSearchesPerMonth} scans
- Est. Google API Queries: ${totalEstimatedQueries} of ${freeTierLimit.toLocaleString()} free allowance
- Additional API Billing: ${apiCost === 0 ? "₦0 (100% Free Tier Covered)" : formatCurrency(apiCost)}

Generated via Notivon CRM Discovery tools.`;

    navigator.clipboard.writeText(pitchText);
    toast.success("Sales Pitch Copy copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight flex items-center gap-2">
            <Calculator className="w-8 h-8 text-primary" />
            ROI & Cost Calculator
          </h1>
          <p className="text-muted-foreground mt-1">
            Interactive value modeler for live client discovery meetings and cloud budget scoping.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start bg-card border border-border rounded-lg p-1">
          <button
            onClick={() => setCurrency("NGN")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              currency === "NGN" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            NGN (₦)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              currency === "USD" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Prospect Discovery Inputs</h3>
            </div>

            {/* Target Lead Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Monthly Lead Volume Needed</span>
                <span className="font-bold text-foreground font-mono bg-muted px-2 py-0.5 rounded text-[11px]">
                  {leadsNeeded.toLocaleString()} leads
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={leadsNeeded}
                onChange={(e) => setLeadsNeeded(parseInt(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Target Conversion Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Target Sales Conversion Rate</span>
                <span className="font-bold text-foreground font-mono bg-muted px-2 py-0.5 rounded text-[11px]">
                  {convRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={convRate}
                onChange={(e) => setConvRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Average Order Value */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Average Order Value (AOV)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={aov}
                    onChange={(e) => setAov(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-background border border-input rounded-md pl-8 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-medium">
                    {currency === "NGN" ? "₦" : "$"}
                  </span>
                </div>
              </div>

              {/* Team Hourly Sourcing Rate */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Internal Team Hourly Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-background border border-input rounded-md pl-8 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-medium">
                    {currency === "NGN" ? "₦" : "$"}
                  </span>
                </div>
              </div>
            </div>

            {/* Manual Sourcing Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Current Weekly Lead Sourcing (Hours)</span>
                <span className="font-bold text-foreground font-mono bg-muted px-2 py-0.5 rounded text-[11px]">
                  {manualHours} hrs/week
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="80"
                value={manualHours}
                onChange={(e) => setManualHours(parseInt(e.target.value))}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Infrastructure cost allocation */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3 mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Google Maps API Cost Scope</h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
                <span className="block text-[10px] text-muted-foreground uppercase font-medium">Est. Monthly Scans</span>
                <span className="text-lg font-bold text-foreground font-mono mt-1 block">
                  {estimatedSearchesPerMonth} scans
                </span>
                <span className="text-[9px] text-muted-foreground mt-0.5 block">100 leads avg / scan</span>
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
                <span className="block text-[10px] text-muted-foreground uppercase font-medium">Google API Queries</span>
                <span className="text-lg font-bold text-foreground font-mono mt-1 block">
                  {totalEstimatedQueries.toLocaleString()}
                </span>
                <span className="text-[9px] text-muted-foreground mt-0.5 block">9 cardinal zones + center</span>
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-3 text-center">
                <span className="block text-[10px] text-muted-foreground uppercase font-medium">Est. Google API Bill</span>
                <span className={`text-lg font-bold mt-1 block font-mono ${apiCost === 0 ? "text-emerald-500" : "text-amber-500"}`}>
                  {apiCost === 0 ? "Free" : formatCurrency(apiCost)}
                </span>
                <span className="text-[9px] text-muted-foreground mt-0.5 block">
                  {apiCost === 0 ? "Under $200 Tier" : "Over free quota"}
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground leading-relaxed bg-muted/20 rounded-lg p-3 border border-border/30">
              💡 **Google Cloud Console Billing Note**: Google allocates **$200 in free credit monthly** (approx. 6,250 Places API requests). A high-density grid scan utilizes 10 Place queries. At current usage, {estimatedSearchesPerMonth} district runs are 100% free.
            </div>
          </div>
        </div>

        {/* Right Column: Calculations & Call to Action */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Main Results Card */}
          <div className="bg-gradient-to-br from-card to-background border border-border rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
            
            <h3 className="font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Notivon ROI Summary
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Labor Cost Savings</span>
                <span className="text-2xl font-bold text-foreground font-mono mt-0.5 block">
                  {formatCurrency(laborSavings)}
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  Saved {Math.round(manualHours * 4.33)} hours of sourcing labor
                </span>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Est. Monthly Revenue Lift</span>
                <span className="text-2xl font-bold text-primary font-mono mt-0.5 block">
                  {formatCurrency(potentialRevenue)}
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">
                  From {potentialDeals} new closed accounts/mo
                </span>
              </div>

              <div className="border-t border-border/80 pt-4">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">First-Month ROI Factor</span>
                <span className="text-4xl font-extrabold text-foreground font-mono mt-1 block text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
                  {roiMultiplier.toFixed(1)}x
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={handleCopyPitch}
                className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg text-xs hover:bg-primary/95 transition-all flex items-center justify-center gap-2 group shadow"
              >
                <span>Copy Sales Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">Cost Breakdown</h4>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                Manual Process Cost:
              </span>
              <span className="font-semibold text-foreground font-mono">{formatCurrency(manualMonthlyCost)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-muted-foreground" />
                Notivon Subscription:
              </span>
              <span className="font-semibold text-foreground font-mono">{formatCurrency(notivonMonthlyFee)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                Google Places API Fee:
              </span>
              <span className="font-semibold text-foreground font-mono">{formatCurrency(apiCost)}</span>
            </div>

            <div className="border-t border-border/50 pt-2.5 flex items-center justify-between text-xs font-semibold">
              <span className="text-foreground">Total Notivon Running Cost:</span>
              <span className="text-primary font-mono">{formatCurrency(notivonTotalMonthlyCost)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
