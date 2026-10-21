import { cn } from "@/lib/utils";

type StepWindowProps = {
  /** Read by screen readers in place of the (decorative) mock UI. */
  ariaLabel: string;
  title: string;
  /** Usually a <WindowBadge>. */
  status: React.ReactNode;
  /**
   * The frame rail this window hangs from on wide screens. That side loses
   * its border and corner radius so the rail closes the frame. On small
   * screens the window is a normal, fully outlined card.
   */
  anchor: "left" | "right";
  children: React.ReactNode;
};

/**
 * The shared frame for the three product windows: a hairline outline, a
 * title bar with the same three outlined dots as the hero preview, and a
 * status badge.
 */
export function StepWindow({
  ariaLabel,
  title,
  status,
  anchor,
  children,
}: StepWindowProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-card text-left",
        anchor === "right"
          ? "lg:rounded-r-none lg:border-r-0"
          : "lg:rounded-l-none lg:border-l-0",
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5">
            <span className="size-2.5 rounded-full border border-border-strong" />
            <span className="size-2.5 rounded-full border border-border-strong" />
            <span className="size-2.5 rounded-full border border-border-strong" />
          </div>
          <span className="truncate font-mono text-xs tracking-wide text-muted-foreground">
            {title}
          </span>
        </div>
        {status}
      </div>
      {children}
    </div>
  );
}

/** The outlined status pill in a window's title bar. Always carries text. */
export function WindowBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-foreground">
      {children}
    </span>
  );
}
