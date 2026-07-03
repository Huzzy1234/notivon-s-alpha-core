// Mock data for the Document Processor demo — mock only, no backend.
// The story: upload a document → AI extracts the fields → the record lands in a CRM.
// Extraction output is PRE-WRITTEN per doc type so it's stable on camera.
// Nigerian-real content (specific > generic, anti-slop).

export type DocType = "Invoice" | "Waybill" | "Receipt" | "ID";

export interface ExtractedField {
  key: string;
  value: string;
  /** 0–100. < 80 renders as an amber "needs review" field. */
  confidence: number;
}

export interface DocPreview {
  variant: "letter" | "id";
  letterhead: string;
  sub: string;
  docLabel: string;
  meta: { label: string; value: string }[];
  lineItems?: { desc: string; qty: string; amount: string }[];
  totalLabel?: string;
  totalValue?: string;
}

/** A scripted sample document (behind the "try a sample" buttons). */
export interface SampleDoc {
  id: string;
  type: DocType;
  label: string;
  filename: string;
  template: string;
  preview: DocPreview;
  fields: ExtractedField[];
  /** How this doc maps into a CRM record row. */
  record: { primary: string; value: string; date: string };
}

/** A CRM destination — cosmetic; drives the Send label + table header. */
export interface Destination {
  id: string;
  name: string;
  /** tailwind text color for the little dot/badge */
  tone: string;
}

/** A row in the on-screen CRM records table. */
export interface CrmRecord {
  id: string;
  primary: string;
  type: DocType;
  value: string;
  date: string;
  added: string;
}

/* ── The template selector (the "configurable per business" hook) ── */
export const TEMPLATES = [
  "Supplier Invoice · 8 fields",
  "Freight Waybill · 7 fields",
  "POS Receipt · 6 fields",
  "Passport / ID · 6 fields",
  "+ Configure new template",
] as const;

/* ── CRM destinations ── */
export const DESTINATIONS: Destination[] = [
  { id: "hubspot", name: "HubSpot", tone: "text-orange-500" },
  { id: "salesforce", name: "Salesforce", tone: "text-sky-500" },
  { id: "sheets", name: "Google Sheets", tone: "text-emerald-500" },
  { id: "airtable", name: "Airtable", tone: "text-yellow-500" },
  { id: "notion", name: "Notion", tone: "text-foreground" },
  { id: "custom", name: "Your CRM", tone: "text-primary" },
];

/* ── The sample documents ── */
export const SAMPLES: SampleDoc[] = [
  {
    id: "invoice",
    type: "Invoice",
    label: "Invoice",
    filename: "INV-DCP-0912.pdf",
    template: "Supplier Invoice · 8 fields",
    preview: {
      variant: "letter",
      letterhead: "Dangote Cement Plc",
      sub: "1 Alfred Rewane Rd, Ikoyi, Lagos · RC 208767",
      docLabel: "INVOICE",
      meta: [
        { label: "Invoice No.", value: "INV-DCP-0912" },
        { label: "Date", value: "27 Jun 2026" },
        { label: "Due", value: "11 Jul 2026" },
        { label: "PO No.", value: "PO-4471" },
      ],
      lineItems: [
        { desc: "42.5R Cement — 600 bags", qty: "600", amount: "₦5,400,000" },
        { desc: "Haulage — Lagos → Ibadan", qty: "1", amount: "₦380,000" },
        { desc: "Pallet & wrap", qty: "12", amount: "₦96,000" },
      ],
      totalLabel: "Total due (incl. 7.5% VAT)",
      totalValue: "₦6,313,700",
    },
    fields: [
      { key: "Supplier", value: "Dangote Cement Plc", confidence: 99 },
      { key: "Invoice number", value: "INV-DCP-0912", confidence: 98 },
      { key: "Invoice date", value: "2026-06-27", confidence: 97 },
      { key: "Due date", value: "2026-07-11", confidence: 95 },
      { key: "Subtotal", value: "₦5,876,000", confidence: 96 },
      { key: "VAT (7.5%)", value: "₦437,700", confidence: 91 },
      { key: "Total due", value: "₦6,313,700", confidence: 94 },
      { key: "PO reference", value: "PO-4471", confidence: 72 },
    ],
    record: { primary: "Dangote Cement Plc", value: "₦6,313,700", date: "27 Jun 2026" },
  },
  {
    id: "waybill",
    type: "Waybill",
    label: "Waybill",
    filename: "waybill_GIG_88213.jpg",
    template: "Freight Waybill · 7 fields",
    preview: {
      variant: "letter",
      letterhead: "GIG Logistics",
      sub: "Waybill · Apapa Port, Lagos",
      docLabel: "WAYBILL",
      meta: [
        { label: "Waybill No.", value: "GIG-88213" },
        { label: "Date", value: "26 Jun 2026" },
        { label: "Container", value: "MSKU-774120-3" },
        { label: "HS Code", value: "8517.62" },
      ],
      lineItems: [
        { desc: "Networking equipment", qty: "18 ctn", amount: "48.0 kg" },
        { desc: "Accessories", qty: "6 ctn", amount: "12.5 kg" },
      ],
      totalLabel: "Declared value (CIF)",
      totalValue: "$14,200",
    },
    fields: [
      { key: "Carrier", value: "GIG Logistics", confidence: 98 },
      { key: "Waybill number", value: "GIG-88213", confidence: 96 },
      { key: "Container number", value: "MSKU-774120-3", confidence: 88 },
      { key: "HS code", value: "8517.62", confidence: 90 },
      { key: "Gross weight", value: "60.5 kg", confidence: 93 },
      { key: "Declared value (CIF)", value: "$14,200", confidence: 76 },
      { key: "Consignee", value: "Bello Ventures Ltd", confidence: 94 },
    ],
    record: { primary: "GIG Logistics · GIG-88213", value: "$14,200", date: "26 Jun 2026" },
  },
  {
    id: "passport",
    type: "ID",
    label: "Passport",
    filename: "passport_okafor.jpg",
    template: "Passport / ID · 6 fields",
    preview: {
      variant: "id",
      letterhead: "Federal Republic of Nigeria",
      sub: "Passport",
      docLabel: "PASSPORT",
      meta: [
        { label: "Surname", value: "OKAFOR" },
        { label: "Given names", value: "CHINEDU EMMANUEL" },
        { label: "Passport No.", value: "A50882231" },
        { label: "Nationality", value: "Nigerian" },
        { label: "Date of birth", value: "14 MAR 1991" },
        { label: "Expiry", value: "09 AUG 2029" },
      ],
    },
    fields: [
      { key: "Surname", value: "Okafor", confidence: 99 },
      { key: "Given names", value: "Chinedu Emmanuel", confidence: 97 },
      { key: "Passport number", value: "A50882231", confidence: 98 },
      { key: "Nationality", value: "Nigerian", confidence: 99 },
      { key: "Date of birth", value: "1991-03-14", confidence: 95 },
      { key: "Expiry date", value: "2029-08-09", confidence: 82 },
    ],
    record: { primary: "Chinedu Emmanuel Okafor", value: "Passport A50882231", date: "14 Mar 1991" },
  },
  {
    id: "receipt",
    type: "Receipt",
    label: "Receipt",
    filename: "receipt_scan_0033.jpg",
    template: "POS Receipt · 6 fields",
    preview: {
      variant: "letter",
      letterhead: "Shoprite — Ikeja City Mall",
      sub: "Obafemi Awolowo Way, Ikeja, Lagos",
      docLabel: "RECEIPT",
      meta: [
        { label: "Receipt", value: "#0033-2261" },
        { label: "Date", value: "25 Jun 2026" },
        { label: "Till", value: "07" },
        { label: "Cashier", value: "Amaka" },
      ],
      lineItems: [
        { desc: "Printer paper A4 (5)", qty: "5", amount: "₦18,500" },
        { desc: "Ink cartridge", qty: "2", amount: "₦31,000" },
        { desc: "Stapler + pins", qty: "1", amount: "₦4,200" },
      ],
      totalLabel: "Total paid (card)",
      totalValue: "₦53,700",
    },
    fields: [
      { key: "Merchant", value: "Shoprite Ikeja", confidence: 97 },
      { key: "Receipt number", value: "0033-2261", confidence: 84 },
      { key: "Date", value: "2026-06-25", confidence: 96 },
      { key: "Total", value: "₦53,700", confidence: 95 },
      { key: "Payment method", value: "Card", confidence: 92 },
      { key: "Category", value: "Office supplies", confidence: 69 },
    ],
    record: { primary: "Shoprite Ikeja · #0033-2261", value: "₦53,700", date: "25 Jun 2026" },
  },
];

/* ── Pre-seeded CRM rows so the table looks live before the first Send ── */
export const SEEDED_RECORDS: CrmRecord[] = [
  {
    id: "seed-1",
    primary: "Flour Mills of Nigeria",
    type: "Invoice",
    value: "₦2,145,000",
    date: "24 Jun 2026",
    added: "yesterday",
  },
  {
    id: "seed-2",
    primary: "Maersk · MRKU-201883",
    type: "Waybill",
    value: "$9,850",
    date: "23 Jun 2026",
    added: "2 days ago",
  },
  {
    id: "seed-3",
    primary: "Aisha Bello",
    type: "ID",
    value: "Passport B1120448",
    date: "19 Aug 1994",
    added: "3 days ago",
  },
];

/** Pick a scripted sample by the uploaded file's name (waybill/passport/receipt, else invoice). */
export function matchSampleByFilename(name: string): SampleDoc {
  const n = name.toLowerCase();
  if (n.includes("waybill") || n.includes("bill") || n.includes("bl")) return byId("waybill");
  if (n.includes("passport") || n.includes("id") || n.includes("nin")) return byId("passport");
  if (n.includes("receipt") || n.includes("pos")) return byId("receipt");
  return byId("invoice");
}

/** Map an extracted sample (with any user edits) into a CRM record row. */
export function docToRecord(
  sample: SampleDoc,
  values: Record<string, string>,
  id: string,
): CrmRecord {
  // Reflect any edit the user made to the lead/primary field (first field) or total.
  const primaryEdit = values[sample.fields[0].key];
  const valueField = sample.fields.find((f) =>
    /total|value|amount/i.test(f.key),
  );
  const valueEdit = valueField ? values[valueField.key] : undefined;
  return {
    id,
    primary: primaryEdit
      ? sample.record.primary.replace(sample.fields[0].value, primaryEdit)
      : sample.record.primary,
    type: sample.type,
    value: valueEdit ?? sample.record.value,
    date: sample.record.date,
    added: "just now",
  };
}

function byId(id: string): SampleDoc {
  return SAMPLES.find((s) => s.id === id) ?? SAMPLES[0];
}
