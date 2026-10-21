import { cn } from "@/lib/utils";
import { BarStrip } from "./bar-strip";
import { CountUp } from "./count-up";
import { formatMetricNumber } from "./format-metric";
import type { MetricStat } from "./metrics-data";

type StatCellProps = {
  stat: MetricStat;
  /** Border classes from the grid, which decides where the dividers sit. */
  className?: string;
};

/**
 * One stat: label, big figure, a line of context and a mono footnote. It is
 * a group inside a `<dl>`, so the label and value are announced as a pair.
 * A stat with a `series` is the lead stat: a larger figure plus a bar strip.
 */
export function StatCell({ stat, className }: StatCellProps) {
  const {
    label,
    value,
    decimals,
    prefix,
    suffix,
    description,
    footnote,
    series,
  } = stat;
  const isLead = Boolean(series);
  const spoken = `${prefix ?? ""}${formatMetricNumber(value, decimals)}${suffix ?? ""}`;

  return (
    <div className={cn("flex flex-col p-6 md:p-8", className)}>
      <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>

      <dd
        className={cn(
          "mt-6 font-heading leading-none font-semibold tracking-[-0.035em] text-foreground",
          isLead ? "text-6xl lg:text-7xl" : "text-5xl lg:text-6xl",
        )}
      >
        <span aria-hidden="true" className="inline-flex items-baseline">
          {prefix}
          <CountUp value={value} decimals={decimals} />
          {suffix ? (
            <span
              className={cn(
                "ml-1 font-medium tracking-normal text-muted-foreground",
                isLead ? "text-3xl" : "text-2xl",
              )}
            >
              {suffix}
            </span>
          ) : null}
        </span>
        <span className="sr-only">{spoken}</span>
      </dd>

      <dd className="mt-4 max-w-[34ch] text-sm text-pretty text-muted-foreground">
        {description}
      </dd>

      {series ? (
        <dd className="mt-8">
          <BarStrip values={series} />
        </dd>
      ) : null}

      <dd className="mt-auto pt-6 font-mono text-[11px] tracking-wide text-muted-foreground">
        {footnote}
      </dd>
    </div>
  );
}
