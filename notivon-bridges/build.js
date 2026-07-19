#!/usr/bin/env node
/**
 * Notivon Bridge Builder
 * Usage: node build.js <client-slug>
 * Example: node build.js zazaspa
 *
 * Reads _clients/<slug>.json → injects into _template/index.html → writes <slug>/index.html
 */

const fs = require("fs");
const path = require("path");

// ── Accent color palettes (name → CSS vars block) ──────────────────────────
const PALETTES = {
  rose: {
    accent: "#d15a7c",
    accentDark: "#a03d58",
    accentDarker: "#7c1b37",
    accentLight: "#fff3f6",
    accentRgb: "209, 90, 124",
    accentGlow: "rgba(209, 90, 124, 0.12)",
  },
  teal: {
    accent: "#0f766e",
    accentDark: "#115e59",
    accentDarker: "#134e4a",
    accentLight: "#f0fdfa",
    accentRgb: "15, 118, 110",
    accentGlow: "rgba(15, 118, 110, 0.12)",
  },
  indigo: {
    accent: "#4f46e5",
    accentDark: "#3730a3",
    accentDarker: "#1e1b4b",
    accentLight: "#eef2ff",
    accentRgb: "79, 70, 229",
    accentGlow: "rgba(79, 70, 229, 0.12)",
  },
  gold: {
    accent: "#c27803",
    accentDark: "#78350f",
    accentDarker: "#451a03",
    accentLight: "#fffbeb",
    accentRgb: "194, 120, 3",
    accentGlow: "rgba(194, 120, 3, 0.12)",
  },
  slate: {
    accent: "#475569",
    accentDark: "#334155",
    accentDarker: "#0f172a",
    accentLight: "#f8fafc",
    accentRgb: "71, 85, 105",
    accentGlow: "rgba(71, 85, 105, 0.12)",
  },
  emerald: {
    accent: "#059669",
    accentDark: "#065f46",
    accentDarker: "#022c22",
    accentLight: "#ecfdf5",
    accentRgb: "5, 150, 105",
    accentGlow: "rgba(5, 150, 105, 0.12)",
  },
  plum: {
    accent: "#7c3aed",
    accentDark: "#5b21b6",
    accentDarker: "#3b0764",
    accentLight: "#f5f3ff",
    accentRgb: "124, 58, 237",
    accentGlow: "rgba(124, 58, 237, 0.12)",
  },
};

// ── Niche-default palette map ───────────────────────────────────────────────
const NICHE_DEFAULTS = {
  spa: "rose",
  salon: "plum",
  nail: "rose",
  hair: "plum",
  dental: "teal",
  eye: "indigo",
  clinic: "teal",
  beauty: "rose",
};

function getPalette(client) {
  if (client.accentPalette && PALETTES[client.accentPalette]) {
    return PALETTES[client.accentPalette];
  }
  const niche = (client.niche || "").toLowerCase();
  for (const [key, palette] of Object.entries(NICHE_DEFAULTS)) {
    if (niche.includes(key)) return PALETTES[palette];
  }
  return PALETTES.rose; // default
}

function getHeadingFont(niche) {
  const n = (niche || "").toLowerCase();
  if (
    n.includes("spa") ||
    n.includes("salon") ||
    n.includes("nail") ||
    n.includes("hair") ||
    n.includes("beauty")
  ) {
    return "'Playfair Display', Georgia, serif";
  }
  return "'Outfit', sans-serif";
}

function buildCssVars(palette, fontHeading) {
  return [
    `--accent:${palette.accent};`,
    `--accent-dark:${palette.accentDark};`,
    `--accent-darker:${palette.accentDarker};`,
    `--accent-light:${palette.accentLight};`,
    `--accent-rgb:${palette.accentRgb};`,
    `--accent-glow:${palette.accentGlow};`,
    `--font-heading:${fontHeading};`,
  ].join("\n  ");
}

// ── Star fill percent from rating ─────────────────────────────────────────
function starFillPercent(rating) {
  return Math.round((parseFloat(rating) / 5) * 100);
}

// ── WhatsApp link builder ─────────────────────────────────────────────────
function buildWhatsAppLink(phone, businessName) {
  let clean = String(phone).replace(/[\s\-\(\)\+]/g, "");
  // Nigerian number: 080... → 23480...
  if (clean.startsWith("0") && clean.length === 11) {
    clean = "234" + clean.substring(1);
  }
  const greeting = encodeURIComponent(
    `Hi ${businessName} 👋 I'd like to book an appointment. Please let me know your availability.`
  );
  return `https://wa.me/${clean}?text=${greeting}`;
}

// ── Build first letter for monogram ──────────────────────────────────────
function firstLetter(name) {
  return (name || "B").trim().charAt(0).toUpperCase();
}

// ── Niche → tagline + emoji ───────────────────────────────────────────────
function getNicheTagline(niche) {
  const n = (niche || "").toLowerCase();
  if (n.includes("spa")) return { tagline: "Premium Day Spa", emoji: "🌿" };
  if (n.includes("dental")) return { tagline: "Dental Clinic", emoji: "🦷" };
  if (n.includes("eye") || n.includes("optic")) return { tagline: "Eye Care Clinic", emoji: "👁" };
  if (n.includes("nail")) return { tagline: "Nail Bar", emoji: "💅" };
  if (n.includes("hair") || n.includes("salon")) return { tagline: "Hair & Beauty Salon", emoji: "✂️" };
  if (n.includes("beauty")) return { tagline: "Beauty Studio", emoji: "✨" };
  if (n.includes("clinic")) return { tagline: "Health Clinic", emoji: "🏥" };
  return { tagline: "Local Business", emoji: "⭐" };
}

// ── Main build function ───────────────────────────────────────────────────
function build(slug) {
  const clientFile = path.join(__dirname, "_clients", `${slug}.json`);
  const templateFile = path.join(__dirname, "_template", "index.html");
  const outputDir = path.join(__dirname, slug);
  const outputFile = path.join(outputDir, "index.html");

  // Validate inputs
  if (!fs.existsSync(clientFile)) {
    console.error(`❌  Client file not found: _clients/${slug}.json`);
    console.log(`    Create it by copying _clients/_example.json`);
    process.exit(1);
  }
  if (!fs.existsSync(templateFile)) {
    console.error(`❌  Template not found: _template/index.html`);
    process.exit(1);
  }

  const client = JSON.parse(fs.readFileSync(clientFile, "utf8"));
  let html = fs.readFileSync(templateFile, "utf8");

  // Derived values
  const palette = getPalette(client);
  const fontHeading = getHeadingFont(client.niche);
  const cssVars = buildCssVars(palette, fontHeading);
  const waLink = buildWhatsAppLink(client.whatsappNumber, client.businessName);
  const { tagline, emoji } = getNicheTagline(client.niche);
  const clientTagline = client.tagline || tagline;
  const clientEmoji = client.faviconEmoji || emoji;
  const fill = starFillPercent(client.rating || 4.5);
  const year = new Date().getFullYear();
  const metaTitle = client.metaTitle || `${client.businessName} — ${client.location}`;
  const metaDesc =
    client.metaDescription ||
    `Book your appointment at ${client.businessName} in ${client.location}. ${client.niche} services. WhatsApp booking available.`;

  // Variable map
  const vars = {
    "{{META_TITLE}}": metaTitle,
    "{{META_DESCRIPTION}}": metaDesc,
    "{{ACCENT_COLOR}}": palette.accent,
    "{{CSS_VARIABLES}}": cssVars,
    "{{FAVICON_EMOJI}}": clientEmoji,
    "{{FIRST_LETTER}}": firstLetter(client.businessName),
    "{{TAGLINE}}": clientTagline,
    "{{BUSINESS_NAME}}": client.businessName,
    "{{LOCATION}}": client.location,
    "{{WHATSAPP_LINK}}": waLink,
    "{{RATING}}": String(client.rating || "4.5"),
    "{{REVIEW_COUNT}}": String(client.reviewCount || "0"),
    "{{STAR_FILL_PERCENT}}": String(fill),
    "{{SERVICE_1_NAME}}": client.service1?.name || "Service 1",
    "{{SERVICE_1_DESC}}": client.service1?.desc || "",
    "{{SERVICE_1_PRICE}}": client.service1?.price || "",
    "{{SERVICE_1_IMAGE_URL}}": client.service1?.imageUrl || "",
    "{{SERVICE_1_IMAGE_DISPLAY}}": client.service1?.imageUrl ? "block" : "none",
    "{{SERVICE_2_NAME}}": client.service2?.name || "Service 2",
    "{{SERVICE_2_DESC}}": client.service2?.desc || "",
    "{{SERVICE_2_PRICE}}": client.service2?.price || "",
    "{{SERVICE_2_IMAGE_URL}}": client.service2?.imageUrl || "",
    "{{SERVICE_2_IMAGE_DISPLAY}}": client.service2?.imageUrl ? "block" : "none",
    "{{SERVICE_3_NAME}}": client.service3?.name || "Service 3",
    "{{SERVICE_3_DESC}}": client.service3?.desc || "",
    "{{SERVICE_3_PRICE}}": client.service3?.price || "",
    "{{SERVICE_3_IMAGE_URL}}": client.service3?.imageUrl || "",
    "{{SERVICE_3_IMAGE_DISPLAY}}": client.service3?.imageUrl ? "block" : "none",
    "{{HERO_IMAGE_URL}}": client.heroImageUrl || "",
    "{{HERO_IMAGE_DISPLAY}}": client.heroImageUrl ? "block" : "none",
    "{{HOURS}}": (client.hours || "").replace(/\n/g, "<br>"),
    "{{ADDRESS}}": client.address || "",
    "{{CURRENT_YEAR}}": String(year),
  };

  // Inject all variables
  for (const [placeholder, value] of Object.entries(vars)) {
    html = html.split(placeholder).join(value);
  }

  // Write output
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, html, "utf8");

  const sizeKb = (fs.statSync(outputFile).size / 1024).toFixed(1);
  console.log(`\n✅  Built: ${slug}/index.html  (${sizeKb} KB)`);
  console.log(`   Business:  ${client.businessName}`);
  console.log(`   Location:  ${client.location}`);
  console.log(`   Palette:   ${client.accentPalette || "auto (from niche)"}`);
  console.log(`   WhatsApp:  ${waLink.slice(0, 60)}...`);
  console.log(`\n   Next: drag the '${slug}/' folder to Netlify → go live.\n`);
}

// ── CLI entry ─────────────────────────────────────────────────────────────
const slug = process.argv[2];
if (!slug) {
  console.log("Usage: node build.js <client-slug> | all");
  console.log("Example: node build.js zazaspa");
  console.log("         node build.js all");
  process.exit(0);
}

if (slug === "all" || slug === "--all") {
  const clientsDir = path.join(__dirname, "_clients");
  fs.readdirSync(clientsDir).forEach(file => {
    if (file.endsWith(".json") && !file.startsWith("_")) {
      const clientSlug = file.replace(".json", "");
      build(clientSlug);
    }
  });
} else {
  build(slug.toLowerCase().replace(/\s+/g, "-"));
}
