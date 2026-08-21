/**
 * CRM boards — one Google Sheet tab per vertical (spa-bridge, solar, cargo...).
 *
 * Scout saves into a board; Pipeline reads one board at a time. Keeping the
 * slug rules and the ops header here means the frontend, the Netlify functions,
 * and the Apps Script all agree on the same key.
 */

export const DEFAULT_BOARD = "spa-bridge";

// TODO: replace with a short-lived token from a login function. This header
// ships in the public bundle, so it identifies the caller but secures nothing.
export const OPS_HEADERS = {
  "X-Ops-Auth": "notivon-internal-2026",
};

export interface Board {
  name: string;
  count: number;
}

/** Mirrors normalizeBoard() in the Netlify functions and the Apps Script. */
export function slugifyBoard(raw: string): string {
  const name = String(raw ?? "").trim().toLowerCase();
  if (!name) return DEFAULT_BOARD;
  const clean = name.replace(/[^a-z0-9\-_ ]/g, "").replace(/\s+/g, "-").slice(0, 40);
  return clean || DEFAULT_BOARD;
}

/** Human-facing label: "spa-bridge" -> "Spa Bridge". */
export function boardLabel(board: string): string {
  return board
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const LAST_BOARD_KEY = "scout_active_board";

export function getLastBoard(): string {
  return localStorage.getItem(LAST_BOARD_KEY) || DEFAULT_BOARD;
}

export function setLastBoard(board: string): void {
  localStorage.setItem(LAST_BOARD_KEY, board);
}

export async function fetchBoards(): Promise<Board[]> {
  const res = await fetch("/api/scout-crm?action=boards", {
    method: "GET",
    headers: OPS_HEADERS,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load boards");
  return data.boards || [];
}

export async function createBoard(name: string): Promise<Board[]> {
  const board = slugifyBoard(name);
  const res = await fetch("/api/scout-crm", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...OPS_HEADERS },
    body: JSON.stringify({ action: "createBoard", board }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create board");
  return data.boards || [];
}
