import { GlobeView } from "./globe-view";
import type { GlobeContent } from "./globe-data";

/**
 * Bento row 2, right: a short title, then a globe that rises from the panel's
 * bottom edge and is cropped by it. The panel has no border of its own; the
 * page rails, the row line and the divider beside it frame it. It stretches
 * to the height of its row and keeps the globe pinned to the bottom.
 */
export function GlobePanel({ content }: { content: GlobeContent }) {
  const { title, description, statusLabel } = content;

  return (
    <article
      aria-labelledby="globe-title"
      className="relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative px-6 pt-8 md:px-8 md:pt-10">
        <h3
          id="globe-title"
          className="text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl"
        >
          {title}
        </h3>
        <p className="mt-2 max-w-[46ch] text-sm text-pretty text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      <div className="relative mt-auto pt-6 md:pt-8">
        {/* A dot plus text, so the status never relies on colour. */}
        <p className="absolute top-6 left-6 z-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 font-mono text-xs tracking-wide text-muted-foreground md:top-8 md:left-8">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent-400"
          />
          {statusLabel}
        </p>

        <GlobeView content={content} />
      </div>
    </article>
  );
}
