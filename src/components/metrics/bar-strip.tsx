"use client";

import { MotionConfig, motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A thin strip of bars, drawn with plain elements (no chart library). It is
 * decorative: the figure it sits under carries the meaning, so it is hidden
 * from assistive tech. The bars rise once, left to right, when scrolled into
 * view; with reduced motion they appear at full height immediately.
 */
export function BarStrip({ values }: { values: number[] }) {
  const last = values.length - 1;

  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className="flex h-14 items-end gap-[3px]">
        {values.map((height, index) => (
          <motion.span
            key={`${index}-${height}`}
            className={cn(
              "flex-1 origin-bottom rounded-[1px]",
              index === last ? "bg-accent-400" : "bg-accent-600/35",
            )}
            style={{ height: `${height}%` }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{
              duration: 0.5,
              delay: 0.25 + index * 0.018,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
    </MotionConfig>
  );
}
