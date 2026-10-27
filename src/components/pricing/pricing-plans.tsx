"use client";

import { useState } from "react";
import { BillingToggle } from "./billing-toggle";
import { PlanColumn } from "./plan-column";
import type { BillingPeriod, PricingContent } from "./pricing-data";

/**
 * The billing bar and the three plan columns. They share one piece of state,
 * the billing period, so they live together in this client component. The
 * columns are divided by hairlines between cells only (a rule above each
 * stacked plan, a rule beside each column from `lg`), so the grid never
 * doubles up with the frame or the section lines.
 */
export function PricingPlans({ content }: { content: PricingContent }) {
  const { billing, plans, featuredBadge } = content;
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div>
      <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p className="flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent-400"
          />
          {period === "yearly" ? billing.yearlyNote : billing.monthlyNote}
        </p>
        <BillingToggle value={period} onChange={setPeriod} copy={billing} />
      </div>

      <div className="grid divide-y divide-border border-t border-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {plans.map((plan) => (
          <PlanColumn
            key={plan.id}
            plan={plan}
            billing={period}
            featuredBadge={featuredBadge}
          />
        ))}
      </div>

      {/* Tells screen reader users what changed when the toggle is used. */}
      <p aria-live="polite" className="sr-only">
        {period === "yearly"
          ? "Showing yearly billing prices"
          : "Showing monthly billing prices"}
      </p>
    </div>
  );
}
