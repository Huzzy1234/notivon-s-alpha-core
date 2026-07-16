import { useState, useEffect } from "react";
import { Loader2, MessageCircle, Phone, Trash2, Calendar, PlusCircle, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface CRMLead {
  id: string;
  name: string;
  phone: string;
  address: string;
  category: string;
  website: string;
  rating: number;
  reviewCount: number;
  niche: string;
  location: string;
  status: 'New' | 'Contacted' | 'Responded' | 'Won' | 'Lost';
  notes?: string;
  scoutedAt?: string;
  contactedAt?: string;
}

const COLUMNS: { id: CRMLead['status']; label: string; color: string; bg: string; border: string }[] = [
  { id: 'New', label: '🆕 New Leads', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'Contacted', label: '💬 Contacted', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'Responded', label: '⚡ Responded', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'Won', label: '🎉 Deal Won', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'Lost', label: '❌ Lost / Closed', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
];

export default function Pipeline() {
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Load custom script from localStorage
  const getWhatsAppMessage = (name: string) => {
    const script = localStorage.getItem("scout_script") || "";
    if (!script) return "";
    return script.replace(/\{\{businessName\}\}/g, name);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/.netlify/functions/scout-crm", {
        method: "GET",
        headers: {
          "X-Ops-Auth": "notivon-internal-2026",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load pipeline leads");
      setLeads(data.leads || []);
    } catch (err: any) {
      toast.error(err.message || "Could not retrieve leads from Airtable");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (lead: CRMLead, newStatus: CRMLead['status']) => {
    setIsUpdating(lead.id);
    const updatedLead = { ...lead, status: newStatus };
    
    // Automatically set contactedAt timestamp if moving to Contacted
    if (newStatus === "Contacted" && !lead.contactedAt) {
      updatedLead.contactedAt = new Date().toISOString();
    }

    try {
      const res = await fetch("/.netlify/functions/scout-crm", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Ops-Auth": "notivon-internal-2026",
        },
        body: JSON.stringify(updatedLead),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update lead status");
      
      setLeads(prev => prev.map(l => l.id === lead.id ? data.lead : l));
      toast.success(`Moved ${lead.name} to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleUpdateNotes = async (lead: CRMLead) => {
    setIsUpdating(lead.id);
    const updatedLead = { ...lead, notes: tempNotes };

    try {
      const res = await fetch("/.netlify/functions/scout-crm", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Ops-Auth": "notivon-internal-2026",
        },
        body: JSON.stringify(updatedLead),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save notes");
      
      setLeads(prev => prev.map(l => l.id === lead.id ? data.lead : l));
      setEditingNotesId(null);
      toast.success("Notes saved");
    } catch (err: any) {
      toast.error(err.message || "Failed to save notes");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name} from your CRM?`)) return;
    
    setIsUpdating(id);
    try {
      const res = await fetch(`/.netlify/functions/scout-crm?id=${id}`, {
        method: "DELETE",
        headers: {
          "X-Ops-Auth": "notivon-internal-2026",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete lead");
      }
      
      setLeads(prev => prev.filter(l => l.id !== id));
      toast.success(`${name} deleted from pipeline`);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete lead");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleWhatsAppSend = (lead: CRMLead) => {
    if (!lead.phone) return;

    let cleanPhone = lead.phone.replace(/[\s\-\(\)\+]/g, "");
    if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      cleanPhone = "234" + cleanPhone.substring(1);
    }

    const message = getWhatsAppMessage(lead.name);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");

    // Automatically update status to 'Contacted' if it's currently 'New'
    if (lead.status === "New") {
      handleUpdateStatus(lead, "Contacted");
    }
  };

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return "";
    const date = new Date(isoStr);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">Outreach Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track contacts, schedule meetings, and win deals.</p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground border border-border text-sm rounded-md transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Board
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-96 text-muted-foreground space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Loading your pipeline columns...</p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 items-start overflow-x-auto pb-6">
          {COLUMNS.map((col) => {
            const colLeads = leads.filter((l) => l.status === col.id);
            return (
              <div key={col.id} className="bg-card border border-border rounded-xl p-3 flex flex-col min-w-[240px] max-h-[750px] shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3 px-1">
                  <span className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    {col.label}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${col.bg} ${col.color}`}>
                    {colLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5 overflow-y-auto pr-1">
                  {colLeads.length === 0 ? (
                    <div className="border border-dashed border-border/50 rounded-lg p-6 text-center text-xs text-muted-foreground/60 py-10">
                      Empty column
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className={`group relative border border-border/60 hover:border-primary/40 bg-muted/10 hover:bg-muted/20 p-3 rounded-lg transition-all space-y-2.5 ${
                          isUpdating === lead.id ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-semibold text-xs text-foreground leading-tight group-hover:text-primary transition-colors pr-2">
                              {lead.name}
                            </h4>
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {lead.category && (
                            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded inline-block mt-1 font-mono">
                              {lead.category}
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] space-y-1 text-muted-foreground border-t border-border/40 pt-2">
                          <p className="font-mono text-foreground/80 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </p>
                          <p className="truncate" title={lead.address}>{lead.address}</p>
                        </div>

                        {/* Notes Section */}
                        <div className="bg-background/40 rounded p-1.5 border border-border/40 text-[10px]">
                          {editingNotesId === lead.id ? (
                            <div className="space-y-1">
                              <textarea
                                className="w-full bg-background border border-input rounded p-1 text-[10px] resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                rows={2}
                                placeholder="Add notes..."
                              />
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleUpdateNotes(lead)}
                                  className="px-1.5 py-0.5 bg-primary text-primary-foreground rounded"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingNotesId(lead.id);
                                setTempNotes(lead.notes || "");
                              }}
                              className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors min-h-[14px]"
                            >
                              {lead.notes ? lead.notes : <span className="italic opacity-60">Click to add notes...</span>}
                            </div>
                          )}
                        </div>

                        {/* Footer Timestamps / Column Shifts */}
                        <div className="flex items-center justify-between border-t border-border/40 pt-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3" />
                            {col.id === 'New' ? formatDate(lead.scoutedAt) : formatDate(lead.contactedAt)}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {/* Action selector */}
                            <select
                              className="bg-muted text-[10px] rounded px-1 py-0.5 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead, e.target.value as CRMLead['status'])}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Responded">Responded</option>
                              <option value="Won">Won</option>
                              <option value="Lost">Lost</option>
                            </select>

                            {lead.phone && (
                              <button
                                onClick={() => handleWhatsAppSend(lead)}
                                className="p-1 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                                title="WhatsApp Client"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
