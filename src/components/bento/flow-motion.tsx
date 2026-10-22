"use client";

import { createContext, useContext } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { loop } from "./flow-timing";

/**
 * Whether the pipeline loop should be playing right now. `FlowCanvas` turns it
 * on only while the diagram is on screen and the visitor has not asked for
 * reduced motion. Everything below is invisible when it is off, so the static
 * diagram is complete without them.
 */
const FlowContext = createContext(false);

export const FlowProvider = FlowContext.Provider;

function useFlowRunning() {
  return useContext(FlowContext);
}

type FlashProps = {
  /** Seconds into the loop when the flash starts. */
  delay: number;
  duration?: number;
  className?: string;
};

/**
 * A short outline that blinks on and off once per loop. Place it inside a
 * `relative` parent: it copies the parent's corner radius and sits on its
 * border.
 */
export function Flash({ delay, duration = 0.9, className }: FlashProps) {
  const running = useFlowRunning();

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-accent-400/70",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: running ? [0, 1, 0] : 0 }}
      transition={
        running
          ? { ...loop(delay, duration, "easeOut"), times: [0, 0.2, 1] }
          : { duration: 0.2 }
      }
    />
  );
}

/**
 * Tints one pipeline stage while it is "active", with a thin accent line on
 * its left edge. Sits behind the row's content inside a `relative` parent.
 */
export function StageHighlight({
  delay,
  duration = 0.9,
}: {
  delay: number;
  duration?: number;
}) {
  const running = useFlowRunning();

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-accent-subtle/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: running ? [0, 1, 1, 0] : 0 }}
      transition={
        running
          ? { ...loop(delay, duration), times: [0, 0.2, 0.7, 1] }
          : { duration: 0.2 }
      }
    >
      <span className="absolute inset-y-0 left-0 w-px bg-accent-400" />
    </motion.span>
  );
}
