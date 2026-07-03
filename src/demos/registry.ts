// Central registry of all demo UIs.
// Add each new demo here so the gallery + routing can pick it up.
//
// Nothing is "built" yet — these are the planned shortlist, ranked by how
// strongly a business owner recognizes the problem. We build the actual
// `systems/<slug>` screens once the anchor vertical is chosen.

import type { DemoDefinition } from "./types";

export const DEMOS: DemoDefinition[] = [
  {
    slug: "whatsapp-to-dashboard",
    title: "WhatsApp Chaos → Clean Dashboard",
    problem: "The whole business is buried in WhatsApp threads — nothing is tracked.",
    vertical: "general-smb",
    status: "planned",
  },
  {
    slug: "document-processor",
    title: "Document Processor",
    problem: "Staff manually type data from passports / invoices / waybills all day.",
    vertical: "travel",
    status: "built",
  },
  {
    slug: "booking-no-shows",
    title: "Booking + No-Show Reminders",
    problem: "Appointments and follow-ups fall through the cracks; revenue leaks.",
    vertical: "clinic",
    status: "planned",
  },
  {
    slug: "landed-cost",
    title: "Landed-Cost / Import Calculator",
    problem: "Importers guess true landed cost by hand across FX, duty, and clearing.",
    vertical: "freight",
    status: "planned",
  },
];
