"use client";

import { useId, useRef } from "react";
import { MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { BillingPeriod, PricingContent } from "./pricing-data";

type BillingToggleProps = {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
  copy: PricingContent["billing"];
};

/**
 * A pill segmented control for monthly or yearly billing. It is a radio
 * group: one option is tabbable, and the arrow keys move and select, as with
 * native radios. The selected option has a filled, outlined pill behind it,
 * so the state is a shape and never colour alone. The pill slides between
 * options, and visitors who prefer reduced motion see it jump instead.
 */
export function BillingToggle({ value, onChange, copy }: BillingToggleProps) {
  const indicatorId = useId();
  const refs = useRef<Record<BillingPeriod, HTMLButtonElement | null>>({
    monthly: null,
    yearly: null,
  });

  const options: { id: BillingPeriod; label: string; badge?: string }[] = [
    { id: "monthly", label: copy.monthlyLabel },
    { id: "yearly", label: copy.yearlyLabel, badge: copy.yearlyBadge },
  ];

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    let next: BillingPeriod | null = null;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
      case "Home":
        next = "monthly";
        break;
      case "ArrowRight":
      case "ArrowDown":
      case "End":
        next = "yearly";
        break;
    }
    if (next === null) return;
    event.preventDefault();
    onChange(next);
    refs.current[next]?.focus();
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="radiogroup"
        aria-label={copy.label}
        onKeyDown={onKeyDown}
        className="inline-flex items-center rounded-full border border-border bg-card p-0.5"
      >
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              ref={(element) => {
                refs.current[option.id] = element;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.id)}
              className={cn(
                "relative inline-flex h-8 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40 motion-reduce:transition-none",
                selected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={indicatorId}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-border-strong bg-muted"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <span className="relative">{option.label}</span>
              {option.badge ? (
                <span className="relative font-mono text-[11px] tracking-wide text-accent-400">
                  {option.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </MotionConfig>
  );
}
