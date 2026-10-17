import { IconCheck } from "@tabler/icons-react";
import { heroVisual, type HeroVisualContent } from "./hero-data";

/**
 * A framed product mock built from plain HTML so it is trivial to replace
 * with a real screenshot. It hangs from the section's bottom line: no bottom
 * border and no bottom padding, so the line closes the frame.
 */
export function HeroVisual({
  content = heroVisual,
}: {
  content?: HeroVisualContent;
}) {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden rounded-t-lg border border-b-0 border-border bg-background text-left"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full border border-border-strong" />
          <span className="size-2.5 rounded-full border border-border-strong" />
          <span className="size-2.5 rounded-full border border-border-strong" />
        </div>
        <span className="font-mono text-xs tracking-wide text-muted-foreground">
          {content.title}
        </span>
      </div>

      {/* Terminal + services share one border */}
      <div className="grid divide-y divide-border md:grid-cols-[1.4fr_1fr] md:divide-x md:divide-y-0">
        <div className="space-y-1 p-5 font-mono text-[13px] leading-6">
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
              <span>{step.duration}</span>
            </p>
          ))}
          <p className="pt-2 text-accent-400">Live at {content.liveUrl}</p>
        </div>

        <div className="divide-y divide-border">
          <p className="px-5 py-3 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {content.servicesLabel}
          </p>
          <ul className="divide-y divide-border">
            {content.services.map((service) => (
              <li
                key={service.name}
                className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={
                      service.live
                        ? "size-1.5 shrink-0 rounded-full bg-accent-500"
                        : "size-1.5 shrink-0 rounded-full bg-border-strong"
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
