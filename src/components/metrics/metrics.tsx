import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Crosshair } from "@/components/layout/crosshair";
import { cn } from "@/lib/utils";
import { metricsContent, type MetricsContent } from "./metrics-data";
import { MetricsReveal } from "./metrics-reveal";
import { StatCell } from "./stat-cell";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

/**
 * Where each stat's divider lines go. Mobile is one column (a rule above
 * every stat but the first); from `sm` it is a 2×2 grid (a rule above the
 * second row and beside the second column). Lines sit between cells only, so
 * the section never doubles up with the frame or the section line.
 */
function cellBorders(index: number) {
  return cn(
    index > 0 && "border-t",
    index < 2 ? "sm:border-t-0" : "sm:border-t",
    index % 2 === 1 ? "sm:border-l" : "sm:border-l-0",
  );
}

export function Metrics({
  content = metricsContent,
}: {
  content?: MetricsContent;
}) {
  const { eyebrow, headline, description, statusLabel, link, stats } = content;

  return (
    <section
      id="metrics"
      aria-labelledby="metrics-heading"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and divider lines do the framing. */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex px-6 py-16 md:px-12 lg:py-20">
          <MetricsReveal className="flex flex-1 flex-col">
            <div>
              <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent-400"
                />
                {eyebrow}
              </p>
              <h2
                id="metrics-heading"
                className="mt-5 max-w-[16ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-4xl"
              >
                {headline.lead}{" "}
                <span className="text-accent-400">{headline.highlight}</span>
              </h2>
              <p className="mt-4 max-w-[40ch] text-base text-pretty text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-5 lg:mt-auto">
              <p className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent-400"
                />
                {statusLabel}
              </p>
              <Link
                href={link.href}
                className="group inline-flex w-fit items-center gap-1.5 rounded-sm text-sm text-foreground underline-offset-4 transition-colors hover:text-accent-400 hover:underline focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:outline-none"
              >
                {link.label}
                <IconArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </MetricsReveal>
        </div>

        {/* The stat grid runs out to the frame rail on wide screens. */}
        <div className="border-t border-border lg:border-t-0 lg:border-l">
          <MetricsReveal delay={0.1} className="h-full">
            <dl className="grid h-full sm:auto-rows-fr sm:grid-cols-2">
              {stats.map((stat, index) => (
                <StatCell
                  key={stat.id}
                  stat={stat}
                  className={cellBorders(index)}
                />
              ))}
            </dl>
          </MetricsReveal>
        </div>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
