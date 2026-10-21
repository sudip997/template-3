"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { formatMetricNumber } from "./format-metric";

type CountUpProps = {
  value: number;
  decimals?: number;
};

/**
 * Counts from 0 up to `value` once, when it scrolls into view. The final
 * figure is in the server-rendered markup, so the page is complete without
 * JavaScript, and visitors who prefer reduced motion see the final figure
 * straight away. Pair it with a screen-reader copy of the final value; the
 * intermediate numbers are not meant to be announced.
 */
export function CountUp({ value, decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const progress = useMotionValue(value);
  const text = useTransform(progress, (latest) =>
    formatMetricNumber(latest, decimals),
  );

  // Arm the count: rest at 0 until the section is seen. With reduced motion
  // it rests at the final value instead.
  useEffect(() => {
    progress.set(reduceMotion ? value : 0);
  }, [progress, reduceMotion, value]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(progress, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduceMotion, progress, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {text}
    </motion.span>
  );
}
