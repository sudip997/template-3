import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Crosshair } from "@/components/layout/crosshair";
import { buttonVariants } from "@/components/ui/button";
import { faqContent, type FaqContent } from "./faq-data";
import { FaqList } from "./faq-list";
import { FaqReveal } from "./faq-reveal";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function Faq({ content = faqContent }: { content?: FaqContent }) {
  const {
    eyebrow,
    headline,
    description,
    defaultOpenId,
    listLabel,
    items,
    contact,
  } = content;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and divider lines do the framing. */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Intro column. On wide screens it stays in view while the visitor
            reads down the questions. */}
        <div className="px-6 py-16 md:px-12 lg:py-20">
          <FaqReveal className="lg:sticky lg:top-24">
            <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent-400"
              />
              {eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-5 max-w-[16ch] text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-4xl"
            >
              {headline.lead}{" "}
              <span className="text-accent-400">{headline.highlight}</span>
            </h2>
            <p className="mt-4 max-w-[40ch] text-base text-pretty text-muted-foreground">
              {description}
            </p>

            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-5">
              <p className="text-sm font-medium text-foreground">
                {contact.label}
              </p>
              <p className="max-w-[36ch] text-sm text-pretty text-muted-foreground">
                {contact.description}
              </p>
              <Link
                href={contact.cta.href}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full sm:w-fit",
                })}
              >
                {contact.cta.label}
                <IconArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </FaqReveal>
        </div>

        {/* The questions run out to the frame rail on wide screens. */}
        <div className="border-t border-border lg:border-t-0 lg:border-l">
          <FaqReveal delay={0.1}>
            <FaqList
              items={items}
              defaultOpenId={defaultOpenId}
              label={listLabel}
            />
          </FaqReveal>
        </div>
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
