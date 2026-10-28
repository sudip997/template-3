/* -------------------------------------------------------------------------
 * Section copy and sample questions. Replace the questions and answers with
 * your own. Answers are plain text: keep each to a few sentences. The first
 * item opens by default (see `defaultOpenId`).
 * ---------------------------------------------------------------------- */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  /** The item that starts expanded. Use `null` to start with all closed. */
  defaultOpenId: string | null;
  /** Accessible name for the group of questions. */
  listLabel: string;
  items: FaqItem[];
  contact: {
    label: string;
    description: string;
    cta: { label: string; href: string };
  };
};

export const faqContent: FaqContent = {
  eyebrow: "FAQ",
  headline: {
    lead: "Questions,",
    highlight: "answered",
  },
  description:
    "The basics of plans, limits and security. If something is missing, our team replies within one business day.",
  defaultOpenId: "what-is-stackline",
  listLabel: "Frequently asked questions",
  items: [
    {
      id: "what-is-stackline",
      question: "What is Stackline?",
      answer:
        "Stackline is a backend platform for small teams. It runs your databases, queues and cron jobs on a single control plane, so you can ship a product without stitching together separate services or hiring an infrastructure team.",
    },
    {
      id: "free-plan",
      question: "What does the free plan include?",
      answer:
        "Hobby is free forever and needs no card. It includes 1M events a month, 3 pipelines, 7 days of retention and one seat, on a shared Postgres database with queues and cron jobs. It is built for side projects and prototypes.",
    },
    {
      id: "over-limits",
      question: "What happens if I go over my plan's limits?",
      answer:
        "We email you as you approach your monthly event limit, so there are no surprises. When you are ready for more room, you can upgrade in one click from the billing page and your pipelines keep running.",
    },
    {
      id: "change-or-cancel",
      question: "Can I change or cancel my plan at any time?",
      answer:
        "Yes. Monthly plans can be cancelled whenever you like, and you can move between plans from your billing settings. Yearly billing takes 20% off every plan.",
    },
    {
      id: "data-region",
      question: "Where is my data stored?",
      answer:
        "Your data lives in the region you choose when you create a project. Teams that need a dedicated region or a security review can talk to us about the Enterprise plan.",
    },
    {
      id: "sso-audit",
      question: "Do you support single sign-on and audit logs?",
      answer:
        "Single sign-on, audit logs and role-based access control come with the Team plan. Enterprise adds SCIM provisioning, so access follows your identity provider automatically.",
    },
    {
      id: "support",
      question: "How do I get help if something breaks?",
      answer:
        "Every plan has the community forum and full documentation. Pro adds priority email support, and Team adds an uptime SLA so you know what to expect when it matters.",
    },
  ],
  contact: {
    label: "Still have questions?",
    description:
      "Talk to a person on our team. We can help with plans, migrations and anything this page does not cover.",
    cta: { label: "Contact us", href: "#" },
  },
};
