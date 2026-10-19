import Link from "next/link";
import { IconArrowRight, IconBook } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { Crosshair } from "@/components/layout/crosshair";
import { HeroReveal } from "./hero-reveal";
import { HeroVisual } from "./hero-visual";
import { heroContent, type HeroContent } from "./hero-data";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function Hero({ content = heroContent }: { content?: HeroContent }) {
  const { badge, headline, description, primaryCta, secondaryCta, stageLabel } =
    content;

  return (
    <section className="relative border-b border-border">
      {/* Plain background on purpose: the rails and section lines frame it. */}
      <div className="flex flex-col items-center px-6 pt-20 pb-16 text-center md:px-12 md:pt-28 md:pb-20">
        <HeroReveal>
          <Link
            href={badge.href}
            className="group inline-flex items-center gap-2.5 rounded-full border border-border py-1.5 pr-3 pl-3.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:outline-none"
          >
            <span className="size-1.5 rounded-full bg-accent-400" />
            <span className="text-foreground">{badge.label}</span>
            <span className="h-3 w-px bg-border" />
            <span>{badge.cta}</span>
            <IconArrowRight className="size-3 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </HeroReveal>

        <HeroReveal delay={0.08} className="mt-8">
          <h1 className="max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            {headline.lead}{" "}
            <span className="block text-accent-400">{headline.highlight}</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.16} className="mt-6">
          <p className="max-w-[56ch] text-base text-balance text-muted-foreground md:text-lg">
            {description}
          </p>
        </HeroReveal>

        <HeroReveal delay={0.24} className="mt-10 w-full sm:w-auto">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              {primaryCta.label}
              <IconArrowRight
                data-icon="inline-end"
                className="transition-transform group-hover/button:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
            <Link
              href={secondaryCta.href}
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              <IconBook data-icon="inline-start" />
              {secondaryCta.label}
            </Link>
          </div>
        </HeroReveal>
      </div>

      {/* The stage: a full-width line, a label sitting on it, and the product
          preview hanging from the section's bottom line. */}
      <div className="relative border-t border-border px-6 pt-14 md:px-12 md:pt-16">
        <span className="absolute top-0 left-1/2 max-w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 truncate rounded-full border border-border bg-background px-3.5 py-1 font-mono text-xs tracking-wide text-muted-foreground">
          {stageLabel}
        </span>
        <Crosshair className={`top-[-5px] left-[-6px] ${crosshair}`} />
        <Crosshair className={`top-[-5px] right-[-6px] ${crosshair}`} />

        <HeroReveal delay={0.32} className="mx-auto w-full max-w-5xl">
          <HeroVisual />
        </HeroReveal>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
