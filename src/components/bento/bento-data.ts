import type { ComponentType } from "react";
import {
  IconApi,
  IconBrandSlack,
  IconBrandStripe,
  IconBuildingWarehouse,
  IconDatabase,
  IconFileCode,
  IconHistory,
  IconLayoutDashboard,
  IconMail,
  IconRepeat,
  IconRoute,
  IconWebhook,
} from "@tabler/icons-react";
import { siteConfig } from "@/config/site";
import { runLogContent, type RunLogContent } from "./run-log-data";

/** Any icon component that accepts a `className` (Tabler or Lucide). */
type IconComponent = ComponentType<{ className?: string }>;

/* -------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------- */

/** One box on the left (a source) or on the right (a destination). */
export type PipelineNode = {
  id: string;
  icon: IconComponent;
  /** The name, shown on every screen size. */
  label: string;
  /** A short mono line under the name. Hidden on small screens. */
  detail: string;
};

export type PipelineStage = {
  label: string;
  /** Time spent in this stage, shown in mono. */
  duration: string;
};

export type PipelineHighlight = {
  icon: IconComponent;
  title: string;
  description: string;
};

export type PipelineContent = {
  title: string;
  description: string;
  /** The live badge. It always carries text, never colour alone. */
  statusLabel: string;
  /** Read by screen readers as a summary of the diagram. */
  ariaLabel: string;
  /** Small mono labels above the three columns. */
  columns: { sources: string; engine: string; destinations: string };
  sources: PipelineNode[];
  engine: {
    icon: IconComponent;
    name: string;
    /** Mono identifier under the name. */
    id: string;
    stages: PipelineStage[];
    footnote: string;
  };
  destinations: PipelineNode[];
  /** Three short points in the strip under the diagram. */
  highlights: PipelineHighlight[];
};

export type BentoContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  /** Row 1: the full-width event pipeline panel. */
  pipeline: PipelineContent;
  /** Row 2, left: the live run log. */
  runLog: RunLogContent;
};

/* -------------------------------------------------------------------------
 * Section copy. The diagram is data-driven: add or remove sources and
 * destinations and the connecting lines redraw themselves. Four of each keeps
 * the mobile layout tidy.
 * ---------------------------------------------------------------------- */

export const bentoContent: BentoContent = {
  eyebrow: "Event pipelines",
  headline: {
    lead: "Turn events into action",
    highlight: "without glue code",
  },
  description: `Collect events from your services and the tools you already use, shape them in one pipeline, and deliver them wherever your team needs them. ${siteConfig.name} handles the queues, retries and routing in between.`,
  pipeline: {
    title: "Events in, actions out",
    description:
      "Stream events from webhooks, databases and APIs through a single pipeline, then deliver them to chat, your warehouse and your dashboards.",
    statusLabel: "Streaming · 24.8k events/s",
    ariaLabel: `Event pipeline: webhooks, a Postgres database, Stripe and a REST API send events into one ${siteConfig.name} pipeline that validates, transforms and routes them to Slack, a warehouse, a dashboard and email.`,
    columns: {
      sources: "Sources",
      engine: "Pipeline",
      destinations: "Destinations",
    },
    sources: [
      {
        id: "webhooks",
        icon: IconWebhook,
        label: "Webhooks",
        detail: "POST /hooks/orders",
      },
      {
        id: "postgres",
        icon: IconDatabase,
        label: "Postgres",
        detail: "orders · insert",
      },
      {
        id: "stripe",
        icon: IconBrandStripe,
        label: "Stripe",
        detail: "charge.succeeded",
      },
      {
        id: "rest-api",
        icon: IconApi,
        label: "REST API",
        detail: "POST /v1/events",
      },
    ],
    engine: {
      icon: IconRoute,
      name: `${siteConfig.name} Pipelines`,
      id: "pipeline.order-events",
      stages: [
        { label: "Validate schema", duration: "2ms" },
        { label: "Transform payload", duration: "4ms" },
        { label: "Route by rule", duration: "1ms" },
      ],
      footnote: "Median 7ms through the pipeline",
    },
    destinations: [
      {
        id: "slack",
        icon: IconBrandSlack,
        label: "Slack",
        detail: "#ops-alerts",
      },
      {
        id: "warehouse",
        icon: IconBuildingWarehouse,
        label: "Warehouse",
        detail: "events_raw",
      },
      {
        id: "dashboard",
        icon: IconLayoutDashboard,
        label: "Dashboard",
        detail: "Live orders board",
      },
      {
        id: "email",
        icon: IconMail,
        label: "Email",
        detail: "Daily digest",
      },
    ],
    highlights: [
      {
        icon: IconRepeat,
        title: "At-least-once delivery",
        description:
          "Failed deliveries retry with backoff until the destination confirms.",
      },
      {
        icon: IconHistory,
        title: "Replay any event",
        description:
          "Re-run recent events through a fixed pipeline without asking senders to resend.",
      },
      {
        icon: IconFileCode,
        title: "Defined in code",
        description: `Pipelines live in your ${siteConfig.command}.toml and ship with every deploy.`,
      },
    ],
  },
  runLog: runLogContent,
};
