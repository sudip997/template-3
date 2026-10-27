/* -------------------------------------------------------------------------
 * Section copy and sample plans. Replace names, prices, limits and features
 * with your own. Yearly prices are the per-month figure when billed yearly,
 * so the "billed yearly" total is worked out from them.
 * ---------------------------------------------------------------------- */

export type BillingPeriod = "monthly" | "yearly";

export type PlanLimit = {
  label: string;
  /** Shown in mono, e.g. "50M / month". */
  value: string;
};

export type Plan = {
  id: string;
  name: string;
  /** One line on who the plan is for. */
  description: string;
  /** Price per month in whole dollars. Use 0 for a free plan. */
  price: { monthly: number; yearly: number };
  /** Shown instead of the billing note when the price is 0. */
  freeNote?: string;
  /** Highlights one plan with the tinted surface and a text badge. */
  featured?: boolean;
  cta: { label: string; href: string };
  limits: PlanLimit[];
  features: string[];
};

export type PricingContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  billing: {
    label: string;
    monthlyLabel: string;
    yearlyLabel: string;
    /** Short text chip next to the yearly option, e.g. "Save 20%". */
    yearlyBadge: string;
    monthlyNote: string;
    yearlyNote: string;
  };
  featuredBadge: string;
  plans: Plan[];
  enterprise: {
    label: string;
    title: string;
    description: string;
    cta: { label: string; href: string };
  };
};

export const pricingContent: PricingContent = {
  eyebrow: "Pricing",
  headline: {
    lead: "Pricing that grows",
    highlight: "with your traffic",
  },
  description:
    "Start free and upgrade when you ship. Every plan includes databases, queues and cron jobs on the same control plane.",
  billing: {
    label: "Billing period",
    monthlyLabel: "Monthly",
    yearlyLabel: "Yearly",
    yearlyBadge: "Save 20%",
    monthlyNote: "Billed monthly · cancel anytime",
    yearlyNote: "Billed yearly · 20% off every plan",
  },
  featuredBadge: "Most popular",
  plans: [
    {
      id: "hobby",
      name: "Hobby",
      description: "For side projects and prototypes you want online today.",
      price: { monthly: 0, yearly: 0 },
      freeNote: "Free forever, no card required",
      cta: { label: "Start for free", href: "#" },
      limits: [
        { label: "Events", value: "1M / month" },
        { label: "Pipelines", value: "3" },
        { label: "Retention", value: "7 days" },
        { label: "Seats", value: "1" },
      ],
      features: [
        "Shared Postgres database",
        "Queues and cron jobs",
        "Community support",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "For small teams running real traffic in production.",
      price: { monthly: 29, yearly: 23 },
      featured: true,
      cta: { label: "Start building", href: "#" },
      limits: [
        { label: "Events", value: "50M / month" },
        { label: "Pipelines", value: "Unlimited" },
        { label: "Retention", value: "30 days" },
        { label: "Seats", value: "5" },
      ],
      features: [
        "Dedicated database instances",
        "Preview environments",
        "Daily backups",
        "Priority email support",
      ],
    },
    {
      id: "team",
      name: "Team",
      description: "For growing teams that need access control and recovery.",
      price: { monthly: 99, yearly: 79 },
      cta: { label: "Start building", href: "#" },
      limits: [
        { label: "Events", value: "500M / month" },
        { label: "Pipelines", value: "Unlimited" },
        { label: "Retention", value: "180 days" },
        { label: "Seats", value: "25" },
      ],
      features: [
        "Single sign-on and audit logs",
        "Point-in-time recovery",
        "Role-based access control",
        "Uptime SLA",
      ],
    },
  ],
  enterprise: {
    label: "Enterprise",
    title: "Running Stackline at a larger scale?",
    description:
      "Custom limits, dedicated regions, SCIM provisioning and a security review for your team.",
    cta: { label: "Contact sales", href: "#" },
  },
};
