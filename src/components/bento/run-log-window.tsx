"use client";

import { useEffect, useRef, useState } from "react";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatClock, parseClock } from "./run-log-clock";
import type { RunLogContent } from "./run-log-data";
import { ROW_HEIGHT_REM, RunLogRow, type FeedRow } from "./run-log-row";

type Feed = {
  /** Newest first. One more than is visible, so the oldest can slide out. */
  rows: FeedRow[];
  /** Index (in the endlessly repeating script) of the next line to show. */
  next: number;
  /** Clock time of the newest line, in seconds since midnight. */
  clock: number;
};

/** The first screenful, built the same way on the server and the client. */
function buildInitialFeed({ runs, startTime, visibleRows }: RunLogContent): Feed {
  let clock = parseClock(startTime);
  const rows: FeedRow[] = [];

  for (let i = 0; i < visibleRows && runs.length > 0; i += 1) {
    const run = runs[i % runs.length];
    clock += run.secondsAfterPrevious;
    rows.unshift({ key: i, run, time: formatClock(clock), fresh: false });
  }

  return { rows, next: rows.length, clock };
}

/** Adds the next line from the script to the top of the feed. */
function appendRun(feed: Feed, { runs, visibleRows }: RunLogContent): Feed {
  const run = runs[feed.next % runs.length];
  const clock = feed.clock + run.secondsAfterPrevious;

  return {
    rows: [
      { key: feed.next, run, time: formatClock(clock), fresh: true },
      ...feed.rows,
    ].slice(0, visibleRows + 1),
    next: feed.next + 1,
    clock,
  };
}

/**
 * A framed "terminal" for the run log. It hangs from the panel's bottom edge
 * (no bottom border) and fades out toward it. The first screenful is in the
 * server-rendered markup, so the log is complete without JavaScript.
 *
 * While the window is on screen, a new line arrives after the same number of
 * seconds its timestamp says, so the clock is honest. The feed stops when it
 * is off screen, while the pointer is over it, after "Pause", and for
 * visitors who prefer reduced motion (who see a still log).
 */
export function RunLogWindow({ content }: { content: RunLogContent }) {
  const { windowTitle, ariaLabel, columns, labels, visibleRows, runs } =
    content;

  const windowRef = useRef<HTMLDivElement>(null);
  const [feed, setFeed] = useState(() => buildInitialFeed(content));
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const reduceMotion = useReducedMotion();
  const inView = useInView(windowRef);

  const playing = !paused && !reduceMotion;
  const live = playing && inView && !hovered;
  // What the status pill says. Hovering the feed holds it still, so the pill
  // says so too (off screen nobody can see it, so that case does not matter).
  const following = playing && !hovered;
  // Visitors who prefer reduced motion get a still log, which is a snapshot,
  // not something they paused.
  const statusLabel = reduceMotion
    ? labels.snapshot
    : following
      ? labels.following
      : labels.paused;

  // One timer per line: wait, add the next line, and the new `feed.next`
  // starts the following wait.
  useEffect(() => {
    if (!live || runs.length === 0) return;

    const delay = runs[feed.next % runs.length].secondsAfterPrevious * 1000;
    const timer = window.setTimeout(
      () => setFeed((previous) => appendRun(previous, content)),
      delay,
    );
    return () => window.clearTimeout(timer);
  }, [live, feed.next, runs, content]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={windowRef}
        className="@container overflow-hidden rounded-t-xl border border-b-0 border-border bg-card text-left"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <div
              aria-hidden="true"
              className="hidden shrink-0 gap-1.5 @min-[26rem]:flex"
            >
              <span className="size-2.5 rounded-full border border-border-strong" />
              <span className="size-2.5 rounded-full border border-border-strong" />
              <span className="size-2.5 rounded-full border border-border-strong" />
            </div>
            <span className="truncate font-mono text-xs tracking-wide text-muted-foreground">
              {windowTitle}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* A dot plus a word, so the state never relies on colour. */}
            <span className="flex items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-foreground">
              <span aria-hidden="true" className="relative flex size-1.5">
                {following ? (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400/50 motion-reduce:animate-none" />
                ) : null}
                <span
                  className={cn(
                    "relative size-1.5 rounded-full",
                    following
                      ? "bg-accent-400"
                      : "border border-muted-foreground",
                  )}
                />
              </span>
              {statusLabel}
            </span>

            {/* Nothing is moving for reduced-motion visitors, so no control.
                The label itself says what a press will do (Pause or Resume),
                so the button needs no pressed state on top of it. */}
            {reduceMotion ? null : (
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? (
                  <IconPlayerPlay data-icon="inline-start" />
                ) : (
                  <IconPlayerPause data-icon="inline-start" />
                )}
                {paused ? labels.resume : labels.pause}
              </Button>
            )}
          </div>
        </div>

        {/* Column labels. Widths match the rows so everything lines up. */}
        <div
          aria-hidden="true"
          className="flex items-center gap-3 border-b border-border px-4 py-2 font-mono text-[10px] tracking-wide text-muted-foreground uppercase"
        >
          <span className="hidden w-14 shrink-0 @min-[26rem]:block">
            {columns.time}
          </span>
          <span className="w-24 shrink-0">{columns.status}</span>
          <span className="min-w-0 flex-1">{columns.event}</span>
          <span className="w-12 shrink-0 text-right">{columns.duration}</span>
        </div>

        {/* The feed. Fixed to `visibleRows` lines; the extra line below is
            clipped, and a fade hides the cut. `aria-live="off"` keeps screen
            readers from announcing every new line. */}
        <div
          role="log"
          aria-live="off"
          aria-label={ariaLabel}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          className="relative overflow-hidden bg-background [mask-image:linear-gradient(to_bottom,black_62%,transparent)]"
          style={{ height: `${visibleRows * ROW_HEIGHT_REM}rem` }}
        >
          <ul role="list" className="relative">
            <AnimatePresence initial={false}>
              {feed.rows.map((row) => (
                <RunLogRow key={row.key} row={row} labels={labels} />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </MotionConfig>
  );
}
