import type { ComponentType } from "react";
import { IconActivity, IconFileCode, IconRocket } from "@tabler/icons-react";
import { siteConfig } from "@/config/site";

/** Which product window sits beside a step (see `how-it-works.tsx`). */
export type StepVisualId = "config" | "deploy" | "console";

export type HowItWorksStep = {
  id: string;
  /** Any icon component that accepts a `className` (Tabler or Lucide). */
  icon: ComponentType<{ className?: string }>;
  /** Short mono label above the title. A word, not a number. */
  label: string;
  title: string;
  description: string;
  /** Two or three short supporting points. */
  points: string[];
  visual: StepVisualId;
};

export type HowItWorksContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  steps: HowItWorksStep[];
};

/* -------------------------------------------------------------------------
 * Section copy. Steps alternate sides automatically: the first step has its
 * text on the left, the second on the right, the third on the left again.
 * ---------------------------------------------------------------------- */

export const howItWorksContent: HowItWorksContent = {
  eyebrow: "How it works",
  headline: {
    lead: "Three steps from a config file",
    highlight: "to production",
  },
  description: `No pipelines to wire up and no dashboards to click through. Describe your stack, ship it, and run it from the one place ${siteConfig.name} gives you.`,
  steps: [
    {
      id: "define",
      icon: IconFileCode,
      label: "Define",
      title: "Describe your stack in one file",
      description: `Declare services, databases, queues and cron jobs in a single ${siteConfig.command}.toml. It lives in your repo, goes through code review, and is the only source of truth.`,
      points: [
        "Versioned alongside your application code",
        "Validated before anything is created",
        "Readable by the whole team, not just ops",
      ],
      visual: "config",
    },
    {
      id: "deploy",
      icon: IconRocket,
      label: "Deploy",
      title: "Push, and only what changed ships",
      description: `Run ${siteConfig.command} deploy or push to main. ${siteConfig.name} compares your config with what is running, then builds and provisions only the difference.`,
      points: [
        "A plan you can read before it applies",
        "Rolling releases with zero downtime",
        "Automatic rollback on failed health checks",
      ],
      visual: "deploy",
    },
    {
      id: "operate",
      icon: IconActivity,
      label: "Operate",
      title: "Watch every service in one console",
      description:
        "Logs, request rates and queue depth for every service land in the same place. Add an alert rule next to the service it watches and get told before your users are.",
      points: [
        "Live logs you can filter by service",
        "Queue depth and cron history at a glance",
        "Alerts sent to Slack or email",
      ],
      visual: "console",
    },
  ],
};

/* -------------------------------------------------------------------------
 * Product window content. Replace with a real screenshot or your own mock.
 * ---------------------------------------------------------------------- */

export type ConfigWindowContent = {
  /** Read by screen readers in place of the (decorative) mock UI. */
  ariaLabel: string;
  title: string;
  statusLabel: string;
  blocks: {
    header: string;
    entries: { key: string; value: string }[];
  }[];
  footer: string;
};

export const configWindow: ConfigWindowContent = {
  ariaLabel: `${siteConfig.command}.toml declares an API service, a Postgres database, an event queue and a nightly cron job.`,
  title: `${siteConfig.command}.toml`,
  statusLabel: "Valid",
  blocks: [
    {
      header: "[service.orders-api]",
      entries: [
        { key: "runtime", value: '"node22"' },
        { key: "region", value: '"iad"' },
        { key: "scale", value: "{ min = 2, max = 12 }" },
      ],
    },
    {
      header: "[database.postgres]",
      entries: [
        { key: "version", value: '"17"' },
        { key: "storage", value: '"50gb"' },
      ],
    },
    {
      header: "[queue.events]",
      entries: [{ key: "retention", value: '"7d"' }],
    },
    {
      header: "[cron.nightly-sync]",
      entries: [
        { key: "schedule", value: '"0 3 * * *"' },
        { key: "run", value: '"orders-api sync"' },
      ],
    },
  ],
  footer: "4 resources declared · no errors",
};

export type DeployRow = {
  /** `+` create, `~` update, `=` unchanged. Always paired with `action`. */
  symbol: "+" | "~" | "=";
  name: string;
  kind: string;
  action: string;
  /** Final state, shown once the bar has filled. */
  state: string;
  /** Omit for resources that do not change (no progress bar is drawn). */
  duration?: string;
};

export type DeployWindowContent = {
  ariaLabel: string;
  title: string;
  statusLabel: string;
  command: string;
  rows: DeployRow[];
  summary: string;
  liveUrl: string;
};

export const deployWindow: DeployWindowContent = {
  ariaLabel: `${siteConfig.command} deploy plan: Postgres and an event queue are created, the orders API is updated, the nightly cron job is unchanged, and everything is live in 23 seconds.`,
  title: `${siteConfig.command} deploy`,
  statusLabel: "Applied in 23s",
  command: `${siteConfig.command} deploy`,
  rows: [
    {
      symbol: "+",
      name: "postgres",
      kind: "database",
      action: "create",
      state: "ready",
      duration: "6s",
    },
    {
      symbol: "~",
      name: "orders-api",
      kind: "service",
      action: "update",
      state: "rolled out",
      duration: "14s",
    },
    {
      symbol: "+",
      name: "event-queue",
      kind: "queue",
      action: "create",
      state: "ready",
      duration: "3s",
    },
    {
      symbol: "=",
      name: "nightly-sync",
      kind: "cron",
      action: "no change",
      state: "Already up to date",
    },
  ],
  summary: "2 created · 1 updated · 1 unchanged",
  liveUrl: `orders-api.${siteConfig.domain}`,
};

export type BarSeries = {
  /** Bar heights as a percentage (0–100) of the chart height. */
  values: number[];
  /** Index of the bar drawn in the bright accent. */
  highlight: number;
};

export type ConsoleLog = {
  time: string;
  level: "INFO" | "WARN";
  source: string;
  message: string;
};

export type ConsoleWindowContent = {
  ariaLabel: string;
  title: string;
  statusLabel: string;
  requests: { label: string; value: string; series: BarSeries };
  queue: { label: string; value: string; caption: string; series: BarSeries };
  logs: ConsoleLog[];
  alert: { label: string; message: string };
};

export const consoleWindow: ConsoleWindowContent = {
  ariaLabel: `${siteConfig.name} console: request rate is 84.2 thousand per minute, the event queue spiked past its threshold, the orders API scaled out, and the alert resolved once the queue drained.`,
  title: "console · orders-api",
  statusLabel: "Live",
  requests: {
    label: "Requests / min",
    value: "84.2k",
    series: {
      values: [
        38, 44, 41, 52, 48, 56, 50, 62, 58, 66, 60, 72, 64, 70, 68, 78, 74, 82,
        76, 88,
      ],
      highlight: 19,
    },
  },
  queue: {
    label: "Queue depth",
    value: "312",
    caption: "Peaked at 5,214",
    series: {
      values: [
        8, 10, 9, 12, 11, 14, 20, 38, 72, 100, 64, 30, 14, 9, 7, 6, 6, 6, 6, 6,
      ],
      highlight: 9,
    },
  },
  logs: [
    {
      time: "14:02:11",
      level: "INFO",
      source: "orders-api",
      message: "POST /orders 201 38ms",
    },
    {
      time: "14:02:11",
      level: "INFO",
      source: "event-queue",
      message: "published order.created",
    },
    {
      time: "14:02:12",
      level: "WARN",
      source: "event-queue",
      message: "depth 5,214 is above the 5,000 threshold",
    },
    {
      time: "14:02:12",
      level: "INFO",
      source: "orders-api",
      message: "scaled from 4 to 6 instances",
    },
    {
      time: "14:02:19",
      level: "INFO",
      source: "event-queue",
      message: "depth 312, back under threshold",
    },
  ],
  alert: {
    label: "Alert resolved",
    message: "Queue depth is back under 5,000. #oncall was notified in Slack.",
  },
};
