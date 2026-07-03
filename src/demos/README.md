# Notivon Demos

Self-contained area for **portfolio demo UIs** — used to create short video demos for
LinkedIn / X to attract inbound business-owner clients.

## Ground rules

- **UI + mock data ONLY.** No backend, no real API calls, no real systems. These are
  believable illustrative UIs, not products.
- **Fully separated from the marketing site.** Everything lives under `src/demos/`.
  Nothing here should be imported by the marketing pages, and vice-versa (except shared
  `@/components/ui/*` primitives).
- **Audience = business owners.** Every demo must depict a problem a specific owner
  recognizes as *frequent + visibly costing money/time + not already solved*, so they
  think "that's my exact mess — build me that."
- **Nigerian-real mock data.** Real-sounding names, ₦ amounts, Lagos addresses,
  WhatsApp-green accents. Generic "John Doe / $99" kills the illusion. Use `lib/mock.ts`.
- **Fake the "AI thinking"** with a timed delay + skeleton loader. Script the 5-second
  "money shot" first, then build only what sells it.

## Folder layout

```
src/demos/
  README.md            ← this file
  types.ts             ← shared TS types (Demo definition, etc.)
  registry.ts          ← the list of demos (add each new demo here)
  lib/
    mock.ts            ← Nigerian mock-data helpers (names, ₦, addresses, dates)
  shell/               ← reusable demo shell (sidebar/topbar/browser-chrome) — TODO
  systems/             ← one folder per demo (built after we pick a vertical)
    <demo-slug>/
      index.tsx        ← the demo screen
      data.ts          ← that demo's mock data
```

## Adding a new demo

1. Create `systems/<slug>/index.tsx` + `data.ts`.
2. Register it in `registry.ts`.
3. Route it in `src/App.tsx` under `/demos/<slug>` (above the catch-all `*`).

## Demo shortlist (ranked by owner recognition)

1. WhatsApp chaos → clean dashboard  (near-universal for NG SMBs)
2. Document processor  (passport/invoice/waybill photo → structured data)
3. Booking + no-show reminders  (clinics / salons / repair shops)
4. Landed-cost / import calculator  (importers)

> Faceless video pipeline was dropped — wrong signal for a business-owner audience.

## Open decision

Which single vertical anchors the first mockups — **travel agencies**, **freight/import**,
or **general SMB (WhatsApp-run)**? Waiting on this before building any `systems/` demo.
