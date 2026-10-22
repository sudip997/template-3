import { IconCheck } from "@tabler/icons-react";
import { Flash, StageHighlight } from "./flow-motion";
import { ENGINE_ARRIVAL, STAGE_START, STAGE_STEP } from "./flow-timing";
import type { PipelineContent } from "./bento-data";

/**
 * The centre of the diagram: the pipeline itself, shown as a small product
 * panel. It is the one box with a teal-tinted outline and a soft top-down
 * wash, so the eye lands here first. Each stage lights up in turn as events
 * pass through (decorative: the stage list reads the same without motion).
 */
export function PipelineEngine({
  engine,
}: {
  engine: PipelineContent["engine"];
}) {
  const Icon = engine.icon;

  return (
    <div
      data-flow="engine"
      className="relative w-full max-w-sm overflow-hidden rounded-xl border border-accent-600/40 bg-card md:mx-auto"
    >
      {/* A faint wash from the top, and a bright hairline on the top edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--accent-600)_14%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-400/80 to-transparent"
      />
      <Flash delay={ENGINE_ARRIVAL} duration={1.4} className="border-accent-400/60" />

      <div className="relative flex items-center gap-3 px-5 pt-5 pb-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent-600/40 bg-accent-subtle text-accent-400">
          <Icon className="size-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {engine.name}
          </p>
          <p className="truncate font-mono text-[11px] text-muted-foreground">
            {engine.id}
          </p>
        </div>
      </div>

      <ul
        role="list"
        className="relative divide-y divide-border border-y border-border"
      >
        {engine.stages.map((stage, index) => (
          <li
            key={stage.label}
            className="relative flex items-center gap-3 px-5 py-2.5 text-sm"
          >
            <StageHighlight delay={STAGE_START + index * STAGE_STEP} />
            <IconCheck
              aria-hidden="true"
              className="relative size-3.5 shrink-0 text-accent-400"
            />
            <span className="relative min-w-0 flex-1 truncate text-foreground">
              {stage.label}
            </span>
            <span className="relative font-mono text-xs text-muted-foreground tabular-nums">
              {stage.duration}
            </span>
          </li>
        ))}
      </ul>

      <p className="relative px-5 py-3 font-mono text-[11px] tracking-wide text-muted-foreground">
        {engine.footnote}
      </p>
    </div>
  );
}
