import { IconCheck } from "@tabler/icons-react";
import { HeroChart } from "./hero-chart";
import { heroVisual, type HeroVisualContent } from "./hero-data";

/**
 * A framed product mock built from plain HTML so it is trivial to replace
 * with a real screenshot. It hangs from the section's bottom line: no bottom
 * border and no bottom padding, so the line closes the frame.
 *
 * Status is never colour alone: live services get a filled dot and a text
 * label, scheduled ones a hollow dot and their next run time.
 */
export function HeroVisual({
  content = heroVisual,
}: {
  content?: HeroVisualContent;
}) {
  return (
    <div
      role="img"
      aria-label={content.ariaLabel}
      className="w-full overflow-hidden rounded-t-xl border border-b-0 border-border bg-card text-left"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5">
            <span className="size-2.5 rounded-full border border-border-strong" />
            <span className="size-2.5 rounded-full border border-border-strong" />
            <span className="size-2.5 rounded-full border border-border-strong" />
          </div>
          <span className="truncate font-mono text-xs tracking-wide text-muted-foreground">
            {content.title}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-foreground">
          <span className="size-1.5 rounded-full bg-accent-400" />
          {content.statusLabel}
        </span>
      </div>

      {/* Deploy log (left) and runtime panels (right) share one divider */}
      <div className="grid divide-y divide-border md:grid-cols-[1.05fr_1fr] md:divide-x md:divide-y-0">
        <div className="space-y-1 bg-background p-5 font-mono text-[13px] leading-6">
          <p>
            <span className="text-muted-foreground">$</span>{" "}
            <span className="text-foreground">{content.command}</span>
          </p>
          {content.steps.map((step) => (
            <p
              key={step.label}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <IconCheck className="size-3.5 shrink-0 text-accent-400" />
              <span className="min-w-0 flex-1 truncate">{step.label}</span>
              <span className="tabular-nums">{step.duration}</span>
            </p>
          ))}
          <p className="pt-2 text-accent-400">Live at {content.liveUrl}</p>
        </div>

        <div className="divide-y divide-border">
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                {content.chart.label}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {content.chart.range}
              </p>
            </div>
            <p className="mt-1 text-2xl font-medium tracking-tight text-foreground tabular-nums">
              {content.chart.value}
            </p>
            <div className="mt-3">
              <HeroChart points={content.chart.points} />
            </div>
          </div>

          <p className="px-5 py-3 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {content.servicesLabel}
          </p>
          <ul className="divide-y divide-border">
            {content.services.map((service) => (
              <li
                key={service.name}
                className="flex items-center justify-between gap-4 px-5 py-2.5 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={
                      service.live
                        ? "size-1.5 shrink-0 rounded-full bg-accent-400"
                        : "size-1.5 shrink-0 rounded-full border border-muted-foreground"
                    }
                  />
                  <span className="truncate font-mono text-foreground">
                    {service.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {service.region}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {service.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stats row */}
      <dl className="grid grid-cols-3 divide-x divide-border border-t border-border">
        {content.stats.map((stat) => (
          <div key={stat.label} className="px-5 py-4">
            <dt className="font-mono text-xs tracking-wide text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="mt-1 text-lg font-medium tracking-tight text-foreground tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
