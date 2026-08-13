/**
 * Notivon Lead CRM — multi-board backend.
 *
 * One spreadsheet, one tab ("board") per vertical: spa-bridge, solar, cargo...
 * Every request carries a `board`; unknown boards are created on demand with
 * headers, so adding a vertical needs no code change and no redeploy.
 *
 * Deployed as a web app: Execute as ME, Access ANYONE (anonymous).
 * The Netlify functions are the only intended caller and hold the shared secret.
 *
 * Endpoints
 *   GET  ?action=boards                 -> { boards: [{ name, count }] }
 *   GET  ?board=solar                   -> { board, leads: [...] }
 *   POST { action:'save',   board, lead }   -> { lead }     (insert or update by id)
 *   POST { action:'delete', board, id }     -> { success }
 *   POST { action:'createBoard', board }    -> { board, boards }
 */

// Bumped on every change. Returned by ?action=boards so the caller can prove
// which build is actually deployed instead of guessing after a redeploy.
var VERSION = 4;

var HEADERS = [
  'id', 'name', 'phone', 'address', 'category', 'website', 'rating', 'reviews',
  'niche', 'location', 'status', 'notes', 'scoutedAt', 'contactedAt', 'whatsappLink'
];

// Used when a caller sends no board, so pre-boards clients keep working.
var DEFAULT_BOARD = 'spa-bridge';

/**
 * Sheets written by hand or by the previous script use their own column
 * titles, so match on a normalised form ("Business Name" -> businessname).
 */
var HEADER_ALIASES = {
  id: 'id', leadid: 'id',
  name: 'name', businessname: 'name', business: 'name',
  phone: 'phone', phonenumber: 'phone', tel: 'phone', mobile: 'phone',
  address: 'address',
  category: 'category', type: 'category',
  website: 'website', site: 'website', url: 'website',
  rating: 'rating', stars: 'rating',
  reviews: 'reviews', reviewcount: 'reviews', numberofreviews: 'reviews',
  niche: 'niche',
  location: 'location', area: 'location',
  status: 'status',
  notes: 'notes', note: 'notes',
  scoutedat: 'scoutedAt', datescouted: 'scoutedAt', dateadded: 'scoutedAt',
  contactedat: 'contactedAt', datecontacted: 'contactedAt',
  whatsapplink: 'whatsappLink', whatsapp: 'whatsappLink'
};

function normHeader(value) {
  return String(value == null ? '' : value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Tabs that hold config/scratch data rather than leads.
var RESERVED_TABS = ['_config', '_notes'];

/* ── helpers ──────────────────────────────────────────────────────────── */

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Board names become sheet tab names, so keep them tame and predictable. */
function normalizeBoard(raw) {
  var name = String(raw == null ? '' : raw).trim().toLowerCase();
  if (!name) return DEFAULT_BOARD;
  name = name.replace(/[^a-z0-9\-_ ]/g, '').replace(/\s+/g, '-').slice(0, 40);
  return name || DEFAULT_BOARD;
}

function getSheet(board, createIfMissing) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var name = normalizeBoard(board);

  // Match existing tabs case-insensitively so a request for "sheet1" reuses
  // "Sheet1" rather than creating an empty near-duplicate beside it.
  var sheet = null;
  var all = ss.getSheets();
  for (var i = 0; i < all.length; i++) {
    if (normHeader(all[i].getName()) === normHeader(name)) {
      sheet = all[i];
      break;
    }
  }

  if (!sheet) {
    if (!createIfMissing) return null;
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  // Only an empty tab gets headers written; never inject a row into existing data.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function isLeadBoard(sheet) {
  var name = sheet.getName();
  if (name.charAt(0) === '_') return false;
  return RESERVED_TABS.indexOf(name) === -1;
}

/**
 * Work out how a tab is laid out.
 *
 * A tab may have a header row (any capitalisation or wording we recognise), or
 * none at all — the previous version of this script appended leads positionally
 * and never wrote titles. Guessing wrong silently blanks every field, so decide
 * explicitly: three or more recognisable titles in row 1 means it is a header.
 *
 * Returns { idx: {field: columnIndex}, dataStart: firstDataRow, hasHeader }.
 */
function resolveLayout(sheet) {
  var lastCol = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();

  if (lastRow < 1 || lastCol < 1) {
    return { idx: positionalIndex(), dataStart: 2, hasHeader: true };
  }

  var row1 = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var idx = {};
  var hits = 0;
  for (var i = 0; i < row1.length; i++) {
    var field = HEADER_ALIASES[normHeader(row1[i])];
    if (field && idx[field] === undefined) {
      idx[field] = i;
      hits++;
    }
  }

  if (hits >= 3) return { idx: idx, dataStart: 2, hasHeader: true };

  // No header: fall back to our canonical column order, data from row 1.
  return { idx: positionalIndex(), dataStart: 1, hasHeader: false };
}

function positionalIndex() {
  var idx = {};
  for (var i = 0; i < HEADERS.length; i++) idx[HEADERS[i]] = i;
  return idx;
}

function rowToLead(row, idx) {
  function get(key) {
    return idx[key] === undefined ? '' : row[idx[key]];
  }
  // Text cells may carry the literal-text apostrophe we wrote on save.
  function text(key) {
    return stripTextMarker(get(key) || '');
  }
  return {
    id: text('id'),
    name: text('name'),
    phone: text('phone'),
    address: text('address'),
    category: text('category'),
    website: text('website'),
    rating: Number(get('rating')) || 0,
    reviews: Number(get('reviews')) || 0,
    niche: text('niche'),
    location: text('location'),
    status: text('status') || 'New',
    notes: text('notes'),
    scoutedAt: text('scoutedAt'),
    contactedAt: text('contactedAt'),
    whatsappLink: text('whatsappLink')
  };
}

function readLeads(sheet) {
  var layout = resolveLayout(sheet);
  var lastRow = sheet.getLastRow();
  if (lastRow < layout.dataStart) return [];

  var idx = layout.idx;
  var values = sheet
    .getRange(layout.dataStart, 1, lastRow - layout.dataStart + 1, sheet.getLastColumn())
    .getValues();

  var leads = [];
  for (var i = 0; i < values.length; i++) {
    // Skip blank rows left behind by manual deletion.
    if (!String(values[i].join('')).trim()) continue;
    leads.push(rowToLead(values[i], idx));
  }
  return leads;
}

function newId() {
  return Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

// Numeric fields stay General so the sheet can still sort and chart them.
var NUMERIC_FIELDS = { rating: true, reviews: true };

/**
 * Force text columns to plain-text format before writing.
 *
 * Nigerian numbers arrive as "+234 802 ..." and Sheets parses a leading "+"
 * (also "=", "-", "@") as a formula, storing #ERROR! instead of the number.
 * Phone is the field this whole pipeline exists to collect, so never let the
 * sheet reinterpret it.
 */
function applyTextFormats(range, idx, width) {
  var formats = [];
  for (var c = 0; c < width; c++) formats.push('@');
  for (var field in NUMERIC_FIELDS) {
    if (idx[field] !== undefined && idx[field] < width) formats[idx[field]] = 'General';
  }
  range.setNumberFormats([formats]);
}

/**
 * Number format alone does not reliably stop setValue() from parsing a leading
 * "+" as a formula, so also prefix the value with an apostrophe — Sheets' own
 * "this is literal text" marker. stripTextMarker() undoes it on read, so the
 * pair is self-consistent whether or not Sheets swallows the apostrophe.
 */
function forceText(value) {
  var s = String(value == null ? '' : value);
  if (!s) return s;
  var first = s.charAt(0);
  if (first === '=' || first === '+' || first === '-' || first === '@' || first === "'") {
    return "'" + s;
  }
  return s;
}

function stripTextMarker(value) {
  var s = String(value == null ? '' : value);
  return s.charAt(0) === "'" ? s.slice(1) : s;
}

/* ── GET ──────────────────────────────────────────────────────────────── */

function doGet(e) {
  try {
    var params = (e && e.parameter) || {};

    if (params.action === 'boards') {
      var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
      var boards = [];
      for (var i = 0; i < sheets.length; i++) {
        if (!isLeadBoard(sheets[i])) continue;
        var sheetLayout = resolveLayout(sheets[i]);
        boards.push({
          name: sheets[i].getName(),
          count: Math.max(0, sheets[i].getLastRow() - sheetLayout.dataStart + 1)
        });
      }
      return jsonOut({ version: VERSION, boards: boards });
    }

    // Diagnostic: what does this tab actually look like on disk?
    if (params.action === 'layout') {
      var target = getSheet(params.board, false);
      if (!target) return jsonOut({ error: 'Unknown board: ' + params.board });
      var info = resolveLayout(target);
      var firstRows = [];
      var upto = Math.min(target.getLastRow(), 3);
      if (upto > 0) {
        firstRows = target.getRange(1, 1, upto, target.getLastColumn()).getValues();
      }
      return jsonOut({
        board: target.getName(),
        hasHeader: info.hasHeader,
        dataStart: info.dataStart,
        mappedFields: info.idx,
        lastRow: target.getLastRow(),
        lastColumn: target.getLastColumn(),
        firstRows: firstRows
      });
    }

    var board = normalizeBoard(params.board);
    var sheet = getSheet(board, true);
    return jsonOut({ board: board, leads: readLeads(sheet) });
  } catch (err) {
    return jsonOut({ error: String(err && err.message ? err.message : err) });
  }
}

/* ── POST ─────────────────────────────────────────────────────────────── */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Apps Script has no transactions; serialise writes so concurrent saves
    // from "Save All New" cannot interleave and corrupt rows.
    lock.waitLock(25000);

    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var action = body.action || 'save';
    var board = normalizeBoard(body.board);

    if (action === 'createBoard') {
      getSheet(board, true);
      return doGet({ parameter: { action: 'boards' } });
    }

    if (action === 'delete') {
      return jsonOut(deleteLead(board, String(body.id || '')));
    }

    if (action === 'save') {
      return jsonOut(saveLead(board, body.lead || body));
    }

    return jsonOut({ error: 'Unknown action: ' + action });
  } catch (err) {
    return jsonOut({ error: String(err && err.message ? err.message : err) });
  } finally {
    try { lock.releaseLock(); } catch (ignored) {}
  }
}

function saveLead(board, lead) {
  if (!lead || !String(lead.name || '').trim()) {
    return { error: 'Lead is missing a name' };
  }

  var sheet = getSheet(board, true);
  var layout = resolveLayout(sheet);
  var idx = layout.idx;
  var now = new Date().toISOString();

  var record = {
    id: String(lead.id || '').trim(),
    name: String(lead.name || ''),
    phone: String(lead.phone || ''),
    address: String(lead.address || ''),
    category: String(lead.category || ''),
    website: String(lead.website || ''),
    rating: Number(lead.rating) || 0,
    reviews: Number(lead.reviews != null ? lead.reviews : lead.reviewCount) || 0,
    niche: String(lead.niche || ''),
    location: String(lead.location || ''),
    status: String(lead.status || 'New'),
    notes: String(lead.notes || ''),
    scoutedAt: String(lead.scoutedAt || now),
    contactedAt: String(lead.contactedAt || ''),
    whatsappLink: String(lead.whatsappLink || '')
  };

  var targetRow = -1;
  if (record.id && sheet.getLastRow() >= layout.dataStart) {
    var idCol = idx['id'] === undefined ? 0 : idx['id'];
    var rowCount = sheet.getLastRow() - layout.dataStart + 1;
    var ids = sheet.getRange(layout.dataStart, idCol + 1, rowCount, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === record.id) {
        targetRow = i + layout.dataStart;
        break;
      }
    }
  }

  if (targetRow === -1) {
    if (!record.id) record.id = newId();
    // Build the row against the sheet's own column positions, so an existing
    // tab keeps its layout instead of being appended to in our order.
    var width = Math.max(sheet.getLastColumn(), HEADERS.length);
    var row = [];
    for (var c = 0; c < width; c++) row.push('');
    for (var key2 in record) {
      if (idx[key2] === undefined) continue;
      row[idx[key2]] = NUMERIC_FIELDS[key2] ? record[key2] : forceText(record[key2]);
    }

    var newRow = sheet.getLastRow() + 1;
    var range = sheet.getRange(newRow, 1, 1, width);
    applyTextFormats(range, idx, width);
    range.setValues([row]);
  } else {
    // Write only the columns we know, leaving any hand-added columns intact.
    for (var key in record) {
      if (idx[key] === undefined) continue;
      var cell = sheet.getRange(targetRow, idx[key] + 1);
      cell.setNumberFormat(NUMERIC_FIELDS[key] ? 'General' : '@');
      cell.setValue(NUMERIC_FIELDS[key] ? record[key] : forceText(record[key]));
    }
  }

  return { lead: record, board: board };
}

function deleteLead(board, id) {
  if (!id) return { error: 'Missing lead id' };

  var sheet = getSheet(board, false);
  if (!sheet) return { error: 'Unknown board: ' + board };
  var layout = resolveLayout(sheet);
  if (sheet.getLastRow() < layout.dataStart) return { error: 'Lead not found: ' + id };

  var idCol = layout.idx['id'] === undefined ? 0 : layout.idx['id'];
  var rowCount = sheet.getLastRow() - layout.dataStart + 1;
  var ids = sheet.getRange(layout.dataStart, idCol + 1, rowCount, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) {
      sheet.deleteRow(i + layout.dataStart);
      return { success: true, board: board };
    }
  }
  return { error: 'Lead not found: ' + id };
}
