/* -------------------------------------------------------------------------
 * Section copy and sample figures. Replace every number with your own, and
 * keep the footnotes honest: say how and over what period each one is
 * measured.
 * ---------------------------------------------------------------------- */

export type MetricStat = {
  id: string;
  /** Short mono label above the number. */
  label: string;
  /** The final figure. It counts up to this when the section scrolls in. */
  value: number;
  /** Digits after the decimal point (e.g. `2` for 99.99). */
  decimals?: number;
  /** Shown before the number, e.g. "$". */
  prefix?: string;
  /** Unit or suffix shown after the number, e.g. "ms", "%", "M+". */
  suffix?: string;
  description: string;
  /** Mono note on how the figure is measured. */
  footnote: string;
  /**
   * Bar heights as a percentage (0 to 100). Give this to one stat only: it
   * becomes the larger, lead stat with a small bar strip under it.
   */
  series?: number[];
};

export type MetricsContent = {
  eyebrow: string;
  headline: { lead: string; highlight: string };
  description: string;
  /** The status line with a dot. Always carries text, never colour alone. */
  statusLabel: string;
  link: { label: string; href: string };
  /** Four stats fill the 2×2 grid. */
  stats: MetricStat[];
};

export const metricsContent: MetricsContent = {
  eyebrow: "Performance",
  headline: {
    lead: "Numbers that hold up",
    highlight: "under real load",
  },
  description:
    "Every figure comes from production traffic across all regions, measured continuously and published on our status page.",
  statusLabel: "All systems operational",
  link: { label: "View status page", href: "#" },
  stats: [
    {
      id: "requests",
      label: "Requests per second",
      value: 1.2,
      decimals: 1,
      suffix: "M+",
      description: "Peak sustained throughput across all customer services.",
      footnote: "Last 24 hours · all regions",
      series: [
        34, 38, 36, 42, 40, 46, 44, 50, 48, 54, 52, 58, 56, 62, 60, 66, 64, 70,
        66, 74, 70, 78, 74, 82, 78, 86, 82, 100,
      ],
    },
    {
      id: "latency",
      label: "p99 latency",
      value: 38,
      suffix: "ms",
      description: "Time to first byte for requests served from the nearest region.",
      footnote: "p99 · 30-day rolling",
    },
    {
      id: "uptime",
      label: "Uptime",
      value: 99.99,
      decimals: 2,
      suffix: "%",
      description: "Measured per service, with every incident counted.",
      footnote: "Trailing 12 months",
    },
    {
      id: "jobs",
      label: "Jobs run per day",
      value: 310,
      suffix: "M+",
      description: "Queue messages and cron runs processed on the platform.",
      footnote: "Daily average · last 30 days",
    },
  ],
};
