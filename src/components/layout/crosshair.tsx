import { cn } from "@/lib/utils";

/**
 * A small `+` mark for the points where a section line meets a frame rail.
 * Position it with `className` (it is `absolute`); use sparingly.
 */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-10 size-[11px]", className)}
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-border-strong" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-border-strong" />
    </span>
  );
}
