import Link from "next/link";
import { IconArrowRight, IconBook } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { Crosshair } from "@/components/layout/crosshair";
import { HeroReveal } from "./hero-reveal";
import { HeroVisual } from "./hero-visual";
import { heroContent, type HeroContent } from "./hero-data";

export function Hero({ content = heroContent }: { content?: HeroContent }) {
  const { badge, headline, description, primaryCta, secondaryCta } = content;

  return (
    <section className="relative border-b border-border">
      {/* Plain background on purpose: the rails and section line frame it. */}
      <div className="flex flex-col items-center px-6 pt-20 text-center md:px-12 md:pt-28">
        <HeroReveal>
          <Link
            href={badge.href}
            className="group inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:outline-none"
          >
            <span className="size-1.5 rounded-full bg-accent-500" />
            <span className="text-foreground">{badge.label}</span>
            <span className="h-3 w-px bg-border" />
            <span>{badge.cta}</span>
            <IconArrowRight className="size-3 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </HeroReveal>

        <HeroReveal delay={0.08} className="mt-8">
          <h1 className="max-w-3xl text-5xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
            {headline.lead}{" "}
            <span className="text-accent-400">{headline.highlight}</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.16} className="mt-6">
          <p className="max-w-[60ch] text-base text-balance text-muted-foreground">
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

        <HeroReveal delay={0.32} className="mt-16 w-full max-w-5xl md:mt-20">
          <HeroVisual />
        </HeroReveal>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className="bottom-[-5px] left-[-6px]" />
      <Crosshair className="right-[-6px] bottom-[-5px]" />
    </section>
  );
}
