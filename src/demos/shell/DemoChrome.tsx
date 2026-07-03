// Minimal reusable frame for demo screens: a browser-style chrome bar + a
// scrollable content area. Kept intentionally small — each demo owns its inner
// layout. Reused by future demos under src/demos/systems/*.

import { ReactNode } from "react";

interface DemoChromeProps {
  /** Product name shown top-left, e.g. "Notivon Intake". */
  product: string;
  /** Fake address shown in the URL pill. */
  url: string;
  /** Optional right-aligned node (actions, avatar…). */
  actions?: ReactNode;
  children: ReactNode;
}

export function DemoChrome({ product, url, actions, children }: DemoChromeProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      {/* Browser chrome */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-border/70 bg-muted/30 px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate text-sm font-semibold tracking-tight">{product}</span>
          <span className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-background px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {url}
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Demo
          </span>
        </div>
        {actions}
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
