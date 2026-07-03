// Shared types for the Notivon demo area.
// These describe portfolio demo UIs (mock data only) — not real systems.

import type { LucideIcon } from "lucide-react";

/** A business vertical a demo is aimed at. */
export type Vertical =
  | "travel"
  | "freight"
  | "general-smb"
  | "clinic"
  | "real-estate";

/** A single demo entry in the registry. */
export interface DemoDefinition {
  /** URL-safe slug — routed at /demos/<slug>. */
  slug: string;
  /** Short display title. */
  title: string;
  /** The owner-facing problem this demo depicts. */
  problem: string;
  /** Which business owner should watch this and think "that's my mess". */
  vertical: Vertical;
  /** Icon for gallery cards. */
  icon?: LucideIcon;
  /** Whether the UI has been built yet. */
  status: "planned" | "built";
}
