import { cn } from "@/lib/utils";
import { FlowCanvas } from "./flow-canvas";
import {
  IN_STAGGER,
  OUT_STAGGER,
  OUT_START,
  PULSE_DURATION,
} from "./flow-timing";
import { PipelineEngine } from "./pipeline-engine";
import { PipelineNode } from "./pipeline-node";
import type { PipelineContent } from "./bento-data";

function FlowColumn({
  id,
  label,
  labelClassName,
  children,
}: {
  id: string;
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <p
        id={id}
        className={cn(
          "mb-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
          labelClassName,
        )}
      >
        {label}
      </p>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}

/**
 * Sources, the pipeline and destinations as three columns (wide screens) or
 * three stacked groups (small screens). The layout is plain HTML; the
 * connecting lines are drawn over it by `FlowCanvas`, which measures
 * whichever layout is showing. When stacked, only the first label is shown
 * (the lines run through the gaps below it); the others stay for screen
 * readers.
 */
export function PipelineDiagram({ content }: { content: PipelineContent }) {
  const { ariaLabel, columns, sources, engine, destinations } = content;

  return (
    <FlowCanvas
      ariaLabel={ariaLabel}
      className="grid gap-y-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] md:gap-x-14 lg:gap-x-24"
    >
      <FlowColumn
        id="pipeline-sources"
        label={columns.sources}
        labelClassName="md:text-right"
      >
        <ul
          role="list"
          aria-labelledby="pipeline-sources"
          className="grid grid-cols-4 gap-2 md:flex md:flex-col md:gap-3"
        >
          {sources.map((node, index) => (
            <PipelineNode
              key={node.id}
              node={node}
              role="source"
              flashDelay={index * IN_STAGGER}
            />
          ))}
        </ul>
      </FlowColumn>

      <FlowColumn
        id="pipeline-engine"
        label={columns.engine}
        labelClassName="max-md:sr-only md:text-center"
      >
        <PipelineEngine engine={engine} />
      </FlowColumn>

      <FlowColumn
        id="pipeline-destinations"
        label={columns.destinations}
        labelClassName="max-md:sr-only"
      >
        <ul
          role="list"
          aria-labelledby="pipeline-destinations"
          className="grid grid-cols-4 gap-2 md:flex md:flex-col md:gap-3"
        >
          {destinations.map((node, index) => (
            <PipelineNode
              key={node.id}
              node={node}
              role="destination"
              flashDelay={OUT_START + PULSE_DURATION + index * OUT_STAGGER}
            />
          ))}
        </ul>
      </FlowColumn>
    </FlowCanvas>
  );
}
