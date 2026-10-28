"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "./faq-data";

type FaqListProps = {
  items: FaqItem[];
  defaultOpenId: string | null;
  label: string;
};

/**
 * An accordion where one answer is open at a time. Each question is a real
 * button inside a heading, with `aria-expanded` and `aria-controls`; the
 * answer is a labelled region. Up and Down arrows, Home and End move focus
 * between questions. The open item shows a minus and a teal edge, and a
 * closed one shows a plus, so the state never depends on colour alone.
 *
 * Panels open by animating a grid row from `0fr` to `1fr`, which needs no
 * measured heights. Closed panels are `inert`, so their content cannot be
 * tabbed to or read out. `motion-reduce` turns the animation off.
 */
export function FaqList({ items, defaultOpenId, label }: FaqListProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const current = triggerRefs.current.findIndex(
      (element) => element === document.activeElement,
    );
    // Only handle keys while a question button has focus.
    if (current === -1) return;

    const last = items.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowDown":
        next = current === last ? 0 : current + 1;
        break;
      case "ArrowUp":
        next = current === 0 ? last : current - 1;
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
    triggerRefs.current[next]?.focus();
  }

  return (
    <div role="group" aria-label={label} onKeyDown={onKeyDown}>
      {items.map((item, index) => {
        const isOpen = item.id === openId;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn("relative", index > 0 && "border-t border-border")}
          >
            {/* A shape cue for the open question. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-0 left-0 w-0.5 bg-accent-400 transition-opacity motion-reduce:transition-none",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            />

            <h3>
              <button
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className={cn(
                  "group flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 focus-visible:ring-inset motion-reduce:transition-none md:px-10",
                  isOpen ? "bg-muted/60" : "hover:bg-card",
                )}
              >
                <span className="font-heading text-lg leading-snug font-medium tracking-[-0.01em] text-balance text-foreground md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none",
                    isOpen
                      ? "border-border-strong text-accent-400"
                      : "border-border text-muted-foreground group-hover:border-border-strong group-hover:text-foreground",
                  )}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className={cn(
                      "absolute h-3 w-px origin-center bg-current transition-transform duration-300 motion-reduce:transition-none",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
                isOpen
                  ? "visible grid-rows-[1fr]"
                  : "invisible grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] px-6 pb-7 text-base leading-relaxed text-pretty text-muted-foreground md:px-10">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
