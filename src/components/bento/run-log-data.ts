import { siteConfig } from "@/config/site";

/* -------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------- */

export type RunStatus = "success" | "retry" | "failed";

/** One line of the log. */
export type RunEntry = {
  /** The pipeline that handled the event, e.g. "orders". */
  pipeline: string;
  /** The event name, e.g. "order.created". */
  event: string;
  status: RunStatus;
  /** Where it went, or what happened (e.g. "attempt 2 of 5"). */
  detail: string;
  /** How long the run took, as text (e.g. "38ms"). */
  duration: string;
  /**
   * Seconds between the previous line and this one. The live feed waits this
   * long before showing the line, so the timestamps match real time.
   */
  secondsAfterPrevious: number;
};

export type RunLogContent = {
  title: string;
  description: string;
  /** Read by screen readers as the name of the log. */
  ariaLabel: string;
  /** Mono title in the window's title bar. */
  windowTitle: string;
  /** Clock time (24h, HH:MM:SS) of the moment just before the first line. */
  startTime: string;
  /** How many lines are visible at once. */
  visibleRows: number;
  columns: { time: string; status: string; event: string; duration: string };
  labels: {
    success: string;
    retry: string;
    failed: string;
    following: string;
    paused: string;
    pause: string;
    resume: string;
  };
  /**
   * The script the feed plays, in time order. When it reaches the end it
   * starts again from the top, so it needs at least one entry.
   */
  runs: RunEntry[];
};

/* -------------------------------------------------------------------------
 * Panel copy and sample runs. Replace the runs with events from your own
 * product, and keep a mix of statuses: a log that never fails is not
 * believable.
 * ---------------------------------------------------------------------- */

export const runLogContent: RunLogContent = {
  title: "Every run, in real time",
  description:
    "Follow each event through your pipelines as it happens. Retries, failures and timings appear inline, so you can see what changed before anyone asks.",
  ariaLabel: "Recent pipeline runs",
  windowTitle: `${siteConfig.command} logs --follow`,
  startTime: "14:02:11",
  visibleRows: 7,
  columns: { time: "Time", status: "Status", event: "Event", duration: "Took" },
  labels: {
    success: "Success",
    retry: "Retry",
    failed: "Failed",
    following: "Following",
    paused: "Paused",
    pause: "Pause",
    resume: "Resume",
  },
  runs: [
    {
      pipeline: "orders",
      event: "order.created",
      status: "success",
      detail: "slack #ops-alerts",
      duration: "38ms",
      secondsAfterPrevious: 1,
    },
    {
      pipeline: "orders",
      event: "charge.succeeded",
      status: "success",
      detail: "warehouse events_raw",
      duration: "112ms",
      secondsAfterPrevious: 2,
    },
    {
      pipeline: "signups",
      event: "user.created",
      status: "success",
      detail: "email welcome",
      duration: "64ms",
      secondsAfterPrevious: 3,
    },
    {
      pipeline: "payouts",
      event: "payout.paid",
      status: "retry",
      detail: "attempt 2 of 5",
      duration: "1.2s",
      secondsAfterPrevious: 2,
    },
    {
      pipeline: "orders",
      event: "order.refunded",
      status: "success",
      detail: "dashboard live board",
      duration: "41ms",
      secondsAfterPrevious: 3,
    },
    {
      pipeline: "billing",
      event: "invoice.failed",
      status: "failed",
      detail: "503 from destination",
      duration: "8.4s",
      secondsAfterPrevious: 2,
    },
    {
      pipeline: "orders",
      event: "order.created",
      status: "success",
      detail: "slack #ops-alerts",
      duration: "36ms",
      secondsAfterPrevious: 2,
    },
    {
      pipeline: "payouts",
      event: "payout.paid",
      status: "success",
      detail: "delivered on attempt 3",
      duration: "312ms",
      secondsAfterPrevious: 3,
    },
    {
      pipeline: "signups",
      event: "user.updated",
      status: "success",
      detail: "warehouse events_raw",
      duration: "58ms",
      secondsAfterPrevious: 2,
    },
    {
      pipeline: "billing",
      event: "invoice.failed",
      status: "retry",
      detail: "attempt 2 of 5",
      duration: "910ms",
      secondsAfterPrevious: 3,
    },
    {
      pipeline: "orders",
      event: "charge.succeeded",
      status: "success",
      detail: "warehouse events_raw",
      duration: "97ms",
      secondsAfterPrevious: 2,
    },
    {
      pipeline: "billing",
      event: "invoice.failed",
      status: "success",
      detail: "delivered on attempt 3",
      duration: "240ms",
      secondsAfterPrevious: 3,
    },
  ],
};
