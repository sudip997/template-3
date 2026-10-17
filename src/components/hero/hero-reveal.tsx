"use client";

import { MotionConfig, motion } from "motion/react";

type HeroRevealProps = {
  children: React.ReactNode;
  /** Seconds to wait before this block animates in (used for the stagger). */
  delay?: number;
  className?: string;
};

/**
 * Fades a block in with a small upward translate, once. With
 * `reducedMotion="user"`, visitors who prefer reduced motion get the fade
 * only, with no movement.
 */
export function HeroReveal({ children, delay = 0, className }: HeroRevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
