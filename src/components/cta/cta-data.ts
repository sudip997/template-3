import { siteConfig } from "@/config/site";

/* -------------------------------------------------------------------------
 * Section copy for the closing call to action. Replace the text, links and
 * command with your own. The command comes from `siteConfig`, so it follows
 * your product name automatically.
 * ---------------------------------------------------------------------- */

export type CtaContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  command: {
    /** Accessible name for the command block. */
    label: string;
    /** The text that is shown and copied. */
    text: string;
    copyLabel: string;
    copiedLabel: string;
  };
  /** Short facts under the actions. */
  notes: string[];
};

export const ctaContent: CtaContent = {
  eyebrow: "Get started",
  headline: {
    lead: "Ship your backend,",
    highlight: "not your boilerplate.",
  },
  description: `Create a project, push your first deploy and watch it go live. ${siteConfig.name} handles the databases, queues and cron jobs, so your team can get back to the product.`,
  primaryCta: { label: "Start building", href: "#" },
  secondaryCta: { label: "Read the docs", href: "#" },
  command: {
    label: "Install command",
    text: `npx ${siteConfig.command} init`,
    copyLabel: "Copy command",
    copiedLabel: "Command copied",
  },
  notes: ["Free plan, no card", "Live in minutes"],
};
