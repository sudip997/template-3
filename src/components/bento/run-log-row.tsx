"use client";

import type { ComponentType } from "react";
import { IconCheck, IconRefresh, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { RunEntry, RunLogContent, RunStatus } from "./run-log-data";

/** Height of one log line. The window uses it to size the visible feed. */
export const ROW_HEIGHT_REM = 2.75;

/** A line as it sits in the feed: the entry plus when and how it arrived. */
export type FeedRow = {
  /** Unique and increasing, so a line keeps its identity as the feed moves. */
  key: number;
  run: RunEntry;
  /** Clock time shown in the first column, already formatted. */
  time: string;
  /** True for lines that arrive while the visitor is watching. */
  fresh: boolean;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Each status gets an icon and a word as well as a colour, so it never relies
 * on colour alone. Success is the only teal one; retries stay neutral and
 * failures use the template's destructive token.
 */
const statusStyles: Record<
  RunStatus,
  { icon: ComponentType<{ className?: string }>; className: string }
> = {
  success: {
    icon: IconCheck,
    className: "border-accent-600/35 bg-accent-subtle/60 text-accent-400",
  },
  retry: {
    icon: IconRefresh,
    className: "border-border-strong text-foreground",
  },
  failed: {
    icon: IconX,
    className: "border-destructive/40 bg-destructive/10 text-destructive",
  },
};

type RunLogRowProps = {
  row: FeedRow;
  labels: RunLogContent["labels"];
};

/**
 * One line of the log: time, status chip, event and duration. A line that
 * arrives live slides in from above with a brief teal wash that fades out;
 * the lines below it slide down to make room.
 */
export function RunLogRow({ row, labels }: RunLogRowProps) {
  const { run, time, fresh } = row;
  const { icon: Icon, className } = statusStyles[run.status];

  return (
    <motion.li
      layout="position"
      initial={fresh ? { opacity: 0, y: -14 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      style={{ height: `${ROW_HEIGHT_REM}rem` }}
      className="relative flex items-center gap-3 border-b border-border px-4 font-mono text-xs"
    >
      {fresh ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-accent-subtle/70"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <span className="absolute inset-y-0 left-0 w-px bg-accent-400" />
        </motion.span>
      ) : null}

      <span className="relative hidden w-14 shrink-0 text-muted-foreground tabular-nums @min-[26rem]:block">
        {time}
      </span>

      <span className="relative w-24 shrink-0">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]",
            className,
          )}
        >
          <Icon aria-hidden="true" className="size-3 shrink-0" />
          {labels[run.status]}
        </span>
      </span>

      <span className="relative min-w-0 flex-1 truncate">
        <span className="text-muted-foreground">{run.pipeline}/</span>
        <span className="text-foreground">{run.event}</span>
        <span className="hidden text-muted-foreground @min-[30rem]:inline">
          {" "}
          · {run.detail}
        </span>
      </span>

      <span className="relative w-12 shrink-0 text-right text-muted-foreground tabular-nums">
        {run.duration}
      </span>
    </motion.li>
  );
}
