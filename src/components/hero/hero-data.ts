import { siteConfig } from "@/config/site";

export type HeroContent = {
  badge: { label: string; cta: string; href: string };
  headline: { lead: string; highlight: string };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Small label that sits on the line above the product preview. */
  stageLabel: string;
};

export type HeroVisualContent = {
  /** Read by screen readers in place of the (decorative) mock UI. */
  ariaLabel: string;
  title: string;
  statusLabel: string;
  command: string;
  steps: { label: string; duration: string }[];
  liveUrl: string;
  chart: { label: string; value: string; range: string; points: number[] };
  servicesLabel: string;
  services: { name: string; region: string; status: string; live: boolean }[];
  stats: { label: string; value: string }[];
};

export const heroContent: HeroContent = {
  badge: {
    label: "v2.0 is live",
    cta: "See what's new",
    href: "#",
  },
  headline: {
    lead: "The backend platform that",
    highlight: "gets out of your way",
  },
  description: `${siteConfig.name} gives small teams databases, queues and cron jobs on one control plane. Provision in seconds, pay for what you use, and keep everything in a single config file.`,
  primaryCta: { label: "Start building", href: "#" },
  secondaryCta: { label: "Read the docs", href: "#" },
  stageLabel: "From push to production in 23 seconds",
};

export const heroVisual: HeroVisualContent = {
  ariaLabel: `${siteConfig.name} console: a deploy finishes in 23 seconds, four services are running and p99 latency is 42 milliseconds.`,
  title: `${siteConfig.command} — deploy`,
  statusLabel: "All systems live",
  command: `${siteConfig.command} deploy`,
  steps: [
    { label: "Built image", duration: "14s" },
    { label: "Provisioned database", duration: "6s" },
    { label: "Ran migrations", duration: "2s" },
    { label: "Routed traffic", duration: "1s" },
  ],
  liveUrl: `orders-api.${siteConfig.domain}`,
  chart: {
    label: "p99 latency",
    value: "42ms",
    range: "Last 24h",
    points: [
      58, 54, 56, 49, 52, 47, 50, 46, 48, 44, 47, 45, 43, 46, 44, 42, 45, 43,
      41, 44, 43, 42, 43, 42,
    ],
  },
  servicesLabel: "Services",
  services: [
    { name: "orders-api", region: "iad", status: "live", live: true },
    { name: "postgres", region: "iad", status: "healthy", live: true },
    { name: "event-queue", region: "iad", status: "2.4k msg/s", live: true },
    { name: "nightly-sync", region: "iad", status: "03:00 UTC", live: false },
  ],
  stats: [
    { label: "uptime", value: "99.99%" },
    { label: "deploys today", value: "18" },
    { label: "error rate", value: "0.02%" },
  ],
};
