import { Crosshair } from "@/components/layout/crosshair";
import { FeaturedQuotes } from "./featured-quotes";
import { QuoteWall } from "./quote-wall";
import {
  testimonialsContent,
  type TestimonialsContent,
} from "./testimonials-data";
import { TestimonialsReveal } from "./testimonials-reveal";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function Testimonials({
  content = testimonialsContent,
}: {
  content?: TestimonialsContent;
}) {
  const { eyebrow, headline, description, featured, wall, wallLabel } = content;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and row lines do the framing. */}
      <div className="px-6 py-16 md:px-12 md:py-24">
        <TestimonialsReveal>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent-400"
                />
                {eyebrow}
              </p>
              <h2
                id="testimonials-heading"
                className="mt-5 max-w-[18ch] text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl"
              >
                {headline.lead}{" "}
                <span className="text-accent-400">{headline.highlight}</span>
              </h2>
            </div>
            <p className="max-w-[46ch] text-base text-pretty text-muted-foreground md:text-lg lg:justify-self-end">
              {description}
            </p>
          </div>
        </TestimonialsReveal>
      </div>

      {/* Featured quote and customer selector */}
      <div className="relative border-t border-border">
        {/* <Crosshair className={`top-[-5px] left-[-6px] ${crosshair}`} />
        <Crosshair className={`top-[-5px] right-[-6px] ${crosshair}`} /> */}

        <TestimonialsReveal delay={0.1}>
          <FeaturedQuotes items={featured} />
        </TestimonialsReveal>
      </div>

      {/* More voices: a 2×2 wall divided by hairlines, no boxed cards */}
      <div className="relative border-t border-border">
        <Crosshair className={`top-[-5px] left-[-6px] ${crosshair}`} />
        <Crosshair className={`top-[-5px] right-[-6px] ${crosshair}`} />

        <TestimonialsReveal delay={0.1}>
          <QuoteWall items={wall} label={wallLabel} />
        </TestimonialsReveal>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
