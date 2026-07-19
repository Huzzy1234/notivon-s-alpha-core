# Notivon Bridge Pages

One-page sites for local businesses found via Google Maps — no website, high rating, ready to pay.

## Workflow

### 1. Build client page(s)

```bash
# From inside the notivon-bridges/ folder:
node build.js <slug>   # Build a single client (e.g. node build.js zazaspa)
node build.js all      # Build all clients in _clients/ at once
```

This reads `_clients/zazaspa.json` → injects into `_template/index.html` → outputs `zazaspa/index.html`.

### 2. Create a client data file

Copy the schema and fill it in:

```bash
cp _clients/_example.json _clients/yournewclient.json
# then edit yournewclient.json with the business details
```

### 3. Deploy (Path A — Netlify drag-and-drop)

1. Go to [netlify.com](https://netlify.com) → your separate Notivon Bridges account
2. Sites → drag the `zazaspa/` folder onto the deploy zone
3. Rename the site to `zazaspa` (or the business name) → live at `zazaspa.netlify.app`
4. Paste that URL into the business's Google Maps "Website" field

---

## Palettes & Design Features

### 1. Color Palettes
We use modern, vibrant HSL-tuned colors:

| Name | Hex | Best for |
|------|-----|----------|
| `rose` | #d15a7c | Spas, beauty, nails |
| `plum` | #7c3aed | Hair salons, aesthetics |
| `teal` | #0f766e | Dental, health clinics |
| `indigo` | #4f46e5 | Eye clinics, opticians |
| `emerald` | #059669 | Wellness, natural health |
| `gold` | #c27803 | Luxury, premium positioning |
| `slate` | #475569 | Professional, minimal |

If you leave `accentPalette` blank, it auto-picks based on `niche`.

### 2. Dynamic Typography
The build system automatically selects appropriate typography based on the niche to match the brand identity:
- **Editorial Serif** (`'Playfair Display'`): For Spas, Salons, Nails, Hair, and Beauty.
- **Geometric Sans** (`'Outfit'`): For Dental, Eye, Health, and general Clinics.
- **Body Font**: Modern `'Plus Jakarta Sans'` for clean, readable descriptions on mobile screens.

## Folder Structure

```
notivon-bridges/
├── _template/
│   └── index.html          ← master template (edit this to change the design globally)
├── _clients/
│   ├── _example.json       ← schema reference — copy this for new clients
│   └── zazaspa.json        ← demo: Zaza Spa & Wellness, Lekki
├── zazaspa/
│   └── index.html          ← ready to drag to Netlify
├── build.js                ← the builder script
├── package.json
└── README.md
```

---

## Client JSON Reference

| Field | Required | Notes |
|-------|----------|-------|
| `businessName` | ✅ | Full business name |
| `location` | ✅ | e.g. "Lekki Phase 1, Lagos" |
| `niche` | ✅ | spa / dental / salon / hair / nail / eye / clinic |
| `whatsappNumber` | ✅ | Local (080...) or intl (+234...) — auto-normalised |
| `rating` | ✅ | From their Google Maps listing |
| `reviewCount` | ✅ | From their Google Maps listing |
| `service1/2/3` | ✅ | `name`, `desc`, `price` — write these per business type |
| `hours` | ✅ | Use `\n` for line breaks |
| `address` | ✅ | Full street address from Maps |
| `accentPalette` | — | Auto-picked from niche if blank |
| `tagline` | — | Auto-picked from niche if blank |
| `faviconEmoji` | — | Defaults to niche emoji |
| `metaTitle` | — | Auto-generated if blank |
| `metaDescription` | — | Auto-generated if blank |

---

## Updating the Template

Edit `_template/index.html` — then **rebuild all clients** to apply:

```bash
node build.js all
```
