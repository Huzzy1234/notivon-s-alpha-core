# Notivon Lead CRM — Apps Script backend

The lead pipeline's storage layer. Lives in a Google Sheet; one tab per board
(vertical): `spa-bridge`, `solar`, `cargo`, etc. `netlify/functions/scout-crm.ts`
and the dedupe pass in `scout-search.ts` are the only callers.

Kept in the repo so the source is never trapped in a browser tab again — the
previous version existed only in the Apps Script editor.

## `access: ANYONE_ANONYMOUS` is load-bearing

Netlify functions call this endpoint server-side with no Google session. If the
deployment's access is anything narrower, every request returns
**403 Access denied** and the whole Pipeline goes dark. That is exactly the
failure that took Scout and Pipeline offline.

Re-check this setting after any manual redeploy from the Apps Script UI.

## Deploying with clasp

One-time, on the machine that owns the sheet:

```bash
npx @google/clasp login                  # browser approval
# then enable the Apps Script API: https://script.google.com/home/usersettings
```

Then, from this directory:

```bash
npx @google/clasp push                   # upload Code.gs + manifest
npx @google/clasp deploy -d "multi-board"   # new version, prints the /exec URL
```

Put the resulting `/exec` URL in `GOOGLE_SHEET_WEBAPP_URL` — both in `.env` and
in Netlify → Site settings → Environment variables. The deployment ID is stable
across `clasp deploy` runs against the same deployment, so the URL only changes
if you create a brand new deployment.

`.clasp.json` (gitignored, holds the script ID):

```json
{ "scriptId": "<script id from Extensions → Apps Script → Project Settings>", "rootDir": "." }
```

## API

| Request | Result |
| --- | --- |
| `GET ?action=boards` | `{ boards: [{ name, count }] }` |
| `GET ?board=solar` | `{ board, leads: [...] }` |
| `POST {action:'save', board, lead}` | `{ lead }` — inserts, or updates when `lead.id` matches |
| `POST {action:'delete', board, id}` | `{ success }` |
| `POST {action:'createBoard', board}` | `{ boards }` |

Unknown boards are created on demand with a header row, so adding a vertical
needs no code change and no redeploy.

## Notes

- Columns are resolved by reading the header row, so you can reorder columns or
  add your own in the sheet without breaking reads.
- Updates only write known columns, leaving hand-added ones intact.
- Writes take a script lock: "Save All New" fires many sequential saves and
  Apps Script has no transactions.
- A board name is sanitised to `[a-z0-9-_]`, max 40 chars, before it becomes a
  tab name.
