import type { LogoMarkId } from "./logo-marks";

export type LogoItem = {
  /** Brand name, shown as the wordmark and read by screen readers. */
  name: string;
  /** Where "Learn more" goes, e.g. a customer story. */
  href: string;
  /** Which placeholder glyph to draw (see `logo-marks.tsx`). */
  mark: LogoMarkId;
};

export type LogoCloudContent = {
  label: string;
  learnMoreLabel: string;
  logos: LogoItem[];
};

// Eight placeholder brands. Replace names, glyphs and links with your own.
export const logoCloudContent: LogoCloudContent = {
  label: "Trusted by engineering teams shipping on Stackline",
  learnMoreLabel: "Learn More",
  logos: [
    { name: "Arcwell", href: "#", mark: "arc" },
    { name: "Quanta", href: "#", mark: "hexagon" },
    { name: "Fieldnote", href: "#", mark: "page" },
    { name: "Brightloop", href: "#", mark: "loop" },
    { name: "Kiln", href: "#", mark: "arch" },
    { name: "Parallax", href: "#", mark: "slant" },
    { name: "Tidepool", href: "#", mark: "waves" },
    { name: "Ormolu", href: "#", mark: "diamond" },
  ],
};
