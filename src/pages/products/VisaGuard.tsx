import { FileText, Bell, Users, MessageCircle, Camera, BarChart3, Globe } from "lucide-react";
import ProductPage from "@/marketing/ProductPage";

const VisaGuard = () => (
  <ProductPage
    metaTitle="VisaGuard | Notivon — Systems for Visa & Travel Agencies"
    metaDescription="VisaGuard is purpose-built for visa and travel agencies. Automate document collection, track expiring records, manage pipelines, and keep clients informed via WhatsApp."
    badge="For Visa & Travel Agencies"
    identity="#2E6BFF"
    identityDeep="#1E52DB"
    identitySoft="rgba(46,107,255,0.10)"
    headPre="Stop losing applications to"
    headAccent="chaos."
    sub="VisaGuard is purpose-built for how visa agencies actually work. Automated document collection, expiry tracking, compliance checks, and client portals — all in one system."
    heroImage="/visaguard-mockup.png"
    demoSrc="https://www.loom.com/embed/bf8c944baa184547a39bbe3b268eb6c8?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
    demoHeading="See VisaGuard in action"
    demoSub="Watch how VisaGuard organizes your workflow, tracks documents, and keeps your clients informed automatically."
    featuresAccent="precision"
    featuresSub="Every feature is designed around how visa agencies actually operate day-to-day."
    features={[
      {
        icon: FileText,
        title: "Intelligent document management",
        description: "Automated collection, organization, and validation of all client visa documents in one organized pipeline.",
        points: [
          "Per-visa-type requirements checklists",
          "Automated missing document chasing",
          "Centralized, searchable file storage",
          "Secure, encrypted cloud architecture",
        ],
      },
      {
        icon: Bell,
        title: "Automated expiry tracking",
        description: "Monitor passport expiry dates, medical certificates, and police clearances with zero manual spreadsheet work.",
        points: [
          "Proactive 30/60/90 day warnings",
          "Compliance-blocking prevention",
          "Automated client renewal nudges",
          "Global team dashboard views",
        ],
      },
      {
        icon: Users,
        title: "Branded client portals",
        description: "Give every client a professional, white-labeled portal to upload documents and track their application.",
        points: [
          "No-login magic link access",
          "Live status progress bars",
          "Mobile-first responsive upload experience",
          "Direct-to-agent secure messaging",
        ],
      },
      {
        icon: MessageCircle,
        title: "WhatsApp automation",
        description: "Tap into the most popular messaging app to keep your clients informed automatically.",
        points: [
          "Automated status update broadcasts",
          "Interview reminder drop sequences",
          "Missing document gentle nudges",
          "Two-way conversational history log",
        ],
      },
    ]}
    caps={[
      { icon: Camera, title: "Photo & file compliance", description: "Automatic checks for photo dimensions, file sizes, and format requirements before submission." },
      { icon: BarChart3, title: "Application pipeline", description: "A visual board tracking every application from intake through to decision. Know where each case stands instantly." },
      { icon: Globe, title: "Multi-visa type support", description: "Student visas, work permits, tourist visas, family reunification — each with its own checklist and workflow." },
    ]}
    ctaHeading="Ready to streamline your agency?"
    ctaSub="Let's discuss how VisaGuard can save your team hours every week and eliminate costly errors."
  />
);

export default VisaGuard;
