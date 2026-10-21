import { IconCircleCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { StepWindow, WindowBadge } from "./step-window";
import {
  consoleWindow,
  type BarSeries,
  type ConsoleWindowContent,
} from "./how-it-works-data";

/** A tiny bar chart in plain divs. The highlighted bar carries the point. */
function Bars({ series }: { series: BarSeries }) {
  return (
    <div className="mt-3 flex h-9 items-end gap-[3px]" aria-hidden="true">
      {series.values.map((value, index) => (
        <span
          key={index}
          style={{ height: `${value}%` }}
          className={cn(
            "min-h-0.5 flex-1 rounded-[1px]",
            index === series.highlight ? "bg-accent-400" : "bg-border-strong",
          )}
        />
      ))}
    </div>
  );
}

function Metric({
  label,
  value,
  caption,
  series,
}: {
  label: string;
  value: string;
  caption?: string;
  series: BarSeries;
}) {
  return (
    <div className="min-w-0 px-5 py-4">
      <p className="truncate font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-medium tracking-tight text-foreground tabular-nums">
          {value}
        </span>
        {caption ? (
          <span className="truncate font-mono text-xs text-muted-foreground">
            {caption}
          </span>
        ) : null}
      </p>
      <Bars series={series} />
    </div>
  );
}

/**
 * Step 3: the console. Two metrics, a short log stream that tells one small
 * story (a queue spike, an autoscale, a recovery), and the alert that closed
 * it. Log levels are always written out, never color alone.
 */
export function ConsoleWindow({
  content = consoleWindow,
  anchor,
}: {
  content?: ConsoleWindowContent;
  anchor: "left" | "right";
}) {
  return (
    <StepWindow
      ariaLabel={content.ariaLabel}
      title={content.title}
      anchor={anchor}
      status={
        <WindowBadge>
          <span className="size-1.5 rounded-full bg-accent-400" />
          {content.statusLabel}
        </WindowBadge>
      }
    >
      <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
        <Metric
          label={content.requests.label}
          value={content.requests.value}
          series={content.requests.series}
        />
        <Metric
          label={content.queue.label}
          value={content.queue.value}
          caption={content.queue.caption}
          series={content.queue.series}
        />
      </div>

      <ul className="space-y-1 bg-background px-5 py-4 font-mono text-[13px] leading-6">
        {content.logs.map((log) => (
          <li
            key={`${log.time}-${log.source}-${log.message}`}
            className="flex items-baseline gap-3"
          >
            <span className="hidden shrink-0 text-muted-foreground tabular-nums sm:inline">
              {log.time}
            </span>
            <span
              className={cn(
                "w-9 shrink-0",
                log.level === "WARN"
                  ? "text-accent-400"
                  : "text-muted-foreground",
              )}
            >
              {log.level}
            </span>
            <span className="min-w-0 flex-1 text-muted-foreground">
              <span className="text-foreground">{log.source}</span>{" "}
              <span className="break-words">{log.message}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-start gap-3 border-t border-border px-5 py-3.5 text-sm">
        <IconCircleCheck className="mt-0.5 size-4 shrink-0 text-accent-400" />
        <p className="min-w-0 text-muted-foreground">
          <span className="font-medium text-foreground">
            {content.alert.label}
          </span>
          <span className="mx-2 text-border-strong" aria-hidden="true">
            /
          </span>
          {content.alert.message}
        </p>
      </div>
    </StepWindow>
  );
}
