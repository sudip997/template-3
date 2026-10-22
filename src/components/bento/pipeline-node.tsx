import { cn } from "@/lib/utils";
import { Flash } from "./flow-motion";
import type { PipelineNode as PipelineNodeContent } from "./bento-data";

type PipelineNodeProps = {
  node: PipelineNodeContent;
  /** A source sits on the left and a destination on the right (wide screens). */
  role: "source" | "destination";
  /** Seconds into the loop when this node blinks (see `flow-timing.ts`). */
  flashDelay: number;
};

/**
 * One source or destination. On small screens it is a compact tile (icon over
 * name, four to a row); from `md` it is a wide row with a mono detail line.
 * The inner box carries `data-flow` so the canvas can find it and attach the
 * connecting line to its edge.
 */
export function PipelineNode({ node, role, flashDelay }: PipelineNodeProps) {
  const Icon = node.icon;

  return (
    <li
      className={cn(
        "md:w-full md:max-w-60",
        role === "source" ? "md:ml-auto" : "md:mr-auto",
      )}
    >
      <div
        data-flow={role}
        className="relative flex h-full flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-1 py-3 text-center md:flex-row md:gap-3 md:px-3 md:py-2.5 md:text-left"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0 max-w-full">
          <span className="block truncate text-[11px] font-medium text-foreground sm:text-xs md:text-sm">
            {node.label}
          </span>
          <span className="mt-0.5 hidden truncate font-mono text-[11px] text-muted-foreground md:block">
            {node.detail}
          </span>
        </span>
        <Flash delay={flashDelay} />
      </div>
    </li>
  );
}
