import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** A small line-built mark (three stacked lines) next to the product name. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40",
        className,
      )}
    >
      <span className="grid size-7 place-items-center rounded-md border border-border-strong bg-card transition-colors group-hover:border-accent-600/60">
        <svg
          viewBox="0 0 16 16"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 4.5h10" className="text-accent-400" />
          <path d="M3 8h7" className="text-foreground" />
          <path d="M3 11.5h4" className="text-muted-foreground" />
        </svg>
      </span>
      <span className="font-heading text-lg font-semibold tracking-[-0.03em]">
        {siteConfig.name}
      </span>
    </Link>
  );
}
