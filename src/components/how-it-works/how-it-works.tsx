import { Crosshair } from "@/components/layout/crosshair";
import { ConfigWindow } from "./config-window";
import { ConsoleWindow } from "./console-window";
import { DeployWindow } from "./deploy-window";
import {
  howItWorksContent,
  type HowItWorksContent,
  type StepVisualId,
} from "./how-it-works-data";
import { StepReveal } from "./step-reveal";
import { StepRow } from "./step-row";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

function StepVisual({
  id,
  anchor,
}: {
  id: StepVisualId;
  anchor: "left" | "right";
}) {
  switch (id) {
    case "config":
      return <ConfigWindow anchor={anchor} />;
    case "deploy":
      return <DeployWindow anchor={anchor} />;
    case "console":
      return <ConsoleWindow anchor={anchor} />;
  }
}

export function HowItWorks({
  content = howItWorksContent,
}: {
  content?: HowItWorksContent;
}) {
  const { eyebrow, headline, description, steps } = content;

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and row lines do the framing. */}
      <div className="px-6 py-16 md:px-12 md:py-24">
        <StepReveal>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wide text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent-400"
                />
                {eyebrow}
              </p>
              <h2
                id="how-it-works-heading"
                className="mt-5 max-w-[18ch] text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl"
              >
                {headline.lead}{" "}
                <span className="text-accent-400">{headline.highlight}</span>
              </h2>
            </div>
            <p className="max-w-[46ch] text-base text-pretty text-muted-foreground md:text-lg lg:justify-self-end">
              {description}
            </p>
          </div>
        </StepReveal>
      </div>

      {/* An ordered list tells assistive tech the steps are in sequence, with
          no visible numbering. Steps 1 and 3 have the text on the left; step 2
          swaps sides. */}
      <ol role="list">
        {steps.map((step, index) => {
          const windowFirst = index % 2 === 1;
          return (
            <StepRow key={step.id} step={step} windowFirst={windowFirst}>
              <StepVisual
                id={step.visual}
                anchor={windowFirst ? "left" : "right"}
              />
            </StepRow>
          );
        })}
      </ol>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
