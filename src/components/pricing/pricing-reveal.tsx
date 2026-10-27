"use client";

import { MotionConfig, motion } from "motion/react";

type PricingRevealProps = {
  children: React.ReactNode;
  /** Seconds to wait before this block animates in. */
  delay?: number;
  className?: string;
};

/**
 * Fades a block in with a small upward translate, once, shortly after it
 * enters the viewport. It only moves vertically so nothing can push past the
 * page rails and cause horizontal scroll. With `reducedMotion="user"`,
 * visitors who prefer reduced motion get the fade only.
 */
export function PricingReveal({
  children,
  delay = 0,
  className,
}: PricingRevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
