"use client";

import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { IconCheck, IconSparkles } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BillingPeriod, Plan } from "./pricing-data";

type PlanColumnProps = {
  plan: Plan;
  billing: BillingPeriod;
  featuredBadge: string;
  className?: string;
};

/**
 * One plan, drawn as a column of the framed pricing grid rather than a boxed
 * card. The grid supplies the dividers. The featured plan gets the tinted
 * surface, a thin teal line on its top edge and a text badge.
 */
export function PlanColumn({
  plan,
  billing,
  featuredBadge,
  className,
}: PlanColumnProps) {
  const { id, name, description, price, freeNote, featured, cta, limits, features } =
    plan;
  const perMonth = price[billing];
  const isFree = price.monthly === 0;
  const note = isFree
    ? freeNote
    : billing === "yearly"
      ? `per month, billed $${perMonth * 12} yearly`
      : "per month";

  return (
    <article
      aria-labelledby={`plan-${id}`}
      className={cn(
        "relative flex flex-col p-6 md:p-8",
        featured && "bg-accent-subtle/60",
        className,
      )}
    >
      {featured ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-accent-400/70"
        />
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <h3
          id={`plan-${id}`}
          className="font-mono text-xs tracking-wide text-muted-foreground uppercase"
        >
          {name}
        </h3>
        {featured ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/40 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-accent-400">
            <IconSparkles aria-hidden="true" className="size-3" />
            {featuredBadge}
          </span>
        ) : null}
      </div>

      {/* Fixed height so the columns stay level while the figure changes. */}
      <MotionConfig reducedMotion="user">
        <div className="mt-6 flex h-14 items-baseline overflow-hidden font-heading leading-none font-semibold tracking-[-0.035em] text-foreground">
          <span aria-hidden="true" className="mr-0.5 self-start pt-1.5 text-2xl font-medium text-muted-foreground">
            $
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${id}-${billing}`}
              className="text-6xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {perMonth}
            </motion.span>
          </AnimatePresence>
        </div>
      </MotionConfig>
      <p className="mt-2 font-mono text-xs tracking-wide text-muted-foreground">
        {note}
      </p>

      <p className="mt-5 max-w-[34ch] text-sm text-pretty text-muted-foreground">
        {description}
      </p>

      <Link
        href={cta.href}
        className={buttonVariants({
          variant: featured ? "default" : "outline",
          size: "lg",
          className: "mt-6 w-full",
        })}
      >
        {cta.label}
      </Link>

      {/* Usage limits: mono rows split by hairlines */}
      <dl className="mt-8 border-t border-border">
        {limits.map((limit) => (
          <div
            key={limit.label}
            className="flex items-baseline justify-between gap-4 border-b border-border py-3"
          >
            <dt className="text-sm text-muted-foreground">{limit.label}</dt>
            <dd className="font-mono text-sm text-foreground">{limit.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <IconCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-accent-400"
            />
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
