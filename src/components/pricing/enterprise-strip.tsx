import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import type { PricingContent } from "./pricing-data";

/**
 * The fourth tier as a single row under the plan grid, so the page does not
 * need a fourth column. Text on the left, the action on the right.
 */
export function EnterpriseStrip({
  content,
}: {
  content: PricingContent["enterprise"];
}) {
  const { label, title, description, cta } = content;

  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <div className="max-w-[60ch]">
        <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent-400"
          />
          {label}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-balance">
          {title}
        </h3>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          {description}
        </p>
      </div>
      <Link
        href={cta.href}
        className={buttonVariants({
          variant: "outline",
          size: "lg",
          className: "w-full shrink-0 sm:w-fit",
        })}
      >
        {cta.label}
        <IconArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  );
}
