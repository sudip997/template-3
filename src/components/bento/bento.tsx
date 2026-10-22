import { Crosshair } from "@/components/layout/crosshair";
import { bentoContent, type BentoContent } from "./bento-data";
import { BentoReveal } from "./bento-reveal";
import { PipelinePanel } from "./pipeline-panel";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function Bento({ content = bentoContent }: { content?: BentoContent }) {
  const { eyebrow, headline, description, pipeline } = content;

  return (
    <section
      id="features"
      aria-labelledby="bento-heading"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and panel lines do the framing. */}
      <div className="px-6 py-16 md:px-12 md:py-24">
        <BentoReveal>
          <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent-400"
            />
            {eyebrow}
          </p>
          <h2
            id="bento-heading"
            className="mt-5 max-w-[20ch] text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl"
          >
            {headline.lead}{" "}
            <span className="text-accent-400">{headline.highlight}</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-base text-pretty text-muted-foreground md:text-lg">
            {description}
          </p>
        </BentoReveal>
      </div>

      {/* The bento grid. Row 1 is a single full-width panel. */}
      <div className="relative border-t border-border">
        <Crosshair className={`top-[-5px] left-[-6px] ${crosshair}`} />
        <Crosshair className={`top-[-5px] right-[-6px] ${crosshair}`} />

        <BentoReveal delay={0.1}>
          <PipelinePanel content={pipeline} />
        </BentoReveal>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
