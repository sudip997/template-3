import Link from "next/link";
import { IconArrowRight, IconBook } from "@tabler/icons-react";
import { Crosshair } from "@/components/layout/crosshair";
import { buttonVariants } from "@/components/ui/button";
import { CommandSnippet } from "./command-snippet";
import { ctaContent, type CtaContent } from "./cta-data";
import { CtaReveal } from "./cta-reveal";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function Cta({ content = ctaContent }: { content?: CtaContent }) {
  const { eyebrow, headline, description, primaryCta, secondaryCta, command, notes } =
    content;

  return (
    <section
      id="get-started"
      aria-labelledby="cta-heading"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and divider lines do the framing. */}
      <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Message, left-aligned so it reads differently from the centered hero. */}
        <div className="px-6 py-16 md:px-12 lg:py-24">
          <CtaReveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent-400"
              />
              {eyebrow}
            </p>
            <h2
              id="cta-heading"
              className="mt-5 max-w-[18ch] text-4xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-5xl"
            >
              {headline.lead}{" "}
              <span className="text-accent-400">{headline.highlight}</span>
            </h2>
            <p className="mt-5 max-w-[48ch] text-base text-pretty text-muted-foreground md:text-lg">
              {description}
            </p>
          </CtaReveal>
        </div>

        {/* Actions. The divider is a hairline; a short bright segment at its
            top marks where the eye should start. */}
        <div className="relative border-t border-border lg:border-t-0 lg:border-l">
          <span
            aria-hidden="true"
            className="absolute top-0 -left-px hidden h-12 w-px bg-accent-400 lg:block"
          />
          <CtaReveal
            delay={0.1}
            className="flex h-full flex-col justify-center gap-6 px-6 py-12 md:px-12 lg:py-24"
          >
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={primaryCta.href}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "w-full sm:w-auto lg:w-full xl:w-auto",
                })}
              >
                {primaryCta.label}
                <IconArrowRight
                  data-icon="inline-end"
                  aria-hidden="true"
                  className="transition-transform group-hover/button:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
              <Link
                href={secondaryCta.href}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full sm:w-auto lg:w-full xl:w-auto",
                })}
              >
                <IconBook data-icon="inline-start" aria-hidden="true" />
                {secondaryCta.label}
              </Link>
            </div>

            <CommandSnippet content={command} />

            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground">
              {notes.map((note, index) => (
                <li key={note} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="h-3 w-px bg-border-strong" />
                  )}
                  {note}
                </li>
              ))}
            </ul>
          </CtaReveal>
        </div>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
