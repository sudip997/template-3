"use client";

import { useId, useRef, useState } from "react";
import { IconQuote } from "@tabler/icons-react";
import { LogoMark } from "@/components/logo-cloud/logo-marks";
import { cn } from "@/lib/utils";
import type { Testimonial } from "./testimonials-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * One large quote on the left and a selector of customers on the right. It is
 * a tabs pattern: arrow keys move between customers, Home and End jump to the
 * first and last, and the quote follows focus. There is no autoplay.
 *
 * Every quote sits in the same grid cell and only the selected one is
 * visible, so the row keeps the height of the tallest quote and never jumps
 * when the selection changes. The change is a short fade, which
 * `motion-reduce` turns off.
 */
export function FeaturedQuotes({ items }: { items: Testimonial[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
    }

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* The quotes. The text column comes first in the source order and on
          small screens; the selector sits under it. */}
      <div className="grid">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <div
              key={item.id}
              role="tabpanel"
              id={`${baseId}-panel-${item.id}`}
              aria-labelledby={`${baseId}-tab-${item.id}`}
              className={cn(
                "col-start-1 row-start-1 flex flex-col transition-[opacity,translate,visibility] duration-300 motion-reduce:transition-none",
                isActive
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0",
              )}
            >
              <div className="flex flex-1 flex-col px-6 pt-10 pb-8 md:px-12 md:pt-14 lg:pb-10">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-accent-400"
                >
                  <IconQuote className="size-[18px]" />
                </span>

                <figure className="mt-8 flex flex-1 flex-col">
                  <blockquote className="font-heading text-2xl leading-[1.25] font-medium tracking-[-0.02em] text-balance text-foreground md:text-3xl">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 lg:mt-auto lg:pt-8">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-xs text-muted-foreground"
                    >
                      {getInitials(item.author)}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {item.author}
                      </span>
                      <span className="font-mono text-xs tracking-wide text-muted-foreground">
                        {item.role}, {item.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </div>

              <dl className="flex flex-col gap-1 border-t border-border px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between md:px-12">
                <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {item.result.label}
                </dt>
                <dd className="font-heading text-lg font-semibold tracking-tight text-accent-400">
                  {item.result.value}
                </dd>
              </dl>
            </div>
          );
        })}
      </div>

      {/* The selector. On wide screens it runs out to the frame rail. */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Customers"
        onKeyDown={onKeyDown}
        className="flex flex-col border-t border-border lg:border-t-0 lg:border-l"
      >
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "relative flex flex-1 flex-col items-start justify-center gap-2 border-t border-border px-6 py-6 text-left transition-colors outline-none first:border-t-0 focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:ring-inset motion-reduce:transition-none md:px-8",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-card hover:text-foreground",
              )}
            >
              {/* A shape cue for the selected customer, so the state never
                  depends on colour alone. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 bg-accent-400 transition-opacity motion-reduce:transition-none",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <LogoMark mark={item.mark} name={item.company} />
              <span className="font-mono text-xs tracking-wide text-muted-foreground">
                {item.author} · {item.role}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
