import type { LogoMarkId } from "@/components/logo-cloud/logo-marks";

/* -------------------------------------------------------------------------
 * Section copy and sample quotes. Every person, role and company below is
 * invented. Replace them with real customers, and only publish a quote (and
 * a result figure) once the customer has agreed to it.
 * ---------------------------------------------------------------------- */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  /** Shown in the selector next to its glyph. */
  company: string;
  /** Placeholder glyph, shared with the logo cloud (see `logo-marks.tsx`). */
  mark: LogoMarkId;
  /** One concrete outcome, shown under the quote. */
  result: { label: string; value: string };
};

export type WallQuote = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type TestimonialsContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  /** Four customers fill the selector beside the featured quote. */
  featured: Testimonial[];
  /** Four short quotes fill the 2×2 wall under the featured row. */
  wall: WallQuote[];
  /** Screen-reader heading for the wall. */
  wallLabel: string;
};

export const testimonialsContent: TestimonialsContent = {
  eyebrow: "Customers",
  headline: {
    lead: "Teams ship faster",
    highlight: "with less to babysit",
  },
  description:
    "Engineers on why they moved their databases, queues and cron jobs onto one control plane.",
  featured: [
    {
      id: "arcwell",
      quote:
        "We replaced a managed database, a queue service and a pile of cron scripts with Stackline. Deploys that used to be a half-day checklist are now a single command.",
      author: "Priya Raman",
      role: "Staff Engineer",
      company: "Arcwell",
      mark: "arc",
      result: { label: "Deploy time", value: "11 min → 40 s" },
    },
    {
      id: "quanta",
      quote:
        "Our peak traffic tripled in a quarter and we didn't add a platform engineer. Queues scale on their own, and the status page tells us the truth.",
      author: "Marcus Ellery",
      role: "VP Engineering",
      company: "Quanta",
      mark: "hexagon",
      result: { label: "Peak traffic", value: "3× in one quarter" },
    },
    {
      id: "fieldnote",
      quote:
        "Rolling back used to mean a war room. Now it's one click, and a failed cron job pages the right person with the logs already attached.",
      author: "Hannah Okafor",
      role: "CTO",
      company: "Fieldnote",
      mark: "page",
      result: { label: "Time to roll back", value: "35 min → 1 min" },
    },
    {
      id: "kiln",
      quote:
        "I set up a database, a worker queue and nightly jobs in an afternoon. As a team of four, we ship features instead of babysitting infrastructure.",
      author: "Tomás Duarte",
      role: "Founding Engineer",
      company: "Kiln",
      mark: "arch",
      result: { label: "Time to first deploy", value: "One afternoon" },
    },
  ],
  wallLabel: "More from our customers",
  wall: [
    {
      id: "brightloop",
      quote:
        "Branch databases made migrations boring, which is exactly what we wanted.",
      author: "Lena Fischer",
      role: "Backend Lead",
      company: "Brightloop",
    },
    {
      id: "parallax",
      quote:
        "The CLI is the product for us. Everything I need is one stackline command away.",
      author: "Dev Malhotra",
      role: "Platform Engineer",
      company: "Parallax",
    },
    {
      id: "tidepool",
      quote:
        "Logs, queues and cron history in one place made our incident reviews shorter and calmer.",
      author: "Sofia Marin",
      role: "Site Reliability Engineer",
      company: "Tidepool",
    },
    {
      id: "ormolu",
      quote:
        "Pricing we can predict, and support that answers with an actual engineer.",
      author: "Owen Tate",
      role: "Engineering Manager",
      company: "Ormolu",
    },
  ],
};
