import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { StepReveal } from "./step-reveal";
import type { HowItWorksStep } from "./how-it-works-data";

type StepRowProps = {
  step: HowItWorksStep;
  /**
   * Put the product window on the left and the text on the right (wide
   * screens only). The text always comes first in the source order and on
   * small screens, so reading order never changes.
   */
  windowFirst?: boolean;
  /** The product window for this step. */
  children: React.ReactNode;
};

/**
 * One step: text on one side, a product window on the other. The row is
 * separated from its neighbours by a hairline only. There is no connecting
 * line and no step number.
 */
export function StepRow({ step, windowFirst = false, children }: StepRowProps) {
  const Icon = step.icon;

  return (
    <li className="grid border-t border-border lg:grid-cols-2 lg:items-center">
      <div className="px-6 pt-12 pb-10 md:px-12 lg:py-20">
        <StepReveal>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-accent-400"
            >
              <Icon className="size-[18px]" />
            </span>
            <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {step.label}
            </span>
          </div>

          <h3 className="mt-6 max-w-[20ch] text-3xl leading-[1.1] font-semibold tracking-[-0.025em] text-balance md:text-4xl">
            {step.title}
          </h3>
          <p className="mt-4 max-w-[46ch] text-base text-pretty text-muted-foreground">
            {step.description}
          </p>

          <ul
            role="list"
            className="mt-8 max-w-md divide-y divide-border border-y border-border"
          >
            {step.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 py-3 text-sm text-foreground"
              >
                <IconCheck
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
                {point}
              </li>
            ))}
          </ul>
        </StepReveal>
      </div>

      {/* On wide screens the window runs out to the frame rail, so this
          column drops the padding on that side. */}
      <div
        className={cn(
          "px-6 pb-12 md:px-12 lg:py-16",
          windowFirst ? "lg:order-first lg:pr-8 lg:pl-0" : "lg:pr-0 lg:pl-8",
        )}
      >
        <StepReveal delay={0.1}>{children}</StepReveal>
      </div>
    </li>
  );
}
