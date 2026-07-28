import { Ship, MapPin, MessageCircle, FileText, Clock, Users, ShieldCheck } from "lucide-react";
import ProductPage from "@/marketing/ProductPage";

const ClearVoy = () => (
  <ProductPage
    metaTitle="ClearVoy | Notivon — Systems for Customs Clearing Agents"
    metaDescription="ClearVoy is purpose-built for customs clearing agents. Manage shipment pipelines, track releases, update clients via WhatsApp, and operate from the field on mobile."
    badge="For Customs Clearing Agents"
    identity="#059669"
    identityDeep="#047857"
    identitySoft="rgba(5,150,105,0.10)"
    headPre="Clear cargo, not"
    headAccent="confusion."
    sub="ClearVoy is the operations dashboard built for how clearing agents actually work at Nigerian ports. Pipeline management, field updates, and WhatsApp client comms — all from your phone."
    heroImage="/clearvoy-mockup.png"
    demoSrc="https://kommodo.ai/recordings/H8BiIYDheGNcgztGJ7ei?onlyRecording=1"
    demoHeading="See ClearVoy in action"
    demoSub="Watch how ClearVoy manages shipment pipelines and keeps clients updated from the field."
    featuresAccent="voyage"
    featuresSub="Every feature is designed around how clearing agents actually operate at Nigerian ports."
    features={[
      {
        icon: Ship,
        title: "Shipment pipeline management",
        description: "A visual operations board that tracks every shipment through its lifecycle — from documentation to final release.",
        points: [
          "Multi-stage pipeline (Pre-Arrival → Customs → Release)",
          "Drag-and-drop stage progression",
          "Real-time status at a glance",
          "Separate tracking for Customs, Shipping Line & Terminal release",
        ],
      },
      {
        icon: MapPin,
        title: "Field agent operations",
        description: "Purpose-built for agents who live at the port. Mobile-first interface designed for one-handed operation on the go.",
        points: [
          "Mobile-optimized bento-grid dashboard",
          "Quick-action buttons for common updates",
          "Job detail sheets with full history",
          "Works on any device, any network",
        ],
      },
      {
        icon: MessageCircle,
        title: "WhatsApp client updates",
        description: "Keep importers and clients informed at every stage with pre-built WhatsApp message templates.",
        points: [
          "One-tap status updates to clients",
          "Pre-formatted professional messages",
          "Message preview before sending",
          "Full communication history log",
        ],
      },
      {
        icon: FileText,
        title: "Document & duty tracking",
        description: "Track every document, duty payment, and release authorization in one organized system.",
        points: [
          "Bill of Lading & Form M tracking",
          "Duty assessment and payment logs",
          "Pre-Arrival Assessment Report (PAAR) management",
          "Automated document checklist per shipment",
        ],
      },
    ]}
    caps={[
      { icon: Clock, title: "Real-time dashboards", description: "Live stats on active jobs, pending releases, and pipeline throughput — so you always know where things stand." },
      { icon: Users, title: "Client management", description: "Organized profiles for importers and businesses with full shipment history and contact details." },
      { icon: ShieldCheck, title: "Compliance ready", description: "Built around NCS processes with proper stage gates to ensure nothing is missed or submitted out of order." },
    ]}
    ctaHeading="Ready to streamline your clearing operations?"
    ctaSub="Let's discuss how ClearVoy can help your team process more shipments with less chaos."
  />
);

export default ClearVoy;
