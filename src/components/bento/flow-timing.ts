import type { Transition } from "motion/react";

/* -------------------------------------------------------------------------
 * The event pipeline plays as one loop, so every moving part is scheduled on
 * the same clock. Times are seconds from the start of a loop:
 *
 *   0.0 – 2.0   events leave the sources, one after another
 *   1.1 – 2.5   the first event reaches the pipeline, which lights up
 *   1.3 – 3.1   the three stages light up in turn
 *   2.6 – 3.5   results leave the pipeline toward each destination
 *   3.7 – 5.5   each destination flashes as its event arrives
 *   5.5 – 6.0   rest, then the loop starts again
 *
 * This file holds plain values only (no "use client"), so server and client
 * components can both import it.
 * ---------------------------------------------------------------------- */

/** Length of one full loop. */
export const CYCLE = 6;

/** How long a pulse takes to travel along one connecting line. */
export const PULSE_DURATION = 1.1;

/** Visible length of a pulse, as a fraction of its line (0 to 1). */
export const PULSE_LENGTH = 0.16;

/** Gap between consecutive sources emitting an event. */
export const IN_STAGGER = 0.3;

/** When the first result leaves the pipeline, and the gap between results. */
export const OUT_START = 2.6;
export const OUT_STAGGER = 0.3;

/** When the first event arrives at the pipeline. */
export const ENGINE_ARRIVAL = PULSE_DURATION;

/** When the first pipeline stage lights up, and the gap between stages. */
export const STAGE_START = 1.3;
export const STAGE_STEP = 0.5;

/**
 * A transition that plays once per loop. `delay` only applies to the first
 * play, so every later play starts exactly one `CYCLE` after the previous one.
 */
export function loop(
  delay: number,
  duration: number,
  ease: "easeInOut" | "easeOut" | "linear" = "easeInOut",
): Transition {
  return {
    duration,
    delay,
    ease,
    repeat: Infinity,
    repeatDelay: CYCLE - duration,
  };
}
