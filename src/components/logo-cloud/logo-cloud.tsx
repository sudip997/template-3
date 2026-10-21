import { Crosshair } from "@/components/layout/crosshair";
import { LogoGrid } from "./logo-grid";
import { logoCloudContent, type LogoCloudContent } from "./logo-cloud-data";

// The frame rails sit at the viewport edge below this width, so the
// crosshair marks would overflow the page. Only show them on wide screens.
const crosshair = "hidden xl:block";

export function LogoCloud({
  content = logoCloudContent,
}: {
  content?: LogoCloudContent;
}) {
  const { label, learnMoreLabel, logos } = content;

  return (
    <section
      aria-labelledby="logo-cloud-label"
      className="relative border-b border-border"
    >
      {/* Plain background on purpose: the rails and grid lines do the framing. */}
      <div className="px-6 pb-6 pt-18 text-center md:px-12 md:pb-8 md:pt-24">
        <p
          id="logo-cloud-label"
          className="mx-auto font-heading max-w-sm tracking-wide text-balance text-muted-foreground"
        >
          {label}
        </p>
      </div>

      <div className="border-t border-border">
        <LogoGrid logos={logos} learnMoreLabel={learnMoreLabel} />
      </div>

      {/* Where the section line meets the frame rails */}
      <Crosshair className={`bottom-[-5px] left-[-6px] ${crosshair}`} />
      <Crosshair className={`right-[-6px] bottom-[-5px] ${crosshair}`} />
    </section>
  );
}
