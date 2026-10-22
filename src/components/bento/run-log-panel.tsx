import { RunLogWindow } from "./run-log-window";
import type { RunLogContent } from "./run-log-data";

/**
 * Bento row 2, left: a short title, then a live log window that hangs from
 * the panel's bottom edge. The panel has no border of its own; the page
 * rails, the row line and the divider beside it frame it. It stretches to the
 * height of its row and keeps the window pinned to the bottom.
 */
export function RunLogPanel({ content }: { content: RunLogContent }) {
  const { title, description } = content;

  return (
    <article
      aria-labelledby="run-log-title"
      className="relative flex h-full flex-col overflow-hidden"
    >
      {/* A faint teal light rising from behind the window. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_100%,color-mix(in_oklab,var(--accent-600)_11%,transparent),transparent)]"
      />

      <div className="relative px-6 pt-8 md:px-8 md:pt-10">
        <h3
          id="run-log-title"
          className="text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl"
        >
          {title}
        </h3>
        <p className="mt-2 max-w-[46ch] text-sm text-pretty text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      <div className="relative mt-auto px-6 pt-8 md:px-8 md:pt-10">
        <RunLogWindow content={content} />
      </div>
    </article>
  );
}
