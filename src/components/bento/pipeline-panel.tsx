import { PipelineDiagram } from "./pipeline-diagram";
import type { PipelineContent } from "./bento-data";

/**
 * Bento row 1: one full-width panel. Three bands separated by hairlines: a
 * title row with a live badge, the animated diagram on a faintly lit canvas,
 * and a strip of three supporting points. The panel has no outer border of
 * its own; the page rails and the section lines frame it.
 */
export function PipelinePanel({ content }: { content: PipelineContent }) {
  const { title, description, statusLabel, highlights } = content;

  return (
    <article aria-labelledby="pipeline-title">
      <div className="flex flex-col gap-5 px-6 py-8 md:flex-row md:items-end md:justify-between md:gap-10 md:px-10 md:py-10">
        <div>
          <h3
            id="pipeline-title"
            className="text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl"
          >
            {title}
          </h3>
          <p className="mt-2 max-w-[56ch] text-sm text-pretty text-muted-foreground md:text-base">
            {description}
          </p>
        </div>

        {/* Live badge: a dot plus text, so the status never relies on colour. */}
        <p className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs tracking-wide text-muted-foreground">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400/50 motion-reduce:animate-none" />
            <span className="relative size-2 rounded-full bg-accent-400" />
          </span>
          {statusLabel}
        </p>
      </div>

      {/* The canvas: a dot grid that fades out toward the edges and a soft
          teal light behind the pipeline. Both are decorative and very quiet. */}
      <div className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--border-strong)_80%,transparent)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_75%_85%_at_50%_50%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_50%_50%,color-mix(in_oklab,var(--accent-600)_13%,transparent),transparent)]"
        />
        <div className="relative px-4 py-10 sm:px-6 md:px-10 md:py-14">
          <PipelineDiagram content={content} />
        </div>
      </div>

      <ul
        role="list"
        className="grid divide-y divide-border border-t border-border md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {highlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <li key={highlight.title} className="p-6 md:p-8">
              <p className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <Icon aria-hidden="true" className="size-4 text-accent-400" />
                {highlight.title}
              </p>
              <p className="mt-2 max-w-[38ch] text-sm text-pretty text-muted-foreground">
                {highlight.description}
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
